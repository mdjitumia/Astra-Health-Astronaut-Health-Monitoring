"use client";

import { useEffect, useState } from "react";
import {
  radiationLocations,
  radiationExposure,
  radiationWarnings,
  getCrew,
  type RadiationReading,
  type RadiationExposure,
  type MetricPoint,
} from "@/lib/demo-data";
import { osd546RadiationDose } from "@/lib/nasa-data";
import {
  SectionHeader,
  Panel,
  StatusPill,
  Meter,
  StatCard,
  ProvenanceBadge,
} from "@/components/shared";
import { TrendArea, CategoryBars } from "@/components/charts";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Radiation,
  TriangleAlert,
  ShieldCheck,
  Sun,
  Activity,
  CloudLightning,
  Gauge as GaugeIcon,
  Info,
  Satellite,
  Bone,
} from "lucide-react";
import { radiationSimulated } from "@/lib/demo-data";

export function RadiationModule() {
  const [locs, setLocs] = useState<RadiationReading[]>(() => radiationLocations);
  const [exposure, setExposure] = useState<(RadiationExposure & { crew: ReturnType<typeof getCrew> })[]>(
    () => radiationExposure.map((e) => ({ ...e, crew: getCrew(e.crewId) })),
  );

  useEffect(() => {
    let alive = true;
    fetch("/api/radiation")
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (d.locations) setLocs(d.locations);
        if (d.exposure) setExposure(d.exposure);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const totalCumulative = exposure.reduce((a, e) => a + e.cumulative, 0);
  const avgDaily = Number((exposure.reduce((a, e) => a + e.daily, 0) / exposure.length).toFixed(2));
  const highestDaily = Math.max(...locs.map((l) => l.daily));

  const exposureData = exposure.map((e) => ({
    label: e.crew.name.split(" ")[0],
    value: e.cumulative,
    status: (e.status as "good" | "warn" | "alert"),
  }));

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Radiation Monitoring"
        subtitle="Exposure levels, trends, individual summaries, and warning notifications"
        icon={<Radiation className="h-4 w-4" />}
      />
      {radiationSimulated && (
        <div className="flex items-start gap-2 rounded-md border border-cyan-500/30 bg-cyan-500/5 px-3 py-2 text-[11px] text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
          <span>
            <strong className="font-semibold text-cyan-300">NASA radiation dosimetry integrated.</strong>{" "}
            OSD-546 provides measured ISS radiation dosimetry (3.70746 mGy / 14 days, ISS Zvezda
            module) — shown in the panel below. Per-astronaut exposure estimates further down are
            representative values for the monitoring scenario; OSD-546's dose applies to a
            cell-culture experiment rather than individual crew members.
          </span>
        </div>
      )}

      {/* REAL NASA radiation dosimetry from OSD-546 */}
      <Panel
        title="Real ISS Radiation Dosimetry (OSD-546)"
        description="NASA-measured in-flight radiation dose from the OSD-546 hBMSC study"
        right={<ProvenanceBadge provenance="nasa" />}
      >
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr]">
          {/* Absorbed dose */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-300">
              <Satellite className="h-3.5 w-3.5" />
              Absorbed Dose
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-mono text-3xl font-bold text-foreground">
                {osd546RadiationDose.absorbedDoseMGy}
              </span>
              <span className="text-xs text-muted-foreground">mGy</span>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              over {osd546RadiationDose.exposureDurationDays} days
            </div>
          </div>
          {/* Dose rate */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-300">
              <Activity className="h-3.5 w-3.5" />
              Dose Rate
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-mono text-3xl font-bold text-foreground">
                {osd546RadiationDose.doseRateMGyPerDay}
              </span>
              <span className="text-xs text-muted-foreground">mGy/day</span>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              daily average
            </div>
          </div>
          {/* Measurement context */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-300">
              <Bone className="h-3.5 w-3.5" />
              Measurement Context
            </div>
            <div className="mt-2 space-y-1 text-[11px] text-muted-foreground">
              <div><span className="text-foreground/80">Vehicle:</span> {osd546RadiationDose.vehicle}</div>
              <div><span className="text-foreground/80">Source:</span> {osd546RadiationDose.radiationType} ({osd546RadiationDose.radiationSource})</div>
              <div><span className="text-foreground/80">Applies to:</span> {osd546RadiationDose.appliesTo}</div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-border/40 bg-background/40 p-2.5 text-[10px] text-muted-foreground">
          <Info className="h-3 w-3 shrink-0 text-cyan-300" />
          <span>
            This <strong className="text-cyan-300">NASA-measured radiation dosimetry</strong> is
            integrated into AstraHealth from the OSD-546 experiment (GLDS-546) on
            human bone marrow mesenchymal stem cells cultured aboard the ISS. Ground-control
            samples were non-irradiated. Units preserved as recorded: milligray (mGy). Note:
            1 mGy = 0.001 Sv for this radiation quality.
          </span>
        </div>
      </Panel>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Avg Daily Dose" value={avgDaily} unit="mSv/d" icon={<Sun className="h-4 w-4" />} status="good" hint="crew avg" />
        <StatCard label="Peak Location Dose" value={highestDaily} unit="mSv/d" icon={<GaugeIcon className="h-4 w-4" />} status="warn" hint="EVA airlock" />
        <StatCard label="Total Crew Cumulative" value={totalCumulative} unit="mSv" icon={<Activity className="h-4 w-4" />} status="good" hint="mission-to-date" />
        <StatCard label="Active Warnings" value={radiationWarnings.filter((w) => w.severity !== "good").length} icon={<TriangleAlert className="h-4 w-4" />} status="warn" hint="SPE forecast" />
      </div>

      {/* Warnings */}
      <Panel title="Radiation Warnings & Advisories" description="Prioritized notifications">
        <div className="space-y-2.5">
          {radiationWarnings.map((w) => (
            <div
              key={w.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3",
                w.severity === "alert"
                  ? "border-status-alert/40 bg-status-alert/5"
                  : w.severity === "warn"
                    ? "border-status-warn/40 bg-status-warn/5"
                    : "border-status-good/30 bg-status-good/5",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                  w.severity === "alert"
                    ? "bg-status-alert/15 text-status-alert"
                    : w.severity === "warn"
                      ? "bg-status-warn/15 text-status-warn"
                      : "bg-status-good/15 text-status-good",
                )}
              >
                {w.severity === "alert" ? (
                  <CloudLightning className="h-3.5 w-3.5" />
                ) : w.severity === "warn" ? (
                  <TriangleAlert className="h-3.5 w-3.5" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">{w.title}</span>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{w.time}</span>
                </div>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{w.detail}</p>
                <div className="mt-1.5">
                  <StatusPill status={w.severity} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Location readings */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Module-Level Readings</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {locs.map((l) => (
            <Panel key={l.id} className="overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{l.location}</span>
                <StatusPill status={l.status} />
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-semibold text-foreground">
                  {l.current}
                </span>
                <span className="text-xs text-muted-foreground">µSv/h</span>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                {l.daily} mSv/day · limit {l.limit}
              </div>
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Daily limit</span>
                  <span className="font-mono">{Math.round((l.daily / l.limit) * 100)}%</span>
                </div>
                <Meter value={(l.daily / l.limit) * 100} status={l.status} />
              </div>
            </Panel>
          ))}
        </div>
      </div>

      {/* Trends */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Habitation Module Dose" description="14-day trend (mSv/day)" className="lg:col-span-2">
          <TrendArea data={locs[0].trend} color="amber" unit=" mSv" height={220} />
        </Panel>
        <Panel title="Crew Cumulative Exposure" description="mSv mission-to-date">
          <CategoryBars data={exposureData} colorByValue height={220} />
        </Panel>
      </div>

      {/* Individual exposure table */}
      <Panel title="Individual Exposure Summary" description="Per-astronaut cumulative, daily, and career limit">
        <div className="overflow-x-auto scrollbar-thin min-w-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Crew</th>
                <th className="pb-2 pr-3 font-medium">Daily (mSv)</th>
                <th className="pb-2 pr-3 font-medium">Monthly (mSv)</th>
                <th className="pb-2 pr-3 font-medium">Cumulative (mSv)</th>
                <th className="pb-2 pr-3 font-medium">Career Limit</th>
                <th className="pb-2 font-medium">% of Limit</th>
                <th className="pb-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {exposure.map((e) => {
                const pct = Math.round((e.cumulative / e.careerLimit) * 100);
                return (
                  <tr key={e.crewId} className="text-sm">
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 ring-1 ring-border">
                          <AvatarFallback
                            style={{ background: `${e.crew.avatarColor}22`, color: e.crew.avatarColor }}
                            className="text-[10px] font-mono font-semibold"
                          >
                            {e.crew.callsign.split("-")[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xs font-medium">{e.crew.name}</div>
                          <div className="text-[10px] text-muted-foreground">{e.crew.role.split(" ")[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-cyan-300">{e.daily}</td>
                    <td className="py-2.5 pr-3 font-mono text-muted-foreground">{e.monthly}</td>
                    <td className="py-2.5 pr-3 font-mono font-semibold text-foreground">{e.cumulative}</td>
                    <td className="py-2.5 pr-3 font-mono text-muted-foreground">{e.careerLimit}</td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16">
                          <Meter value={pct} status={e.status} />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right">
                      <StatusPill status={e.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
