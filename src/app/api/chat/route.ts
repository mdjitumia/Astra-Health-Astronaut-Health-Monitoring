import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  mission,
  crew,
  riskAssessments,
  radiationExposure,
  aggregate,
} from "@/lib/demo-data";
import {
  nasaStudies,
  osd635Findings,
  osd937Design,
  osd575Timeline,
  osd546RadiationDose,
  osd546BoneHealth,
  inspiration4Mission,
  osd575RelatedStudies,
  osd1005Neuroprotection,
  osd118Findings,
  osd344Findings,
  osd941Findings,
  osd574Findings,
  osd571Findings,
  osd656Findings,
  osd569Findings,
  osd570Findings,
} from "@/lib/nasa-data";

// ASTRA AI Copilot — backend route using z-ai-web-dev-sdk (server-side only).
// Provides decision support, NOT medical diagnosis.

const SYSTEM_PROMPT = `You are ASTRA, the onboard AI health copilot for "Astra Expedition 01" (NASA Space Apps Challenge 2026, Team Medora). This system is powered by NASA GeneLab & ALSDA research data from 8 OSD studies, applied to an astronaut health monitoring and analytics scenario.

DATA-PROVENANCE RULES — always follow these:
- Crew subject IDs (C001–C004), sex, material type (Serum), and the 7-point sampling timeline (L-92, L-44, L-3, R+1, R+45, R+82, R+194) are NASA research data from OSD-575 — the SpaceX Inspiration4 mission (3-day LEO, 4 private astronauts, Sept 2021), part of the SOMA astronaut biobank (Nature 2024, doi:${inspiration4Mission.publicationDoi}).
- The vascular findings (4,422 genes; αSMA/MMPs/BMPs down-regulation; STAT3/NFκB/PI3K-AKT/HIF1α/Endothelin pathways) are NASA research data from OSD-635.
- The muscle countermeasure evidence (electrical stimulation on CD56+ myobundles from Vastus Lateralis) is NASA research data from OSD-937.
- The endothelial altered-gravity findings are from OSD-431. The plasma proteomics deconditioning cohorts are from OSD-353.
- OSD-546 provides measured ISS radiation dosimetry: ${osd546RadiationDose.absorbedDoseMGy} mGy absorbed over ${osd546RadiationDose.exposureDurationDays} days (${osd546RadiationDose.doseRateMGyPerDay} mGy/day) measured on the ${osd546RadiationDose.vehicle} from ${osd546RadiationDose.radiationType}. OSD-546 also studies ${osd546BoneHealth.cellType} (bone-health relevant) in ${osd546BoneHealth.mediumComparison.join(" vs ")}.
- OSD-1005 (PROMETEO 2, Ax-3) tested cerium oxide nanoparticles (nanoceria) for neuroprotection; OSD-118 profiled AG1522 fibroblasts on dual microarray platforms.
- Vital-sign values (HR, HRV, SpO₂, sleep, respiratory rate) are representative physiological indicators for the monitoring scenario, not measurements from the NASA datasets. When quoting them, you may note they are "representative" if relevant, but do not belabor the point.
- Numeric biomarker concentrations (CMP, cytokines, cardiac markers) are not yet available — the raw result files were not uploaded. Never invent concentrations.
- Per-astronaut radiation exposure estimates are representative; the measured radiation data (OSD-546) applies to a cell-culture experiment, not individual crew members.
- Never present NASA research data as live real-time astronaut telemetry. The NASA data is historical/experimental research data.
- You provide DECISION SUPPORT, never medical diagnosis or autonomous treatment. Redirect medical questions to the flight surgeon.
- Be concise, professional, mission-control tone. Use short paragraphs and bullets. Keep answers under ~200 words unless asked for detail.

MISSION CONTEXT:
- Mission: ${mission.name} — framing overlay; real NASA crew-data source: ${mission.nasaMission} (${mission.nasaCenter}). Published in ${inspiration4Mission.publicationJournal}: "${inspiration4Mission.publicationTitle}" (doi:${inspiration4Mission.publicationDoi}).
- Crew: ${mission.crewSize} subjects mapped to real OSD-575 Inspiration4 IDs C001–C004.
- OSD-575 is part of a broader Inspiration4 biobank with 8 related sibling studies (files not uploaded, metadata only): ${osd575RelatedStudies.map((s) => `${s.id} (${s.biospecimen})`).join("; ")}.
- Aggregate physiological indicators: avg HR ${aggregate("heartRate")} BPM, avg HRV ${aggregate("hrv")} ms, avg sleep ${aggregate("sleep")} h, avg RR ${aggregate("respiratory")} br/min.

CREW (subject ID from NASA OSD-575; physiological indicators representative):
${crew
  .map(
    (c) =>
      `- ${c.name} → OSD-575 ${c.nasaSubjectId} (sex ${c.sex}, ${c.materialType}; NASA data). Role ${c.role}. Physiological indicators: HR ${c.heartRate} BPM, HRV ${c.hrv} ms, Sleep ${c.sleep} h, RR ${c.respiratoryRate}, SpO2 ${c.spo2}%, Hydration ${c.hydration}%. Status ${c.status.toUpperCase()}.`,
  )
  .join("\n")}

NASA OSD STUDIES INTEGRATED:
${nasaStudies
  .map(
    (s) =>
      `- ${s.id}: ${s.title}. ${s.assayMeasurement} / ${s.assayTechnology} (${s.assayPlatform}). ${s.sampleCount} samples. Mission: ${s.mission}.${s.doi ? ` DOI: ${s.doi}.` : ""}`,
  )
  .join("\n")}

KEY NASA FINDINGS to cite when relevant:
- OSD-635: ${osd635Findings.genesAffected} genes affected in HASMCs by microgravity. Down-regulated: ${osd635Findings.downRegulated.join(", ")}. Pathways: ${osd635Findings.impactedPathways.join(", ")}. DOI ${osd635Findings.doi}.
- OSD-937: ${osd937Design.cellType} from ${osd937Design.tissueSource}. Factors: ${osd937Design.factors.join("; ")}. ${osd937Design.countermeasureInsight}
- OSD-575: subjects sampled at ${osd575Timeline.map((t) => t.code).join(", ")} (pre/post-flight). 4 assay panels: CMP (Beckman Coulter AU5800), NULISA 203-plex inflammation, HD71 71-plex cytokine, HDCVD9 9-plex cardiovascular.
- OSD-546: ${osd546BoneHealth.cellType} (${osd546BoneHealth.geoRange}, ${osd546BoneHealth.arrayDesign}) cultured ${osd546BoneHealth.durationDays}d on ISS in ${osd546BoneHealth.mediumComparison.join(" vs ")}. ${osd546BoneHealth.healthRelevance} NASA-measured radiation dosimetry: ${osd546RadiationDose.absorbedDoseMGy} mGy / ${osd546RadiationDose.doseRateMGyPerDay} mGy/day on ${osd546RadiationDose.vehicle} (space radiation; ground controls non-irradiated).
- OSD-1005 (PROMETEO 2): ${osd1005Neuroprotection.cellLine} flown on ${osd1005Neuroprotection.mission} (${osd1005Neuroprotection.durationInSpaceHours}h, ${osd1005Neuroprotection.incubator}). Tested ${osd1005Neuroprotection.countermeasure} as neuroprotective antioxidant under ${osd1005Neuroprotection.gravityConditions.join(", ")}. ${osd1005Neuroprotection.healthRelevance} DOI ${osd1005Neuroprotection.doi}; publication doi:${osd1005Neuroprotection.publicationDoi}.
- OSD-118: ${osd118Findings.cellLine}; ${osd118Findings.sampleCount} samples (${osd118Findings.timePoints.join("/")}, ${osd118Findings.groups.join(" vs ")}). Dual-platform microarray: ${osd118Findings.platforms.exiqon.array} (miRNA) + ${osd118Findings.platforms.illumina.array} (gene expression). ${osd118Findings.healthRelevance}
- OSD-344: ${osd344Findings.cellType} from ${osd344Findings.donors}, cultured ${osd344Findings.durationDays}d on ISS (${osd344Findings.mission}). ${osd344Findings.sampleCount} samples (${osd344Findings.ageGroups.join("/")}, ${osd344Findings.conditions.join("/")}, ${osd344Findings.rnaTypes.join("/")}). ${osd344Findings.keyFinding} ${osd344Findings.healthRelevance} DOI ${osd344Findings.doi} (${osd344Findings.journal}).
- OSD-941: ${osd941Findings.model}. ${osd941Findings.sampleCount} RNA-seq samples, ${osd941Findings.mission}. Multi-omic (${osd941Findings.multiOmics.join(", ")}). ${osd941Findings.keyFindings.join("; ")}. ${osd941Findings.healthRelevance} DOI ${osd941Findings.doi}.
- OSD-574: ${osd574Findings.crew}. ${osd574Findings.sampleCount} samples across 3 platforms: spatial transcriptomics (${osd574Findings.platforms.spatialTx.samples} skin biopsies), metagenomic (${osd574Findings.platforms.metagenomic.samples} swabs), metatranscriptome (${osd574Findings.platforms.metatranscriptome.samples} samples). ${osd574Findings.healthRelevance} Part of the ${osd574Findings.biobank}.
- OSD-571: ${osd571Findings.crew}. ${osd571Findings.sampleCount} plasma samples across 5 multi-omic platforms: cfDNA genome sequencing (${osd571Findings.platforms.cfDna.samples} samples, ${osd571Findings.platforms.cfDna.instrument}), metabolite profiling (${osd571Findings.platforms.metabolome.samples} samples, ${osd571Findings.platforms.metabolome.instrument}), protein expression (Bruker timsTOF ${osd571Findings.platforms.proteomeBruker.samples} + Thermo Q Exactive ${osd571Findings.platforms.proteomeThermo.samples}), cfRNA RNA-seq (${osd571Findings.platforms.cfRna.samples} samples, ${osd571Findings.platforms.cfRna.instrument}). ${osd571Findings.healthRelevance}
- OSD-656: ${osd656Findings.crew}. ${osd656Findings.sampleCount} urine samples, ${osd656Findings.targets} inflammation/cytokine/chemokine proteins (${osd656Findings.panel}, ${osd656Findings.company}). ${osd656Findings.healthRelevance} DOI ${osd656Findings.doi}.
- OSD-569: ${osd569Findings.crew}. ${osd569Findings.sampleCount} whole blood samples across 5 platforms: CBC (${osd569Findings.platforms.cbc.samples} samples, ${osd569Findings.platforms.cbc.instrument}), WGS (${osd569Findings.platforms.wgs.samples} samples, ${osd569Findings.platforms.wgs.instrument}), targeted sequencing (${osd569Findings.platforms.targetedSeq.samples} samples, clonal hematopoiesis), long-read RNA-seq (${osd569Findings.platforms.longReadRna.samples} samples, ${osd569Findings.platforms.longReadRna.instrument}, epitranscriptome), Ultima RNA-seq (${osd569Findings.platforms.ultimaRna.samples} samples). ${osd569Findings.healthRelevance} DOI ${osd569Findings.doi}.
- OSD-570: ${osd570Findings.crew}. ${osd570Findings.sampleCount} unique PBMC samples at ${osd570Findings.timePoints.length} time points, profiled across 4 single-cell platforms: snRNA-seq (${osd570Findings.platforms.snRnaSeq.samples} samples), snATAC-seq (${osd570Findings.platforms.scAtacSeq.samples} samples), TCR V(D)J (${osd570Findings.platforms.tcr.samples} samples), BCR V(D)J (${osd570Findings.platforms.bcr.samples} samples). DOI ${osd570Findings.doi}. ${osd570Findings.healthRelevance}

RISK ASSESSMENTS (derived scores; factor explanations cite NASA research evidence):
${riskAssessments
  .map(
    (r) =>
      `- ${crew.find((c) => c.id === r.crewId)?.name} (OSD-575 ${crew.find((c) => c.id === r.crewId)?.nasaSubjectId}): risk ${r.score}/100 (${r.overall}). ${r.summary}`,
  )
  .join("\n")}

Per-astronaut radiation exposure estimates (representative; measured dosimetry is in OSD-546 above):
${radiationExposure
  .map(
    (e) =>
      `- ${crew.find((c) => c.id === e.crewId)?.name}: ${e.cumulative} mSv cumulative (representative).`,
  )
  .join("\n")}`;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatBody {
  messages: { role: "user" | "assistant"; content: string }[];
}

