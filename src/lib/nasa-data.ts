// =============================================================================
// AstraHealth — NASA GeneLab / ALSDA Open Science Data (OSD) Integration Layer
// -----------------------------------------------------------------------------
// All metadata below is parsed from the REAL ISA-Tab files uploaded by the user:
//   /home/z/my-project/upload/i_Investigation.txt
//   /home/z/my-project/upload/s_OSD-*.txt  (study / sample metadata)
//   /home/z/my-project/upload/a_OSD-*.txt  (assay metadata)
//
// These files are the official NASA GeneLab / ALSDA ISA-Tab metadata exports.
// They contain study design, sample annotations, assay descriptors, and the
// scientific findings reported in each study's description — but they do NOT
// contain the raw numeric measurement values (those live in separately
// referenced result CSV/XLSX files that were not part of the upload).
//
// Therefore:
//  - Study metadata, subject IDs, sex, sampling timelines, assay platforms,
//    kit names, target counts, missions, DOIs, and reported scientific findings
//    below are REAL NASA data.
//  - Specific numeric biomarker concentrations / gene-expression counts are
//    NOT available and are never fabricated here. Where a value is needed for
//    a visualization but the raw result file is absent, it is clearly labeled
//    "SIMULATED" in the UI and kept separate from the real metadata.
// =============================================================================

export type DataProvenance = "nasa" | "simulated" | "unavailable";

export interface NasaStudy {
  id: string; // e.g. "OSD-575"
  title: string;
  description: string;
  mission: string;
  flightProgram: string;
  managingCenter: string;
  platform: string;
  designType: string;
  factorNames: string[];
  assayMeasurement: string;
  assayTechnology: string;
  assayPlatform: string;
  organism: string;
  sampleCount: number;
  subjectCount: number;
  doi?: string;
  publication?: string;
  submissionDate?: string;
  publicReleaseDate?: string;
  keyFindings?: string[];
  sourceFile: string;
}

