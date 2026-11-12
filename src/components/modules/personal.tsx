"use client";

import {
  crew,
  crewSeries,
  getCrew,
  type CrewMember,
  type CrewMetricSeries,
} from "@/lib/demo-data";
import { osd575Assays, osd575Timeline } from "@/lib/nasa-data";
import { useApp } from "@/lib/store";
import {
  StatCard,
  SectionHeader,
  Panel,
  StatusPill,
  Meter,
  ProvenanceBadge,
} from "@/components/shared";
import { TrendArea, Gauge } from "@/components/charts";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  HeartPulse,
  Activity,
  Moon,
  Wind,
  Droplets,
  Thermometer,
  Gauge as GaugeIcon,
  User,
  FlaskConical,
  TestTube,
  Satellite,
} from "lucide-react";

export function PersonalModule() {
  const { selectedCrewId, selectCrew } = useApp();
  // Derive directly from the selected crew — no state/effect needed.
  // Guard against selectedCrewId being "all" (set by the countermeasure module's
  // aggregate filter) or any invalid value by falling back to the first crew member.
  const member: CrewMember = getCrew(selectedCrewId) ?? crew[0];
  const series: CrewMetricSeries =
    crewSeries.find((s) => s.crewId === member.id)!;

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Personal Health Monitoring"
        subtitle="Individual astronaut health profiles, vitals, and historical trends"
        icon={<User className="h-4 w-4" />}
      />

      {/* Crew selector */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {crew.map((c) => {
          const active = c.id === member.id;
          return (
            <button
              key={c.id}
              onClick={() => selectCrew(c.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border p-2.5 text-left transition-all",
                active
                  ? "border-primary/50 bg-primary/10 glow-cyan"
                  : "border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50",
              )}
            >
              <Avatar className="h-9 w-9 ring-1 ring-border">
                <AvatarFallback
                  style={{ background: `${c.avatarColor}22`, color: c.avatarColor }}
                  className="font-mono text-[11px] font-semibold"
                >
                  {c.callsign.split("-")[0]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium text-foreground">
                  {c.name.split(" ")[0]} {c.name.split(" ").slice(-1)[0][0]}.
                </div>
                <div className="truncate text-[10px] text-muted-foreground">
                  {c.role.split(" ")[0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Profile header */}
      <Panel className="overflow-hidden">
        <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/30">
              <AvatarFallback
                style={{ background: `${member.avatarColor}22`, color: member.avatarColor }}
                className="font-mono text-base font-semibold"
              >
                {member.callsign.split("-")[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-xl font-bold tracking-tight">
                  {member.name}
                </h2>
                <StatusPill status={member.status} />
              </div>
              <div className="mt-0.5 text-sm text-muted-foreground">
                {member.role} <span className="text-muted-foreground/40">·</span>{" "}
                Crew Profile
              </div>
              <div className="mt-1 flex flex-wrap gap-3 font-mono text-[11px] text-muted-foreground">
                {/* OSD-575 subject ID (NASA research data) */}
                <span className="flex items-center gap-1 rounded bg-cyan-400/10 px-1.5 py-0.5 text-cyan-300">
                  <Satellite className="h-2.5 w-2.5" /> OSD-575 {member.nasaSubjectId}
                </span>
                <span>Sex {member.sex}</span>
                <span>Sample {member.materialType}</span>
                <span>Age {member.age}</span>
              </div>
            </div>
          </div>
          <p className="rounded-md border border-border/40 bg-card/30 p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/80">Flight Surgeon Note: </span>
            {member.notes}
          </p>
          <div className="flex items-center justify-center">
            <Gauge value={member.heartRate} max={120} color="cyan" label="Heart Rate" unit=" BPM" size={170} />
          </div>
        </div>
      </Panel>

      {/* Vitals grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard label="Heart Rate" value={member.heartRate} unit="BPM" icon={<HeartPulse className="h-4 w-4" />} status={member.status} hint="resting avg" />
        <StatCard label="HRV" value={member.hrv} unit="ms" icon={<Activity className="h-4 w-4" />} status={member.hrv < 55 ? "warn" : "good"} hint="autonomic" />
        <StatCard label="Sleep" value={member.sleep} unit="h" icon={<Moon className="h-4 w-4" />} status={member.sleep < 6.5 ? "warn" : "good"} hint="last night" />
        <StatCard label="Respiratory" value={member.respiratoryRate} unit="br/min" icon={<Wind className="h-4 w-4" />} status="good" hint="nominal" />
        <StatCard label="SpO₂" value={member.spo2} unit="%" icon={<GaugeIcon className="h-4 w-4" />} status={member.spo2 < 97 ? "warn" : "good"} hint="oxygenation" />
        <StatCard label="Body Temp" value={member.bodyTemp} unit="°C" icon={<Thermometer className="h-4 w-4" />} status="good" hint="core" />
      </div>

      {/* Hydration meter */}
      <Panel title="Hydration" description="Daily goal progress">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-cyan-300" />
            <span className="text-sm font-medium">{member.hydration}% of 2.5L goal</span>
          </div>
          <StatusPill status={member.hydration < 75 ? "warn" : "good"} />
        </div>
        <Meter value={member.hydration} status={member.hydration < 75 ? "warn" : "good"} className="mt-3" />
      </Panel>

      {/* Historical trends — physiological indicators over the OSD-575 sampling timeline */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Heart Rate History"
          description="Physiological indicators · OSD-575 sampling timeline (L-92 → R+194)"
        >
          <TrendArea data={series.heartRate} color="cyan" unit=" BPM" height={200} />
        </Panel>
        <Panel
          title="HRV History"
          description="Physiological indicators · OSD-575 sampling timeline"
        >
          <TrendArea data={series.hrv} color="sky" unit=" ms" height={200} />
        </Panel>
        <Panel
          title="Sleep History"
          description="Physiological indicators · OSD-575 sampling timeline"
        >
          <TrendArea data={series.sleep} color="violet" unit=" h" height={200} />
        </Panel>
        <Panel
          title="SpO₂ History"
          description="Physiological indicators · OSD-575 sampling timeline"
        >
          <TrendArea data={series.spo2} color="emerald" unit="%" height={200} />
        </Panel>
      </div>

      {/* REAL NASA OSD-575 assay panels available for this subject */}
      <Panel
        title="Available Biospecimen Assays (OSD-575)"
        description={`NASA/ALSDA assay panels for subject ${member.nasaSubjectId} — metadata integrated, numeric concentrations not yet available`}
        right={<ProvenanceBadge provenance="nasa" />}
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {osd575Assays.map((a) => (
            <div
              key={a.id}
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {a.id === "cmp" ? (
                    <TestTube className="h-4 w-4 text-cyan-300" />
                  ) : (
                    <FlaskConical className="h-4 w-4 text-cyan-300" />
                  )}
                  <span className="text-xs font-semibold text-foreground">{a.name}</span>
                </div>
                {a.targets && (
                  <span className="rounded bg-cyan-400/15 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
                    {a.targets} targets
                  </span>
                )}
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground">
                {a.company} · {a.platform}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[10px]">
                <ProvenanceBadge provenance="nasa" />
                <span className="text-muted-foreground">metadata real</span>
                <span className="text-muted-foreground/40">·</span>
                <ProvenanceBadge provenance="unavailable" />
                <span className="text-muted-foreground">values unavailable</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] leading-snug text-muted-foreground">
          Subject {member.nasaSubjectId} has {osd575Timeline.length} serum samples across the
          real OSD-575 timeline ({osd575Timeline.map((t) => t.code).join(", ")}).
          Raw numeric concentrations (glucose, electrolytes, cytokines, cardiac markers) reside
          in external transformed CSV/XLSX files not included in the uploaded ISA-Tab metadata —
          shown here as unavailable rather than fabricated.
        </p>
      </Panel>
    </div>
  );
}
