// Roadmap Tier and Phase Configuration
// Based on Blueprint/Superpower comparative analysis

import type { RoadmapTierConfig, RoadmapPhaseConfig } from './types'

// Tier Configuration
export const ROADMAP_TIERS: Record<string, RoadmapTierConfig> = {
  basic: {
    id: 'basic',
    nameEn: 'Basic',
    nameSv: 'Grund',
    description:
      'Blood pressure monitoring, basic lipids, HbA1c/glucose, body metrics, baseline kidney/liver markers. Core cardiometabolic risk factors with low cost and simple sampling.',
    descriptionSv:
      'Blodtrycksövervakning, grundläggande lipider, HbA1c/glukos, kroppsmått, basala njur/lever-markörer. Grundläggande kardiometabola riskfaktorer med låg kostnad och enkel provtagning.',
    criteria:
      'Major modifiable risk factors for CVD/mortality; elevated blood pressure, metabolic and lipid risk are core drivers.',
    commitmentLevel: 'low',
    color: 'forest',
  },
  intermediate: {
    id: 'intermediate',
    nameEn: 'Intermediate',
    nameSv: 'Mellanliggande',
    description:
      'ApoB, Lp(a), fasting insulin, IGF-1, hs-CRP, urine albumin/creatinine, vitamin D/iron status. Enhanced risk stratification beyond basic panel.',
    descriptionSv:
      'ApoB, Lp(a), fastande insulin, IGF-1, hs-CRP, urin albumin/kreatinin, vitamin D/järnstatus. Förbättrad riskstratifiering utöver grundpanelen.',
    criteria:
      'ESC/EAS guidance highlights ApoB and Lp(a) for risk stratification; CKD risk better captured with both GFR and albuminuria.',
    commitmentLevel: 'moderate',
    color: 'sand',
  },
  advanced: {
    id: 'advanced',
    nameEn: 'Advanced',
    nameSv: 'Avancerad',
    description:
      'DEXA body composition, VO2max fitness testing, thyroid antibodies, microbiome tests. High-signal functional metrics that predict outcomes more strongly than many lab markers.',
    descriptionSv:
      'DEXA-kroppssammansättning, VO2max-konditionstest, sköldkörtelantikroppar, mikrobiomstest. Högkvalitativa funktionella mått som förutsäger utfall starkare än många labbmarkörer.',
    criteria:
      'Cardiorespiratory fitness is a strong predictor of morbidity/mortality; body composition distribution adds risk signal beyond BMI.',
    commitmentLevel: 'high',
    color: 'terra',
  },
  clinical: {
    id: 'clinical',
    nameEn: 'Clinical/Research',
    nameSv: 'Klinisk/Forskning',
    description:
      'Full-body MRI screening, microplastics blood assay, PFAS testing, advanced lipoprotein particle tests. Higher uncertainty, research-grade, requires specialist access.',
    descriptionSv:
      'Helkropps-MR-screening, mikroplast-blodanalys, PFAS-testning, avancerade lipoproteinpartikeltest. Högre osäkerhet, forskningsgrad, kräver specialisttillgång.',
    criteria:
      'Higher uncertainty/heterogeneous utility; some are research/environmental exposure pathways; some require referral structures.',
    commitmentLevel: 'very-high',
    color: 'ink',
  },
}

