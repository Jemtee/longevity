// Longevity Testing Roadmap - Test Definitions
// Based on Blueprint/Superpower comparative analysis for Swedish users

import type { RoadmapTest } from './types'

export const ROADMAP_TESTS: RoadmapTest[] = [
  // ============================================================================
  // BASIC TIER - Phase 1: Baseline Foundations
  // ============================================================================

  {
    id: 'baseline-panel',
    nameEn: 'Baseline Blood Panel',
    nameSv: 'Basblodpanel',
    description:
      'Comprehensive baseline panel covering common cardiometabolic risk factors: lipids, glucose, HbA1c, kidney/liver function, thyroid, and basic inflammation markers.',
    descriptionSv:
      'Omfattande baspanel som täcker vanliga kardiometabola riskfaktorer: lipider, glukos, HbA1c, njur/leverfunktion, sköldkörtel och grundläggande inflammationsmarkörer.',
    longevitySignal:
      'Covers major modifiable risk factors that drive cardiovascular disease and metabolic dysfunction - the leading causes of morbidity and mortality.',
    evidenceGrade: 'A',
    category: 'blood-panel',
    healthDomains: ['cardiovascular', 'metabolic', 'renal', 'inflammation'],
    tier: 'basic',
    recommendedPhase: 'baseline',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'werlabs',
          testName: 'Hälsokontroll Bas',
          priceKr: 1295,
          url: 'https://werlabs.se/blodprov/halsokontroll-bas',
          notes: '25 markers across 8 health areas; physician comment in 2-4 workdays',
        },
        {
          providerId: 'werlabs',
          testName: 'Hälsokontroll Standard',
          priceKr: 1995,
          url: 'https://werlabs.se/blodprov/halsokontroll-standard',
          notes: '45 markers; more comprehensive baseline',
        },
        {
          providerId: 'medisera',
          testName: 'Hälsokontroll',
          priceKr: 1595,
          notes: 'Similar coverage; 1-5 day turnaround with physician comment',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once at baseline (Month 0-1)',
      ongoing: 'Every 6-12 months if stable; more frequently if actively changing diet/training/sleep',
    },
    relatedBiomarkerIds: [
      'b0000001-0000-0000-0000-000000000001', // HbA1c
      'b0000002-0000-0000-0000-000000000002', // Fasting Glucose
      'b0000004-0000-0000-0000-000000000004', // Total Cholesterol
      'b0000005-0000-0000-0000-000000000005', // LDL
      'b0000006-0000-0000-0000-000000000006', // HDL
      'b0000007-0000-0000-0000-000000000007', // Triglycerides
      'b0000023-0000-0000-0000-000000000023', // Creatinine
      'b0000024-0000-0000-0000-000000000024', // eGFR
      'b0000025-0000-0000-0000-000000000025', // ALT
      'b0000026-0000-0000-0000-000000000026', // AST
      'b0000011-0000-0000-0000-000000000011', // TSH
    ],
    sampleType: 'blood',
  },

  {
    id: 'blood-pressure',
    nameEn: 'Blood Pressure Monitoring',
    nameSv: 'Blodtrycksövervakning',
    description:
      'Regular blood pressure measurement (home monitoring + periodic clinical validation). Tracks systolic and diastolic pressure over time.',
    descriptionSv:
      'Regelbunden blodtrycksmätning (hemövervakning + periodisk klinisk validering). Spårar systoliskt och diastoliskt tryck över tid.',
    longevitySignal:
      'Hypertension is described by ESC as the most important modifiable risk factor for all-cause/CVD morbidity and mortality. Risk scales continuously with BP.',
    evidenceGrade: 'A',
    category: 'home-monitoring',
    healthDomains: ['cardiovascular'],
    tier: 'basic',
    recommendedPhase: 'baseline',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'werlabs',
          testName: 'Home BP monitor (self-purchase)',
          priceKr: 400,
          notes: 'Validated home monitors available at pharmacies; Omron recommended',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Start tracking immediately',
      ongoing: 'Daily or multiple times per week for home; annual clinical validation',
      citation: 'ESC/ESH Hypertension Guidelines 2023',
    },
    sampleType: 'home',
  },

  {
    id: 'waist-height-ratio',
    nameEn: 'Waist-to-Height Ratio',
    nameSv: 'Midja-till-längd-kvot',
    description:
      'Simple anthropometric measure: waist circumference divided by height. Better mortality predictor than BMI.',
    descriptionSv:
      'Enkel antropometrisk mätning: midjeomkrets delat med längd. Bättre mortalitetsprediktor än BMI.',
    longevitySignal:
      'Central adiposity shows robust associations with mortality. BMJ reviews report near J-shaped relations for waist and waist-to-height ratio with all-cause mortality.',
    evidenceGrade: 'A',
    category: 'home-monitoring',
    healthDomains: ['metabolic', 'cardiovascular'],
    tier: 'basic',
    recommendedPhase: 'baseline',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'werlabs',
          testName: 'Tape measure (self-purchase)',
          priceKr: 50,
          notes: 'Consistent measurement protocol required; measure at navel level',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once at baseline',
      ongoing: 'Monthly if actively changing body composition',
      citation: 'Ashwell & Gibson, Obesity Reviews 2016',
    },
    sampleType: 'home',
  },

  // ============================================================================
  // INTERMEDIATE TIER - Phase 2: Cardiometabolic Deepening
  // ============================================================================

  {
    id: 'apob',
    nameEn: 'Apolipoprotein B (ApoB)',
    nameSv: 'Apolipoprotein B (ApoB)',
    description:
      'Measures the number of atherogenic lipoprotein particles. Better predictor of cardiovascular risk than LDL-C alone.',
    descriptionSv:
      'Mäter antalet aterogena lipoproteinpartiklar. Bättre prediktor för kardiovaskulär risk än enbart LDL-C.',
    longevitySignal:
      'ESC/EAS guidance supports ApoB for risk assessment, especially with high TG/diabetes/obesity/metabolic syndrome. Can be used as alternative to LDL-C when available.',
    evidenceGrade: 'A',
    category: 'blood-panel',
    healthDomains: ['cardiovascular'],
    tier: 'intermediate',
    recommendedPhase: 'deepening',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'blodkollen',
          testName: 'ApoB',
          priceKr: 179,
          notes: 'Individual test; can combine with other markers',
        },
        {
          providerId: 'werlabs',
          testName: 'Apolipoprotein B',
          priceKr: 195,
          notes: 'Available as add-on to panels',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once at baseline for risk stratification',
      ongoing: 'Recheck with major lipid-modifying interventions or annually if tracking risk aggressively',
      citation: 'ESC/EAS Dyslipidaemia Guidelines 2019',
    },
    relatedBiomarkerIds: ['b0000008-0000-0000-0000-000000000008'],
    sampleType: 'blood',
  },

  {
    id: 'lp-a',
    nameEn: 'Lipoprotein(a)',
    nameSv: 'Lipoprotein(a)',
    description:
      'Genetically determined lipoprotein that increases cardiovascular and stroke risk. Largely unchangeable but important for risk stratification.',
    descriptionSv:
      'Genetiskt bestämt lipoprotein som ökar kardiovaskulär risk och strokedrisk. Stort sett oföränderligt men viktigt för riskstratifiering.',
    longevitySignal:
      'ESC/EAS guidance includes "Lp(a) measurement should be considered at least once in each adult" for risk stratification. Highly prognostic.',
    evidenceGrade: 'A',
    category: 'blood-panel',
    healthDomains: ['cardiovascular'],
    tier: 'intermediate',
    recommendedPhase: 'deepening',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'blodkollen',
          testName: 'Lp(a)',
          priceKr: 299,
          notes: 'Individual test',
        },
        {
          providerId: 'werlabs',
          testName: 'Lipoprotein(a)',
          priceKr: 345,
          notes: 'Available as add-on',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'At least once in adulthood (genetically stable)',
      ongoing: 'Generally not needed to repeat; value is stable over lifetime',
      citation: 'ESC/EAS Dyslipidaemia Guidelines 2019',
    },
    sampleType: 'blood',
  },

  {
    id: 'fasting-insulin',
    nameEn: 'Fasting Insulin',
    nameSv: 'Fastande Insulin',
    description:
      'Insulin level after overnight fast. Early marker of insulin resistance before glucose dysregulation appears.',
    descriptionSv:
      'Insulinnivå efter nattfasta. Tidig markör för insulinresistens innan glukosstörning uppstår.',
    longevitySignal:
      'Key marker for understanding metabolism beyond glucose. Elevated fasting insulin often precedes HbA1c changes by years.',
    evidenceGrade: 'A',
    category: 'blood-panel',
    healthDomains: ['metabolic'],
    tier: 'intermediate',
    recommendedPhase: 'deepening',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'blodkollen',
          testName: 'Insulin',
          priceKr: 449,
          notes: 'Requires fasting; individual test',
        },
        {
          providerId: 'werlabs',
          testName: 'Insulin',
          priceKr: 495,
          notes: 'Available in metabolic packages',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once at baseline',
      ongoing: 'Every 6-12 months if actively improving metabolic health',
      citation: 'Superpower Advanced Panel rationale',
    },
    relatedBiomarkerIds: ['b0000003-0000-0000-0000-000000000003'],
    sampleType: 'blood',
  },

  {
    id: 'uacr',
    nameEn: 'Urine Albumin/Creatinine Ratio (UACR)',
    nameSv: 'Urin Albumin/Kreatinin-kvot (UAKR)',
    description:
      'Measures protein leakage in urine - early sign of kidney damage and cardiometabolic risk.',
    descriptionSv:
      'Mäter proteinläckage i urinen - tidigt tecken på njurskada och kardiometabol risk.',
    longevitySignal:
      'KDIGO recommends urine albumin measurement alongside GFR for detection/evaluation of CKD risk. Better captures early kidney dysfunction.',
    evidenceGrade: 'A',
    category: 'blood-panel',
    healthDomains: ['renal', 'cardiovascular'],
    tier: 'intermediate',
    recommendedPhase: 'deepening',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'blodkollen',
          testName: 'U-Albumin/Krea',
          priceKr: 399,
          notes: 'Urine sample',
        },
        {
          providerId: 'werlabs',
          testName: 'Albumin/Kreatinin-kvot (urin)',
          priceKr: 425,
          notes: 'Available in kidney packages',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once at baseline',
      ongoing: 'Annually for at-risk individuals (hypertension, diabetes)',
      citation: 'KDIGO CKD Guidelines 2012',
    },
    sampleType: 'urine',
  },

  {
    id: 'hscrp',
    nameEn: 'High-Sensitivity C-Reactive Protein (hs-CRP)',
    nameSv: 'Högkänsligt C-reaktivt protein (hs-CRP)',
    description:
      'Sensitive marker of systemic inflammation. Elevated levels indicate chronic low-grade inflammation linked to cardiovascular risk.',
    descriptionSv:
      'Känslig markör för systemisk inflammation. Förhöjda nivåer indikerar kronisk låggradig inflammation kopplad till kardiovaskulär risk.',
    longevitySignal:
      'Chronic inflammation is a root driver of aging and disease. hs-CRP adds cardiovascular risk prediction beyond lipids alone.',
    evidenceGrade: 'A',
    category: 'blood-panel',
    healthDomains: ['inflammation', 'cardiovascular'],
    tier: 'intermediate',
    recommendedPhase: 'deepening',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'blodkollen',
          testName: 'CRP, Känslig',
          priceKr: 279,
          notes: 'High-sensitivity assay',
        },
        {
          providerId: 'werlabs',
          testName: 'hs-CRP',
          priceKr: 295,
          notes: 'Included in some standard panels',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once at baseline',
      ongoing: 'Every 6-12 months; more frequently with active inflammation interventions',
    },
    relatedBiomarkerIds: ['b0000009-0000-0000-0000-000000000009'],
    sampleType: 'blood',
  },

  {
    id: 'igf1',
    nameEn: 'Insulin-like Growth Factor 1 (IGF-1)',
    nameSv: 'Insulinlik tillväxtfaktor 1 (IGF-1)',
    description:
      'Growth hormone mediator involved in cellular growth and metabolism. U-shaped relationship with mortality.',
    descriptionSv:
      'Tillväxthormonförmedlare involverad i cellulär tillväxt och metabolism. U-formad relation med mortalitet.',
    longevitySignal:
      'Both very low and very high IGF-1 associated with increased mortality risk. Optimal mid-range is target for longevity.',
    evidenceGrade: 'B',
    category: 'blood-panel',
    healthDomains: ['metabolic', 'hormonal'],
    tier: 'intermediate',
    recommendedPhase: 'deepening',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'blodkollen',
          testName: 'IGF-1',
          priceKr: 539,
          notes: 'Individual test',
        },
        {
          providerId: 'werlabs',
          testName: 'IGF-1',
          priceKr: 595,
          notes: 'Available in hormone packages',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once for baseline understanding',
      ongoing: 'Annually if tracking or with significant lifestyle changes',
    },
    sampleType: 'blood',
  },

  // ============================================================================
  // ADVANCED TIER - Phase 3: Performance & Composition
  // ============================================================================

  {
    id: 'vo2max',
    nameEn: 'VO2max Testing',
    nameSv: 'VO2max-testning',
    description:
      'Maximum oxygen uptake measured during graded exercise. Gold standard for cardiorespiratory fitness.',
    descriptionSv:
      'Maximal syreupptagning mätt under graderad träning. Guldstandard för kardiorespiratorisk kondition.',
    longevitySignal:
      'Cardiorespiratory fitness is the single strongest predictor of morbidity and mortality. Large evidence syntheses consistently show dose-response relationship.',
    evidenceGrade: 'A',
    category: 'functional',
    healthDomains: ['performance', 'cardiovascular'],
    tier: 'advanced',
    recommendedPhase: 'performance',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'aktivitus',
          testName: 'VO2max-test',
          priceKr: 1390,
          url: 'https://aktivitus.se',
          notes: 'Approximately 60 minutes; includes lactate threshold',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once for baseline',
      ongoing: 'Annually; every 6 months if actively training and want tight feedback loops',
      citation: 'Mandsager et al., JAMA Network Open 2018',
    },
    relatedBiomarkerIds: ['b0000027-0000-0000-0000-000000000027'],
    sampleType: 'functional',
  },

  {
    id: 'dexa',
    nameEn: 'DEXA Body Composition',
    nameSv: 'DEXA-kroppssammansättning',
    description:
      'Dual-energy X-ray absorptiometry for precise measurement of fat mass, lean mass, and bone density by body region.',
    descriptionSv:
      'Dual-energi röntgenabsorptiometri för exakt mätning av fettmassa, mager massa och bentäthet per kroppsregion.',
    longevitySignal:
      'Adds lean/fat distribution signal beyond BMI. Supports sarcopenia prevention strategies and visceral fat tracking.',
    evidenceGrade: 'A',
    category: 'imaging',
    healthDomains: ['performance', 'metabolic'],
    tier: 'advanced',
    recommendedPhase: 'performance',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'careify',
          testName: 'DEXA kroppssammansättning',
          priceKr: 1995,
          url: 'https://careify.se',
          notes: 'Stockholm; specialist interpretation + report; typically within 2 weeks',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once for baseline',
      ongoing: 'Annually; pragmatic cadence for trend detection unless rapid body recomposition underway',
    },
    relatedBiomarkerIds: ['b0000028-0000-0000-0000-000000000028'],
    sampleType: 'imaging',
  },

  {
    id: 'thyroid-antibodies',
    nameEn: 'Thyroid Antibodies Panel',
    nameSv: 'Sköldkörtelantikroppspanel',
    description:
      'TPO and thyroglobulin antibodies. Detect autoimmune thyroid conditions before overt dysfunction.',
    descriptionSv:
      'TPO- och tyreoglobulinantikroppar. Upptäcker autoimmuna sköldkörteltillstånd innan uppenbar dysfunktion.',
    longevitySignal:
      'Autoimmune thyroiditis is common and can be detected years before TSH abnormalities. Early intervention preserves thyroid function.',
    evidenceGrade: 'B',
    category: 'blood-panel',
    healthDomains: ['hormonal'],
    tier: 'advanced',
    recommendedPhase: 'performance',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'blodkollen',
          testName: 'TPO-antikroppar',
          priceKr: 349,
          notes: 'Individual test',
        },
        {
          providerId: 'werlabs',
          testName: 'Sköldkörtelantikroppar',
          priceKr: 395,
          notes: 'TPO + Tg-Ab panel',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once if indicated by symptoms or family history',
      ongoing: 'Not routinely repeated unless monitoring autoimmune condition',
    },
    relatedBiomarkerIds: [
      'b0000011-0000-0000-0000-000000000011',
      'b0000012-0000-0000-0000-000000000012',
      'b0000013-0000-0000-0000-000000000013',
    ],
    sampleType: 'blood',
  },

  // ============================================================================
  // CLINICAL/RESEARCH TIER - Phase 4: Advanced Modules
  // ============================================================================

  {
    id: 'epigenetic-age',
    nameEn: 'Epigenetic Biological Age Test',
    nameSv: 'Epigenetiskt biologiskt ålderstest',
    description:
      'DNA methylation clock measuring biological age across organ systems and "speed of aging" metrics.',
    descriptionSv:
      'DNA-metyleringsur som mäter biologisk ålder över organsystem och "åldringstakt"-mått.',
    longevitySignal:
      'Biological age vs chronological age gap is a summary measure of aging rate. Can detect accelerated aging before disease manifests.',
    evidenceGrade: 'B',
    category: 'epigenetic',
    healthDomains: ['performance'],
    tier: 'clinical',
    recommendedPhase: 'advanced-modules',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'epiage',
          testName: 'EpiAge biologiskt ålderstest',
          priceKr: 2249,
          url: 'https://epiage.se',
          notes: 'Saliva sample; results in 2-4 weeks with report + recommendations',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Once to establish baseline biological age',
      ongoing: 'Test at least once per year to track aging trajectory',
      citation: 'Blueprint Speed of Aging product guidance',
    },
    sampleType: 'saliva',
  },

  {
    id: 'fullbody-mri',
    nameEn: 'Full-Body MRI Screening',
    nameSv: 'Helkropps-MR-screening',
    description:
      'Comprehensive magnetic resonance imaging screening for early disease detection across all organ systems.',
    descriptionSv:
      'Omfattande magnetisk resonansavbildningsscreening för tidig sjukdomsupptäckt över alla organsystem.',
    longevitySignal:
      'Can detect tumors, aneurysms, and organ abnormalities before symptoms. High potential for early intervention but also incidental findings.',
    evidenceGrade: 'C',
    category: 'imaging',
    healthDomains: ['cardiovascular', 'metabolic'],
    tier: 'clinical',
    recommendedPhase: 'advanced-modules',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'testmottagningen',
          testName: 'MR Helkropp',
          priceKr: 19995,
          url: 'https://testmottagningen.se',
          notes: 'Referral issued by provider; radiologist interpretation included',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Consider based on risk profile and tolerance for incidental findings',
      ongoing: 'Blueprint suggests annual in certain risk profiles; clinical guidance varies',
    },
    sampleType: 'imaging',
  },

  {
    id: 'pfas',
    nameEn: 'PFAS Blood Testing',
    nameSv: 'PFAS-blodtestning',
    description:
      'Measures "forever chemicals" (PFAS) accumulated in blood from environmental exposure.',
    descriptionSv:
      'Mäter "evighetskemikalier" (PFAS) ackumulerade i blodet från miljöexponering.',
    longevitySignal:
      'PFAS exposure linked to elevated cholesterol (Grade A), thyroid disruption (Grade A), and immune effects. Environmental risk factor.',
    evidenceGrade: 'A',
    category: 'environmental',
    healthDomains: ['environmental', 'hormonal', 'cardiovascular'],
    tier: 'clinical',
    recommendedPhase: 'advanced-modules',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'occupational_medicine_south',
          testName: 'PFAS serum analysis',
          priceKr: 1500,
          notes:
            'Requires healthcare referral; not direct consumer ordering. Lab notes PFAS level does not directly indicate individual health risk.',
        },
      ],
      gap: {
        reason: 'Requires healthcare pathway; not available as direct consumer test',
        alternatives: 'Discuss with primary care provider if concerned about exposure',
      },
    },
    frequencyGuidance: {
      initial: 'Consider if high-exposure risk (contaminated water area, occupational)',
      ongoing: 'Generally not repeated; PFAS levels decline very slowly over years',
    },
    sampleType: 'blood',
  },

  {
    id: 'microplastics',
    nameEn: 'Microplastics Blood Test',
    nameSv: 'Mikroplast-blodtest',
    description:
      'Measures number, size, and concentration of microplastic particles in blood.',
    descriptionSv:
      'Mäter antal, storlek och koncentration av mikroplastpartiklar i blodet.',
    longevitySignal:
      'Emerging area of research. Health implications of blood microplastics not yet fully established but of increasing concern.',
    evidenceGrade: 'C',
    category: 'environmental',
    healthDomains: ['environmental'],
    tier: 'clinical',
    recommendedPhase: 'advanced-modules',
    swedishAvailability: {
      available: false,
      providers: [],
      gap: {
        reason:
          'No mainstream Swedish consumer equivalent identified. Clinical utility and access unclear in Swedish routine care.',
        alternatives:
          'Blueprint sells as consumer kit ($135 USD) with 4-6 week turnaround; may require export/research pathways for Sweden',
      },
    },
    frequencyGuidance: {
      initial: 'Consider if interested in environmental exposure tracking',
      ongoing: 'Research area; optimal frequency not established',
      citation: 'Blueprint Microplastics Test product page',
    },
    sampleType: 'blood',
  },

  {
    id: 'heavy-metals',
    nameEn: 'Heavy Metals Panel',
    nameSv: 'Tungmetallpanel',
    description:
      'Measures toxic heavy metals (lead, mercury, cadmium, arsenic) accumulated in the body.',
    descriptionSv:
      'Mäter giftiga tungmetaller (bly, kvicksilver, kadmium, arsenik) ackumulerade i kroppen.',
    longevitySignal:
      'Heavy metal accumulation linked to neurological, cardiovascular, and kidney damage. Identifies need for exposure reduction.',
    evidenceGrade: 'A',
    category: 'environmental',
    healthDomains: ['environmental', 'renal'],
    tier: 'clinical',
    recommendedPhase: 'advanced-modules',
    swedishAvailability: {
      available: true,
      providers: [
        {
          providerId: 'medisera',
          testName: 'Tungmetaller (blod)',
          priceKr: 1295,
          notes: 'Blood sample; covers common toxic metals',
        },
      ],
    },
    frequencyGuidance: {
      initial: 'Consider if exposure risk (old housing, occupational, high fish intake)',
      ongoing: 'Retest after exposure reduction interventions if initially elevated',
    },
    sampleType: 'blood',
  },
]

