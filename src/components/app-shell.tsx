"use client";

import { useApp, MODULES, type ModuleId } from "@/lib/store";
import { mission, alerts, getCrew } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  HeartPulse,
  BrainCircuit,
  Dumbbell,
  Radio,
  Bot,
  Radiation,
  Rocket,
  Satellite,
  Wifi,
  WifiOff,
  Menu,
  X,
  Bell,
  CheckCheck,
  TriangleAlert,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const ICONS: Record<ModuleId, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  personal: HeartPulse,
  risk: BrainCircuit,
  countermeasure: Dumbbell,
  deepspace: Radio,
  copilot: Bot,
  radiation: Radiation,
};

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const { active, set, deepSpace, toggleDeepSpace } = useApp();
  return (
    <div className="flex h-full flex-col">
      <nav className="flex-1 space-y-1 px-2.5 py-3">
        {MODULES.map((m, i) => {
          const Icon = ICONS[m.id];
          const isActive = active === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                set(m.id);
                onNavigate?.();
              }}
              className={cn(
                "group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] transition-all duration-200",
                isActive
                  ? "glass-bright text-cyan-glow font-medium"
                  : "text-ice/70 hover:bg-white/[0.04] hover:text-ice",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-cyan-400/15 text-cyan-glow"
                    : "bg-white/[0.03] text-ice/50 group-hover:text-ice group-hover:bg-white/[0.06]",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 truncate">{m.label}</span>
              <span className="font-mono text-[9px] text-ice/30">{i < 9 ? `0${i + 1}` : i + 1}</span>
            </button>
          );
        })}
      </nav>

      {/* Deep space toggle */}
      <div className="mx-2.5 mb-2.5 glass-frost rounded-xl p-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {deepSpace ? (
              <WifiOff className="h-3.5 w-3.5 text-amber-300" />
            ) : (
              <Wifi className="h-3.5 w-3.5 text-status-good" />
            )}
            <span className="text-[11px] font-medium text-ice">Deep Space Mode</span>
          </div>
          <Switch checked={deepSpace} onCheckedChange={toggleDeepSpace} />
        </div>
        <p className="mt-1 text-[9px] leading-snug text-ice/40">
          {deepSpace ? "On-device fallback. Sync queued." : "Live link to ground control."}
        </p>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-4">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl glass-bright">
        <Satellite className="h-4.5 w-4.5 text-cyan-glow" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px] shadow-cyan-400/60" />
      </div>
      <div className="leading-tight">
        <div className="font-mono text-sm font-bold tracking-tight text-white">
          ASTRA<span className="text-cyan-glow">HEALTH</span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.15em] text-ice/40">Mission Control</div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col glass-frost border-r border-white/[0.06] lg:flex">
      <Brand />
      <div className="px-3 pb-2.5">
        <div className="glass-frost rounded-lg px-2.5 py-1.5">
          <div className="flex items-center gap-1.5 text-[10px] text-ice/50">
            <Rocket className="h-2.5 w-2.5 text-cyan-glow" />
            <span className="font-mono truncate">{mission.name}</span>
          </div>
          <div className="mt-0.5 flex items-center justify-between text-[9px]">
            <span className="text-ice/40 font-mono">D{mission.day}/{mission.totalDays}</span>
            <Badge
              variant="outline"
              className="border-status-good/30 bg-status-good/10 px-1 py-0 text-[9px] text-status-good"
            >
              {mission.status}
            </Badge>
          </div>
        </div>
      </div>
      <NavList />
    </aside>
  );
}

export function MobileNav() {
  const { sidebarOpen, setSidebar } = useApp();
  if (!sidebarOpen) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setSidebar(false)}
      />
      <div className="absolute left-0 top-0 h-full w-[260px] glass-liquid border-r border-white/[0.08] shadow-2xl">
        <div className="flex items-center justify-between pr-3">
          <Brand />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebar(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <NavList onNavigate={() => setSidebar(false)} />
      </div>
    </div>
  );
}

