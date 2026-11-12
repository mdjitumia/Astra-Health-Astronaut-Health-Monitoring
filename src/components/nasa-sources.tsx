"use client";

import { nasaStudies, provenanceSummary, osd575Timeline, osd575RelatedStudies, inspiration4Mission } from "@/lib/nasa-data";
import { Panel, StatusPill, ProvenanceBadge } from "@/components/shared";
import { cn } from "@/lib/utils";
import {
  Satellite,
  FlaskConical,
  Dna,
  Microscope,
  Activity,
  Database,
  FileText,
  ExternalLink,
  Bone,
  Droplets,
  Users,
  Layers,
  BookOpen,
  Brain,
  Microchip,
  HeartPulse,
  Droplet,
  FlaskRound,
} from "lucide-react";

const STUDY_ICON: Record<string, typeof Satellite> = {
  "OSD-575": Activity,
  "OSD-635": Dna,
  "OSD-937": FlaskConical,
  "OSD-431": Microscope,
  "OSD-353": Database,
  "OSD-546": Bone,
  "OSD-1005": Brain,
  "OSD-118": Microchip,
  "OSD-344": HeartPulse,
  "OSD-941": Brain,
  "OSD-574": Microscope,
  "OSD-571": FlaskRound,
  "OSD-656": Droplet,
  "OSD-569": Droplets, // whole blood (CBC + multi-omic)
  "OSD-570": Microscope, // PBMC single-cell
};

