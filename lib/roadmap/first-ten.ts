// First Ten Priority Tests for Swedish Longevity Tracking
// Based on Blueprint/Superpower comparative analysis

import type { FirstTenChecklist } from './types'

/**
 * Prioritized first ten tests/metrics for longevity tracking in Sweden
 *
 * Chosen to maximize impact on major morbidity/mortality pathways:
 * - Cardiovascular disease
 * - Metabolic dysfunction
 * - Renal disease
 *
 * While keeping commitment reasonable for Swedish users.
 */
export const FIRST_TEN_CHECKLIST: FirstTenChecklist = {
  tests: [
    {
      testId: 'blood-pressure',
      priority: 1,
      whyHighSignal:
        'Hypertension is described by ESC as the most important modifiable risk factor for all-cause/CVD morbidity and mortality. Risk scales continuously with BP.',
      whyHighSignalSv:
        'Hypertoni beskrivs av ESC som den viktigaste modifierbara riskfaktorn för all-orsaks/CVD-sjuklighet och mortalitet. Risk skalas kontinuerligt med blodtryck.',
      swedishExecution:
        'Home BP monitoring + periodic clinical checks. Validated home monitors available at pharmacies (Omron recommended, ~400 kr).',
      swedishExecutionSv:
        'Hemblodtrycksövervakning + periodiska kliniska kontroller. Validerade hemmönster tillgängliga på apotek (Omron rekommenderas, ~400 kr).',
    },
    {
      testId: 'apob',
      priority: 2,
      whyHighSignal:
        'ESC/EAS guidance supports ApoB for risk assessment, especially with high TG/diabetes/obesity/metabolic syndrome. Can be used as alternative to LDL-C when available.',
      whyHighSignalSv:
        'ESC/EAS-vägledning stödjer ApoB för riskbedömning, särskilt med höga TG/diabetes/fetma/metaboliskt syndrom. Kan användas som alternativ till LDL-C när det finns tillgängligt.',
      swedishExecution: 'Blodkollen lists ApoB (179 kr) as individual test.',
      swedishExecutionSv: 'Blodkollen listar ApoB (179 kr) som individuellt test.',
    },
    {
      testId: 'lp-a',
      priority: 3,
      whyHighSignal:
        'ESC/EAS guidance includes "Lp(a) measurement should be considered at least once in each adult" for risk stratification.',
      whyHighSignalSv:
        'ESC/EAS-vägledning inkluderar "Lp(a)-mätning bör övervägas minst en gång hos varje vuxen" för riskstratifiering.',
      swedishExecution: 'Blodkollen lists Lp(a) (299 kr) as individual test.',
      swedishExecutionSv: 'Blodkollen listar Lp(a) (299 kr) som individuellt test.',
    },
    {
      testId: 'hba1c',
      priority: 4,
      whyHighSignal:
        'Tracks long-term glycaemia. Stable individuals may test ~twice/year. Pre-diabetes detection prevents progression to diabetes.',
      whyHighSignalSv:
        'Spårar långsiktig glykemi. Stabila individer kan testa ~två gånger/år. Pre-diabetesdetektering förhindrar progression till diabetes.',
      swedishExecution:
        'Included in most baseline panels (Werlabs Hälsokontroll) or individual (Blodkollen HbA1c, 399 kr).',
      swedishExecutionSv:
        'Ingår i de flesta baspaneler (Werlabs Hälsokontroll) eller individuellt (Blodkollen HbA1c, 399 kr).',
    },
    {
      testId: 'fasting-insulin',
      priority: 5,
      whyHighSignal:
        'Superpower explicitly cites insulin as key "Advanced Panel" marker for understanding metabolism/energy. Insulin supports interpretation beyond glucose alone.',
      whyHighSignalSv:
        'Superpower citerar explicit insulin som nyckelmarkör i "Advanced Panel" för förståelse av metabolism/energi. Insulin stödjer tolkning utöver enbart glukos.',
      swedishExecution: 'Blodkollen lists insulin (449 kr) as individual test.',
      swedishExecutionSv: 'Blodkollen listar insulin (449 kr) som individuellt test.',
    },
    {
      testId: 'egfr',
      priority: 6,
      whyHighSignal:
        'Kidney dysfunction is a major risk domain. KDIGO emphasizes GFR assessment in evaluation. eGFR tracks kidney filtering capacity.',
      whyHighSignalSv:
        'Njurdysfunktion är ett stort riskområde. KDIGO betonar GFR-bedömning vid utvärdering. eGFR spårar njurarnas filtreringskapacitet.',
      swedishExecution:
        'Included in baseline panels. Individual: Blodkollen creatinine + cystatin C/GFR calculation.',
      swedishExecutionSv:
        'Ingår i baspaneler. Individuellt: Blodkollen kreatinin + cystatin C/GFR-beräkning.',
    },
    {
      testId: 'uacr',
      priority: 7,
      whyHighSignal:
        'KDIGO recommends urine albumin measurement alongside GFR for detection/evaluation of CKD risk.',
      whyHighSignalSv:
        'KDIGO rekommenderar mätning av urinalbumin tillsammans med GFR för upptäckt/utvärdering av CKD-risk.',
      swedishExecution: 'Blodkollen lists U-Albumin/Krea (399 kr).',
      swedishExecutionSv: 'Blodkollen listar U-Albumin/Krea (399 kr).',
    },
    {
      testId: 'waist-height-ratio',
      priority: 8,
      whyHighSignal:
        'Central adiposity shows robust associations with mortality. BMJ reviews report near J-shaped relations for waist and waist-to-height ratio with all-cause mortality.',
      whyHighSignalSv:
        'Central fetma visar robusta associationer med mortalitet. BMJ-recensioner rapporterar nära J-formade relationer för midja och midja-till-längd-kvot med all-orsaks mortalitet.',
      swedishExecution: 'Tape measure + consistent protocol. Measure at navel level.',
      swedishExecutionSv: 'Måttband + konsekvent protokoll. Mät vid navelnivå.',
    },
    {
      testId: 'vo2max',
      priority: 9,
      whyHighSignal:
        'Cardiorespiratory fitness is a strong predictor of morbidity/mortality across large evidence syntheses. The single best longevity metric.',
      whyHighSignalSv:
        'Kardiorespiratorisk kondition är en stark prediktor för sjuklighet/mortalitet över stora evidenssynteser. Det enskilt bästa livslängdsmåttet.',
      swedishExecution: 'Aktivitus VO2max test (1,390 kr; ~60 min) in Stockholm, Gothenburg, Malmö.',
      swedishExecutionSv:
        'Aktivitus VO2max-test (1 390 kr; ~60 min) i Stockholm, Göteborg, Malmö.',
    },
    {
      testId: 'dexa',
      priority: 10,
      whyHighSignal:
        'Adds lean/fat distribution signal beyond BMI. Supports sarcopenia prevention strategies. Careify frames it as detailed body composition reporting with clinician interpretation.',
      whyHighSignalSv:
        'Lägger till signal för mager/fett-fördelning utöver BMI. Stödjer strategier för sarkopeniförebyggande. Careify beskriver det som detaljerad kroppssammansättningsrapportering med klinikertolkning.',
      swedishExecution: 'Careify DEXA body composition (1,995 kr; Stockholm).',
      swedishExecutionSv: 'Careify DEXA-kroppssammansättning (1 995 kr; Stockholm).',
    },
  ],
}

