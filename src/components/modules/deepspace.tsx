"use client";

import { useState } from "react";
import { deepSpaceState, mission } from "@/lib/demo-data";
import { useApp } from "@/lib/store";
import {
  SectionHeader,
  Panel,
  StatCard,
  StatusPill,
  Meter,
} from "@/components/shared";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Radio,
  Wifi,
  WifiOff,
  Satellite,
  Database,
  RefreshCw,
  Clock,
  CloudOff,
  CloudUpload,
  Cpu,
  Send,
  CheckCircle2,
  Activity,
} from "lucide-react";

export function DeepSpaceModule() {
  const { deepSpace, toggleDeepSpace } = useApp();
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [queued, setQueued] = useState(deepSpaceState.queuedMessages);
  const [comms, setComms] = useState<"live" | "delayed" | "blackout">(
    deepSpace ? "delayed" : "live",
  );
  // Adjust comms when the global deep-space toggle changes (React "adjust state
  // during render" pattern — avoids a cascading setState-in-effect).
  const [prevDeep, setPrevDeep] = useState(deepSpace);
  if (deepSpace !== prevDeep) {
    setPrevDeep(deepSpace);
    setComms(deepSpace ? "delayed" : "live");
  }

  const runSync = () => {
    if (syncing) return;
    setSyncing(true);
    setSyncProgress(0);
    const iv = setInterval(() => {
      setSyncProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setSyncing(false);
          setQueued(0);
          return 100;
        }
        return p + 10;
      });
    }, 180);
  };

  const commsModeMeta = {
    live: {
      label: "Live Telemetry",
      status: "good" as const,
      latency: "~0.4s",
      detail: "Direct link to ground control via TDRS relay.",
      icon: Wifi,
    },
    delayed: {
      label: "Delayed Comms",
      status: "warn" as const,
      latency: `${mission.latencyMin} one-way`,
      detail: "Mars-distance light-time delay. Autonomy Level 3 active.",
      icon: Clock,
    },
    blackout: {
      label: "Signal Blackout",
      status: "alert" as const,
      latency: "No signal",
      detail: "Solar conjunction. On-device systems operating independently.",
      icon: CloudOff,
    },
  }[comms];

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Deep Space Mode"
        subtitle="Offline access, delayed communication, local monitoring, and data synchronization"
        icon={<Radio className="h-4 w-4" />}
      />

      {/* Mode control */}
      <Panel className="overflow-hidden border-primary/20">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg ring-1",
                  deepSpace
                    ? "bg-amber-400/15 text-amber-300 ring-amber-400/30"
                    : "bg-status-good/15 text-status-good ring-status-good/30",
                )}
              >
                {deepSpace ? <WifiOff className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-mono text-lg font-bold">
                    {deepSpace ? "Deep Space Mode — Active" : "Near-Earth Mode"}
                  </h2>
                  <StatusPill status={deepSpace ? "warn" : "good"} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {deepSpace
                    ? "On-device fallback active. Local cache serving crew health data."
                    : "Live telemetry link to ground control operational."}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Switch checked={deepSpace} onCheckedChange={toggleDeepSpace} id="ds" />
              <label htmlFor="ds" className="text-sm font-medium">
                Toggle Deep Space Mode
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:flex-col lg:items-stretch">
            {(["live", "delayed", "blackout"] as const).map((m) => (
              <Button
                key={m}
                size="sm"
                variant={comms === m ? "default" : "outline"}
                onClick={() => setComms(m)}
                className="justify-start gap-1.5 text-xs"
              >
                {m === "live" && <Wifi className="h-3.5 w-3.5" />}
                {m === "delayed" && <Clock className="h-3.5 w-3.5" />}
                {m === "blackout" && <CloudOff className="h-3.5 w-3.5" />}
                <span className="capitalize">{m}</span>
              </Button>
            ))}
          </div>
        </div>
      </Panel>

      {/* Comms status */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Communication Status" className="lg:col-span-2">
          <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/30 p-4">
            <commsModeMeta.icon
              className={cn(
                "h-10 w-10",
                commsModeMeta.status === "good"
                  ? "text-status-good"
                  : commsModeMeta.status === "warn"
                    ? "text-status-warn"
                    : "text-status-alert",
              )}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{commsModeMeta.label}</span>
                <StatusPill status={commsModeMeta.status} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{commsModeMeta.detail}</p>
              <div className="mt-2 font-mono text-xs text-cyan-300">
                Latency: {commsModeMeta.latency}
              </div>
            </div>
          </div>

          {/* Latency visualization */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Signal Strength</span>
              <span className="font-mono">{deepSpace ? "64%" : "98%"}</span>
            </div>
            <Meter value={deepSpace ? 64 : 98} status={deepSpace ? "warn" : "good"} />
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Satellite className="h-3 w-3" />
              Last contact {deepSpaceState.lastSync} · Next window {deepSpaceState.nextSync}
            </div>
          </div>
        </Panel>

        <Panel title="Autonomy" description="Onboard systems">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/30 p-3">
              <Cpu className="h-5 w-5 text-cyan-300" />
              <div>
                <div className="text-sm font-medium">{deepSpaceState.autonomyLevel}</div>
                <div className="text-[11px] text-muted-foreground">{deepSpaceState.onboardAI}</div>
              </div>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/30 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Local AI inference</span>
                <StatusPill status="good" />
              </div>
              <div className="mt-1.5 text-[11px] text-muted-foreground">
                Risk scoring, countermeasure scheduling, and triage running on-device.
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Queued Messages" value={queued} icon={<Send className="h-4 w-4" />} status={queued > 0 ? "warn" : "good"} hint="awaiting sync" />
        <StatCard label="Cached Profiles" value={deepSpaceState.cachedProfiles} icon={<Database className="h-4 w-4" />} status="good" hint="local copies" />
        <StatCard label="Cached Protocols" value={deepSpaceState.cachedProtocols} icon={<Activity className="h-4 w-4" />} status="good" hint="offline-ready" />
        <StatCard label="Cache Health" value={`${deepSpaceState.localCacheHealth}%`} icon={<CheckCircle2 className="h-4 w-4" />} status="good" hint="integrity ok" />
      </div>

      {/* Sync panel */}
      <Panel
        title="Data Synchronization"
        description="Replay queued telemetry to ground control when link returns"
        right={
          <Button
            size="sm"
            onClick={runSync}
            disabled={syncing || queued === 0}
            className="gap-1.5"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", syncing && "animate-spin")} />
            {syncing ? "Syncing…" : "Sync Now"}
          </Button>
        }
      >
        {syncing ? (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Transmitting queued packets…</span>
              <span className="font-mono text-cyan-300">{syncProgress}%</span>
            </div>
            <Meter value={syncProgress} status="good" />
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <CloudUpload className="h-3 w-3" /> {Math.ceil((queued * (100 - syncProgress)) / 100)} of {queued} packets remaining
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/30 p-3">
            {queued === 0 ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-status-good" />
                <span className="text-sm text-muted-foreground">
                  All queued telemetry synced. Local and ground databases are consistent.
                </span>
              </>
            ) : (
              <>
                <Clock className="h-5 w-5 text-status-warn" />
                <span className="text-sm text-muted-foreground">
                  {queued} messages queued since {deepSpaceState.lastSync}. Press{" "}
                  <strong className="text-foreground">Sync Now</strong> when the link is
                  available.
                </span>
              </>
            )}
          </div>
        )}
      </Panel>

      {/* Offline capability map */}
      <Panel title="Offline Capability Matrix" description="What works without ground link">
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Vitals monitoring", on: true },
            { name: "AI risk scoring", on: true },
            { name: "Countermeasure scheduling", on: true },
            { name: "Radiation dosimetry", on: true },
            { name: "Crew health profiles", on: true },
            { name: "Emergency protocols", on: true },
            { name: "Ground telemetry upload", on: !deepSpace },
            { name: "Remote surgeon consult", on: !deepSpace },
            { name: "Software updates", on: !deepSpace },
          ].map((cap) => (
            <div
              key={cap.name}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border p-2.5",
                cap.on ? "border-status-good/30 bg-status-good/5" : "border-border/40 bg-card/20 opacity-60",
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-md",
                  cap.on ? "bg-status-good/15 text-status-good" : "bg-muted/40 text-muted-foreground",
                )}
              >
                {cap.on ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CloudOff className="h-3.5 w-3.5" />}
              </div>
              <span className="text-xs font-medium">{cap.name}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
