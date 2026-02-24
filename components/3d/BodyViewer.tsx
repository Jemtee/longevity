'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { Eye, EyeOff, RotateCcw, Tag } from 'lucide-react'
import { RegionTooltip } from './RegionTooltip'
import { useBodyViewerStore } from '@/lib/stores/body-viewer-store'
import { BiomarkerValue } from '@/lib/body-regions'

// Dynamically import the 3D visualization to prevent SSR issues
const BodyVisualization = dynamic(
  () => import('./BodyVisualization').then((mod) => mod.BodyVisualization),
  {
    ssr: false,
    loading: () => <LoadingState />,
  }
)

function LoadingState() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl">
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-16 w-16">
          {/* Animated loading rings */}
          <div className="absolute inset-0 animate-ping rounded-full bg-primary-500/20" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-primary-500/30" />
          <div className="absolute inset-4 rounded-full bg-primary-500/40" />
        </div>
        <p className="text-sm text-gray-400">Loading 3D visualization...</p>
        <p className="text-xs text-gray-500 mt-1">Preparing your body map</p>
      </div>
    </div>
  )
}

interface BodyViewerProps {
  biomarkerData?: Record<string, BiomarkerValue>
  className?: string
  height?: string
  title?: string
  subtitle?: string
}

export function BodyViewer({
  biomarkerData,
  className = '',
  height = '400px',
  title = 'Your Body Map',
  subtitle = 'Click on regions to explore biomarkers',
}: BodyViewerProps) {
  const { autoRotate, showLabels, toggleAutoRotate, toggleLabels, clearSelection } =
    useBodyViewerStore()
  const [showControls, setShowControls] = useState(true)

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-display font-semibold text-ink-800">{title}</h2>
          <p className="text-sm text-ink-400">{subtitle}</p>
        </div>

        {/* Control buttons */}
        {showControls && (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAutoRotate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                autoRotate
                  ? 'bg-forest-100 text-forest-700'
                  : 'bg-cream-100 text-ink-500 hover:bg-cream-200'
              }`}
              title={autoRotate ? 'Pause rotation' : 'Auto rotate'}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
              <span className="hidden sm:inline">{autoRotate ? 'Rotating' : 'Rotate'}</span>
            </button>

            <button
              onClick={toggleLabels}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                showLabels
                  ? 'bg-forest-100 text-forest-700'
                  : 'bg-cream-100 text-ink-500 hover:bg-cream-200'
              }`}
              title={showLabels ? 'Hide labels' : 'Show labels'}
            >
              {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showLabels ? 'Labels' : 'Labels'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3D Canvas Container */}
      <div className="relative" style={{ height }}>
        <Suspense fallback={<LoadingState />}>
          <BodyVisualization
            biomarkerData={biomarkerData}
            height={height}
          />
        </Suspense>

        {/* Region tooltip overlay */}
        <RegionTooltip />

        {/* Instructions overlay (shows briefly) */}
        <div className="absolute left-4 top-4 pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-900/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <Tag className="w-3 h-3" />
            <span>Drag to rotate • Click regions to explore</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-ink-500">Optimal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-ink-500">Borderline</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-ink-500">Out of Range</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-ink-500">No Data</span>
        </div>
      </div>
    </div>
  )
}
