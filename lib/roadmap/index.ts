// Longevity Testing Roadmap
// Based on Blueprint & Superpower comparative analysis for Swedish users

// Types
export * from './types'

// Data
export { SWEDISH_PROVIDERS, getProvider, getProvidersByLocation, getProvidersWithDigitalRemiss } from './providers'

export {
  ROADMAP_TIERS,
  ROADMAP_PHASES,
  getTier,
  getPhase,
  getPhasesInOrder,
  getTiersInOrder,
} from './tiers'

export {
  ROADMAP_TESTS,
  getTestsByTier,
  getTestsByPhase,
  getTestById,
  getAvailableSwedishTests,
  getTestsWithGaps,
  getTestsByHealthDomain,
  calculatePhaseEstimatedCost,
} from './tests'

export {
  FIRST_TEN_CHECKLIST,
  getFirstTenEstimatedCost,
  getFirstTenOrdered,
  isInFirstTen,
  getTestPriority,
} from './first-ten'