// Phase Configuration
export const ROADMAP_PHASES: Record<string, RoadmapPhaseConfig> = {
  baseline: {
    id: 'baseline',
    nameEn: 'Baseline Foundations',
    nameSv: 'Grundläggande bas',
    monthStart: 0,
    monthEnd: 1,
    description:
      'Home metrics + first blood panel. Establish your minimum viable longevity dashboard with one broad package plus home measurements.',
    descriptionSv:
      'Hemmamatvärden + första blodpanelen. Etablera din minsta fungerande livslängdsdashboard med ett brett paket plus hemmamätningar.',
    goals: [
      'Complete baseline blood panel (25-45 markers)',
      'Establish home blood pressure monitoring',
      'Record baseline body measurements (weight, waist)',
      'Create biomarker tracking habit',
    ],
    goalsSv: [
      'Genomför basblodpanel (25-45 markörer)',
      'Etablera hemblodtrycksövervakning',
      'Registrera basala kroppsmått (vikt, midja)',
      'Skapa vana för biomarköruppföljning',
    ],
    estimatedCostKr: { min: 1295, max: 2500 },
    icon: 'Baseline',
  },
  deepening: {
    id: 'deepening',
    nameEn: 'Cardiometabolic Deepening',
    nameSv: 'Kardiometabolisk fördjupning',
    monthStart: 2,
    monthEnd: 3,
    description:
      'Add ApoB, Lp(a), insulin, kidney integrity, inflammation markers. Replicate the risk-stratification edge that advanced panels emphasize.',
    descriptionSv:
      'Lägg till ApoB, Lp(a), insulin, njurintegritet, inflammationsmarkörer. Replikera den riskstratifieringsfördel som avancerade paneler betonar.',
    goals: [
      'Test ApoB and Lp(a) (at least once lifetime for Lp(a))',
      'Add fasting insulin and/or IGF-1',
      'Complete kidney integrity (UACR + GFR)',
      'Add hs-CRP inflammation marker',
    ],
    goalsSv: [
      'Testa ApoB och Lp(a) (minst en gång i livet för Lp(a))',
      'Lägg till fastande insulin och/eller IGF-1',
      'Komplettera njurintegritet (UACR + GFR)',
      'Lägg till hs-CRP inflammationsmarkör',
    ],
    estimatedCostKr: { min: 1500, max: 2500 },
    icon: 'HeartPulse',
  },
  performance: {
    id: 'performance',
    nameEn: 'Performance & Composition',
    nameSv: 'Prestation & Kroppssammansättning',
    monthStart: 4,
    monthEnd: 6,
    description:
      'Add high-signal functional metrics (fitness and composition) that often predict outcomes more strongly than niche lab markers. Mirrors measure → intervene → measure structure.',
    descriptionSv:
      'Lägg till högkvalitativa funktionella mått (kondition och sammansättning) som ofta förutsäger utfall starkare än nischade labbmarkörer. Speglar strukturen mäta → intervenera → mäta.',
    goals: [
      'Complete VO2max testing',
      'DEXA body composition scan',
      'Review 6-month trends and adjust interventions',
      'Identify next-level optimization targets',
    ],
    goalsSv: [
      'Genomför VO2max-testning',
      'DEXA-kroppsammansättningsscanning',
      'Granska 6-månaders trender och justera interventioner',
      'Identifiera optimeringsmål på nästa nivå',
    ],
    estimatedCostKr: { min: 3000, max: 4000 },
    icon: 'Activity',
  },
  'advanced-modules': {
    id: 'advanced-modules',
    nameEn: 'Optional Advanced Modules',
    nameSv: 'Valfria avancerade moduler',
    monthStart: 7,
    monthEnd: 12,
    description:
      'Epigenetic age testing, full-body MRI, environmental toxin panels. For users who want to approximate the edge components, acknowledging higher cost/complexity.',
    descriptionSv:
      'Epigenetisk ålderstestning, helkropps-MR, miljögiftspaneler. För användare som vill närma sig avancerade komponenter, med medvetenhet om högre kostnad/komplexitet.',
    goals: [
      'Consider epigenetic biological age test',
      'Evaluate need for imaging (MRI) based on risk profile',
      'Annual refresh of baseline + intermediate panels',
      'Establish annual cadence for ongoing monitoring',
    ],
    goalsSv: [
      'Överväg epigenetiskt biologiskt ålderstest',
      'Utvärdera behov av bilddiagnostik (MR) baserat på riskprofil',
      'Årlig uppdatering av bas + mellananliggande paneler',
      'Etablera årlig kadens för löpande övervakning',
    ],
    estimatedCostKr: { min: 2000, max: 25000 },
    icon: 'Sparkles',
  },
}

export function getTier(id: string): RoadmapTierConfig | undefined {
  return ROADMAP_TIERS[id]
}

export function getPhase(id: string): RoadmapPhaseConfig | undefined {
  return ROADMAP_PHASES[id]
}

export function getPhasesInOrder(): RoadmapPhaseConfig[] {
  return ['baseline', 'deepening', 'performance', 'advanced-modules'].map(
    (id) => ROADMAP_PHASES[id]
  )
}

export function getTiersInOrder(): RoadmapTierConfig[] {
  return ['basic', 'intermediate', 'advanced', 'clinical'].map(
    (id) => ROADMAP_TIERS[id]
  )
}
