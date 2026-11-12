"use client";

import { useEffect, useState } from "react";
import {
  countermeasures,
  recoveryTrajectory,
  getCrew,
  type Countermeasure,
  type MetricPoint,
} from "@/lib/demo-data";
import {
  SectionHeader,
  Panel,
  StatusPill,
  Meter,
  StatCard,
} from "@/components/shared";
import { TrendArea, CategoryBars } from "@/components/charts";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dumbbell,
  Moon,
  Droplets,
  Salad,
  HeartPulse,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle2,
} from "lucide-react";

const TYPE_ICON = {
  exercise: Dumbbell,
  sleep: Moon,
  hydration: Droplets,
  nutrition: Salad,
  recovery: HeartPulse,
};

const TYPE_COLOR = {
  exercise: "cyan",
  sleep: "violet",
  hydration: "sky",
  nutrition: "emerald",
  recovery: "amber",
} as const;

export function CountermeasureModule() {
  const [filterCrewId, setFilterCrewId] = useState<string>("all");
  const [items, setItems] = useState<Countermeasure[]>(() => countermeasures);
  const [recovery, setRecovery] = useState<MetricPoint[]>(() => recoveryTrajectory);

  useEffect(() => {
    let alive = true;
    fetch("/api/countermeasures")
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (d.countermeasures) setItems(d.countermeasures);
        if (d.recoveryTrajectory) setRecovery(d.recoveryTrajectory);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const crewList = [
    { id: "all", name: "All Crew", role: "Aggregate", avatarColor: "#22d3ee", callsign: "ALL" },
    ...Array.from(new Set(items.map((i) => i.crewId))).map((id) => {
      const c = getCrew(id);
      return { id, name: c.name, role: c.role, avatarColor: c.avatarColor, callsign: c.callsign };
    }),
  ];

  const filtered = filterCrewId === "all"
    ? items
    : items.filter((i) => i.crewId === filterCrewId);

  const byType = (t: Countermeasure["type"]) => filtered.filter((i) => i.type === t);

  const avgProgress =
    items.length > 0
      ? Math.round(items.reduce((a, c) => a + c.progress, 0) / items.length)
      : 0;

  const completionData = crewList
    .filter((c) => c.id !== "all")
    .map((c) => {
      const crewItems = items.filter((i) => i.crewId === c.id);
      const avg =
        crewItems.length > 0
          ? Math.round(crewItems.reduce((a, ci) => a + ci.progress, 0) / crewItems.length)
          : 0;
      return {
        label: c.name.split(" ")[0],
        value: avg,
        status: (avg >= 85 ? "good" : avg >= 60 ? "warn" : "alert") as "good" | "warn" | "alert",
      };
    });

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Countermeasure & Recovery"
        subtitle="Exercise, sleep, hydration, nutrition, and recovery tracking"
        icon={<Dumbbell className="h-4 w-4" />}
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active Protocols" value={items.length} icon={<Activity className="h-4 w-4" />} status="good" hint="across crew" />
        <StatCard label="Avg Adherence" value={`${avgProgress}%`} icon={<CheckCircle2 className="h-4 w-4" />} status={avgProgress >= 85 ? "good" : "warn"} hint="7-day" />
        <StatCard label="Recovery Trend" value="+0.2/d" icon={<TrendingUp className="h-4 w-4" />} status="good" hint="improving" />
        <StatCard label="Pending Alerts" value={items.filter((i) => i.status !== "good").length} icon={<Clock className="h-4 w-4" />} status="warn" hint="needs attention" />
      </div>

      {/* Crew selector */}
      <div className="flex flex-wrap gap-2">
        {crewList.map((c) => {
          const active = (c.id === "all" && filterCrewId === "all") || c.id === filterCrewId;
          return (
            <button
              key={c.id}
              onClick={() => setFilterCrewId(c.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                active
                  ? "border-primary/50 bg-primary/10 text-primary glow-cyan"
                  : "border-border/50 bg-card/30 text-muted-foreground hover:text-foreground",
              )}
            >
              {c.id !== "all" && (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: c.avatarColor }}
                />
              )}
              {c.id === "all" ? "All Crew" : c.name.split(" ")[0]}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Recovery Trajectory" description="Crew aggregate recovery score" className="lg:col-span-2">
          <TrendArea data={recovery} color="amber" unit="" height={220} />
        </Panel>
        <Panel title="Adherence by Crew" description="Avg protocol completion %">
          <CategoryBars data={completionData} colorByValue height={220} />
        </Panel>
      </div>

      {/* Countermeasures by category tabs */}
      <Panel>
        <Tabs defaultValue="exercise" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card/40">
            <TabsTrigger value="exercise" className="text-xs gap-1.5">
              <Dumbbell className="h-3.5 w-3.5" /> Exercise
            </TabsTrigger>
            <TabsTrigger value="sleep" className="text-xs gap-1.5">
              <Moon className="h-3.5 w-3.5" /> Sleep
            </TabsTrigger>
            <TabsTrigger value="hydration" className="text-xs gap-1.5">
              <Droplets className="h-3.5 w-3.5" /> Hydration
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs gap-1.5">
              <Salad className="h-3.5 w-3.5" /> Nutrition
            </TabsTrigger>
            <TabsTrigger value="recovery" className="text-xs gap-1.5">
              <HeartPulse className="h-3.5 w-3.5" /> Recovery
            </TabsTrigger>
          </TabsList>

          {(["exercise", "sleep", "hydration", "nutrition", "recovery"] as const).map((t) => (
            <TabsContent key={t} value={t} className="mt-4">
              <div className="grid gap-3 md:grid-cols-2">
                {byType(t).length === 0 && (
                  <div className="col-span-full rounded-lg border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
                    No {t} protocols for this crew member.
                  </div>
                )}
                {byType(t).map((cm) => {
                  const c = getCrew(cm.crewId);
                  const Icon = TYPE_ICON[cm.type];
                  const color = TYPE_COLOR[cm.type];
                  return (
                    <div
                      key={cm.id}
                      className="rounded-lg border border-border/50 bg-card/30 p-4 transition-all hover:border-primary/30"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                            color === "cyan" && "bg-cyan-400/15 text-cyan-300",
                            color === "violet" && "bg-violet-400/15 text-violet-300",
                            color === "sky" && "bg-sky-400/15 text-sky-300",
                            color === "emerald" && "bg-emerald-400/15 text-emerald-300",
                            color === "amber" && "bg-amber-400/15 text-amber-300",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold leading-tight">
                              {cm.title}
                            </h4>
                            <StatusPill status={cm.status} />
                          </div>
                          <p className="mt-1 text-xs leading-snug text-muted-foreground">
                            {cm.description}
                          </p>
                          <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" /> {cm.schedule}
                          </div>
                          <div className="mt-2.5">
                            <div className="mb-1 flex items-center justify-between text-[11px]">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-mono font-medium text-foreground">
                                {cm.progress}%
                              </span>
                            </div>
                            <Meter value={cm.progress} status={cm.status} />
                          </div>
                          <div className="mt-2.5 flex items-center gap-2 border-t border-border/40 pt-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback
                                style={{ background: `${c.avatarColor}22`, color: c.avatarColor }}
                                className="text-[9px] font-mono"
                              >
                                {c.callsign.split("-")[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-[11px] text-muted-foreground">{c.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Panel>
    </div>
  );
}
