"use client";

import { useEffect, useState } from "react";
import {
  riskAssessments,
  crew,
  getCrew,
  type RiskAssessment,
} from "@/lib/demo-data";
import { osd635Findings, osd937Design, osd546RadiationDose, osd546BoneHealth, osd1005Neuroprotection, osd118Findings, osd344Findings, osd941Findings, osd574Findings, osd571Findings, osd656Findings, osd569Findings, osd570Findings } from "@/lib/nasa-data";
import { useApp } from "@/lib/store";
import {
  SectionHeader,
  Panel,
  RiskBadge,
  StatusPill,
  Meter,
  ProvenanceBadge,
} from "@/components/shared";
import { CategoryBars } from "@/components/charts";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Brain, ShieldCheck, TriangleAlert, Activity, Lightbulb, Dna, FlaskConical, Microscope, Bone, Radiation, Sparkles, Microchip, ChevronDown, Check, X, Stethoscope, HeartPulse, FlaskRound, Droplet, Droplets, TableCellsMerge } from "lucide-react";

export function RiskModule() {
  const { selectedCrewId, selectCrew, acknowledgedRecs, acknowledgeRec } = useApp();
  const [risks, setRisks] = useState<(RiskAssessment & { crew: ReturnType<typeof getCrew> })[]>(
    () => riskAssessments.map((r) => ({ ...r, crew: getCrew(r.crewId) })),
  );
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  // Track which crew the current dismiss/expand state belongs to; reset on change
  // using the "adjust state during render" pattern (avoids setState-in-effect).
  const [stateCrewId, setStateCrewId] = useState(selectedCrewId);
  if (selectedCrewId !== stateCrewId) {
    setStateCrewId(selectedCrewId);
    setDismissed(false);
    setExpanded(false);
  }

  useEffect(() => {
    let alive = true;
    fetch("/api/risks")
      .then((r) => r.json())
      .then((d) => alive && d.risks && setRisks(d.risks))
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const selected = risks.find((r) => r.crewId === selectedCrewId) ?? risks[0];

  const recId = selected ? `rec-${selected.crewId}` : "";
  const isAcknowledged = acknowledgedRecs.has(recId);

  // Risk distribution chart
  const distData = risks.map((r) => ({
    label: r.crew.name.split(" ")[0],
    value: r.score,
    status: (r.overall as "good" | "warn" | "alert"),
  }));

  return (
    <div className="space-y-5">
      <SectionHeader
        title="AI Risk Assessment"
        subtitle="Pattern-based risk identification grounded in NASA OSD research evidence"
        icon={<Brain className="h-4 w-4" />}
      />

      {/* NASA evidence base */}
      <Panel
        title="NASA Evidence Base for Risk Factors"
        description="Real scientific findings from uploaded GeneLab/ALSDA studies that ground the risk factors below"
        right={<ProvenanceBadge provenance="nasa" />}
      >
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Dna className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-635 · Vascular</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              Microgravity significantly alters <strong className="text-foreground">{osd635Findings.genesAffected.toLocaleString()} genes</strong> in
              human aortic smooth muscle cells. Down-regulated: {osd635Findings.downRegulated.join(", ")}.
              Impacted pathways: {osd635Findings.impactedPathways.join(", ")}.
            </p>
            <a href={`https://doi.org/${osd635Findings.doi}`} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-[10px] text-cyan-300 hover:underline">
              doi:{osd635Findings.doi}
            </a>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-937 · Muscle</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd937Design.cellType} from {osd937Design.tissueSource}. Factorial design:
              Spaceflight × Age × Electrical Stimulation × Time. {osd937Design.countermeasureInsight}
            </p>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Microscope className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-431 · Endothelial</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              HMEC-1 dermal microvascular endothelial cells show transcriptional response to
              altered gravity (1G Earth / 1G centrifugation / µG). Relevant to vascular
              endothelial dysfunction in astronauts.
            </p>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Bone className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-546 · Bone + Radiation</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd546BoneHealth.cellType} cultured {osd546BoneHealth.durationDays} days on ISS
              ({osd546BoneHealth.mediumComparison.join(" vs ")}). {osd546BoneHealth.healthRelevance}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5 rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
              <Radiation className="h-2.5 w-2.5" />
              NASA dosimetry: {osd546RadiationDose.absorbedDoseMGy} mGy / {osd546RadiationDose.doseRateMGyPerDay} mGy/day ({osd546RadiationDose.vehicle})
            </div>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-1005 · Neuroprotection</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd1005Neuroprotection.cellLine} flown on {osd1005Neuroprotection.mission} ({osd1005Neuroprotection.durationInSpaceHours}h).
              {osd1005Neuroprotection.healthRelevance}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5 rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
              <Sparkles className="h-2.5 w-2.5" />
              Countermeasure: {osd1005Neuroprotection.countermeasure}
            </div>
            <a href={`https://doi.org/${osd1005Neuroprotection.doi}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[10px] text-cyan-300 hover:underline">
              doi:{osd1005Neuroprotection.doi}
            </a>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Microchip className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-118 · Fibroblast + miRNA</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd118Findings.cellLine}; {osd118Findings.sampleCount} samples, {osd118Findings.timePoints.join("/")}, {osd118Findings.groups.join(" vs ")}. {osd118Findings.healthRelevance}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                {osd118Findings.platforms.exiqon.array}
              </span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                {osd118Findings.platforms.illumina.array}
              </span>
            </div>
          </div>
          {/* OSD-344 — Cardiac progenitor cells */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-344 · Cardiac Progenitor Cells</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd344Findings.cellType} from {osd344Findings.donors}, cultured {osd344Findings.durationDays}d on ISS ({osd344Findings.mission}). {osd344Findings.keyFinding} {osd344Findings.healthRelevance}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                {osd344Findings.platform}
              </span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                {osd344Findings.sampleCount} samples · {osd344Findings.rnaTypes.join(" + ")}
              </span>
            </div>
            <a href={`https://doi.org/${osd344Findings.doi}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[10px] text-cyan-300 hover:underline">
              doi:{osd344Findings.doi}
            </a>
          </div>
          {/* OSD-941 — Alzheimer's brain organoids */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-941 · Alzheimer's Brain Organoids</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd941Findings.model}. {osd941Findings.sampleCount} samples, {osd941Findings.mission}.
              {osd941Findings.keyFindings[1]} {osd941Findings.keyFindings[2]} {osd941Findings.healthRelevance}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                Multi-omic: {osd941Findings.multiOmics.join(" + ")}
              </span>
            </div>
            <a href={`https://doi.org/${osd941Findings.doi}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[10px] text-cyan-300 hover:underline">
              doi:{osd941Findings.doi}
            </a>
          </div>
          {/* OSD-574 — Skin biopsy + microbiome */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Microscope className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-574 · Skin Biopsy + Microbiome</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd574Findings.crew}. {osd574Findings.sampleCount} samples across 3 platforms (spatial transcriptomics, metagenomic, metatranscriptome). {osd574Findings.healthRelevance}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                {osd574Findings.platforms.spatialTx.samples} spatial tx
              </span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                {osd574Findings.platforms.metagenomic.samples} metagenomic
              </span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                {osd574Findings.platforms.metatranscriptome.samples} metatranscriptome
              </span>
            </div>
          </div>
          {/* OSD-571 — Plasma multi-omic */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <FlaskRound className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-571 · Plasma Multi-omic</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd571Findings.crew}. {osd571Findings.sampleCount} samples across 5 omic platforms (cfDNA, metabolome, proteome×2, cfRNA). {osd571Findings.healthRelevance}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd571Findings.platforms.cfDna.samples} cfDNA</span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd571Findings.platforms.metabolome.samples} metabolome</span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd571Findings.platforms.cfRna.samples} cfRNA</span>
            </div>
          </div>
          {/* OSD-656 — Urine inflammation */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-656 · Urine Inflammation</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd656Findings.crew}. {osd656Findings.sampleCount} urine samples, {osd656Findings.targets} inflammation targets ({osd656Findings.panel}). {osd656Findings.healthRelevance}
            </p>
            <a href={`https://doi.org/${osd656Findings.doi}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[10px] text-cyan-300 hover:underline">
              doi:{osd656Findings.doi}
            </a>
          </div>
          {/* OSD-569 — Whole blood CBC + multi-omic */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-569 · Whole Blood (CBC + Multi-omic)</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd569Findings.crew}. {osd569Findings.sampleCount} samples across 5 platforms (CBC, WGS, targeted-seq, long-read RNA-seq, Ultima RNA-seq). {osd569Findings.healthRelevance}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd569Findings.platforms.cbc.samples} CBC</span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd569Findings.platforms.wgs.samples} WGS</span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd569Findings.platforms.longReadRna.samples} long-read RNA</span>
            </div>
            <a href={`https://doi.org/${osd569Findings.doi}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[10px] text-cyan-300 hover:underline">
              doi:{osd569Findings.doi}
            </a>
          </div>
          {/* OSD-570 — PBMC single-cell multi-omic */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2">
              <TableCellsMerge className="h-4 w-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-300">OSD-570 · PBMC Single-cell Multi-omic</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              {osd570Findings.crew}. {osd570Findings.sampleCount} PBMC samples across 4 single-cell platforms (snRNA-seq, snATAC-seq, TCR, BCR). {osd570Findings.healthRelevance}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd570Findings.platforms.snRnaSeq.samples} snRNA-seq</span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd570Findings.platforms.scAtacSeq.samples} snATAC-seq</span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd570Findings.platforms.tcr.samples} TCR</span>
              <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">{osd570Findings.platforms.bcr.samples} BCR</span>
            </div>
            <a href={`https://doi.org/${osd570Findings.doi}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[10px] text-cyan-300 hover:underline">
              doi:{osd570Findings.doi}
            </a>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Composite risk scores are derived indicators; factor explanations cite the NASA
          research findings above. OSD-575 serum biomarker panels (CMP, inflammation 203-plex,
          cytokine 71-plex, cardiovascular 9-plex) would provide quantitative evidence once
          raw result files are available.
        </p>
      </Panel>

      <Panel
        title="Crew Risk Distribution"
        description="Composite risk score (0–100, higher = more risk)"
      >
        <CategoryBars data={distData} colorByValue height={170} />
      </Panel>

      {/* Crew risk cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {risks.map((r) => {
          const active = r.crewId === selected?.crewId;
          return (
            <button
              key={r.crewId}
              onClick={() => selectCrew(r.crewId)}
              className={cn(
                "rounded-lg border p-3 text-left transition-all",
                active
                  ? "border-primary/50 bg-primary/10 glow-cyan"
                  : "border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50",
              )}
            >
              <div className="flex items-center gap-2.5">
                <Avatar className="h-9 w-9 ring-1 ring-border">
                  <AvatarFallback
                    style={{ background: `${r.crew.avatarColor}22`, color: r.crew.avatarColor }}
                    className="font-mono text-[11px] font-semibold"
                  >
                    {r.crew.callsign.split("-")[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{r.crew.name}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{r.crew.role}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <RiskBadge score={r.score} />
                <StatusPill status={r.overall} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed breakdown for selected crew */}
      {selected && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel
            title="Risk Summary"
            description={`${selected.crew.name} · updated ${selected.updatedAt}`}
            className="lg:col-span-1"
          >
            <div className="flex flex-col items-center py-2">
              <div
                className={cn(
                  "relative flex h-28 w-28 items-center justify-center rounded-full",
                  selected.overall === "alert"
                    ? "bg-status-alert/10"
                    : selected.overall === "warn"
                      ? "bg-status-warn/10"
                      : "bg-status-good/10",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-3xl font-bold",
                    selected.overall === "alert"
                      ? "text-status-alert"
                      : selected.overall === "warn"
                        ? "text-status-warn"
                        : "text-status-good",
                  )}
                >
                  {selected.score}
                </span>
                <span className="absolute -bottom-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  / 100
                </span>
              </div>
              <StatusPill status={selected.overall} className="mt-4" />
              <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                {selected.summary}
              </p>
            </div>
          </Panel>

          <Panel
            title="Contributing Factors"
            description="Why this risk level was detected"
            className="lg:col-span-2"
          >
            <div className="space-y-3">
              {selected.factors.map((f, i) => (
                <div key={i} className="rounded-lg border border-border/40 bg-card/30 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {f.level === "alert" ? (
                        <TriangleAlert className="h-4 w-4 text-status-alert" />
                      ) : f.level === "warn" ? (
                        <Activity className="h-4 w-4 text-status-warn" />
                      ) : (
                        <ShieldCheck className="h-4 w-4 text-status-good" />
                      )}
                      <span className="text-sm font-medium">{f.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {f.weight}% weight
                      </span>
                      <StatusPill status={f.level} />
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{f.detail}</p>
                  <Meter value={f.weight} status={f.level} className="mt-2" />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {/* Recommendation — expandable, interactive */}
      {selected && !dismissed && (
        <Panel className={cn("border-primary/20 transition-opacity", isAcknowledged && "opacity-75")}>
          {/* Header row — clickable to expand */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-start gap-3 text-left"
          >
            <div className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 transition-colors",
              selected.overall === "alert" ? "bg-status-alert/15 text-status-alert ring-status-alert/30"
              : selected.overall === "warn" ? "bg-status-warn/15 text-status-warn ring-status-warn/30"
              : "bg-status-good/15 text-status-good ring-status-good/30",
            )}>
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold">AI Recommendation</h3>
                <StatusPill status={selected.overall} />
                {isAcknowledged && (
                  <span className="flex items-center gap-1 rounded-full bg-status-good/15 px-2 py-0.5 text-[10px] font-medium text-status-good">
                    <Check className="h-2.5 w-2.5" /> Reviewed
                  </span>
                )}
                <span className="ml-auto flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  {expanded ? "Hide details" : "View explanation"}
                  <ChevronDown className={cn("h-3 w-3 transition-transform", expanded && "rotate-180")} />
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {selected.recommendation}
              </p>
            </div>
          </button>

          {/* Expandable explanation */}
          {expanded && (
            <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4 animate-fade-in">
              {/* Why this was generated */}
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Brain className="h-3.5 w-3.5 text-teal-300" />
                  Why this recommendation was generated
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {selected.summary} The recommendation prioritizes the highest-weighted
                  contributing factors below and aligns with NASA research evidence
                  (OSD-635 vascular, OSD-937 muscle, OSD-546 bone/radiation, OSD-1005 neuroprotection).
                </p>
              </div>

              {/* Supporting factors visualization */}
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Activity className="h-3.5 w-3.5 text-teal-300" />
                  Supporting health indicators
                </div>
                <div className="space-y-2">
                  {selected.factors.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-32 shrink-0 truncate text-[10px] text-muted-foreground">{f.label}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            f.level === "good" ? "bg-status-good"
                            : f.level === "warn" ? "bg-status-warn"
                            : "bg-status-alert",
                          )}
                          style={{ width: `${f.weight}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right font-mono text-[10px] text-muted-foreground">{f.weight}%</span>
                      <StatusPill status={f.level} />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Factor weights show each indicator's contribution to the composite risk score.
                  Severity reflects the indicator's current status.
                </p>
              </div>

              {/* Purpose & disclaimer */}
              <div className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <Stethoscope className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-300" />
                <div>
                  <div className="text-xs font-semibold text-foreground">Purpose</div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                    This recommendation is <strong>decision support</strong> generated from
                    rule-based risk factors grounded in NASA research data. It is not a medical
                    diagnosis or autonomous treatment. Final authority rests with the flight surgeon.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {!isAcknowledged ? (
                  <Button
                    size="sm"
                    onClick={() => acknowledgeRec(recId)}
                    className="gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" /> Mark as reviewed
                  </Button>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-lg bg-status-good/10 px-3 py-1.5 text-xs font-medium text-status-good">
                    <Check className="h-3.5 w-3.5" /> Reviewed
                  </span>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDismissed(true)}
                  className="gap-1.5"
                >
                  <X className="h-3.5 w-3.5" /> Dismiss
                </Button>
              </div>
            </div>
          )}

          {/* Collapsed acknowledgement strip */}
          {!expanded && isAcknowledged && (
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-status-good">
              <Check className="h-3 w-3" /> Recommendation reviewed
            </div>
          )}
        </Panel>
      )}

      {/* Dismissed state */}
      {selected && dismissed && (
        <Panel className="border-white/[0.06] opacity-60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <X className="h-4 w-4" />
              Recommendation dismissed for {selected.crew.name}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setDismissed(false)}
              className="gap-1 text-xs"
            >
              Restore
            </Button>
          </div>
        </Panel>
      )}
    </div>
  );
}
