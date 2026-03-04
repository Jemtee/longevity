import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RoadmapPhase, RoadmapTier } from '@/lib/roadmap/types'

export interface CompletedTest {
  testId: string
  completedAt: string // ISO date
  providerId?: string
  notes?: string
}

interface RoadmapState {
  // User preferences
  preferredTier: RoadmapTier
  setPreferredTier: (tier: RoadmapTier) => void

  // Current phase tracking
  currentPhase: RoadmapPhase
  setCurrentPhase: (phase: RoadmapPhase) => void

  // Completed tests (local tracking, supplements database)
  completedTests: CompletedTest[]
  markTestCompleted: (testId: string, providerId?: string, notes?: string) => void
  unmarkTestCompleted: (testId: string) => void
  isTestCompleted: (testId: string) => boolean

  // Expanded sections in UI
  expandedPhases: string[]
  togglePhaseExpanded: (phaseId: string) => void

  // View mode
  viewMode: 'timeline' | 'checklist' | 'first-ten'
  setViewMode: (mode: 'timeline' | 'checklist' | 'first-ten') => void

  // Filter by tier
  tierFilter: RoadmapTier | 'all'
  setTierFilter: (tier: RoadmapTier | 'all') => void

  // Reset
  resetProgress: () => void
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      // Initial state
      preferredTier: 'intermediate',
      currentPhase: 'baseline',
      completedTests: [],
      expandedPhases: ['baseline'],
      viewMode: 'timeline',
      tierFilter: 'all',

      // Actions
      setPreferredTier: (tier) => set({ preferredTier: tier }),

      setCurrentPhase: (phase) => set({ currentPhase: phase }),

      markTestCompleted: (testId, providerId, notes) =>
        set((state) => {
          // Don't add if already completed
          if (state.completedTests.some((t) => t.testId === testId)) {
            return state
          }
          return {
            completedTests: [
              ...state.completedTests,
              {
                testId,
                completedAt: new Date().toISOString(),
                providerId,
                notes,
              },
            ],
          }
        }),

      unmarkTestCompleted: (testId) =>
        set((state) => ({
          completedTests: state.completedTests.filter((t) => t.testId !== testId),
        })),

      isTestCompleted: (testId) => get().completedTests.some((t) => t.testId === testId),

      togglePhaseExpanded: (phaseId) =>
        set((state) => ({
          expandedPhases: state.expandedPhases.includes(phaseId)
            ? state.expandedPhases.filter((id) => id !== phaseId)
            : [...state.expandedPhases, phaseId],
        })),

      setViewMode: (mode) => set({ viewMode: mode }),

      setTierFilter: (tier) => set({ tierFilter: tier }),

      resetProgress: () =>
        set({
          completedTests: [],
          currentPhase: 'baseline',
          expandedPhases: ['baseline'],
        }),
    }),
    {
      name: 'wellspring-roadmap',
    }
  )
)

// Selectors
export const selectPhaseProgress = (state: RoadmapState, phaseTests: string[]): number => {
  if (phaseTests.length === 0) return 0
  const completed = phaseTests.filter((testId) =>
    state.completedTests.some((t) => t.testId === testId)
  ).length
  return Math.round((completed / phaseTests.length) * 100)
}

export const selectTotalProgress = (state: RoadmapState, allTests: string[]): number => {
  if (allTests.length === 0) return 0
  const completed = allTests.filter((testId) =>
    state.completedTests.some((t) => t.testId === testId)
  ).length
  return Math.round((completed / allTests.length) * 100)
}
