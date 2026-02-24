import { create } from 'zustand'
import { BiomarkerValue, MOCK_BIOMARKER_DATA } from '../body-regions'

interface BodyViewerState {
  // Selection state
  selectedRegion: string | null
  hoveredRegion: string | null

  // Biomarker data
  biomarkerData: Record<string, BiomarkerValue>

  // View controls
  autoRotate: boolean
  showLabels: boolean

  // Actions
  setSelectedRegion: (region: string | null) => void
  setHoveredRegion: (region: string | null) => void
  setBiomarkerData: (data: Record<string, BiomarkerValue>) => void
  toggleAutoRotate: () => void
  toggleLabels: () => void
  clearSelection: () => void
}

export const useBodyViewerStore = create<BodyViewerState>((set) => ({
  // Initial state
  selectedRegion: null,
  hoveredRegion: null,
  biomarkerData: MOCK_BIOMARKER_DATA,
  autoRotate: true,
  showLabels: true,

  // Actions
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setHoveredRegion: (region) => set({ hoveredRegion: region }),
  setBiomarkerData: (data) => set({ biomarkerData: data }),
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),
  clearSelection: () => set({ selectedRegion: null, hoveredRegion: null }),
}))