// Calculate total estimated cost for first ten
export function getFirstTenEstimatedCost(): { min: number; max: number; breakdown: string[] } {
  // Prices based on Swedish provider data
  const breakdown = [
    'Blood pressure monitor: ~400 kr',
    'ApoB: 179 kr',
    'Lp(a): 299 kr',
    'HbA1c (in panel): included or 399 kr individual',
    'Fasting insulin: 449 kr',
    'eGFR (in panel): included',
    'UACR: 399 kr',
    'Waist measurement: ~50 kr (tape measure)',
    'VO2max: 1,390 kr',
    'DEXA: 1,995 kr',
  ]

  // Min assumes some tests included in baseline panel
  // Max assumes all individual tests
  return {
    min: 400 + 179 + 299 + 449 + 399 + 50 + 1390 + 1995, // ~5,161 kr
    max: 400 + 179 + 299 + 399 + 449 + 399 + 399 + 50 + 1390 + 1995, // ~5,959 kr
    breakdown,
  }
}

// Get first ten as ordered array
export function getFirstTenOrdered() {
  return [...FIRST_TEN_CHECKLIST.tests].sort((a, b) => a.priority - b.priority)
}

// Check if a test is in the first ten
export function isInFirstTen(testId: string): boolean {
  return FIRST_TEN_CHECKLIST.tests.some((t) => t.testId === testId)
}

// Get priority for a test (returns undefined if not in first ten)
export function getTestPriority(testId: string): number | undefined {
  const test = FIRST_TEN_CHECKLIST.tests.find((t) => t.testId === testId)
  return test?.priority
}
