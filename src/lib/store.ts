"use client";

import { create } from "zustand";
import { alerts, type ChatMessage } from "./demo-data";

export type ModuleId =
  | "dashboard"
  | "personal"
  | "risk"
  | "countermeasure"
  | "deepspace"
  | "copilot"
  | "radiation";

export const MODULES: { id: ModuleId; label: string; short: string }[] = [
  { id: "dashboard", label: "Mission Dashboard", short: "Dashboard" },
  { id: "personal", label: "Personal Health", short: "Personal" },
  { id: "risk", label: "AI Risk Assessment", short: "Risk" },
  { id: "countermeasure", label: "Countermeasure & Recovery", short: "Recovery" },
  { id: "deepspace", label: "Deep Space Mode", short: "Deep Space" },
  { id: "copilot", label: "ASTRA AI Copilot", short: "Copilot" },
  { id: "radiation", label: "Radiation Monitoring", short: "Radiation" },
];

interface AppState {
  active: ModuleId;
  selectedCrewId: string;
  deepSpace: boolean; // toggled offline mode in UI
  chat: ChatMessage[];
  sidebarOpen: boolean;
  // Notification system — tracks which alert IDs have been acknowledged
  acknowledgedAlerts: Set<string>;
  notifOpen: boolean;
  // Recommendation acknowledgement (Explainable AI)
  acknowledgedRecs: Set<string>;
  set: (m: ModuleId) => void;
  selectCrew: (id: string) => void;
  toggleDeepSpace: () => void;
  pushChat: (m: ChatMessage) => void;
  clearChat: () => void;
  setSidebar: (open: boolean) => void;
  acknowledgeAlert: (id: string) => void;
  acknowledgeAllAlerts: () => void;
  setNotifOpen: (open: boolean) => void;
  acknowledgeRec: (id: string) => void;
}

export const useApp = create<AppState>((set) => ({
  active: "dashboard",
  selectedCrewId: "dr-sarah",
  deepSpace: false,
  chat: [],
  sidebarOpen: false,
  acknowledgedAlerts: new Set<string>(),
  notifOpen: false,
  acknowledgedRecs: new Set<string>(),
  set: (m) => set({ active: m, sidebarOpen: false }),
  selectCrew: (id) => set({ selectedCrewId: id }),
  toggleDeepSpace: () => set((s) => ({ deepSpace: !s.deepSpace })),
  pushChat: (m) => set((s) => ({ chat: [...s.chat, m] })),
  clearChat: () => set({ chat: [] }),
  setSidebar: (open) => set({ sidebarOpen: open }),
  acknowledgeAlert: (id) =>
    set((s) => {
      const next = new Set(s.acknowledgedAlerts);
      next.add(id);
      return { acknowledgedAlerts: next };
    }),
  acknowledgeAllAlerts: () =>
    set((s) => ({
      acknowledgedAlerts: new Set(alerts.map((a) => a.id)),
    })),
  setNotifOpen: (open) => set({ notifOpen: open }),
  acknowledgeRec: (id) =>
    set((s) => {
      const next = new Set(s.acknowledgedRecs);
      next.add(id);
      return { acknowledgedRecs: next };
    }),
}));
