"use client";

import { cn } from "@/lib/utils";
import type { Status } from "@/lib/demo-data";
import { statusLabel } from "@/lib/demo-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert, ShieldCheck, Activity, Satellite, CircleSlash } from "lucide-react";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Status pill
// ---------------------------------------------------------------------------
export function StatusPill({
  status,
  label,
  className,
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  const map = {
    good: { dot: "bg-status-good", text: "text-status-good", ring: "ring-status-good/20", bg: "bg-status-good/8" },
    warn: { dot: "bg-status-warn", text: "text-status-warn", ring: "ring-status-warn/20", bg: "bg-status-warn/8" },
    alert: { dot: "bg-status-alert", text: "text-status-alert", ring: "ring-status-alert/20", bg: "bg-status-alert/8" },
  }[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 backdrop-blur-sm",
        map.text,
        map.ring,
        map.bg,
        className,
      )}
    >
      <span className={cn("h-1 w-1 rounded-full", map.dot)} />
      {label ?? statusLabel(status)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Metric / Stat card
// ---------------------------------------------------------------------------
export function StatCard({
  label,
  value,
  unit,
  icon,
  delta,
  status = "good",
  hint,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  delta?: string;
  status?: Status;
  hint?: string;
}) {
  const accent =
    status === "good"
      ? "text-status-good"
      : status === "warn"
        ? "text-status-warn"
        : "text-status-alert";
  return (
    <Card className="relative overflow-hidden water-reflection transition-transform duration-300 hover:-translate-y-0.5">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/[0.06] blur-2xl" />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.1em] text-ice/50 font-medium">
            {label}
          </span>
          {icon && <span className={cn("opacity-90", accent)}>{icon}</span>}
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-bold tracking-tight text-white">
            {value}
          </span>
          {unit && <span className="text-[11px] text-ice/40">{unit}</span>}
        </div>
        <div className="mt-1 flex items-center gap-2">
          {delta && <span className={cn("text-[11px] font-medium", accent)}>{delta}</span>}
          {hint && <span className="text-[11px] text-ice/40">{hint}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Section header
// ---------------------------------------------------------------------------
export function SectionHeader({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl glass-bright text-cyan-glow">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-ice/50">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel wrapper (titled card)
// ---------------------------------------------------------------------------
export function Panel({
  title,
  description,
  right,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <Card className={cn("water-reflection", className)}>
      {(title || right) && (
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <div>
            {title && (
              <CardTitle className="text-sm font-semibold tracking-tight text-white">
                {title}
              </CardTitle>
            )}
            {description && (
              <CardDescription className="text-[11px] text-ice/40">{description}</CardDescription>
            )}
          </div>
          {right}
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", bodyClassName)}>{children}</CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Risk badge
// ---------------------------------------------------------------------------
export function RiskBadge({ score }: { score: number }) {
  const level: Status = score >= 60 ? "alert" : score >= 35 ? "warn" : "good";
  const icon =
    level === "alert" ? (
      <TriangleAlert className="h-3 w-3" />
    ) : level === "warn" ? (
      <Activity className="h-3 w-3" />
    ) : (
      <ShieldCheck className="h-3 w-3" />
    );
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 border-none",
        level === "alert"
          ? "bg-status-alert/15 text-status-alert"
          : level === "warn"
            ? "bg-status-warn/15 text-status-warn"
            : "bg-status-good/15 text-status-good",
      )}
    >
      {icon}
      {score}/100 · {statusLabel(level)}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Progress bar (simple)
// ---------------------------------------------------------------------------
export function Meter({
  value,
  status = "good",
  className,
}: {
  value: number;
  status?: Status;
  className?: string;
}) {
  const color =
    status === "good"
      ? "bg-status-good"
      : status === "warn"
        ? "bg-status-warn"
        : "bg-status-alert";
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data-source banner — presents NASA research data as the platform's primary
// data source, with a single concise provenance note (no repetitive warnings).
// ---------------------------------------------------------------------------
export function DemoBanner() {
  return (
    <div className="glass-frost water-reflection flex flex-col gap-2 rounded-xl px-3 py-2.5 text-[11px] sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2 text-cyan-glow">
        <Satellite className="h-3.5 w-3.5 shrink-0" />
        <strong className="font-semibold">Astronaut Health Analytics</strong>
      </div>
      <span className="text-ice/50">
        Powered by <strong className="text-cyan-glow">NASA GeneLab &amp; ALSDA research data</strong> —
        8 OSD studies integrated. Physiological indicators shown are representative; NASA research
        data is authoritative. Decision support only.
      </span>
    </div>
  );
}

// Provenance badge — small inline tag identifying the source of a data point
export function ProvenanceBadge({
  provenance,
  className,
}: {
  provenance: "nasa" | "simulated" | "unavailable";
  className?: string;
}) {
  const map = {
    nasa: {
      label: "NASA",
      cls: "border-cyan-400/30 bg-cyan-400/10 text-cyan-glow",
      icon: <Satellite className="h-2.5 w-2.5" />,
    },
    simulated: {
      label: "Ref",
      cls: "border-sky-400/20 bg-sky-400/8 text-ice/60",
      icon: <Activity className="h-2.5 w-2.5" />,
    },
    unavailable: {
      label: "N/A",
      cls: "border-white/[0.06] bg-white/[0.03] text-ice/30",
      icon: <CircleSlash className="h-2.5 w-2.5" />,
    },
  }[provenance];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[8px] font-semibold uppercase tracking-wide ring-1",
        map.cls,
        className,
      )}
    >
      {map.icon}
      {map.label}
    </span>
  );
}