// ---------------------------------------------------------------------------
// The five NASA OSD studies (real metadata from the uploaded ISA-Tab files)
// ---------------------------------------------------------------------------
export const nasaStudies: NasaStudy[] = [
  {
    id: "OSD-575",
    title:
      "SpaceX Inspiration4 Blood Serum Metabolic Panel and Immune/Cardiac Cytokine Arrays (Comprehensive Metabolic Panel and Multiplex)",
    description:
      "The SpaceX Inspiration4 mission was a 3-day mission with four private astronauts to low Earth orbit that occurred in September 2021. The crew collected biospecimen samples before, during, and after flight. Whole blood was collected via venipuncture, with serum extracted using a serum separator tube (SST). Samples were collected pre-flight (L-92, L-44, L-3) and post-flight (R+1, R+45, R+82, R+194). Serum samples were submitted for immune and cardiovascular cytokine biomarker profiling panels at Eve Technologies and Alamar Biosciences, and to Quest Diagnostics for comprehensive metabolic panel testing. Data was used to measure changes in cytokines and metabolic measures during spaceflight. Part of the Space Omics and Medical Atlas (SOMA) and international astronaut biobank (Nature, 2024).",
    mission: "SpaceX Inspiration4 (3-day LEO mission, 4 private astronauts, Sept 16–18, 2021)",
    flightProgram: "SpaceX Inspiration4 — low Earth orbit",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "Beckman Coulter AU5800; NULISA-seq; Luminex multiplex",
    designType: "low Earth orbit — longitudinal human biospecimen study",
    factorNames: ["Spaceflight (Pre-flight / Post-flight)", "Time"],
    assayMeasurement: "analytical chemistry + immunoassay multiplex",
    assayTechnology: "Comprehensive Metabolic Panel; NULISA-seq; Multiplex",
    assayPlatform: "Beckman Coulter AU5800 / Alamar Biosciences / Eve Technologies",
    organism: "Homo sapiens",
    sampleCount: 28,
    subjectCount: 4,
    doi: "10.26030/mc5d-p710",
    publication:
      "Overbey EG, Tierney BT, Kim J, et al. The Space Omics and Medical Atlas (SOMA) and international astronaut biobank. Nature (2024). doi:10.1038/s41586-024-07639-y",
    submissionDate: "05-Dec-2022",
    keyFindings: [
      "SpaceX Inspiration4: 3-day LEO mission, 4 private astronauts (Sept 2021)",
      "4 crew subjects (C001–C004): 2 male, 2 female",
      "7 sampling time points per subject (L-92, L-44, L-3, R+1, R+45, R+82, R+194)",
      "Comprehensive Metabolic Panel on Beckman Coulter AU5800 (Quest Diagnostics)",
      "NULISA-seq 200plex v1 Inflammation Panel — 203 targets (Alamar Biosciences)",
      "Human Cytokine/Chemokine 71-Plex (HD71) — Eve Technologies",
      "Human Cardiovascular Disease 9-Plex (HDCVD9) — Eve Technologies",
      "Part of SOMA astronaut biobank (Nature, 2024) — 8 related sibling studies",
    ],
    sourceFile: "s_OSD-575.txt + 4 assay files + i_Investigation.txt",
  },
  {
    id: "OSD-635",
    title: "Spaceflight effects on human vascular smooth muscle cell phenotype and function",
    description:
      "RNA-Seq analysis of human aortic smooth muscle cells (HASMCs) cultured for 3 days in microgravity aboard the ISS. SMCs undergo a wide range of transcriptional alteration in space, significantly affecting 4,422 genes. Cells down-regulate markers of the contractile, synthetic, and osteogenic phenotypes including αSMA, MMPs, and BMPs. Components of several signaling pathways were strongly impacted: STAT3, NFκB, PI3K/AKT, HIF1α, and Endothelin.",
    mission: "SpaceX-17",
    flightProgram: "International Space Station (ISS)",
    managingCenter: "Ames Research Center (ARC)",
    platform: "Kayser experimental unit (KEU-RO); Illumina NextSeq500",
    designType: "low Earth orbit",
    factorNames: ["Spaceflight (Space Flight / Ground Control)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "RNA Sequencing (RNA-Seq)",
    assayPlatform: "Illumina",
    organism: "Homo sapiens",
    sampleCount: 6,
    subjectCount: 0,
    doi: "10.26030/8n5a-q187",
    publication: "Scotti MM, et al. npj Microgravity (2024). doi:10.1038/s41526-024-00380-w",
    submissionDate: "25-Jul-2023",
    publicReleaseDate: "03-Apr-2024",
    keyFindings: [
      "4,422 genes significantly affected by microgravity",
      "Down-regulated: αSMA, MMPs, BMPs (contractile/synthetic/osteogenic markers)",
      "Impacted pathways: STAT3, NFκB, PI3K/AKT, HIF1α, Endothelin",
      "Implications for vascular deconditioning & loss of vascular tone in astronauts",
    ],
    sourceFile: "s_OSD-635.txt + i_Investigation.txt",
  },
  {
    id: "OSD-937",
    title: "Engineered human muscle (myobundles) — spaceflight, age & electrical stimulation",
    description:
      "RNA-Seq of engineered human muscle bundles (CD56+ myoblasts from Vastus Lateralis) flown in space, comparing young vs old donors, with/without electrical stimulation, at Day 2 and Day 21. Directly relevant to understanding and counteracting skeletal-muscle atrophy during long-duration spaceflight.",
    mission: "ISS spaceflight study",
    flightProgram: "International Space Station (ISS)",
    managingCenter: "NASA GeneLab",
    platform: "Illumina; microfluidic chip culture",
    designType: "low Earth orbit — factorial design",
    factorNames: ["Spaceflight", "Donor Age (young/old)", "Treatment (Electric Stimulation)", "Time (Day 2/21)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "RNA Sequencing (RNA-Seq)",
    assayPlatform: "Illumina",
    organism: "Homo sapiens",
    sampleCount: 30,
    subjectCount: 0,
    keyFindings: [
      "Tissue source: Vastus Lateralis (skeletal muscle)",
      "Factorial design: Spaceflight × Age × Electrical Stimulation × Time",
      "Electrical stimulation tested as a countermeasure for microgravity atrophy",
      "GEO accessions GSM9013389–GSM9013418",
    ],
    sourceFile: "s_OSD-937.txt",
  },
  {
    id: "OSD-431",
    title: "Endothelial cell transcriptomics under altered gravity (HMEC-1)",
    description:
      "RNA-Seq of HMEC-1 dermal microvascular endothelial cells exposed to spaceflight and altered gravity conditions (1G on Earth, 1G by centrifugation, microgravity). Endothelial dysfunction is central to vascular changes in astronauts.",
    mission: "ISS spaceflight study",
    flightProgram: "International Space Station (ISS)",
    managingCenter: "NASA GeneLab",
    platform: "Illumina",
    designType: "low Earth orbit — altered gravity",
    factorNames: ["Spaceflight (Space Flight / Ground Control)", "Altered Gravity (1G Earth / 1G centrifugation / µG)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "RNA Sequencing (RNA-Seq)",
    assayPlatform: "Illumina",
    organism: "Homo sapiens",
    sampleCount: 8,
    subjectCount: 0,
    keyFindings: [
      "Cell line: HMEC-1 (dermal microvascular endothelial)",
      "3 gravity conditions: 1G Earth, 1G centrifugation, µG",
      "GEO accessions GSM4781322–GSM4781329",
    ],
    sourceFile: "s_OSD-431.txt",
  },
  {
    id: "OSD-353",
    title: "Human plasma proteomics — spaceflight, bed rest & dry immersion",
    description:
      "Protein-expression profiling by mass spectrometry of human blood plasma from 23 subjects: 13 cosmonauts (before/after spaceflight), 5 bed-rest subjects, and 5 dry-immersion subjects. Bed rest and dry immersion are ground-based analogs that simulate microgravity-induced physiological changes.",
    mission: "Spaceflight + ground analogs",
    flightProgram: "ISS / ground analog",
    managingCenter: "NASA GeneLab",
    platform: "Bruker MaXis 4G (mass spectrometry)",
    designType: "spaceflight + ground analog",
    factorNames: ["Spaceflight", "Bed Rest", "Dry Immersion"],
    assayMeasurement: "protein expression profiling",
    assayTechnology: "mass spectrometry",
    assayPlatform: "Bruker MaXis 4G",
    organism: "Homo sapiens",
    sampleCount: 46,
    subjectCount: 23,
    keyFindings: [
      "13 cosmonauts (before/after spaceflight)",
      "5 bed-rest subjects + 5 dry-immersion subjects (microgravity analogs)",
      "Plasma proteome changes across three deconditioning models",
    ],
    sourceFile: "s_OSD-353.txt",
  },
  {
    id: "OSD-546",
    title:
      "Human bone marrow mesenchymal stem cells on ISS — osteogenic vs standard medium with real radiation dosimetry",
    description:
      "DNA microarray (Affymetrix HuGene 1.0 st v1) transcriptomics of human bone marrow mesenchymal stem cells (hBMSCs) cultured aboard the ISS for 14 days in osteogenic vs standard medium, compared to ground controls. Directly relevant to spaceflight-induced bone loss. Critically, this study includes REAL in-flight radiation dosimetry measured on the ISS Zvezda module — the first real radiation dataset integrated into AstraHealth.",
    mission: "ISS (Zvezda module) — Space Flight + Ground Control",
    flightProgram: "International Space Station (ISS)",
    managingCenter: "NASA GeneLab (GLDS-546)",
    platform: "KUBIC interface container single level (KIC-SL); Affymetrix GeneChip Scanner 3000 7G",
    designType: "low Earth orbit — spaceflight + ground control, factorial (medium × flight)",
    factorNames: ["Spaceflight (Space Flight / Ground Control)", "Treatment (osteogenic / standard medium)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "DNA microarray",
    assayPlatform: "Affymetrix HuGene 1.0 st v1",
    organism: "Homo sapiens",
    sampleCount: 13,
    subjectCount: 0,
    keyFindings: [
      "Cell type: bone marrow mesenchymal stem cells (hBMSCs) — bone-health relevant",
      "7 Space Flight samples (3 osteogenic + 4 standard medium) + 6 Ground Control",
      "REAL in-flight radiation dosimetry: 3.70746 mGy absorbed over 14 days, 0.264817 mGy/day dose rate (ISS Zvezda)",
      "Radiation source: space radiation (outer space), measured via ISS-Zvezda dosimetry",
      "GEO accessions GSM2696758–GSM2696770",
    ],
    sourceFile: "s_OSD-546.txt + a_OSD-546_transcription-profiling_dna-microarray_affymetrix.txt",
  },
  {
    id: "OSD-1005",
    title:
      "PROMETEO 2 — Neuroprotective Effects of Cerium Oxide Nanoparticles During Spaceflight",
    description:
      "The spaceflight environment exposes biological systems to microgravity and cosmic radiation, factors known to induce oxidative stress and neurodegenerative processes. The central nervous system is highly susceptible to disruptions in redox homeostasis. This study (PROMETEO 2 / Nano Protection) used SH-SY5Y neuroblastoma cells as a neuronal model, flown on the Ax-3 mission to the ISS, with and without cerium oxide nanoparticles (nanoceria — an antioxidant), under microgravity and 1G (random positioning machine) conditions. RNA-Seq assessed the neuroprotective effects of nanoceria during spaceflight.",
    mission: "Ax-3 (ISS, Jan 18 – Feb 9, 2024)",
    flightProgram: "International Space Station (ISS) — Axiom Mission 3",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "Kubik incubator; Illumina NovaSeq 6000",
    designType: "low Earth orbit — spaceflight + altered gravity factorial",
    factorNames: ["Spaceflight (Space Flight / Ground Control)", "Altered Gravity (1G / µG)", "Treatment (with/without nanoceria)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "RNA Sequencing (RNA-Seq)",
    assayPlatform: "Illumina NovaSeq 6000; NEBNext Ultra II RNA Library Prep Kit",
    organism: "Homo sapiens",
    sampleCount: 23,
    subjectCount: 0,
    doi: "10.26030/n4wy-gy28",
    publication:
      "Carmignani A, Marino A, Battaglini M, et al. Neuroprotective Effects of Cerium Oxide Nanoparticles During Spaceflight. doi:10.1002/smsc.70271",
    submissionDate: "25-Apr-2025",
    keyFindings: [
      "Neuronal model: SH-SY5Y neuroblastoma cells (cognitive/neurological health)",
      "Mission: Ax-3 to ISS, Jan 18 – Feb 9, 2024 (Kubik incubator)",
      "Tested cerium oxide nanoparticles (nanoceria) as an antioxidant countermeasure",
      "Factorial: Spaceflight × altered gravity (1G/µG) ± nanoceria",
      "Duration in space: 159 hours",
      "Directly relevant to astronaut neuroprotection & cognitive risk",
    ],
    sourceFile: "s_OSD-1005.txt + a_OSD-1005_transcription-profiling_rna-sequencing-(rna-seq)_Illumina.txt + i_Investigation.txt",
  },
  {
    id: "OSD-118",
    title:
      "Human fibroblast (AG1522) spaceflight transcriptomics — miRNA & gene expression",
    description:
      "DNA microarray study of AG1522 human foreskin fibroblast cells exposed to spaceflight (Space Flight vs Ground Control) for 3 and 14 days. Profiled on two platforms: Exiqon miRcury LNA microRNA array (miRNA regulation) and Illumina Human HT-12 v4 Beadchip (gene expression). Fibroblasts are a standard radiobiology model; this study informs cellular damage/repair responses to spaceflight and microRNA-mediated regulation.",
    mission: "ISS spaceflight study",
    flightProgram: "International Space Station (ISS)",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "Exiqon miRcury LNA; Illumina Human HT-12 v4 Beadchip",
    designType: "low Earth orbit — spaceflight + ground control, time-course",
    factorNames: ["Spaceflight (Space Flight / Ground Control)", "Time (3d / 14d)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "DNA microarray (dual platform)",
    assayPlatform: "Exiqon miRcury LNA microRNA + Illumina Human HT-12 v4 Beadchip",
    organism: "Homo sapiens",
    sampleCount: 16,
    subjectCount: 0,
    keyFindings: [
      "Cell line: AG1522 (foreskin fibroblast — standard radiobiology model)",
      "16 samples: Space Flight vs Ground Control, 3-day and 14-day time points",
      "Dual-platform microarray: miRNA (Exiqon miRcury LNA) + gene expression (Illumina HT-12 v4)",
      "Relevant to cellular damage/repair and microRNA regulation in spaceflight",
    ],
    sourceFile: "s_OSD-118.txt + a_OSD-118_transcription-profiling_dna-microarray_Exiqon.txt + a_OSD-118_transcription-profiling_dna-microarray_Illumina.txt",
  },
  {
    id: "OSD-344",
    title:
      "Real-time qPCR of human cardiovascular progenitor cells aboard the ISS (SpaceX-11)",
    description:
      "Adult and neonatal human cardiovascular progenitor cell (CPC) clonal populations were flown aboard the ISS for 12 days before fixation in RNAprotect. Gene expression was analyzed by real-time quantitative PCR (qPCR) against clone-, patient-, and passage-matched ground controls. CPCs from three neonates and three adults were individually cultured on the ground or aboard the ISS. The study found that CPCs cultured in microgravity exhibit altered developmental and functional properties — directly relevant to astronaut cardiac health risk during long-duration spaceflight.",
    mission: "SpaceX-11 (ISS, 12-day culture)",
    flightProgram: "International Space Station (ISS)",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "BioRad real-time PCR (SYBR Green I)",
    designType: "low Earth orbit — spaceflight + ground control, age factorial (neonate/adult)",
    factorNames: ["Spaceflight (Space Flight / Ground Control)", "Developmental Stage (neonate / adult)", "RNA type (mRNA / miRNA)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "real time PCR (qPCR)",
    assayPlatform: "BioRad (SYBR Green I)",
    organism: "Homo sapiens",
    sampleCount: 24,
    subjectCount: 6, // 3 neonate + 3 adult donors
    doi: "10.1038/s41526-018-0048-x",
    publication:
      "Baio J, Martinez AF, Silva I, Hoehn CV, Countryman S, Bailey L, Hasaniya N, Pecaut MJ, Kearns-Jonker M. Cardiovascular progenitor cells cultured aboard the International Space Station exhibit altered developmental and functional properties. npj Microgravity (2018). doi:10.1038/s41526-018-0048-x",
    submissionDate: "13-Feb-2018",
    keyFindings: [
      "Cell type: cardiovascular progenitor cells (CPCs) — directly relevant to cardiac health",
      "24 samples: 3 neonate + 3 adult donors × Space Flight / Ground Control × mRNA / miRNA",
      "12-day ISS culture (SpaceX-11) with matched ground controls",
      "qPCR gene expression profiling (BioRad, SYBR Green I) — targeted validation assay",
      "CPCs in microgravity exhibit altered developmental and functional properties",
      "Age comparison (neonate vs adult) informs developmental cardiac sensitivity to microgravity",
      "GEO accessions GSM3001053–GSM3001076",
    ],
    sourceFile: "s_OSD-344.txt + a_OSD-344_transcription-profiling_real-time-pcr_BioRad.txt + a_OSD-344_transcription-profiling_real-time-pcr_BioRad-1.txt + i_Investigation.txt",
  },
  {
    id: "OSD-941",
    title:
      "Spaceflight reshapes Alzheimer's disease–associated molecular programs in human brain organoids",
    description:
      "Human cortical organoids derived from iPSCs carrying familial Alzheimer's disease (fAD) mutations (APP p.V717G, PSEN1 p.M233L, PSEN2 p.N141I) were cultivated aboard the ISS alongside isogenic controls for 40 days (SpaceX-30). Multi-omic profiling (transcriptomics, proteomics, metabolic analyses) revealed a coordinated shift in neuronal and cellular states during spaceflight. AD-derived organoids showed altered glycolytic activity and lactate-to-malate ratios, consistent with metabolic and mitochondrial remodeling. Spaceflight was associated with changes in amyloid-beta (Aβ) processing and tau — directly relevant to astronaut cognitive health and neurodegenerative risk during long-duration missions.",
    mission: "SpaceX-30 (ISS, Mar 21 – Apr 30, 2024, 40-day culture)",
    flightProgram: "International Space Station (ISS)",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "SpaceTango LLC CubeLab; Illumina NovaSeq 6000",
    designType: "low Earth orbit — Alzheimer's disease organoid model, spaceflight + ground control",
    factorNames: ["Spaceflight (Space Flight / Ground Control)", "Genotype (fAD mutations / isogenic control)"],
    assayMeasurement: "transcription profiling",
    assayTechnology: "RNA Sequencing (RNA-Seq)",
    assayPlatform: "Illumina NovaSeq 6000; Illumina Stranded mRNA Prep",
    organism: "Homo sapiens",
    sampleCount: 46,
    subjectCount: 0,
    doi: "10.26030/twtb-sc40",
    publication:
      "Moreira NCS, Coelho LBV, Petroski LP, et al. Spaceflight accelerates Alzheimer's disease–associated molecular programs in human brain organoids. doi:10.26030/twtb-sc40",
    submissionDate: "19-Nov-2025",
    keyFindings: [
      "Model: human cortical organoids from iPSCs with familial Alzheimer's mutations (APP, PSEN1, PSEN2)",
      "40-day ISS culture (SpaceX-30) alongside isogenic controls",
      "Multi-omic: transcriptomics + proteomics + metabolic analyses",
      "Altered glycolytic activity and lactate-to-malate ratios (metabolic/mitochondrial remodeling)",
      "Changes in amyloid-beta (Aβ) processing and tau — AD-associated molecular programs accelerated",
      "Directly relevant to astronaut cognitive health & neurodegenerative risk in long-duration spaceflight",
    ],
    sourceFile: "a_OSD-941_transcription-profiling_rna-sequencing-(rna-seq)_Illumina.txt + i_Investigation.txt",
  },
  {
    id: "OSD-574",
    title:
      "SpaceX Inspiration4 Skin Biopsy — Spatial Transcriptomics, Metagenomics & Metatranscriptomics",
    description:
      "Skin biopsy and swab samples from the SpaceX Inspiration4 crew (subjects C001–C004, the same crew as OSD-575), collected pre-flight (L-44) and post-flight (R+1). Profiled on three platforms: (1) spatial transcriptomics of skin biopsies (97 samples, Illumina NovaSeq 6000, GeoMx), (2) whole-genome shotgun metagenomic sequencing of swabs (8 samples, microbiome profiling), and (3) metatranscriptome RNA-seq (8 samples). Part of the SOMA astronaut biobank (Nature 2024) — the skin/microbiome sibling study to OSD-575 serum biomarkers. Provides tissue-level molecular data on spaceflight effects on skin health, wound healing, and the skin microbiome.",
    mission: "SpaceX Inspiration4 (3-day LEO mission, Sept 16–18, 2021)",
    flightProgram: "SpaceX Inspiration4 — low Earth orbit",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "Illumina NovaSeq 6000; GeoMx spatial transcriptomics",
    designType: "low Earth orbit — longitudinal human biospecimen study (skin + microbiome)",
    factorNames: ["Spaceflight (pre-flight / post-flight)", "Time", "Sample type (skin biopsy / swab)"],
    assayMeasurement: "spatial transcriptomics + metagenomic + metatranscriptome",
    assayTechnology: "RNA-Seq (spatial) + whole-genome shotgun + metatranscriptome",
    assayPlatform: "Illumina NovaSeq 6000 (3 assay platforms)",
    organism: "Homo sapiens + Microbiota",
    sampleCount: 105,
    subjectCount: 4, // C001–C004 (same Inspiration4 crew as OSD-575)
    doi: "10.26030/mc5d-p710", // Same SOMA biobank DOI as OSD-575
    publication:
      "Overbey EG, Tierney BT, et al. The Space Omics and Medical Atlas (SOMA) and international astronaut biobank. Nature (2024). doi:10.1038/s41586-024-07639-y",
    submissionDate: "SOMA biobank (Nature 2024)",
    keyFindings: [
      "Same Inspiration4 crew as OSD-575 (subjects C001–C004) — skin biopsy & swab samples",
      "105 samples across 3 assay platforms",
      "Spatial transcriptomics: 97 skin biopsy samples (GeoMx, tissue-level gene expression)",
      "Metagenomic sequencing: 8 swab samples (whole-genome shotgun, microbiome profiling)",
      "Metatranscriptome: 8 samples (RNA-seq, active microbial gene expression)",
      "Pre-flight (L-44) and post-flight (R+1) time points",
      "Relevant to skin health, wound healing, microbiome changes in spaceflight",
    ],
    sourceFile: "s_OSD-574.txt + a_OSD-574_transcription-profiling_spatial-transcriptomics_illumina.txt + a_OSD-574_metagenomic-sequencing_whole-genome-shotgun-sequencing_illumina.txt + a_OSD-574_metatranscriptome-sequencing-assay_rna-sequencing-(rna-seq)_illumina.txt",
  },
  {
    id: "OSD-571",
    title:
      "SpaceX Inspiration4 Plasma — Multi-omic (Genome, Metabolome, Proteome, Transcriptome)",
    description:
      "Plasma samples from the SpaceX Inspiration4 crew (subjects C001–C004, same crew as OSD-575), collected at 7 time points (L-92, L-44, L-3, R+1, R+45, R+82, R+194). Profiled on 5 assay platforms: (1) cfDNA genome sequencing (Element AVITI, 24 samples), (2) metabolite profiling by mass spectrometry (Agilent 6550 Q-TOF, 24 samples), (3) protein expression by mass spectrometry (Bruker timsTOF Pro-2, 21 samples), (4) protein expression by mass spectrometry (Thermo Q Exactive HF, 24 samples), (5) cfRNA transcription profiling by RNA-seq (Illumina NextSeq 2K, 47 samples). Part of the SOMA astronaut biobank (Nature 2024). Provides comprehensive multi-omic plasma profiling — cell-free DNA, metabolites, proteins, and cell-free RNA — covering genomics, metabolomics, proteomics, and transcriptomics from the same crew.",
    mission: "SpaceX Inspiration4 (3-day LEO mission, Sept 16–18, 2021)",
    flightProgram: "SpaceX Inspiration4 — low Earth orbit",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "Element AVITI; Agilent 6550 Q-TOF; Bruker timsTOF Pro-2; Thermo Q Exactive HF; Illumina NextSeq 2K",
    designType: "low Earth orbit — longitudinal human multi-omic biospecimen study",
    factorNames: ["Spaceflight (pre-flight / post-flight)", "Time", "Assay platform (5 omics)"],
    assayMeasurement: "genome sequencing + metabolite profiling + protein expression + transcription profiling",
    assayTechnology: "cfDNA sequencing + mass spectrometry (Q-TOF, timsTOF, Orbitrap) + RNA-seq",
    assayPlatform: "Element AVITI; Agilent 6550; Bruker timsTOF Pro-2; Thermo Q Exactive HF; Illumina NextSeq 2K",
    organism: "Homo sapiens",
    sampleCount: 117,
    subjectCount: 4,
    doi: "10.26030/mc5d-p710",
    publication:
      "Overbey EG, Tierney BT, et al. The Space Omics and Medical Atlas (SOMA) and international astronaut biobank. Nature (2024). doi:10.1038/s41586-024-07639-y",
    submissionDate: "SOMA biobank (Nature 2024)",
    keyFindings: [
      "Same Inspiration4 crew as OSD-575 (subjects C001–C004) — plasma biospecimen",
      "117 samples across 5 multi-omic assay platforms",
      "cfDNA genome sequencing (Element AVITI, 24 samples) — cell-free DNA",
      "Metabolite profiling (Agilent 6550 Q-TOF, 24 samples) — plasma metabolome",
      "Protein expression (Bruker timsTOF Pro-2, 21 samples; Thermo Q Exactive HF, 24 samples) — plasma proteome",
      "cfRNA transcription profiling (Illumina NextSeq 2K, 47 samples) — cell-free RNA",
      "7 time points (L-92 → R+194) — comprehensive longitudinal multi-omic coverage",
    ],
    sourceFile: "s_OSD-571.txt + 5 assay files (genome/metabolite/protein×2/transcriptomics)",
  },
  {
    id: "OSD-656",
    title:
      "SpaceX Inspiration4 Urine Inflammation Panel (Multiplex, NULISAseq)",
    description:
      "Urine samples from the SpaceX Inspiration4 crew (subjects C001–C004), collected at 6 time points (L-92, L-44, L-3, R+1, R+45, R+82). 203 inflammatory, cytokine, and chemokine proteins were quantified using NULISA-seq (Alamar Biosciences 200plex v1 Inflammation Panel). Part of the SOMA astronaut biobank (Nature 2024). Urine biomarker profiling provides non-invasive monitoring of inflammation and immune response — directly relevant to astronaut health monitoring, kidney function, and systemic inflammation tracking during spaceflight.",
    mission: "SpaceX Inspiration4 (3-day LEO mission, Sept 16–18, 2021)",
    flightProgram: "SpaceX Inspiration4 — low Earth orbit",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "Alamar Biosciences NULISA-seq 200plex v1 Inflammation Panel",
    designType: "low Earth orbit — longitudinal human biospecimen study (urine)",
    factorNames: ["Spaceflight (pre-flight / post-flight)", "Time"],
    assayMeasurement: "immunoassay multiplex",
    assayTechnology: "NULISA-seq (Multiplex)",
    assayPlatform: "Alamar Biosciences NULISA-seq 200plex v1",
    organism: "Homo sapiens",
    sampleCount: 22,
    subjectCount: 4,
    doi: "10.26030/7cax-yj10",
    publication:
      "Overbey EG, Tierney BT, et al. The Space Omics and Medical Atlas (SOMA) and international astronaut biobank. Nature (2024). doi:10.1038/s41586-024-07639-y; Collection of Biospecimens from the Inspiration4 Mission. doi:10.1038/s41467-024-48806-z",
    submissionDate: "31-Aug-2023",
    keyFindings: [
      "Same Inspiration4 crew as OSD-575 (subjects C001–C004) — urine biospecimen",
      "22 samples at 6 time points (L-92, L-44, L-3, R+1, R+45, R+82)",
      "203 inflammatory/cytokine/chemokine proteins quantified (NULISA-seq)",
      "Alamar Biosciences 200plex v1 Inflammation Panel — same kit as OSD-575 serum inflammation panel",
      "Non-invasive biomarker monitoring — relevant to kidney function, inflammation, immune tracking",
    ],
    sourceFile: "s_OSD-656.txt + a_OSD-656_immunoassay_multiplex_alamar biosciences.txt + i_Investigation.txt",
  },
  {
    id: "OSD-569",
    title:
      "SpaceX Inspiration4 Whole Blood (RNA-seq, epitranscriptome, WGS, clonal hematopoiesis, CBC)",
    description:
      "Whole blood samples from the SpaceX Inspiration4 crew (subjects C001–C004), collected pre-flight (L-92, L-44, L-3) and post-flight (R+1, R+45, R+82, R+194). Profiled on 5 platforms: (1) Complete Blood Count (CBC) on Sysmex XN Analyzer (28 samples), (2) whole-genome sequencing on Element AVITI (8 samples), (3) targeted genome sequencing on Illumina NovaSeq 6000 (24 samples), (4) long-read direct RNA-seq on Oxford Nanopore PromethION (29 samples), (5) RNA-seq on Ultima Genomics UG100 (28 samples). Part of the SOMA astronaut biobank (Nature 2024). CBC provides standard hematology panels (RBC, WBC, hemoglobin, platelets, hematocrit) — the most clinically standard blood test. Long-read RNA-seq enables epitranscriptome analysis. WGS + targeted sequencing track clonal hematopoiesis and somatic mutations from spaceflight radiation exposure.",
    mission: "SpaceX Inspiration4 (3-day LEO mission, Sept 16–18, 2021)",
    flightProgram: "SpaceX Inspiration4 — low Earth orbit",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "Sysmex XN; Element AVITI; Illumina NovaSeq 6000; Oxford Nanopore PromethION; Ultima UG100",
    designType: "low Earth orbit — longitudinal human multi-platform biospecimen study (whole blood)",
    factorNames: ["Spaceflight (pre-flight / post-flight)", "Time", "Assay platform (5 platforms)"],
    assayMeasurement: "complete blood count + genome sequencing + targeted genome sequencing + long-read RNA-seq + RNA-seq",
    assayTechnology: "hematology analyzer + WGS + targeted sequencing + direct RNA-seq (Nanopore) + RNA-seq (Ultima)",
    assayPlatform: "Sysmex XN; Element AVITI; Illumina NovaSeq 6000; Oxford Nanopore PromethION; Ultima UG100",
    organism: "Homo sapiens",
    sampleCount: 81,
    subjectCount: 4,
    doi: "10.26030/e0rx-sh52",
    publication:
      "Overbey EG, Tierney BT, et al. The Space Omics and Medical Atlas (SOMA) and international astronaut biobank. Nature (2024). doi:10.1038/s41586-024-07639-y",
    submissionDate: "SOMA biobank (Nature 2024)",
    keyFindings: [
      "Same Inspiration4 crew as OSD-575 (subjects C001–C004) — whole blood biospecimen",
      "81 samples (RBC pellet + whole blood) across 5 assay platforms",
      "Complete Blood Count (CBC) on Sysmex XN Analyzer (28 samples) — standard hematology (RBC/WBC/platelets/hemoglobin/hematocrit)",
      "Whole-genome sequencing on Element AVITI (8 samples) — cfDNA / somatic mutations",
      "Targeted genome sequencing on Illumina NovaSeq 6000 (24 samples) — clonal hematopoiesis tracking",
      "Long-read direct RNA-seq on Oxford Nanopore PromethION (29 samples) — epitranscriptome",
      "RNA-seq on Ultima UG100 (28 samples) — transcriptome",
      "7 time points (L-92 → R+194) — the most clinically standard blood test (CBC) + cutting-edge multi-platform omics",
    ],
    sourceFile: "s_OSD-569.txt + 5 assay files (CBC/WGS/targeted-seq/long-read-RNA-seq/Ultima-RNA-seq) + i_Investigation.txt",
  },
  {
    id: "OSD-570",
    title:
      "SpaceX Inspiration4 PBMC Profiling: snRNA-seq, snATAC-seq, and T-cell and B-cell repertoire profiling",
    description:
      "Peripheral blood mononuclear cells (PBMCs) from the SpaceX Inspiration4 crew (subjects C001–C004), collected via venipuncture into K2 EDTA tubes at 6 time points (L-92, L-44, L-3, R+1, R+45, R+82). Single-nuclei RNA-seq and single-nuclei ATAC-seq were co-assayed using the 10X Genomics Multiome Kit. T-cell and B-cell V(D)J repertoires were profiled using Chromium 5' v2 kits. Four assay files: (1) snRNA-seq via Chromium Multiome (24 samples, single nuclei), (2) snATAC-seq via Chromium Multiome (24 samples, chromatin accessibility), (3) TCR repertoire via Chromium 5' v2 (16 samples), (4) BCR repertoire via Chromium 5' v2 (16 samples). Part of the SOMA astronaut biobank (Nature 2024). Provides cell-type-resolved immune profiling — tracks individual immune cell populations, adaptive immune repertoire clonality (TCR/BCR), and chromatin accessibility changes from spaceflight.",
    mission: "SpaceX Inspiration4 (3-day LEO mission, Sept 16–18, 2021)",
    flightProgram: "SpaceX Inspiration4 — low Earth orbit",
    managingCenter: "NASA GeneLab (Ames Research Center)",
    platform: "10x Genomics Chromium (Multiome + 5' v2); Illumina NovaSeq 6000",
    designType: "low Earth orbit — longitudinal human single-cell multi-omic immune study (PBMC)",
    factorNames: ["Spaceflight (pre-flight / post-flight)", "Time", "Assay (snMultiome / TCR / BCR)"],
    assayMeasurement: "single-cell RNA-seq + single-cell ATAC-seq + immune repertoire (TCR/BCR)",
    assayTechnology: "single-cell multi-omic (10x Chromium Multiome + 5' scRNA-seq)",
    assayPlatform: "10x Genomics Chromium (Multiome + 5' v2); Illumina NovaSeq 6000",
    organism: "Homo sapiens",
    sampleCount: 24, // 24 unique PBMC biospecimen samples (from s_OSD-570.txt study file)
    subjectCount: 4,
    doi: "10.26030/41s1-j243",
    publication:
      "Overbey EG, Tierney BT, et al. The Space Omics and Medical Atlas (SOMA) and international astronaut biobank. Nature (2024). doi:10.1038/s41586-024-07639-y",
    submissionDate: "05-Dec-2022",
    keyFindings: [
      "Same Inspiration4 crew as OSD-575 (subjects C001–C004) — PBMC biospecimen",
      "24 unique PBMC samples at 6 time points (L-92, L-44, L-3, R+1, R+45, R+82)",
      "4 single-cell assay files: snRNA-seq (24) + snATAC-seq (24) + TCR (16) + BCR (16)",
      "snRNA-seq + snATAC-seq co-assayed via 10x Chromium Multiome (single-nuclei)",
      "TCR/BCR V(D)J repertoire profiling via 10x Chromium 5' v2",
      "Cell-type-resolved immune profiling — tracks individual immune cell populations",
      "Adaptive immune repertoire (TCR/BCR clonality) + chromatin accessibility changes from spaceflight",
    ],
    sourceFile: "s_OSD-570.txt + i_Investigation.txt + 4 assay files (snRNA-seq/snATAC-seq/TCR/BCR)",
  },
];

export function getStudy(id: string) {
  return nasaStudies.find((s) => s.id === id);
}

// ---------------------------------------------------------------------------
// OSD-575 — real astronaut subjects & sampling timeline
// (parsed from s_OSD-575.txt)
// ---------------------------------------------------------------------------
export interface Osd575Subject {
  subjectId: string; // C001..C004 (real)
  sex: "Male" | "Female"; // real
  materialType: string; // Serum (real)
  sampleNames: string[]; // real sample names e.g. C001_serum_L-3
}

// Real OSD-575 sampling time points (days relative to launch/return)
export interface TimelinePoint {
  code: string; // "L-92"
  label: string; // "Launch −92 d"
  phase: "Pre-flight" | "Post-flight";
  dayOffset: number; // relative to launch (negative) or return (positive)
}

export const osd575Timeline: TimelinePoint[] = [
  { code: "L-92", label: "Launch −92 d", phase: "Pre-flight", dayOffset: -92 },
  { code: "L-44", label: "Launch −44 d", phase: "Pre-flight", dayOffset: -44 },
  { code: "L-3", label: "Launch −3 d", phase: "Pre-flight", dayOffset: -3 },
  { code: "R+1", label: "Return +1 d", phase: "Post-flight", dayOffset: 1 },
  { code: "R+45", label: "Return +45 d", phase: "Post-flight", dayOffset: 45 },
  { code: "R+82", label: "Return +82 d", phase: "Post-flight", dayOffset: 82 },
  { code: "R+194", label: "Return +194 d", phase: "Post-flight", dayOffset: 194 },
];

export const osd575Subjects: Osd575Subject[] = [
  {
    subjectId: "C001",
    sex: "Male",
    materialType: "Serum",
    sampleNames: [
      "C001_serum_L-92", "C001_serum_L-44", "C001_serum_L-3",
      "C001_serum_R+1", "C001_serum_R+45", "C001_serum_R+82", "C001_serum_R+194",
    ],
  },
  {
    subjectId: "C002",
    sex: "Female",
    materialType: "Serum",
    sampleNames: [
      "C002_serum_L-92", "C002_serum_L-44", "C002_serum_L-3",
      "C002_serum_R+1", "C002_serum_R+45", "C002_serum_R+82", "C002_serum_R+194",
    ],
  },
  {
    subjectId: "C003",
    sex: "Female",
    materialType: "Serum",
    sampleNames: [
      "C003_serum_L-92", "C003_serum_L-44", "C003_serum_L-3",
      "C003_serum_R+1", "C003_serum_R+45", "C003_serum_R+82", "C003_serum_R+194",
    ],
  },
  {
    subjectId: "C004",
    sex: "Male",
    materialType: "Serum",
    sampleNames: [
      "C004_serum_L-92", "C004_serum_L-44", "C004_serum_L-3",
      "C004_serum_R+1", "C004_serum_R+45", "C004_serum_R+82", "C004_serum_R+194",
    ],
  },
];

// ---------------------------------------------------------------------------
// OSD-575 — real assay panels (parsed from a_OSD-575_*.txt)
// ---------------------------------------------------------------------------
export interface AssayPanel {
  id: string;
  studyId: string;
  name: string;
  platform: string;
  company: string;
  targets: number | null;
  measurementType: string;
  sampleCount: number;
  provenance: DataProvenance; // metadata is real; numeric results unavailable
  notes: string;
}

export const osd575Assays: AssayPanel[] = [
  {
    id: "cmp",
    studyId: "OSD-575",
    name: "Comprehensive Metabolic Panel",
    platform: "Beckman Coulter AU5800",
    company: "Quest Diagnostics",
    targets: null, // CMP measures ~14 standard analytes (glucose, Na, K, Cl, CO2, BUN, creatinine, Ca, total protein, albumin, ALP, ALT, AST, bilirubin)
    measurementType: "analytical chemistry",
    sampleCount: 28,
    provenance: "nasa",
    notes:
      "Assay metadata is real NASA/ALSDA data. Numeric CMP concentrations are in an external transformed CSV (LSDS-8_..._CMP_TRANSFORMED.csv) not included in the upload — values unavailable, not fabricated.",
  },
  {
    id: "alamar",
    studyId: "OSD-575",
    name: "NULISA-seq 200plex v1 Inflammation Panel",
    platform: "NULISA-seq",
    company: "Alamar Biosciences",
    targets: 203,
    measurementType: "immunoassay multiplex",
    sampleCount: 28,
    provenance: "nasa",
    notes:
      "203 inflammation-related protein targets. Numeric concentrations in external XLSX — unavailable. Target count and kit are real.",
  },
  {
    id: "hd71",
    studyId: "OSD-575",
    name: "Human Cytokine/Chemokine 71-Plex (HD71)",
    platform: "Luminex multiplex",
    company: "Eve Technologies (Calgary, Canada)",
    targets: 71,
    measurementType: "immunoassay multiplex",
    sampleCount: 28,
    provenance: "nasa",
    notes:
      "71 cytokine/chemokine targets. Numeric concentrations in external file — unavailable. Kit & target count are real.",
  },
  {
    id: "hdcvd9",
    studyId: "OSD-575",
    name: "Human Cardiovascular Disease Panel 3 9-Plex (HDCVD9)",
    platform: "Luminex multiplex",
    company: "Eve Technologies (Calgary, Canada)",
    targets: 9,
    measurementType: "immunoassay multiplex",
    sampleCount: 28,
    provenance: "nasa",
    notes:
      "9 cardiovascular-disease biomarker targets — directly relevant to astronaut cardiac monitoring. Numeric values unavailable. Kit & target count are real.",
  },
];

// ---------------------------------------------------------------------------
// OSD-575 — related sibling studies from the same SpaceX Inspiration4
// biobank (referenced in the OSD-575 study description, i_Investigation.txt).
// These 8 studies share the same Inspiration4 crew/experiment but cover
// different biospecimen types. Their ISA-Tab files were NOT uploaded — only
// their existence, IDs, and biospecimen types are recorded here as metadata.
// ---------------------------------------------------------------------------
export interface RelatedStudy {
  id: string;
  biospecimen: string;
  relation: string;
  filesUploaded: boolean;
}

export const osd575RelatedStudies: RelatedStudy[] = [
  { id: "OSD-569", biospecimen: "Whole blood (CBC + WGS + long-read RNA-seq + Ultima RNA-seq)", relation: "Same Inspiration4 crew/experiment", filesUploaded: true },
  { id: "OSD-570", biospecimen: "PBMC (scRNA-seq + scATAC-seq + TCR/BCR immune repertoire)", relation: "Same Inspiration4 crew/experiment", filesUploaded: true },
  { id: "OSD-571", biospecimen: "Plasma (multi-omic: cfDNA, metabolome, proteome, cfRNA)", relation: "Same Inspiration4 crew/experiment", filesUploaded: true },
  { id: "OSD-572", biospecimen: "Skin, oral, and nasal swabs", relation: "Same Inspiration4 crew/experiment", filesUploaded: false },
  { id: "OSD-573", biospecimen: "Dragon capsule samples", relation: "Same Inspiration4 crew/experiment", filesUploaded: false },
  { id: "OSD-574", biospecimen: "Skin biopsy (spatial transcriptomics + microbiome)", relation: "Same Inspiration4 crew/experiment", filesUploaded: true },
  { id: "OSD-656", biospecimen: "Urine (inflammation 203-plex panel)", relation: "Same Inspiration4 crew/experiment", filesUploaded: true },
  { id: "OSD-630", biospecimen: "Stool", relation: "Same Inspiration4 crew/experiment", filesUploaded: false },
];

// SpaceX Inspiration4 mission metadata (from i_Investigation.txt)
export const inspiration4Mission = {
  name: "SpaceX Inspiration4",
  missionStart: "09/16/2021",
  missionEnd: "09/18/2021",
  duration: "3 days",
  crewSize: 4,
  orbit: "Low Earth orbit (LEO)",
  crewDescription: "four private astronauts",
  missionLink: "https://osdr.nasa.gov/bio/repo/data/missions/SpaceX Inspiration4",
  projectIdentifier: "Inspiration4 Crew",
  studyDoi: "10.26030/mc5d-p710",
  publicationDoi: "10.1038/s41586-024-07639-y",
  publicationTitle: "The Space Omics and Medical Atlas (SOMA) and international astronaut biobank",
  publicationJournal: "Nature (2024)",
  firstAuthor: "Overbey EG",
};

// ---------------------------------------------------------------------------
// OSD-635 — real reported scientific findings (from study description)
// ---------------------------------------------------------------------------
export const osd635Findings = {
  genesAffected: 4422,
  downRegulated: ["αSMA (smooth muscle alpha actin)", "MMPs (matrix metalloproteinases)", "BMPs (bone morphogenic proteins)"],
  impactedPathways: ["STAT3", "NFκB", "PI3K/AKT", "HIF1α", "Endothelin"],
  summary:
    "HASMCs in microgravity down-regulate contractile, synthetic & osteogenic markers and alter STAT3/NFκB/PI3K-AKT/HIF1α/Endothelin signaling — mechanisms underlying astronaut vascular deconditioning.",
  doi: "10.26030/8n5a-q187",
  publication: "Scotti MM, Wilson BK, Bubenik JL, et al. npj Microgravity (2024)",
};

// ---------------------------------------------------------------------------
// OSD-937 — real factorial design (muscle countermeasure study)
// ---------------------------------------------------------------------------
export const osd937Design = {
  tissueSource: "Vastus Lateralis (skeletal muscle)",
  cellType: "Enriched CD56+ myoblasts",
  factors: ["Spaceflight (Flight / Ground)", "Donor Age (young / old)", "Treatment (Electric Stimulation / None)", "Time (Day 2 / Day 21)"],
  sampleCount: 30,
  geoRange: "GSM9013389–GSM9013418",
  countermeasureInsight:
    "Electrical stimulation was tested as a direct countermeasure for microgravity-induced muscle atrophy in engineered human muscle bundles — relevant to in-flight exercise prescription.",
};

// ---------------------------------------------------------------------------
// OSD-353 — real deconditioning-model cohorts
// ---------------------------------------------------------------------------
export const osd353Cohorts = {
  cosmonauts: 13,
  bedRestSubjects: 5,
  dryImmersionSubjects: 5,
  totalSamples: 46,
  models: ["Spaceflight", "Bed Rest (analog)", "Dry Immersion (analog)"],
};

// ---------------------------------------------------------------------------
// OSD-546 — REAL in-flight radiation dosimetry measured on the ISS
// (parsed from s_OSD-546.txt radiation dosimetry protocol fields)
// ---------------------------------------------------------------------------
// This is the FIRST real radiation dataset integrated into AstraHealth.
// Previously the Radiation Monitoring module was entirely simulated. These
// values are real NASA-measured dosimetry from the ISS Zvezda module.
export interface RadiationDoseMeasurement {
  studyId: string; // "OSD-546"
  vehicle: string; // "ISS-Zvezda" (real)
  radiationType: string; // "space radiation" (real)
  radiationSource: string; // "outer space" (real)
  exposureDurationDays: number; // 14 (real)
  absorbedDoseMGy: number; // 3.70746 milligray (real)
  doseRateMGyPerDay: number; // 0.264817 milligray/day (real)
  appliesTo: string; // "Space Flight samples" (Ground Control = non-irradiated)
  provenance: DataProvenance; // "nasa"
}

export const osd546RadiationDose: RadiationDoseMeasurement = {
  studyId: "OSD-546",
  vehicle: "ISS-Zvezda",
  radiationType: "space radiation",
  radiationSource: "outer space",
  exposureDurationDays: 14,
  absorbedDoseMGy: 3.70746,
  doseRateMGyPerDay: 0.264817,
  appliesTo: "Space Flight samples (7 of 13); Ground Control samples were non-irradiated",
  provenance: "nasa",
};

// OSD-546 — bone-health relevance (hBMSCs in osteogenic vs standard medium)
export const osd546BoneHealth = {
  cellType: "bone marrow mesenchymal stem cells (hBMSCs)",
  healthRelevance:
    "hBMSCs are the progenitors of bone-forming osteoblasts. Spaceflight impairs osteogenic differentiation, contributing to astronaut bone-density loss (~1–2% per month). Comparing osteogenic vs standard medium in microgravity informs bone-loss countermeasures.",
  mediumComparison: ["osteogenic medium", "standard medium"],
  flightSamples: 7, // 3 osteogenic + 4 standard
  groundSamples: 6, // 3 osteogenic + 3 standard
  durationDays: 14,
  hardware: "KUBIC interface container single level (KIC-SL)",
  geoRange: "GSM2696758–GSM2696770",
  arrayDesign: "AFFY HuGene 1.0 st v1",
};

// ---------------------------------------------------------------------------
// OSD-1005 — PROMETEO 2 neuroprotection findings
// (from i_Investigation.txt study description + s_OSD-1005.txt factors)
// ---------------------------------------------------------------------------
export const osd1005Neuroprotection = {
  studyName: "PROMETEO 2 (Nano Protection)",
  cellLine: "SH-SY5Y (neuroblastoma — neuronal model)",
  mission: "Ax-3 (ISS, Jan 18 – Feb 9, 2024)",
  incubator: "Kubik incubator",
  durationInSpaceHours: 159,
  countermeasure: "Cerium oxide nanoparticles (nanoceria) — antioxidant",
  treatmentArms: ["with nanoceria", "without nanoceria"],
  gravityConditions: ["1G (random positioning machine)", "µG (microgravity)", "1G on Earth"],
  healthRelevance:
    "The CNS is highly susceptible to oxidative stress from cosmic radiation + microgravity. Nanoceria acts as a reactive-oxygen-species (ROS) scavenger, potentially protecting neurons and preserving astronaut cognitive function during long-duration missions.",
  doi: "10.26030/n4wy-gy28",
  publicationDoi: "10.1002/smsc.70271",
  publicationTitle: "Neuroprotective Effects of Cerium Oxide Nanoparticles During Spaceflight",
  firstAuthor: "Carmignani A",
};

// ---------------------------------------------------------------------------
// OSD-118 — AG1522 fibroblast spaceflight transcriptomics
// (from s_OSD-118.txt + assay files)
// ---------------------------------------------------------------------------
export const osd118Findings = {
  cellLine: "AG1522 (foreskin fibroblast — radiobiology model)",
  sampleCount: 16,
  timePoints: ["3 days", "14 days"],
  groups: ["Space Flight", "Ground Control"],
  platforms: {
    exiqon: {
      array: "Exiqon miRcury LNA microRNA (7th-gen)",
      label: "Hy3",
      measures: "microRNA (miRNA) expression regulation",
    },
    illumina: {
      array: "Illumina Human HT-12 v4 Beadchip",
      label: "Biotin",
      measures: "whole gene expression",
    },
  },
  healthRelevance:
    "AG1522 fibroblasts are a standard radiobiology model. This dual-platform study informs cellular damage/repair responses and microRNA-mediated regulatory mechanisms under spaceflight — relevant to understanding tissue-level radiation sensitivity and adaptive responses.",
  geoPrefix: "Hsap_AG1522_cells_",
};

// ---------------------------------------------------------------------------
// OSD-344 — cardiovascular progenitor cell qPCR findings
// (from i_Investigation.txt study description + publication title)
// ---------------------------------------------------------------------------
export const osd344Findings = {
  cellType: "cardiovascular progenitor cells (CPCs)",
  donors: "3 neonates + 3 adults (6 donors total)",
  durationDays: 12,
  mission: "SpaceX-11 (ISS)",
  rnaTypes: ["mRNA", "miRNA"],
  ageGroups: ["neonate", "adult"],
  conditions: ["Space Flight", "Ground Control"],
  sampleCount: 24,
  platform: "BioRad real-time PCR (SYBR Green I)",
  keyFinding:
    "CPCs cultured aboard the ISS exhibit altered developmental and functional properties compared to matched ground controls — indicating microgravity directly affects cardiac progenitor cell development.",
  healthRelevance:
    "Cardiovascular progenitor cells give rise to the heart's muscle, vasculature, and pacemaker cells. Their altered development in microgravity suggests a mechanism for the cardiac deconditioning observed in astronauts during long-duration spaceflight. The neonate-vs-adult comparison reveals age-dependent sensitivity of cardiac cells to the spaceflight environment.",
  doi: "10.1038/s41526-018-0048-x",
  publicationTitle: "Cardiovascular progenitor cells cultured aboard the International Space Station exhibit altered developmental and functional properties",
  firstAuthor: "Baio J",
  journal: "npj Microgravity (2018)",
  geoRange: "GSM3001053–GSM3001076",
  // ML assessment: ISA-Tab metadata only (24 samples). No numeric qPCR Ct values
  // or expression data were uploaded — the derived data files are externally
  // referenced. Therefore NOT suitable for supervised ML training. Integrated
  // as a knowledge/evidence source for risk assessment and the AI Copilot.
  mlSuitability: "not-suitable-for-supervised-training (metadata only; no numeric expression values uploaded)",
};

// ---------------------------------------------------------------------------
// OSD-941 — Alzheimer's disease brain organoid findings
// (from i_Investigation.txt study description + publication title)
// ---------------------------------------------------------------------------
export const osd941Findings = {
  model: "Human cortical organoids from iPSCs with familial Alzheimer's mutations (APP V717G, PSEN1 M233L, PSEN2 N141I)",
  mission: "SpaceX-30 (ISS, 40-day culture, Mar–Apr 2024)",
  platform: "SpaceTango LLC CubeLab; Illumina NovaSeq 6000",
  sampleCount: 46,
  multiOmics: ["transcriptomics (RNA-Seq)", "proteomics", "metabolic analyses"],
  keyFindings: [
    "Altered glycolytic activity and lactate-to-malate ratios (metabolic/mitochondrial remodeling)",
    "Changes in amyloid-beta (Aβ) processing",
    "Changes in tau (AD-associated molecular programs accelerated by spaceflight)",
    "Coordinated shift in neuronal and cellular states",
  ],
  healthRelevance:
    "Alzheimer's disease–associated molecular programs are accelerated in spaceflight conditions. This has direct implications for astronaut cognitive health during long-duration deep-space missions — suggesting that microgravity + cosmic radiation may accelerate neurodegenerative processes. Combined with OSD-1005 (neuroprotection via nanoceria), this provides critical evidence for brain health risk assessment.",
  doi: "10.26030/twtb-sc40",
  publicationTitle: "Spaceflight accelerates Alzheimer's disease–associated molecular programs in human brain organoids",
  firstAuthor: "Moreira NCS",
  mlSuitability: "not-suitable-for-supervised-training (ISA-Tab metadata only; no RNA-seq count matrices uploaded)",
};

// ---------------------------------------------------------------------------
// OSD-574 — Inspiration4 skin biopsy / microbiome findings
// (from s_OSD-574.txt sample metadata + assay files)
// ---------------------------------------------------------------------------
export const osd574Findings = {
  crew: "C001–C004 (same SpaceX Inspiration4 crew as OSD-575)",
  sampleTypes: ["Skin Biopsy (spatial transcriptomics)", "Swab (metagenomic + metatranscriptome)"],
  timePoints: ["L-44 (pre-flight)", "R+1 (post-flight)"],
  sampleCount: 105,
  platforms: {
    spatialTx: {
      assay: "Spatial transcriptomics (GeoMx)",
      instrument: "Illumina NovaSeq 6000",
      samples: 97,
      measures: "tissue-level gene expression in skin biopsies",
    },
    metagenomic: {
      assay: "Whole-genome shotgun metagenomic sequencing",
      instrument: "Illumina NovaSeq 6000",
      samples: 8,
      measures: "skin microbiome composition (taxonomic profiling)",
    },
    metatranscriptome: {
      assay: "Metatranscriptome RNA-seq (ribo-depletion)",
      instrument: "Illumina NovaSeq 6000",
      samples: 8,
      measures: "active microbial gene expression (functional microbiome)",
    },
  },
  healthRelevance:
    "Skin is the first barrier against environmental stressors and radiation. Spatial transcriptomics reveals tissue-level changes in skin biology from spaceflight, while metagenomic/metatranscriptomic profiling characterizes the skin microbiome — both relevant to wound healing, radiation dermatitis risk, and immune function during long-duration missions. Directly connected to the same crew (C001–C004) as OSD-575 serum biomarkers.",
  biobank: "SOMA (Space Omics and Medical Atlas) — Nature 2024",
  mlSuitability: "not-suitable-for-supervised-training (ISA-Tab metadata only; no expression/count matrices uploaded)",
};

// ---------------------------------------------------------------------------
// OSD-571 — Inspiration4 plasma multi-omic findings
// (from s_OSD-571.txt sample metadata + 5 assay files)
// ---------------------------------------------------------------------------
export const osd571Findings = {
  crew: "C001–C004 (same SpaceX Inspiration4 crew as OSD-575)",
  materialType: "Plasma",
  timePoints: ["L-92", "L-44", "L-3", "R+1", "R+45", "R+82", "R+194"],
  sampleCount: 117,
  platforms: {
    cfDna: { assay: "cfDNA genome sequencing", instrument: "Element AVITI system", samples: 24, measures: "cell-free DNA (genomic variants, cfDNA fragments)" },
    metabolome: { assay: "Metabolite profiling (mass spectrometry)", instrument: "Agilent 6550 iFunnel Q-TOF", samples: 24, measures: "plasma metabolome" },
    proteomeBruker: { assay: "Protein expression (mass spectrometry)", instrument: "Bruker timsTOF Pro-2", samples: 21, measures: "plasma proteome" },
    proteomeThermo: { assay: "Protein expression (mass spectrometry)", instrument: "Thermo Q Exactive HF Orbitrap", samples: 24, measures: "plasma proteome" },
    cfRna: { assay: "cfRNA transcription profiling (RNA-seq)", instrument: "Illumina NextSeq 2K", samples: 47, measures: "cell-free RNA (transcriptome)" },
  },
  healthRelevance:
    "Plasma multi-omics from the same Inspiration4 crew (C001–C004) as OSD-575 serum biomarkers. cfDNA reveals cell damage/tissue injury, metabolome captures metabolic shifts, proteome tracks inflammation and organ function, and cfRNA provides systemic gene expression. Together with OSD-575 (serum) and OSD-656 (urine), this forms a comprehensive multi-biospecimen, multi-omic profile of the same crew across 7 time points — the richest available dataset for astronaut health analytics.",
  biobank: "SOMA (Space Omics and Medical Atlas) — Nature 2024",
  mlSuitability: "not-suitable-for-supervised-training (ISA-Tab metadata only; no count/intensity matrices uploaded)",
};

// ---------------------------------------------------------------------------
// OSD-656 — Inspiration4 urine inflammation panel findings
// (from s_OSD-656.txt + i_Investigation.txt)
// ---------------------------------------------------------------------------
export const osd656Findings = {
  crew: "C001–C004 (same SpaceX Inspiration4 crew as OSD-575)",
  materialType: "Urine",
  timePoints: ["L-92", "L-44", "L-3", "R+1", "R+45", "R+82"],
  sampleCount: 22,
  targets: 203,
  panel: "NULISA-seq 200plex v1 Inflammation Panel",
  company: "Alamar Biosciences",
  healthRelevance:
    "Urine biomarker profiling provides non-invasive monitoring of 203 inflammatory, cytokine, and chemokine proteins. This is directly relevant to astronaut health monitoring — kidney function, systemic inflammation, immune response, and hydration status can all be tracked through urine without blood draws. Uses the same NULISA-seq 203-plex inflammation panel as OSD-575's serum inflammation assay, enabling direct cross-biospecimen comparison (blood vs urine) for the same crew.",
  doi: "10.26030/7cax-yj10",
  publications: [
    "Nature (2024) — SOMA astronaut biobank, doi:10.1038/s41586-024-07639-y",
    "Nature Communications (2024) — Inspiration4 biospecimen collection, doi:10.1038/s41467-024-48806-z",
  ],
  biobank: "SOMA (Space Omics and Medical Atlas) — Nature 2024",
  mlSuitability: "not-suitable-for-supervised-training (ISA-Tab metadata only; no numeric protein concentrations uploaded)",
};

// ---------------------------------------------------------------------------
// OSD-569 — Inspiration4 whole blood multi-platform findings
// (from s_OSD-569.txt + 5 assay files + i_Investigation.txt)
// ---------------------------------------------------------------------------
export const osd569Findings = {
  crew: "C001–C004 (same SpaceX Inspiration4 crew as OSD-575)",
  materialType: "Whole Blood + RBC pellet",
  timePoints: ["L-92", "L-44", "L-3", "R+1", "R+45", "R+82", "R+194"],
  sampleCount: 81,
  platforms: {
    cbc: { assay: "Complete Blood Count (CBC)", instrument: "Sysmex XN Analyzer", samples: 28, measures: "standard hematology (RBC, WBC, hemoglobin, platelets, hematocrit)" },
    wgs: { assay: "Whole-genome sequencing", instrument: "Element AVITI system", samples: 8, measures: "cfDNA / somatic mutations" },
    targetedSeq: { assay: "Targeted genome sequencing", instrument: "Illumina NovaSeq 6000", samples: 24, measures: "clonal hematopoiesis tracking" },
    longReadRna: { assay: "Long-read direct RNA-seq", instrument: "Oxford Nanopore PromethION", samples: 29, measures: "epitranscriptome (RNA modifications)" },
    ultimaRna: { assay: "RNA-seq", instrument: "Ultima Genomics UG100", samples: 28, measures: "transcriptome (gene expression)" },
  },
  healthRelevance:
    "CBC is the most clinically standard blood test — RBC/WBC/platelet/hemoglobin counts directly monitor anemia, infection, immune function, and clotting. WGS + targeted sequencing track clonal hematopoiesis and somatic mutations from radiation exposure. Long-read RNA-seq reveals RNA-level modifications (epitranscriptome) — a cutting-edge layer of gene regulation. Together with OSD-575 (serum), OSD-571 (plasma), and OSD-570 (PBMC), this completes blood-based multi-omic profiling of the same crew.",
  doi: "10.26030/e0rx-sh52",
  biobank: "SOMA (Space Omics and Medical Atlas) — Nature 2024",
  mlSuitability: "not-suitable-for-supervised-training (ISA-Tab metadata only; no CBC values / expression count matrices uploaded)",
};

// ---------------------------------------------------------------------------
// OSD-570 — Inspiration4 PBMC single-cell multi-omic findings
// (from 3 assay files — scMultiome + scRNA-seq TCR + scRNA-seq BCR)
// ---------------------------------------------------------------------------
export const osd570Findings = {
  crew: "C001–C004 (same SpaceX Inspiration4 crew as OSD-575)",
  materialType: "Peripheral blood mononuclear cells (PBMCs)",
  sampleCount: 24, // unique biospecimen samples (from s_OSD-570.txt study file)
  timePoints: ["L-92", "L-44", "L-3", "R+1", "R+45", "R+82"],
  platforms: {
    snRnaSeq: { assay: "snRNA-seq (single-nuclei RNA-seq)", instrument: "10x Chromium Multiome + Illumina NovaSeq 6000", samples: 24, measures: "cell-type-resolved gene expression (single nuclei)" },
    scAtacSeq: { assay: "snATAC-seq (single-nuclei ATAC-seq)", instrument: "10x Chromium Multiome + Illumina NovaSeq 6000", samples: 24, measures: "chromatin accessibility" },
    tcr: { assay: "scRNA-seq (TCR V(D)J repertoire)", instrument: "10x Chromium 5' v2 + Illumina NovaSeq 6000", samples: 16, measures: "T-cell receptor clonality / adaptive immunity" },
    bcr: { assay: "scRNA-seq (BCR V(D)J repertoire)", instrument: "10x Chromium 5' v2 + Illumina NovaSeq 6000", samples: 16, measures: "B-cell receptor clonality / antibody response" },
  },
  healthRelevance:
    "Single-cell multi-omic profiling of PBMCs provides the highest-resolution view of the astronaut immune system. snRNA-seq identifies individual immune cell populations (T cells, B cells, NK cells, monocytes), snATAC-seq reveals chromatin accessibility changes, and TCR/BCR V(D)J repertoire sequencing tracks adaptive immune clonality — directly monitoring immune suppression, activation, and adaptation during spaceflight. This is the most detailed immune monitoring dataset in the AstraHealth platform.",
  doi: "10.26030/41s1-j243",
  biobank: "SOMA (Space Omics and Medical Atlas) — Nature 2024",
  mlSuitability: "not-suitable-for-supervised-training (ISA-Tab metadata only; no count matrices / cell annotations uploaded)",
};

// ---------------------------------------------------------------------------
// Provenance summary used across the UI
// ---------------------------------------------------------------------------
export const provenanceSummary = {
  totalStudies: nasaStudies.length,
  totalSamples: nasaStudies.reduce((a, s) => a + s.sampleCount, 0),
  humanSubjects: 27, // 4 (OSD-575) + 23 (OSD-353)
  dataLayers: [
    "Study & sample metadata (ISA-Tab) — NASA research data",
    "Assay platforms, kits & target counts — NASA research data",
    "Scientific findings & pathways — NASA research data",
    "ISS radiation dosimetry (OSD-546) — NASA measured data (3.70746 mGy / 14 d)",
    "Neuroprotection evidence (OSD-1005 / PROMETEO 2) — NASA research data",
    "Alzheimer's brain organoid evidence (OSD-941, SpaceX-30) — NASA research data",
    "Whole blood CBC + WGS + long-read RNA-seq + Ultima RNA-seq (OSD-569, Inspiration4) — NASA research data",
    "PBMC single-cell multi-omic: scRNA-seq + scATAC-seq + TCR/BCR (OSD-570, Inspiration4) — NASA research data",
    "Skin biopsy spatial transcriptomics + microbiome (OSD-574, Inspiration4) — NASA research data",
    "Plasma multi-omic: cfDNA + metabolome + proteome + cfRNA (OSD-571, Inspiration4) — NASA research data",
    "Urine inflammation 203-plex panel (OSD-656, Inspiration4) — NASA research data",
    "Fibroblast damage/repair & miRNA (OSD-118) — NASA research data",
    "Cardiac progenitor cell development (OSD-344, qPCR) — NASA research data",
    "Physiological indicators (HR/HRV/SpO₂/sleep) — representative values for monitoring scenario",
    "Per-astronaut radiation exposure estimates — representative (OSD-546 dose is per cell-culture experiment)",
  ],
};
