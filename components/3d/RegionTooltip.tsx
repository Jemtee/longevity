'use client'

import { X } from 'lucide-react'
import { BODY_REGIONS, STATUS_COLORS, getRegionHealthStatus } from '@/lib/body-regions'
import { useBodyViewerStore } from '@/lib/stores/body-viewer-store'
import { cn } from '@/lib/utils'

export function RegionTooltip() {
  const { selectedRegion, biomarkerData, setSelectedRegion } = useBodyViewerStore()

  if (!selectedRegion) return null

  const region = BODY_REGIONS[selectedRegion]
  if (!region) return null

  const status = getRegionHealthStatus(selectedRegion, biomarkerData)
  const colors = STATUS_COLORS[status]

  // Get biomarker values for this region
  const regionBiomarkers = region.biomarkers
    .map((id) => biomarkerData[id])
    .filter(Boolean)

  const statusLabels = {
    optimal: 'Optimal',
    borderline: 'Needs Attention',
    'out-of-range': 'Out of Range',
    unknown: 'No Data',
  }

  return (
    <div className="absolute bottom-6 left-6 right-6 z-10 sm:left-auto sm:right-6 sm:w-80">
      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900/95 shadow-xl backdrop-blur">
        {/* Header */}
        <div
          className="flex items-center justify-between border-b border-gray-700 px-4 py-3"
          style={{ borderLeftColor: colors.main, borderLeftWidth: 4 }}
        >
          <div>
            <h3 className="font-semibold text-white">{region.name}</h3>
            <p className="text-xs text-gray-400">{region.description}</p>
          </div>
          <button
            onClick={() => setSelectedRegion(null)}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Status */}
        <div className="border-b border-gray-700 px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: colors.main }}
            />
            <span className="text-sm font-medium text-white">
              {statusLabels[status]}
            </span>
          </div>
        </div>

        {/* Biomarkers list */}
        <div className="max-h-48 overflow-y-auto px-4 py-3">
          {regionBiomarkers.length > 0 ? (
            <ul className="space-y-2">
              {regionBiomarkers.map((biomarker) => (
                <li
                  key={biomarker.id}
                  className="flex items-center justify-between rounded-lg bg-gray-800/50 px-3 py-2"
                >
                  <span className="text-sm text-gray-300">{biomarker.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {biomarker.value !== null ? biomarker.value : '—'}
                    </span>
                    <span className="text-xs text-gray-500">{biomarker.unit}</span>
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full',
                        biomarker.status === 'optimal' && 'bg-green-500',
                        biomarker.status === 'borderline' && 'bg-amber-500',
                        biomarker.status === 'out-of-range' && 'bg-red-500',
                        biomarker.status === 'unknown' && 'bg-gray-500'
                      )}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-4 text-center text-sm text-gray-500">
              No biomarker data available for this region.
              <br />
              <span className="text-xs">Add test results to see your health status.</span>
            </p>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-gray-700 bg-gray-800/30 px-4 py-2">
          <p className="text-center text-xs text-gray-500">
            Click on other regions to explore • Drag to rotate
          </p>
        </div>
      </div>
    </div>
  )
}