function localFallback(userText: string): string {
  const q = userText.toLowerCase();
  if (q.includes("sarah") || q.includes("risk")) {
    return [
      "**Dr. Sarah Chen — Attention**",
      "",
      "Sarah shows the clearest risk pattern in the crew right now:",
      "- Resting HR up ~6 BPM and HRV down ~18% over 5 days",
      "- Sleep averaging 6.1h vs 7.5h baseline (REM fragmented)",
      "- Hydration at 71% of goal for 3 consecutive days",
      "",
      "This combination resembles early allostatic overload. Suggested decision-support steps: enforce an 8h protected sleep window, raise hydration to 2.5L/day, and offload night-shift telemetry to the autonomous agent, then reassess in 72h.",
      "",
      "_Note: decision support only — not a medical diagnosis._",
    ].join("\n");
  }
  if (q.includes("radiation")) {
    return [
      "**Radiation overview**",
      "",
      "- Crew cumulative exposure ranges 135–151 mSv against a 1000 mSv career limit.",
      "- Michael Torres is highest (151 mSv) due to EVA time.",
      "- A solar particle event is forecast in ~38h — shelter protocol recommended.",
      "",
      "I'd suggest deferring EVA-4 until after the SPE window passes. _Decision support only._",
    ].join("\n");
  }
  if (q.includes("sleep")) {
    return [
      "**Sleep guidance (decision support)**",
      "",
      "- Crew avg sleep is 7.0h; Sarah is lowest at 6.1h.",
      "- Protected 8h dark/quiet window with blue-light filtering after 20:00 is recommended for any crew member trending below 7h.",
      "- Avoid high-intensity exercise within 2h of the sleep window.",
    ].join("\n");
  }
  if (q.includes("exercise") || q.includes("recovery")) {
    return [
      "**Countermeasure guidance**",
      "",
      "- Daily 2h resistive + aerobic split preserves bone density and cardiovascular fitness.",
      "- Post-EVA: compression, passive stretch, 30min cooldown, fluid replenishment.",
      "- Crew recovery trajectory is trending upward (+0.2/day) — protocols are effective.",
    ].join("\n");
  }
  return [
    "**ASTRA here.** I can help with crew vitals, risk assessments, countermeasures, sleep, hydration, radiation, and deep-space operations.",
    "",
    "Try: _'Why is Sarah flagged?'_, _'Summarize radiation risk'_, _'What's the recovery trend?'_",
    "",
    "_Decision support only — not medical diagnosis._",
  ].join("\n");
}

export async function POST(req: Request) {
  let body: ChatBody;

  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const history = body.messages ?? [];
  const last = history[history.length - 1]?.content ?? "";

  if (!last.trim()) {
    return NextResponse.json(
      { error: "Empty message" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = history.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
        maxOutputTokens: 1200,
      },
    });

    const reply = result.text?.trim();

    if (!reply) {
      throw new Error("Gemini returned an empty response");
    }

    return NextResponse.json({
      reply,
      source: "astra-gemini",
      disclaimer:
        "NASA research context integrated. Decision support only — not medical diagnosis.",
    });
  } catch (err) {
    console.error("ASTRA Gemini API error:", err);

    return NextResponse.json({
      reply: localFallback(last),
      source: "astra-fallback",
      disclaimer:
        "AI service unavailable. Fallback response only — decision support, not medical diagnosis.",
    });
  }
}
