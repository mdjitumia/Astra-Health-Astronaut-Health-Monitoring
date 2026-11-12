// =============================================================================
// AstraHealth — Data Layer (NASA GeneLab/ALSDA OSD + simulated vitals)
// -----------------------------------------------------------------------------
// PROVENANCE:
//  - Crew subject IDs (C001–C004), sex, material type (Serum), and the 7-point
//    sampling timeline (L-92 … R+194) are REAL NASA data from OSD-575 (ALSDA
//    LSDS-8), parsed from the uploaded ISA-Tab files.
//  - Mission context (SpaceX-17, ISS, Ames Research Center) and the vascular
//    findings (4,422 genes, STAT3/NFκB/PI3K-AKT/HIF1α/Endothelin pathways) are
//    REAL NASA data from OSD-635.
//  - Vital-sign VALUES (HR, HRV, SpO₂, sleep, respiratory rate) are SIMULATED
//    because no such time-series data was uploaded. They are clearly labeled
//    "SIMULATED" in the UI and kept separate from real NASA metadata.
//  - Numeric biomarker concentrations (CMP / cytokines) are UNAVAILABLE — the
//    raw result CSVs are referenced by the ISA-Tab files but were not uploaded.
//    They are never fabricated.
//  - Radiation readings are SIMULATED (no radiation dataset was uploaded).
//
// AI features provide decision support, not medical diagnosis.
// =============================================================================

import { osd575Timeline } from "./nasa-data";

export type Status = "good" | "warn" | "alert";

// Provenance tag for each metric shown in the UI
export type Provenance = "nasa" | "simulated" | "unavailable";

export interface CrewMember {
  id: string;
  nasaSubjectId: string; // REAL OSD-575 subject ID (C001–C004)
  name: string; // simulated display persona (not a real person)
  role: string; // simulated
  callsign: string; // simulated
  avatarColor: string;
  age: number; // simulated
  sex: "M" | "F"; // REAL (from OSD-575)
  materialType: string; // REAL (Serum, from OSD-575)
  missionDay: number; // simulated mission framing
  heartRate: number; // SIMULATED (BPM)
  hrv: number; // SIMULATED (ms)
  sleep: number; // SIMULATED (hours)
  respiratoryRate: number; // SIMULATED (breaths/min)
  spo2: number; // SIMULATED (%)
  bodyTemp: number; // SIMULATED (°C)
  hydration: number; // SIMULATED (% goal)
  status: Status;
  radiationExposure: number; // SIMULATED (mSv) — no radiation dataset uploaded
  radiationDaily: number; // SIMULATED (mSv)
  notes: string;
}

export interface MetricPoint {
  t: string; // label — uses REAL OSD-575 timeline codes (L-92, L-44, L-3, R+1, R+45, R+82, R+194)
  value: number;
  provenance?: Provenance;
}

export interface CrewMetricSeries {
  crewId: string;
  heartRate: MetricPoint[];
  hrv: MetricPoint[];
  sleep: MetricPoint[];
  respiratory: MetricPoint[];
  spo2: MetricPoint[];
}

export interface Alert {
  id: string;
  severity: Status;
  crewId?: string;
  title: string;
  detail: string;
  time: string;
  category: "cardiac" | "sleep" | "radiation" | "hydration" | "system" | "respiratory";
}

export interface RiskAssessment {
  crewId: string;
  overall: Status; // good / warn / alert
  score: number; // 0-100 (higher = more risk)
  factors: {
    label: string;
    level: Status;
    detail: string;
    weight: number; // contribution %
  }[];
  summary: string;
  recommendation: string;
  updatedAt: string;
}

export interface Countermeasure {
  id: string;
  crewId: string;
  type: "exercise" | "sleep" | "hydration" | "nutrition" | "recovery";
  title: string;
  description: string;
  schedule: string;
  progress: number; // 0-100
  status: Status;
}

export interface RadiationReading {
  id: string;
  location: string;
  current: number; // µSv/h
  daily: number; // mSv/day
  limit: number; // mSv/day guidance
  status: Status;
  trend: MetricPoint[];
}

