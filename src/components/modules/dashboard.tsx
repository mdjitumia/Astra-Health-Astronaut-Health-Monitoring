"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import {
  mission,
  crew,
  missionSeries,
  alerts,
  aggregate,
  type Alert,
  type Status,
} from "@/lib/demo-data";
import {
  StatCard,
  Panel,
  StatusPill,
  DemoBanner,
  ProvenanceBadge,
} from "@/components/shared";
import { NasaDataSourcesPanel, Osd575TimelinePanel, Inspiration4BiobankPanel } from "@/components/nasa-sources";
import { TrendArea, MultiLine, Gauge } from "@/components/charts";
import { cn } from "@/lib/utils";
import {
  HeartPulse,
  Activity,
  Moon,
  Wind,
  Users,
  TriangleAlert,
  Brain,
  ArrowRight,
  Satellite,
  Orbit,
  Building2,
  Globe2,
  Rocket,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Static starfield positions (deterministic — no hydration mismatch)
const STARS = [
  { x: 8, y: 15, r: 1.5, o: 0.7, d: 3, delay: 0 },
  { x: 22, y: 8, r: 1, o: 0.5, d: 4, delay: 1.2 },
  { x: 38, y: 22, r: 2, o: 0.8, d: 2.5, delay: 0.5 },
  { x: 55, y: 12, r: 1, o: 0.4, d: 5, delay: 2 },
  { x: 68, y: 28, r: 1.5, o: 0.6, d: 3.5, delay: 0.8 },
  { x: 82, y: 18, r: 1, o: 0.5, d: 4.5, delay: 1.5 },
  { x: 92, y: 35, r: 1.5, o: 0.7, d: 3, delay: 0.3 },
  { x: 15, y: 45, r: 1, o: 0.5, d: 4, delay: 1 },
  { x: 45, y: 55, r: 1.5, o: 0.6, d: 3.2, delay: 0.6 },
  { x: 75, y: 50, r: 1, o: 0.4, d: 5, delay: 2.5 },
  { x: 88, y: 62, r: 1.5, o: 0.7, d: 2.8, delay: 0.4 },
  { x: 28, y: 68, r: 1, o: 0.5, d: 4.2, delay: 1.8 },
  { x: 58, y: 75, r: 1.5, o: 0.6, d: 3.8, delay: 0.9 },
  { x: 12, y: 82, r: 1, o: 0.4, d: 5, delay: 2.2 },
  { x: 80, y: 85, r: 1.5, o: 0.7, d: 3, delay: 0.2 },
];

export function DashboardModule() {
  const { set } = useApp();
  const [data, setData] = useState<{
    aggregates: { heartRate: number; hrv: number; sleep: number; respiratory: number };
    series: typeof missionSeries;
    alerts: Alert[];
  } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/mission")
      .then((r) => r.json())
      .then((d) => alive && setData(d))
      .catch(() => alive && setData(null));
    return () => {
      alive = false;
    };
  }, []);

  const aggregates = data?.aggregates ?? {
    heartRate: aggregate("heartRate"),
    hrv: aggregate("hrv"),
    sleep: aggregate("sleep"),
    respiratory: aggregate("respiratory"),
  };
  const series = data?.series ?? missionSeries;
  const feed = data?.alerts ?? alerts;

  return (
    <div className="space-y-4">
      <DemoBanner />

      {/* === MISSION COMMAND BAR — compact, single row, no duplication === */}
      <Panel className="relative overflow-hidden edge-glow-cyan">
        <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative flex items-center gap-3">
          {/* Mission identity */}
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-bright">
              <Orbit className="h-4 w-4 text-cyan-glow" />
            </div>
            <div className="hidden sm:block">
              <div className="font-mono text-sm font-bold tracking-tight text-white">{mission.name}</div>
              <div className="text-[9px] uppercase tracking-[0.1em] text-ice/40">{mission.type}</div>
            </div>
          </div>
          {/* Divider */}
          <div className="hidden h-7 w-px shrink-0 bg-white/[0.08] sm:block" />
          {/* Telemetry chips */}
          <div className="flex shrink-0 items-center gap-2 font-mono text-[11px]">
            <span className="text-ice/40">DAY <span className="font-semibold text-cyan-glow">{mission.day}/{mission.totalDays}</span></span>
            <span className="hidden text-ice/40 md:inline">CREW <span className="font-semibold text-white">{mission.crewSize}</span></span>
            <span className="hidden text-ice/40 lg:inline">DIST <span className="font-semibold text-white">{mission.distance}</span></span>
            <span className="hidden text-ice/40 lg:inline">LAT <span className="font-semibold text-white">{mission.latencyMin}</span></span>
          </div>
          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => set("risk")} className="gap-1 text-xs">
              <Brain className="h-3 w-3" /> Risk
            </Button>
            <Button size="sm" onClick={() => set("copilot")} className="gap-1 text-xs">
              Ask ASTRA <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Panel>

      {/* === HERO: Balanced 2-column — Orbital Viz (left) + Crew Health Summary (right) === */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Left: Orbital visualization — compact, defined aspect ratio */}
        <Panel className="relative overflow-hidden min-h-[280px] lg:min-h-[320px]">
          <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
          {/* Starfield */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            {STARS.map((s, i) => (
              <span
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.r}px`,
                  height: `${s.r}px`,
                  opacity: s.o,
                  animation: `twinkle ${s.d}s ease-in-out ${s.delay}s infinite`,
                }}
              />
            ))}
          </div>
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl" />

          <div className="relative flex h-full min-h-[280px] items-center justify-center px-4 py-4">
            {/* Orbital scene — sized to fit container */}
            <div className="relative flex h-[240px] w-[240px] items-center justify-center sm:h-[260px] sm:w-[260px]">
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/10" />
              <div className="absolute inset-6 rounded-full border border-cyan-400/8" />
              <div className="absolute inset-12 rounded-full border border-cyan-400/5" />
              {/* Crosshair */}
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent" />
              <div className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400/8 to-transparent" />

              {/* Earth globe */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #1a4a6e 0%, #0d3157 30%, #062135 60%, #020817 100%)",
                  boxShadow: "0 0 60px -8px rgba(32, 221, 245, 0.3), inset -8px -8px 40px rgba(0,0,0,0.6), inset 8px 8px 30px rgba(32, 221, 245, 0.08)",
                }}
              >
                <div className="absolute inset-1 rounded-full opacity-40"
                  style={{
                    background: "radial-gradient(ellipse 30% 20% at 25% 35%, #2d6a4f, transparent), radial-gradient(ellipse 25% 15% at 65% 45%, #1b4332, transparent), radial-gradient(ellipse 20% 12% at 45% 65%, #2d6a4f, transparent)",
                  }}
                />
                <div className="absolute -inset-2 rounded-full"
                  style={{ background: "radial-gradient(circle, transparent 48%, rgba(32, 221, 245, 0.12) 50%, transparent 54%)" }}
                />
                <span className="absolute -inset-1 animate-ping rounded-full border border-cyan-400/10" style={{ animationDuration: "4s" }} />
              </div>

              {/* Orbiting spacecraft */}
              <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ animation: "orbit 18s linear infinite" }}>
                <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ transform: "translate(120px, -50%)" }}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full glass-bright">
                    <Satellite className="h-3.5 w-3.5 text-cyan-glow" />
                  </div>
                  <div className="absolute right-full top-1/2 h-px w-10 -translate-y-1/2 bg-gradient-to-l from-cyan-400/40 to-transparent" />
                </div>
              </div>
              {/* Crew module */}
              <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ animation: "orbit-rev 26s linear infinite" }}>
                <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ transform: "translate(-105px, 45%)" }}>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full glass-frost border-cyan-400/30">
                    <Users className="h-3 w-3 text-ice" />
                  </div>
                </div>
              </div>

              {/* Floating info chips */}
              <div className="absolute left-0 top-1/4 glass-frost rounded-md px-1.5 py-0.5 text-[8px] font-mono text-cyan-glow hidden md:block">
                ALT 408 km
              </div>
              <div className="absolute right-0 bottom-1/4 glass-frost rounded-md px-1.5 py-0.5 text-[8px] font-mono text-ice/60 hidden md:block">
                VEL 7.66 km/s
              </div>
            </div>
          </div>
        </Panel>          {/* Right: Crew Health Summary — compact metrics + status */}
<div className="flex flex-col gap-3">
  {/* Mission status + HR gauge */}
  <Panel className="flex-1">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-glow">
          Crew Health Summary
        </div>

        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-good" />
          <span className="font-mono text-[11px] font-semibold text-status-good">
            SYSTEMS NOMINAL
          </span>
        </div>
      </div>

      <StatusPill status="good" />
    </div>

    <div className="mt-3 flex items-center gap-4">
      <Gauge
        value={aggregates.heartRate}
        max={120}
        color="cyan"
        label="Avg HR"
        unit=" BPM"
        size={170}
      />

      <div className="grid flex-1 grid-cols-2 gap-2">
        <MiniMetric
          label="HRV"
          value={aggregates.hrv}
          unit="ms"
          status="warn"
          icon={<Activity className="h-3 w-3" />}
        />
        <MiniMetric
          label="Sleep"
          value={aggregates.sleep}
          unit="h"
          status="warn"
          icon={<Moon className="h-3 w-3" />}
        />
        <MiniMetric
          label="Resp"
          value={aggregates.respiratory}
          unit="br/m"
          status="good"
          icon={<Wind className="h-3 w-3" />}
        />
        <MiniMetric
          label="Crew"
          value={mission.crewSize}
          status="good"
          icon={<Users className="h-3 w-3" />}
        />
      </div>
    </div>
  </Panel>

  {/* Crew status list */}
  <Panel>
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan-glow">
        Crew Status
      </span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => set("personal")}
        className="gap-1 text-[10px]"
      >
        Details <ArrowRight className="h-2.5 w-2.5" />
      </Button>
    </div>

    <div className="mt-2 space-y-1">
      {crew.map((c) => (
        <button
          key={c.id}
          onClick={() => set("personal")}
          className="flex w-full items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] p-1.5 text-left transition-all hover:border-cyan-400/20 hover:bg-white/[0.04]"
        >
          <Avatar className="h-5 w-5 ring-1 ring-white/[0.08]">
            <AvatarFallback
              style={{
                background: `${c.avatarColor}22`,
                color: c.avatarColor,
              }}
              className="font-mono text-[8px] font-semibold"
            >
              {c.callsign.split("-")[0]}
            </AvatarFallback>
          </Avatar>

          <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-ice/80">
            {c.name.split(" ")[0]} {c.name.split(" ").slice(-1)[0][0]}.
          </span>

          <span className="font-mono text-[9px] text-cyan-glow">
            {c.heartRate}
          </span>

          <span
            className={cn(
              "h-1 w-1 rounded-full",
              c.status === "good"
                ? "bg-status-good"
                : c.status === "warn"
                  ? "bg-status-warn"
                  : "bg-status-alert"
            )}
          />
        </button>
      ))}
    </div>
  </Panel>
</div>

      </div>

      {/* === HEALTH METRICS — 4-card grid === */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Avg Heart Rate" value={aggregates.heartRate} unit="BPM" icon={<HeartPulse className="h-4 w-4" />} delta="stable" status="good" hint="crew avg" />
        <StatCard label="Avg HRV" value={aggregates.hrv} unit="ms" icon={<Activity className="h-4 w-4" />} delta="-2.4%" status="warn" hint="dipping" />
        <StatCard label="Avg Sleep" value={aggregates.sleep} unit="h" icon={<Moon className="h-4 w-4" />} delta="-0.3h" status="warn" hint="vs baseline" />
        <StatCard label="Respiratory Rate" value={aggregates.respiratory} unit="br/min" icon={<Wind className="h-4 w-4" />} delta="nominal" status="good" hint="within band" />
      </div>

      {/* === CHARTS ROW === */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Heart Rate Trend" description="Crew aggregate (BPM)" className="lg:col-span-2">
          <TrendArea data={series.heartRate} color="cyan" unit=" BPM" height={200} />
        </Panel>
        <Panel title="HRV Variability" description="ms — autonomic health">
          <TrendArea data={series.hrv} color="sky" unit=" ms" height={200} />
        </Panel>
      </div>

      {/* === CREW VITALS + SLEEP === */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Sleep Duration" description="hours / night">
          <TrendArea data={series.sleep} color="violet" unit=" h" height={180} />
        </Panel>
        <Panel
          title="Crew Vitals"
          description="Click a crew member for details"
          className="lg:col-span-2"
          right={
            <Button size="sm" variant="ghost" onClick={() => set("personal")} className="gap-1 text-xs">
              Personal view <ArrowRight className="h-3 w-3" />
            </Button>
          }
        >
          <div className="grid gap-2.5 sm:grid-cols-2">
            {crew.map((c) => (
              <button
                key={c.id}
                onClick={() => set("personal")}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-left transition-all hover:border-cyan-400/25 hover:bg-white/[0.04]"
              >
                <Avatar className="h-9 w-9 ring-2 ring-border">
                  <AvatarFallback
                    style={{ background: `${c.avatarColor}22`, color: c.avatarColor }}
                    className="font-mono text-[11px] font-semibold"
                  >
                    {c.callsign.split("-")[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">{c.name}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{c.role}</div>
                  <div className="mt-1 flex items-center gap-3 font-mono text-xs">
                    <span className="text-cyan-glow">{c.heartRate} BPM</span>
                    <span className="text-muted-foreground">HRV {c.hrv}</span>
                    <span className="text-muted-foreground">SLP {c.sleep}h</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      {/* === ALERTS + TRENDS === */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          title="Health Alerts"
          description="Prioritized feed"
          className="lg:col-span-2"
          right={<span className="text-xs text-muted-foreground">{feed.length} active</span>}
        >
          <div className="max-h-72 space-y-2 overflow-y-auto scrollbar-thin pr-1">
            {feed.map((a) => {
              const c = a.crewId ? crew.find((x) => x.id === a.crewId) : null;
              const iconColor = a.severity === "alert" ? "text-status-alert" : a.severity === "warn" ? "text-status-warn" : "text-status-good";
              return (
                <div key={a.id} className="flex gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition-all hover:bg-white/[0.04]">
                  <div className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md", a.severity === "alert" ? "bg-status-alert/15" : a.severity === "warn" ? "bg-status-warn/15" : "bg-status-good/15")}>
                    <TriangleAlert className={cn("h-3 w-3", iconColor)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">{a.title}</span>
                      <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{a.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{a.detail}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusPill status={a.severity} />
                      {c && <span className="text-[10px] text-muted-foreground">{c.name}</span>}
                      <span className="ml-auto rounded bg-muted/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{a.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel title="Respiratory & Sleep" description="Comparative trends">
          <MultiLine
            data={series.respiratory.map((p, i) => ({ t: p.t, rr: p.value, slp: series.sleep[i].value }))}
            series={[{ key: "rr", color: "emerald" }, { key: "slp", color: "violet" }]}
            height={180}
          />
          <div className="mt-2 flex items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "#20d6b5" }} />
              Respiratory
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "#a9a7ff" }} />
              Sleep
            </span>
          </div>
        </Panel>
      </div>

      {/* === NASA DATA SECTIONS === */}
      <Osd575TimelinePanel />
      <Inspiration4BiobankPanel />
      <NasaDataSourcesPanel />
    </div>
  );
}

// Compact metric tile
function MiniMetric({
  label,
  value,
  unit,
  status,
  icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  status: Status;
  icon?: React.ReactNode;
}) {
  const color = status === "good" ? "text-status-good" : status === "warn" ? "text-status-warn" : "text-status-alert";
  return (
    <div className="glass-frost rounded-lg p-2">
      <div className="flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-wider text-ice/40">{label}</span>
        {icon && <span className={cn("opacity-70", color)}>{icon}</span>}
      </div>
      <div className="mt-0.5 flex items-baseline gap-0.5">
        <span className="font-mono text-sm font-bold text-white">{value}</span>
        {unit && <span className="text-[8px] text-ice/30">{unit}</span>}
      </div>
    </div>
  );
}