export function NasaDataSourcesPanel({ compact = false }: { compact?: boolean }) {
  return (
    <Panel
      title="NASA GeneLab / ALSDA Data Sources"
      description="Real OSD study metadata integrated from uploaded ISA-Tab files"
      right={
        <span className="flex items-center gap-1.5 text-[11px] text-cyan-300">
          <Satellite className="h-3 w-3" />
          {nasaStudies.length} studies · {provenanceSummary.totalSamples} samples
        </span>
      }
    >
      <div className={cn("grid gap-2.5", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
        {nasaStudies.map((s) => {
          const Icon = STUDY_ICON[s.id] ?? FileText;
          return (
            <div
              key={s.id}
              className="group flex min-w-0 flex-col rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-sm transition-all duration-200 hover:border-teal-400/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-teal-300">
                  <Icon className="h-3.5 w-3.5" />
                  {s.id}
                </span>
                <StatusPill status="good" label="NASA Dataset" />
              </div>
              <h4 className="mt-1.5 text-xs font-semibold leading-snug text-foreground line-clamp-2">
                {s.title}
              </h4>
              <div className="mt-1.5 space-y-0.5 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground/60">Mission:</span>
                  <span className="truncate">{s.mission}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground/60">Assay:</span>
                  <span className="truncate">{s.assayTechnology}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground/60">Samples:</span>
                  <span className="font-mono">{s.sampleCount}</span>
                  {s.subjectCount > 0 && (
                    <span className="text-muted-foreground/60">· Subjects: {s.subjectCount}</span>
                  )}
                </div>
              </div>
              {s.doi && (
                <a
                  href={`https://doi.org/${s.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-cyan-300 hover:underline"
                >
                  <ExternalLink className="h-2.5 w-2.5" />
                  doi:{s.doi}
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Provenance summary */}
      <div className="mt-3 rounded-lg border border-border/40 bg-background/40 p-3">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
          <FileText className="h-3 w-3 text-cyan-300" />
          Data Provenance
        </div>
        <div className="grid gap-1 sm:grid-cols-2">
          {provenanceSummary.dataLayers.map((layer, i) => {
            const isNasa = layer.includes("NASA");
            const isRepresentative = layer.includes("representative");
            const isNa = layer.includes("not yet available");
            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-1.5 rounded px-1.5 py-1 text-[10px] leading-snug",
                  isNasa && "bg-status-good/5 text-foreground",
                  isRepresentative && "bg-sky-400/5 text-foreground",
                  isNa && "bg-muted/10 text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    isNasa && "bg-status-good",
                    isRepresentative && "bg-sky-400",
                    isNa && "bg-muted-foreground",
                  )}
                />
                <span>{layer}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

// OSD-575 timeline visualiser — shows the real sampling schedule
export function Osd575TimelinePanel() {
  return (
    <Panel
      title="OSD-575 Sampling Timeline"
      description="Real NASA ALSDA (LSDS-8) astronaut blood-sampling schedule — 7 time points per subject"
      right={<StatusPill status="good" label="NASA Research Data" />}
    >
      <div className="relative max-w-full overflow-x-auto overflow-y-hidden pb-2">
        <div className="flex min-w-[440px] items-center justify-between sm:min-w-0">
          {osd575Timeline.map((tp, i) => {
            const isPre = tp.phase === "Pre-flight";
            return (
              <div key={tp.code} className="flex flex-1 flex-col items-center">
                <div className="relative flex w-full items-center justify-center">
                  {/* connector line */}
                  {i > 0 && (
                    <div
                      className={cn(
                        "absolute left-0 right-1/2 top-1/2 h-0.5 -translate-y-1/2",
                        osd575Timeline[i - 1].phase !== tp.phase
                          ? "bg-gradient-to-r from-amber-400/40 to-cyan-400/40"
                          : isPre
                            ? "bg-amber-400/30"
                            : "bg-cyan-400/30",
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-mono font-bold ring-2",
                      isPre
                        ? "bg-amber-400/20 text-amber-300 ring-amber-400/40"
                        : "bg-cyan-400/20 text-cyan-300 ring-cyan-400/40",
                    )}
                  >
                    {i + 1}
                  </div>
                  {i < osd575Timeline.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-1/2 right-0 top-1/2 h-0.5 -translate-y-1/2",
                        tp.phase !== osd575Timeline[i + 1].phase
                          ? "bg-gradient-to-r from-cyan-400/40 to-amber-400/40"
                          : isPre
                            ? "bg-amber-400/30"
                            : "bg-cyan-400/30",
                      )}
                    />
                  )}
                </div>
                <div className="mt-1.5 text-center">
                  <div
                    className={cn(
                      "font-mono text-[11px] font-bold",
                      isPre ? "text-amber-300" : "text-cyan-300",
                    )}
                  >
                    {tp.code}
                  </div>
                  <div className="text-[9px] text-muted-foreground">{tp.label}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-muted-foreground">Pre-flight (baseline)</span>
          </span>
          <span className="text-muted-foreground/40">→ launch / return →</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-muted-foreground">Post-flight (recovery)</span>
          </span>
        </div>
      </div>
    </Panel>
  );
}

// SpaceX Inspiration4 mission + SOMA biobank panel with related sibling studies
export function Inspiration4BiobankPanel() {
  return (
    <Panel
      title="SpaceX Inspiration4 Mission & SOMA Biobank"
      description="OSD-575 crew data is from the Inspiration4 mission — part of the Space Omics and Medical Atlas"
      right={
        <div className="flex items-center gap-1.5">
          <ProvenanceBadge provenance="nasa" />
          <a
            href={`https://doi.org/${inspiration4Mission.studyDoi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-cyan-300 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            doi:{inspiration4Mission.studyDoi}
          </a>
        </div>
      }
    >
      {/* Mission summary */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-cyan-300">
            <Satellite className="h-3 w-3" /> Mission
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">{inspiration4Mission.name}</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">
            {inspiration4Mission.duration} · {inspiration4Mission.orbit}
          </div>
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-cyan-300">
            <Users className="h-3 w-3" /> Crew
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">{inspiration4Mission.crewSize} private astronauts</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">
            {inspiration4Mission.missionStart} → {inspiration4Mission.missionEnd}
          </div>
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-cyan-300">
            <BookOpen className="h-3 w-3" /> Publication
          </div>
          <div className="mt-1 text-[11px] font-semibold leading-snug text-foreground line-clamp-2">
            {inspiration4Mission.publicationTitle}
          </div>
          <a
            href={`https://doi.org/${inspiration4Mission.publicationDoi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 inline-block text-[10px] text-cyan-300 hover:underline"
          >
            {inspiration4Mission.publicationJournal}
          </a>
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-cyan-300">
            <Layers className="h-3 w-3" /> Biobank
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">SOMA</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">
            {osd575RelatedStudies.length + 1} studies (OSD-575 + {osd575RelatedStudies.length} siblings)
          </div>
        </div>
      </div>

      {/* Integrated sibling studies — only studies with verified uploaded files are shown */}
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Droplets className="h-3.5 w-3.5 text-cyan-300" />
          Integrated Inspiration4 Biobank Studies
          <span className="font-normal text-muted-foreground">({osd575RelatedStudies.filter(s => s.filesUploaded).length + 1} of 9 studies)</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {/* OSD-575 (uploaded) */}
          <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-300">OSD-575</span>
              <ProvenanceBadge provenance="nasa" />
            </div>
            <div className="mt-1 text-[11px] text-foreground">Serum</div>
            <div className="text-[10px] text-status-good">✓ Files integrated</div>
          </div>
          {osd575RelatedStudies.filter(s => s.filesUploaded).map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-300">{s.id}</span>
                <ProvenanceBadge provenance="nasa" />
              </div>
              <div className="mt-1 text-[11px] text-foreground">{s.biospecimen}</div>
              <div className="text-[10px] text-status-good">✓ Files integrated</div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
