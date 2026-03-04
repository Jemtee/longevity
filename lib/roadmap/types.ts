// Longevity Testing Roadmap Types
// Based on Blueprint & Superpower comparative analysis for Swedish users

export type RoadmapTier = 'basic' | 'intermediate' | 'advanced' | 'clinical'

export type RoadmapPhase = 'baseline' | 'deepening' | 'performance' | 'advanced-modules'

export type TestCategory =
  | 'blood-panel'
  | 'imaging'
  | 'functional'
  | 'home-monitoring'
  | 'epigenetic'
  | 'environmental'

export type HealthDomain =
  | 'cardiovascular'
  | 'metabolic'
  | 'renal'
  | 'inflammation'
  | 'hormonal'
  | 'nutritional'
  | 'performance'
  | 'environmental'

export interface SwedishProvider {
  id: string
  name: string
  nameShort: string
  website: string
  description: string
  descriptionSv: string
  // How ordering works
  orderingMethod: 'online' | 'referral' | 'appointment'
  // Digital referral (remiss) workflow
  hasDigitalRemiss: boolean
  // Typical turnaround
  turnaroundDays: {
    min: number
    max: number
  }
  // Delivery format
  resultsFormat: 'portal' | 'email' | 'pdf' | 'app'
  // Primary locations/coverage
  locations: string[] // e.g., ['Stockholm', 'Nationwide via partner labs']
}

export interface RoadmapTest {
  id: string
  // Names
  nameEn: string
  nameSv: string
  // What it measures
  description: string
  descriptionSv: string
  // Why it matters for longevity
  longevitySignal: string
  // Evidence grade (A-D)
  evidenceGrade: 'A' | 'B' | 'C' | 'D'
  // Category and domains
  category: TestCategory
  healthDomains: HealthDomain[]
  // Tier placement
  tier: RoadmapTier
  // Phase recommendation
  recommendedPhase: RoadmapPhase
  // Swedish availability
  swedishAvailability: {
    available: boolean
    providers: {
      providerId: string
      testName: string // Provider-specific name
      priceKr: number
      url?: string
      notes?: string
    }[]
    // Gap flag if not available in Sweden
    gap?: {
      reason: string
      alternatives?: string
    }
  }
  // Testing frequency guidance
  frequencyGuidance: {
    initial: string // e.g., "Once at baseline"
    ongoing: string // e.g., "Annually" or "Every 6 months if actively changing"
    citation?: string
  }
  // Related biomarkers (links to existing biomarker system)
  relatedBiomarkerIds?: string[]
  // Sample type
  sampleType: 'blood' | 'urine' | 'saliva' | 'imaging' | 'functional' | 'home'
}

export interface RoadmapPhaseConfig {
  id: RoadmapPhase
  nameEn: string
  nameSv: string
  // Timeline
  monthStart: number
  monthEnd: number
  // Description
  description: string
  descriptionSv: string
  // Goals for this phase
  goals: string[]
  goalsSv: string[]
  // Estimated cost range
  estimatedCostKr: {
    min: number
    max: number
  }
  // Icon for UI
  icon: string // Lucide icon name
}

export interface RoadmapTierConfig {
  id: RoadmapTier
  nameEn: string
  nameSv: string
  description: string
  descriptionSv: string
  // Why tests belong here
  criteria: string
  // Commitment profile
  commitmentLevel: 'low' | 'moderate' | 'high' | 'very-high'
  // Color for UI
  color: string // Tailwind color key
}

// User progress tracking
export interface UserRoadmapProgress {
  userId: string
  // Completed tests
  completedTests: {
    testId: string
    completedAt: string // ISO date
    providerId?: string
    resultId?: string // Link to test_results table
    notes?: string
  }[]
  // Current phase
  currentPhase: RoadmapPhase
  // Preferred tier (user can limit to basic/intermediate)
  preferredTier: RoadmapTier
  // Next recommended tests
  nextRecommended: string[] // test IDs
  // Phase completion percentage
  phaseProgress: Record<RoadmapPhase, number>
}

// First Ten Checklist (priority tests for Swedish users)
export interface FirstTenChecklist {
  tests: {
    testId: string
    priority: number // 1-10
    whyHighSignal: string
    whyHighSignalSv: string
    swedishExecution: string
    swedishExecutionSv: string
  }[]
}