function NotificationBell() {
  const { acknowledgedAlerts, acknowledgeAlert, acknowledgeAllAlerts, notifOpen, setNotifOpen, set: setModule } = useApp();

  const unread = alerts.filter((a) => !acknowledgedAlerts.has(a.id));
  const unreadCount = unread.length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 rounded-lg glass-frost hover:bg-white/[0.06]"
        onClick={() => setNotifOpen(!notifOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-3.5 w-3.5 text-ice/80" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-status-alert px-1 text-[8px] font-bold text-white shadow-[0_0_8px_-1px_rgba(255,92,122,0.6)]">
            {unreadCount}
          </span>
        )}
      </Button>

      {notifOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-[320px] max-w-[calc(100vw-2rem)] glass-liquid rounded-2xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)] animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 text-cyan-glow" />
                <span className="text-sm font-semibold text-white">Health Alerts</span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-status-alert/15 px-1.5 py-0.5 text-[9px] font-medium text-status-alert">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={acknowledgeAllAlerts}
                  className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-cyan-glow transition-colors hover:bg-cyan-400/10"
                >
                  <CheckCheck className="h-3 w-3" /> Mark all
                </button>
              )}
            </div>
            <div className="max-h-[340px] overflow-y-auto scrollbar-thin p-1.5">
              {alerts.map((a) => {
                const isRead = acknowledgedAlerts.has(a.id);
                const c = a.crewId ? getCrew(a.crewId) : null;
                const sevIcon =
                  a.severity === "alert" ? <TriangleAlert className="h-3.5 w-3.5 text-status-alert" />
                  : a.severity === "warn" ? <Activity className="h-3.5 w-3.5 text-status-warn" />
                  : <ShieldCheck className="h-3.5 w-3.5 text-status-good" />;
                return (
                  <div
                    key={a.id}
                    className={cn(
                      "group rounded-lg p-2 transition-colors",
                      isRead ? "opacity-50" : "bg-white/[0.02] hover:bg-white/[0.04]",
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                        a.severity === "alert" ? "bg-status-alert/15"
                        : a.severity === "warn" ? "bg-status-warn/15"
                        : "bg-status-good/15",
                      )}>
                        {sevIcon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className={cn("text-[11px] font-medium leading-snug", !isRead && "text-white")}>
                            {a.title}
                          </span>
                          <span className="shrink-0 font-mono text-[8px] text-ice/40">{a.time}</span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-ice/50">{a.detail}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className={cn(
                              "rounded px-1 py-0.5 text-[8px] uppercase tracking-wide",
                              a.severity === "alert" ? "bg-status-alert/15 text-status-alert"
                              : a.severity === "warn" ? "bg-status-warn/15 text-status-warn"
                              : "bg-status-good/15 text-status-good",
                            )}>
                              {a.severity === "alert" ? "Critical" : a.severity === "warn" ? "Warning" : "Info"}
                            </span>
                            {c && <span className="text-[8px] text-ice/40">{c.name}</span>}
                          </div>
                          {!isRead ? (
                            <button
                              onClick={() => acknowledgeAlert(a.id)}
                              className="flex items-center gap-0.5 rounded px-1 py-0.5 text-[8px] text-cyan-glow opacity-0 transition-opacity hover:bg-cyan-400/10 group-hover:opacity-100"
                            >
                              <CheckCheck className="h-2.5 w-2.5" /> OK
                            </button>
                          ) : (
                            <span className="flex items-center gap-0.5 text-[8px] text-ice/30">
                              <CheckCheck className="h-2.5 w-2.5" /> Read
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/[0.06] px-3 py-2">
              <button
                onClick={() => { setModule("dashboard"); setNotifOpen(false); }}
                className="w-full rounded-lg bg-white/[0.03] py-1.5 text-center text-[10px] font-medium text-cyan-glow transition-colors hover:bg-white/[0.06]"
              >
                View all in Dashboard
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function TopBar() {
  const { setSidebar, deepSpace } = useApp();
  return (
    <header className="sticky top-0 z-40 glass-frost border-b border-white/[0.06]">
      <div className="flex items-center gap-3 px-4 py-2 lg:px-5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 lg:hidden"
          onClick={() => setSidebar(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Single mission label — no duplication with dashboard command bar */}
        <div className="hidden items-center gap-2 md:flex shrink-0">
          <span className="font-mono text-[11px] text-ice/50">Mission Control</span>
        </div>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <div className="hidden items-center gap-1.5 glass-frost rounded-lg px-2 py-1 sm:flex">
            {deepSpace ? (
              <WifiOff className="h-3 w-3 text-amber-300" />
            ) : (
              <Wifi className="h-3 w-3 text-status-good" />
            )}
            <span className="text-[10px] text-ice/50">
              {deepSpace ? "Offline" : "Live"}
            </span>
          </div>
          <NotificationBell />
          <Badge
            variant="outline"
            className="border-status-good/30 bg-status-good/10 px-1.5 py-0.5 text-[10px] text-status-good shrink-0"
          >
            <span className="mr-1 h-1 w-1 animate-pulse rounded-full bg-status-good" />
            {mission.status}
          </Badge>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto glass-frost border-t border-white/[0.06] px-4 py-2.5 lg:px-5">
      <div className="flex flex-col items-center justify-between gap-1.5 text-[10px] text-ice/40 sm:flex-row">
        <div className="flex items-center gap-2">
          <Satellite className="h-3 w-3 text-cyan-glow" />
          <span>
            <span className="font-mono font-semibold text-ice/70">AstraHealth</span>
            {" "}— Team Medora · NASA Space Apps 2026
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-glow/70">NASA GeneLab & ALSDA</span>
          <span className="hidden text-ice/20 sm:inline">·</span>
          <span className="hidden sm:inline">Decision support only</span>
        </div>
      </div>
    </footer>
  );
}
