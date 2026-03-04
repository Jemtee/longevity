// Swedish Health Test Providers
// Based on Blueprint/Superpower comparative analysis for Swedish market

import type { SwedishProvider } from './types'

export const SWEDISH_PROVIDERS: Record<string, SwedishProvider> = {
  werlabs: {
    id: 'werlabs',
    name: 'Werlabs',
    nameShort: 'Werlabs',
    website: 'https://werlabs.se',
    description:
      'Private health test provider with nationwide coverage via connected sampling sites. Offers digital remiss workflow, physician analysis, and portal-based results.',
    descriptionSv:
      'Privat hälsotestavdelning med rikstäckande täckning via anslutna provtagningssajter. Erbjuder digital remisshantering, läkaranalys och resultat i portalen.',
    orderingMethod: 'online',
    hasDigitalRemiss: true,
    turnaroundDays: { min: 2, max: 4 },
    resultsFormat: 'portal',
    locations: ['Nationwide via partner labs'],
  },

  blodkollen: {
    id: 'blodkollen',
    name: 'Blodkollen',
    nameShort: 'Blodkollen',
    website: 'https://blodkollen.se',
    description:
      'Comprehensive à la carte test menu with individual analyte pricing. Good for targeted add-ons like ApoB, Lp(a), insulin, and specialty markers.',
    descriptionSv:
      'Omfattande à la carte-testmeny med individuella analyspriser. Bra för riktade tillägg som ApoB, Lp(a), insulin och specialmarkörer.',
    orderingMethod: 'online',
    hasDigitalRemiss: true,
    turnaroundDays: { min: 2, max: 5 },
    resultsFormat: 'portal',
    locations: ['Nationwide via partner labs'],
  },

  medisera: {
    id: 'medisera',
    name: 'Medisera Health AB',
    nameShort: 'Medisera',
    website: 'https://www.medisera.se',
    description:
      'Private test provider offering packages and custom referrals. Results include physician comment delivered in 1-5 days.',
    descriptionSv:
      'Privat testavdelning som erbjuder paket och anpassade remisser. Resultat inkluderar läkarkommentar och levereras inom 1-5 dagar.',
    orderingMethod: 'online',
    hasDigitalRemiss: true,
    turnaroundDays: { min: 1, max: 5 },
    resultsFormat: 'portal',
    locations: ['Nationwide via sampling sites'],
  },

  careify: {
    id: 'careify',
    name: 'Careify',
    nameShort: 'Careify',
    website: 'https://careify.se',
    description:
      'Preventive health service offering DEXA body composition scans with specialist interpretation and report. Appointments typically within two weeks.',
    descriptionSv:
      'Preventiv hälsotjänst som erbjuder DEXA-kroppsammansättningsskanningar med specialistbedömning och rapport. Tider oftast inom två veckor.',
    orderingMethod: 'appointment',
    hasDigitalRemiss: false,
    turnaroundDays: { min: 1, max: 3 },
    resultsFormat: 'portal',
    locations: ['Stockholm'],
  },

  testmottagningen: {
    id: 'testmottagningen',
    name: 'Testmottagningen',
    nameShort: 'Testmott.',
    website: 'https://testmottagningen.se',
    description:
      'Private health testing including full-body MRI. Issues digital referrals for imaging. MR Helkropp and various bundles available.',
    descriptionSv:
      'Privat hälsotestning inklusive helkropps-MR. Utfärdar digitala remisser för bilddiagnostik. MR Helkropp och olika paket tillgängliga.',
    orderingMethod: 'online',
    hasDigitalRemiss: true,
    turnaroundDays: { min: 3, max: 14 },
    resultsFormat: 'portal',
    locations: ['Stockholm', 'Select cities'],
  },

  aktivitus: {
    id: 'aktivitus',
    name: 'Aktivitus',
    nameShort: 'Aktivitus',
    website: 'https://aktivitus.se',
    description:
      'Exercise testing clinic offering VO2max tests (approximately 60 minutes). Focus on cardiorespiratory fitness measurement.',
    descriptionSv:
      'Träningstestningsklinik som erbjuder VO2max-tester (cirka 60 minuter). Fokus på konditionsmätning.',
    orderingMethod: 'appointment',
    hasDigitalRemiss: false,
    turnaroundDays: { min: 1, max: 3 },
    resultsFormat: 'portal',
    locations: ['Stockholm', 'Gothenburg', 'Malmö'],
  },

  epiage: {
    id: 'epiage',
    name: 'EpiAge',
    nameShort: 'EpiAge',
    website: 'https://epiage.se',
    description:
      'Consumer epigenetic age testing via saliva sample. Results in 2-4 weeks with biological age report and recommendations.',
    descriptionSv:
      'Epigenetisk ålderstestning för konsumenter via salivprov. Resultat inom 2-4 veckor med biologisk åldersrapport och rekommendationer.',
    orderingMethod: 'online',
    hasDigitalRemiss: false,
    turnaroundDays: { min: 14, max: 28 },
    resultsFormat: 'email',
    locations: ['Mail-in kit'],
  },

  occupational_medicine_south: {
    id: 'occupational_medicine_south',
    name: 'Occupational & Environmental Medicine (Southern Sweden)',
    nameShort: 'Occ. Med.',
    website: 'https://www.skane.se',
    description:
      'Regional lab for PFAS blood analysis and environmental biomarkers. Requires healthcare referral; not direct consumer ordering.',
    descriptionSv:
      'Regionalt labb för PFAS-blodanalys och miljöbiomarkörer. Kräver vårdremiss; ej direkt konsumentbeställning.',
    orderingMethod: 'referral',
    hasDigitalRemiss: false,
    turnaroundDays: { min: 7, max: 21 },
    resultsFormat: 'pdf',
    locations: ['Skåne region'],
  },
}

export function getProvider(id: string): SwedishProvider | undefined {
  return SWEDISH_PROVIDERS[id]
}

export function getProvidersByLocation(location: string): SwedishProvider[] {
  return Object.values(SWEDISH_PROVIDERS).filter(
    (p) =>
      p.locations.includes(location) ||
      p.locations.includes('Nationwide via partner labs') ||
      p.locations.includes('Nationwide via sampling sites') ||
      p.locations.includes('Mail-in kit')
  )
}

export function getProvidersWithDigitalRemiss(): SwedishProvider[] {
  return Object.values(SWEDISH_PROVIDERS).filter((p) => p.hasDigitalRemiss)
}