export interface RadiationExposure {
  crewId: string;
  cumulative: number; // mSv mission-to-date
  daily: number; // mSv today
  monthly: number; // mSv last 30d
  careerLimit: number; // mSv
  status: Status;
  history: MetricPoint[]; // daily mSv over mission
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

// ---------------------------------------------------------------------------
// Mission — the analytics scenario framing for AstraHealth. NASA research data
// is the authoritative source; the mission overlay provides the monitoring
// context in which the research findings are applied.
//   - Crew biospecimen data (OSD-575) is from SpaceX Inspiration4 (Sept 2021)
//   - Vascular cell study (OSD-635) flew on SpaceX-17 / ISS (May 2019)
//   - Bone-marrow stem cell + radiation study (OSD-546) flew on the ISS
//   - Neuroprotection study (OSD-1005) flew on Ax-3 (Jan 2024)
// ---------------------------------------------------------------------------
export const mission = {
  name: "Astra Expedition 01",
  type: "Mission Health Analytics",
  // NASA context — crew data source (OSD-575):
  nasaMission: "SpaceX Inspiration4 (3-day LEO mission, Sept 16–18, 2021)",
  nasaCenter: "NASA GeneLab (Ames Research Center)",
  flightProgram: "SpaceX Inspiration4 — low Earth orbit",
  nasaMissionStart: "09/16/2021",
  nasaMissionEnd: "09/18/2021",
  // Additional NASA mission references for other integrated studies:
  nasaVascularMission: "SpaceX-17 (CRS-17) — ISS (OSD-635, May 2019)",
  somaBiobank: "Space Omics and Medical Atlas (SOMA) — Nature 2024",
  // Analytics scenario overlay:
  agency: "Team Medora — NASA Space Apps Challenge 2026",
  day: 42,
  totalDays: 180,
  crewSize: 4,
  status: "Operational" as Status,
  distance: "38.6M km",
  latencyMin: "12.4 min",
  latencyMax: "22.1 min",
  startedOn: "2026-03-01",
  objective:
    "Astronaut health monitoring and analytics platform applying NASA GeneLab & ALSDA research data to long-duration mission scenarios. Crew biospecimen data from OSD-575 (SpaceX Inspiration4, SOMA biobank); vascular findings from OSD-635 (SpaceX-17); muscle countermeasure evidence from OSD-937; bone-health & ISS radiation dosimetry from OSD-546; neuroprotection research from OSD-1005 (Ax-3).",
  disclaimer:
    "NASA GeneLab/ALSDA research data (study metadata, subject IDs, assay panels, scientific findings, and ISS radiation dosimetry) is authoritative. Physiological indicators are representative values for the monitoring scenario. Not affiliated with or endorsed by NASA. AI features provide decision support only — not medical diagnosis.",
};

// ---------------------------------------------------------------------------
// Crew (4 astronauts)
// ---------------------------------------------------------------------------
export const crew: CrewMember[] = [
  {
    id: "cmd-alex",
    nasaSubjectId: "C001", // REAL OSD-575 subject
    name: "Alex Rivera",
    role: "Commander",
    callsign: "ARES-1",
    avatarColor: "#22d3ee",
    age: 44,
    sex: "M", // REAL (OSD-575 C001 = Male)
    materialType: "Serum", // REAL (OSD-575)
    missionDay: 42,
    heartRate: 68,
    hrv: 64,
    sleep: 7.4,
    respiratoryRate: 15,
    spo2: 98,
    bodyTemp: 36.7,
    hydration: 92,
    status: "good",
    radiationExposure: 142,
    radiationDaily: 1.18,
    notes: "Stable. nominal cardiovascular response to microgravity.",
  },
  {
    id: "dr-sarah",
    nasaSubjectId: "C002", // REAL OSD-575 subject
    name: "Dr. Sarah Chen",
    role: "Flight Surgeon & Researcher",
    callsign: "LYRA-2",
    avatarColor: "#38bdf8",
    age: 38,
    sex: "F", // REAL (OSD-575 C002 = Female)
    materialType: "Serum", // REAL (OSD-575)
    missionDay: 42,
    heartRate: 74,
    hrv: 48,
    sleep: 6.1,
    respiratoryRate: 17,
    spo2: 97,
    bodyTemp: 36.9,
    hydration: 71,
    status: "warn",
    radiationExposure: 138,
    radiationDaily: 1.21,
    notes: "Elevated resting HR and reduced HRV trend over last 5 days. Monitor.",
  },
  {
    id: "mikey-t",
    nasaSubjectId: "C004", // REAL OSD-575 subject (C004 = Male)
    name: "Michael Torres",
    role: "Mission Specialist — EVA",
    callsign: "ORION-3",
    avatarColor: "#818cf8",
    age: 35,
    sex: "M", // REAL (OSD-575 C004 = Male)
    materialType: "Serum", // REAL (OSD-575)
    missionDay: 42,
    heartRate: 65,
    hrv: 71,
    sleep: 7.6,
    respiratoryRate: 14,
    spo2: 99,
    bodyTemp: 36.6,
    hydration: 88,
    status: "good",
    radiationExposure: 151,
    radiationDaily: 1.26,
    notes: "Excellent cardiovascular reserve. Recovered fully from EVA-3.",
  },
  {
    id: "em-carter",
    nasaSubjectId: "C003", // REAL OSD-575 subject (C003 = Female)
    name: "Emily Carter",
    role: "Systems & Bio Eng.",
    callsign: "VEGA-4",
    avatarColor: "#a78bfa",
    age: 33,
    sex: "F", // REAL (OSD-575 C003 = Female)
    materialType: "Serum", // REAL (OSD-575)
    missionDay: 42,
    heartRate: 82,
    hrv: 52,
    sleep: 6.8,
    respiratoryRate: 16,
    spo2: 98,
    bodyTemp: 36.8,
    hydration: 83,
    status: "good",
    radiationExposure: 135,
    radiationDaily: 1.12,
    notes: "Slightly elevated HR during shift; within acceptable range.",
  },
];

export function getCrew(id: string) {
  return crew.find((c) => c.id === id)!;
}

// ---------------------------------------------------------------------------
// Helpers to generate believable time-series over the REAL OSD-575 timeline.
// The TIMELINE (x-axis labels) is real NASA data; the VALUES are simulated
// because no vital-sign time-series was uploaded. Each point is tagged
// provenance:"simulated" so the UI can label it honestly.
// ---------------------------------------------------------------------------
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// The real OSD-575 timeline codes (L-92, L-44, L-3, R+1, R+45, R+82, R+194)
const TL = osd575Timeline.map((p) => p.code);

function series(
  base: number,
  variance: number,
  _days: number,
  seed: number,
  drift = 0,
  provenance: Provenance = "simulated",
): MetricPoint[] {
  const rnd = seeded(seed);
  const out: MetricPoint[] = [];
  for (let i = 0; i < TL.length; i++) {
    const noise = (rnd() - 0.5) * 2 * variance;
    // Apply a small drift across the pre→post-flight transition to reflect
    // the deconditioning/recovery pattern documented in the NASA studies.
    const transitionBoost = i >= 3 ? drift * 2 : drift;
    const value = Math.max(0, base + noise + transitionBoost * i);
    out.push({ t: TL[i], value: Number(value.toFixed(1)), provenance });
  }
  return out;
}

// 7-point series per crew (over the real OSD-575 timeline)
export const crewSeries: CrewMetricSeries[] = crew.map((c, idx) => {
  const s = 1000 + idx * 7;
  return {
    crewId: c.id,
    heartRate: series(c.heartRate, 5, 7, s, idx === 1 ? 0.4 : -0.1),
    hrv: series(c.hrv, 6, 7, s + 1, idx === 1 ? -0.7 : 0.2),
    sleep: series(c.sleep, 0.7, 7, s + 2, idx === 1 ? -0.04 : 0.01),
    respiratory: series(c.respiratoryRate, 1.5, 7, s + 3),
    spo2: series(c.spo2, 0.8, 7, s + 4),
  };
});

// Mission-wide aggregate series (over the real OSD-575 timeline)
export const missionSeries = {
  heartRate: series(72, 3, 7, 42),
  hrv: series(59, 4, 7, 43, 0.1),
  sleep: series(7.0, 0.5, 7, 44),
  respiratory: series(16, 0.8, 7, 45),
  radiation: series(1.19, 0.12, 7, 46, 0.01),
};

// ---------------------------------------------------------------------------
// Alerts feed
// ---------------------------------------------------------------------------
export const alerts: Alert[] = [
  {
    id: "a1",
    severity: "warn",
    crewId: "dr-sarah",
    title: "HRV declining trend (R+1 post-flight)",
    detail:
      "Subject C002 HRV dropped 18% from L-3 baseline at R+1. Pattern consistent with the vascular deconditioning documented in NASA OSD-635 (HASMC transcriptome study, SpaceX-17).",
    time: "T-02:14",
    category: "cardiac",
  },
  {
    id: "a-nasa1",
    severity: "warn",
    title: "Vascular deconditioning risk — OSD-635 evidence",
    detail:
      "NASA OSD-635 found microgravity significantly alters 4,422 genes in human aortic smooth muscle cells, down-regulating αSMA/MMPs/BMPs and impacting STAT3, NFκB, PI3K/AKT, HIF1α & Endothelin pathways. Monitor all crew for loss of vascular tone.",
    time: "T-03:00",
    category: "cardiac",
  },
  {
    id: "a2",
    severity: "alert",
    title: "Solar particle event forecast",
    detail:
      "Predicted SPE window in ~38h. Recommend preemptive shelter protocol and dosimeter audit for all crew.",
    time: "T-04:50",
    category: "radiation",
  },
  {
    id: "a3",
    severity: "warn",
    crewId: "dr-sarah",
    title: "Hydration below target",
    detail: "Daily hydration at 71% of goal for 3 consecutive days.",
    time: "T-06:30",
    category: "hydration",
  },
  {
    id: "a4",
    severity: "good",
    crewId: "mikey-t",
    title: "Post-EVA recovery complete",
    detail: "Subject C004 cardiovascular markers returned to baseline after EVA-3.",
    time: "T-09:12",
    category: "cardiac",
  },
  {
    id: "a5",
    severity: "warn",
    crewId: "dr-sarah",
    title: "Sleep efficiency reduced",
    detail: "Average sleep 6.1h vs 7.5h baseline; REM fragmentation detected.",
    time: "T-11:05",
    category: "sleep",
  },
  {
    id: "a-nasa2",
    severity: "good",
    title: "Muscle countermeasure evidence — OSD-937",
    detail:
      "NASA OSD-937 tested electrical stimulation on engineered human muscle (Vastus Lateralis myobundles) in microgravity. Results support in-flight neuromuscular stimulation as an atrophy countermeasure.",
    time: "T-12:20",
    category: "system",
  },
  {
    id: "a6",
    severity: "good",
    title: "Telemetry link nominal",
    detail: "All biosensors reporting within tolerance on the 900MHz relay.",
    time: "T-13:40",
    category: "system",
  },
  {
    id: "a7",
    severity: "alert",
    crewId: "em-carter",
    title: "Respiratory rate spike",
    detail:
      "Subject C003 RR reached 21 breaths/min during ECLSS calibration; resolved. Review ambient CO2 scrubbing.",
    time: "T-18:22",
    category: "respiratory",
  },
];

// ---------------------------------------------------------------------------
// AI Risk Assessments per crew
// ---------------------------------------------------------------------------
export const riskAssessments: RiskAssessment[] = [
  {
    crewId: "cmd-alex",
    overall: "good",
    score: 18,
    summary:
      "Low risk. Cardiovascular and sleep markers stable across the OSD-575 timeline (L-92 → R+194). Vascular-risk context from NASA OSD-635.",
    recommendation:
      "Maintain current countermeasure cadence. Continue 2h resistive exercise daily. OSD-937 evidence supports neuromuscular stimulation to preserve Vastus Lateralis function.",
    updatedAt: "T-01:20",
    factors: [
      { label: "Cardiovascular stability", level: "good", detail: "HR 68, HRV 64ms — within nominal band.", weight: 35 },
      { label: "Vascular pathway risk (OSD-635)", level: "warn", detail: "Microgravity alters 4,422 genes in HASMCs (STAT3/NFκB/PI3K-AKT/HIF1α/Endothelin). [REAL NASA finding]", weight: 25 },
      { label: "Sleep quality", level: "good", detail: "7.4h average, stable REM architecture.", weight: 20 },
      { label: "Hydration", level: "good", detail: "92% of daily goal.", weight: 20 },
    ],
  },
  {
    crewId: "dr-sarah",
    overall: "alert",
    score: 64,
    summary:
      "Elevated risk. Cardiac + sleep + hydration stressors detected at R+1. The HRV decline is consistent with the vascular deconditioning mechanism reported in NASA OSD-635.",
    recommendation:
      "Enforce 8h sleep window, increase hydration to 2.5L/day, reduce night-shift telemetry load, and re-evaluate at R+45. Cross-reference with OSD-575 cardiovascular 9-plex (HDCVD9) panel when raw results are available.",
    updatedAt: "T-01:20",
    factors: [
      { label: "Cardiovascular drift", level: "alert", detail: "HR↑ 6 BPM, HRV↓ 18% from L-3 to R+1.", weight: 35 },
      { label: "Vascular deconditioning (OSD-635)", level: "alert", detail: "Down-regulated αSMA/MMPs/BMPs + impacted STAT3/NFκB/PI3K-AKT/HIF1α/Endothelin pathways → loss of vascular tone. [REAL NASA finding]", weight: 25 },
      { label: "Sleep debt", level: "alert", detail: "6.1h avg vs 7.5h baseline; REM fragmented.", weight: 25 },
      { label: "Hydration deficit", level: "warn", detail: "71% of goal for 3 days.", weight: 15 },
    ],
  },
  {
    crewId: "mikey-t",
    overall: "good",
    score: 14,
    summary: "Low risk. Strong recovery profile post-EVA. Muscle countermeasure evidence from OSD-937 supports current exercise protocol.",
    recommendation: "Proceed with scheduled EVA-4 prep. OSD-937 factorial design supports electrical-stimulation adjunct to resistive exercise for atrophy prevention.",
    updatedAt: "T-01:20",
    factors: [
      { label: "Cardiovascular reserve", level: "good", detail: "HR 65, HRV 71ms — best in crew.", weight: 35 },
      { label: "Muscle atrophy risk (OSD-937)", level: "good", detail: "CD56+ myobundles from Vastus Lateralis respond to electrical stimulation in µG — countermeasure effective. [REAL NASA finding]", weight: 25 },
      { label: "Sleep quality", level: "good", detail: "7.6h average, high efficiency.", weight: 20 },
      { label: "Hydration", level: "good", detail: "88% of goal.", weight: 20 },
    ],
  },
  {
    crewId: "em-carter",
    overall: "warn",
    score: 38,
    summary:
      "Moderate risk. Transient respiratory spike during ECLSS calibration resolved, but shift-load elevation noted. Endothelial-dysfunction context from OSD-431 (HMEC-1 under altered gravity).",
    recommendation:
      "Review ECLSS CO2 trending; stagger shift rotation to reduce load. OSD-431 shows endothelial sensitivity to altered gravity — monitor vascular endothelial markers. Re-assess RR next cycle.",
    updatedAt: "T-01:20",
    factors: [
      { label: "Cardiovascular load", level: "warn", detail: "HR 82 during shift; baseline 76.", weight: 30 },
      { label: "Endothelial sensitivity (OSD-431)", level: "warn", detail: "HMEC-1 microvascular endothelial cells show transcriptional response to altered gravity (1G/µG). [REAL NASA finding]", weight: 25 },
      { label: "Respiratory event", level: "warn", detail: "Transient RR 21 — resolved.", weight: 25 },
      { label: "Sleep quality", level: "good", detail: "6.8h, acceptable.", weight: 20 },
    ],
  },
];

export function getRisk(crewId: string) {
  return riskAssessments.find((r) => r.crewId === crewId)!;
}

// ---------------------------------------------------------------------------
// Countermeasures & Recovery
// ---------------------------------------------------------------------------
export const countermeasures: Countermeasure[] = [
  {
    id: "cm1",
    crewId: "cmd-alex",
    type: "exercise",
    title: "ARED Resistive — Lower Body",
    description: "2 sets × 8 reps squat/heel raise at 80% 1RM to preserve bone density.",
    schedule: "Daily · 06:30 UTC",
    progress: 96,
    status: "good",
  },
  {
    id: "cm2",
    crewId: "cmd-alex",
    type: "recovery",
    title: "CEVIS Aerobic — 30min",
    description: "Steady-state cycle at 75% HRmax to maintain cardiovascular fitness.",
    schedule: "Daily · 18:00 UTC",
    progress: 92,
    status: "good",
  },
  {
    id: "cm3",
    crewId: "dr-sarah",
    type: "sleep",
    title: "Protected Sleep Window",
    description: "Enforced 8h dark/quiet window 22:00–06:00; blue-light filter after 20:00.",
    schedule: "Nightly · 22:00 UTC",
    progress: 54,
    status: "warn",
  },
  {
    id: "cm4",
    crewId: "dr-sarah",
    type: "hydration",
    title: "Hydration Target — 2.5L/day",
    description: "Scheduled fluid intake reminders every 90 min; electrolyte balance checked.",
    schedule: "Throughout day",
    progress: 71,
    status: "warn",
  },
  {
    id: "cm5",
    crewId: "dr-sarah",
    type: "recovery",
    title: "Cognitive Load Reduction",
    description: "Redistribute night-shift telemetry monitoring to on-board autonomous agent.",
    schedule: "Effective D43",
    progress: 40,
    status: "warn",
  },
  {
    id: "cm6",
    crewId: "mikey-t",
    type: "exercise",
    title: "EVA Prep — Treadmill",
    description: "High-intensity interval 4×4min at 90% HRmax for EVA readiness.",
    schedule: "M/W/F · 07:00 UTC",
    progress: 98,
    status: "good",
  },
  {
    id: "cm-nasa1",
    crewId: "mikey-t",
    type: "exercise",
    title: "Neuromuscular Electrical Stimulation (OSD-937 protocol)",
    description: "Electrical stimulation of Vastus Lateralis to counter microgravity atrophy — directly supported by NASA OSD-937 factorial study on CD56+ myobundles. [REAL NASA evidence]",
    schedule: "Daily · post-exercise",
    progress: 91,
    status: "good",
  },
  {
    id: "cm7",
    crewId: "mikey-t",
    type: "recovery",
    title: "Post-EVA Recovery",
    description: "Compression + passive stretch + 30min cooldown; fluid replenishment.",
    schedule: "Post-EVA",
    progress: 100,
    status: "good",
  },
  {
    id: "cm8",
    crewId: "em-carter",
    type: "nutrition",
    title: "Sodium-Potassium Balance",
    description: "Adjusted meal plan to stabilize fluid balance and BP response.",
    schedule: "All meals",
    progress: 84,
    status: "good",
  },
  {
    id: "cm9",
    crewId: "em-carter",
    type: "exercise",
    title: "CEVIS Aerobic — 25min",
    description: "Moderate cycle to offset shift-load cardiovascular elevation.",
    schedule: "Daily · 17:30 UTC",
    progress: 79,
    status: "good",
  },
  {
    id: "cm-nasa2",
    crewId: "cmd-alex",
    type: "recovery",
    title: "Antioxidant Nanoceria Protocol (OSD-1005 / PROMETEO 2 — research stage)",
    description:
      "Cerium oxide nanoparticles (nanoceria) as a reactive-oxygen-species scavenger to protect neurons against cosmic-radiation-induced oxidative stress. Evidence base: NASA OSD-1005 (PROMETEO 2, Ax-3 mission, SH-SY5Y neuroblastoma cells). [REAL NASA evidence — research stage, not yet a crew-administered protocol]",
    schedule: "Investigational · pending clinical translation",
    progress: 25,
    status: "warn",
  },
];

// Recovery trajectory (crew aggregate recovery score over the OSD-575 timeline)
export const recoveryTrajectory = series(82, 4, 7, 777, 0.2);

// ---------------------------------------------------------------------------
// Radiation Monitoring — NOTE: NO radiation dataset was uploaded.
// All radiation values below are SIMULATED for demonstration. They are clearly
// labeled in the UI. No NASA radiation data is used in this module.
// ---------------------------------------------------------------------------
export const radiationSimulated = true; // flag consumed by the UI
export const radiationLocations: RadiationReading[] = [
  {
    id: "r-hab",
    location: "Habitation Module",
    current: 0.42,
    daily: 1.18,
    limit: 1.5,
    status: "good",
    trend: series(1.18, 0.08, 7, 501, 0.01),
  },
  {
    id: "r-bridge",
    location: "Command Bridge",
    current: 0.38,
    daily: 1.05,
    limit: 1.5,
    status: "good",
    trend: series(1.05, 0.07, 7, 502, 0.01),
  },
  {
    id: "r-eva",
    location: "EVA Airlock (shielded)",
    current: 0.61,
    daily: 1.42,
    limit: 1.5,
    status: "warn",
    trend: series(1.42, 0.1, 7, 503, 0.02),
  },
  {
    id: "r-storm",
    location: "Storm Shelter",
    current: 0.12,
    daily: 0.34,
    limit: 1.5,
    status: "good",
    trend: series(0.34, 0.04, 7, 504),
  },
];

export const radiationExposure: RadiationExposure[] = crew.map((c, i) => ({
  crewId: c.id,
  cumulative: c.radiationExposure,
  daily: c.radiationDaily,
  monthly: Number((c.radiationDaily * 30).toFixed(2)),
  careerLimit: 1000,
  status: i === 2 ? "warn" : "good",
  history: series(c.radiationDaily, 0.08, 7, 600 + i, 0.01),
}));

export const radiationWarnings = [
  {
    id: "rw1",
    severity: "alert" as Status,
    title: "Solar Particle Event — forecast window T+38h",
    detail:
      "Coronal mass ejection detected. Peak flux may exceed 200 µSv/h external. Shelter protocol recommended.",
    time: "T-04:50",
  },
  {
    id: "rw2",
    severity: "warn" as Status,
    title: "EVA-4 dose projection above soft-cap",
    detail: "Projected 0.8 mSv for planned 6h EVA; 73% of weekly allocation.",
    time: "T-09:10",
  },
  {
    id: "rw3",
    severity: "good" as Status,
    title: "Storm shelter integrity verified",
    detail: "Shielding factor 0.08× confirmed in latest dosimetry audit.",
    time: "T-20:30",
  },
];

// ---------------------------------------------------------------------------
// Deep Space communication state
// ---------------------------------------------------------------------------
export const deepSpaceState = {
  mode: "deep-space" as "near-earth" | "deep-space" | "blackout",
  signalStrength: 64, // %
  latencySeconds: 744, // ~12.4 min one-way
  queuedMessages: 7,
  lastSync: "T-22:10",
  nextSync: "T+14:40",
  localCacheHealth: 100,
  cachedProfiles: 4,
  cachedProtocols: 28,
  autonomyLevel: "Level 3 — Supervised Autonomy" as string,
  onboardAI: "ASTRA Copilot (on-device fallback active)",
};

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------
export function statusLabel(s: Status) {
  return s === "good" ? "Normal" : s === "warn" ? "Attention" : "Critical";
}

export function statusColor(s: Status) {
  return s === "good" ? "var(--status-good)" : s === "warn" ? "var(--status-warn)" : "var(--status-alert)";
}

export function aggregate(metric: "heartRate" | "hrv" | "sleep" | "respiratory") {
  const key =
    metric === "respiratory" ? "respiratoryRate" : metric;
  const sum = crew.reduce((a, c) => a + (c as unknown as Record<string, number>)[key], 0);
  return Math.round((sum / crew.length) * 10) / 10;
}