// Helper functions
export function getTestsByTier(tier: string): RoadmapTest[] {
  return ROADMAP_TESTS.filter((t) => t.tier === tier)
}

export function getTestsByPhase(phase: string): RoadmapTest[] {
  return ROADMAP_TESTS.filter((t) => t.recommendedPhase === phase)
}

export function getTestById(id: string): RoadmapTest | undefined {
  return ROADMAP_TESTS.find((t) => t.id === id)
}

export function getAvailableSwedishTests(): RoadmapTest[] {
  return ROADMAP_TESTS.filter((t) => t.swedishAvailability.available)
}

export function getTestsWithGaps(): RoadmapTest[] {
  return ROADMAP_TESTS.filter((t) => !t.swedishAvailability.available || t.swedishAvailability.gap)
}

export function getTestsByHealthDomain(domain: string): RoadmapTest[] {
  return ROADMAP_TESTS.filter((t) => t.healthDomains.includes(domain as any))
}

export function calculatePhaseEstimatedCost(phase: string): { min: number; max: number } {
  const tests = getTestsByPhase(phase)
  let min = 0
  let max = 0

  for (const test of tests) {
    if (test.swedishAvailability.available && test.swedishAvailability.providers.length > 0) {
      const prices = test.swedishAvailability.providers.map((p) => p.priceKr)
      min += Math.min(...prices)
      max += Math.max(...prices)
    }
  }

  return { min, max }
}
