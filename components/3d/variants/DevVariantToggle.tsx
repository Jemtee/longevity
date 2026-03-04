'use client'

import { useEffect } from 'react'
import { useBodyViewerStore } from '@/lib/stores/body-viewer-store'
import { VARIANT_INFO, type VisualizationVariant } from './index'

/**
 * Dev-only toggle for switching between visualization variants.
 * Press 1-4 keys to switch variants.
 * Only renders in development mode.
 */
export function DevVariantToggle() {
  const { visualizationVariant, setVisualizationVariant } = useBodyViewerStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const keyMap: Record<string, VisualizationVariant> = {
        '1': 'shader',
        '2': 'slices',
        '3': 'parallax',
        '4': 'meshline',
      }

      const variant = keyMap[e.key]
      if (variant) {
        setVisualizationVariant(variant)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setVisualizationVariant])

  // Check for URL param override
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlVariant = params.get('variant') as VisualizationVariant | null
    if (urlVariant && urlVariant in VARIANT_INFO) {
      setVisualizationVariant(urlVariant)
    }
  }, [setVisualizationVariant])

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const variants = Object.entries(VARIANT_INFO) as [VisualizationVariant, { name: string; description: string }][]

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-white text-xs p-3 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
      <div className="text-cyan-400 font-medium mb-2">Body Variant (1-4)</div>
      <div className="space-y-1">
        {variants.map(([key, info], index) => (
          <button
            key={key}
            onClick={() => setVisualizationVariant(key)}
            className={`block w-full text-left px-2 py-1 rounded transition-colors ${
              visualizationVariant === key
                ? 'bg-cyan-500/30 text-cyan-300'
                : 'hover:bg-white/10 text-gray-400'
            }`}
          >
            <span className="text-cyan-500 mr-2">{index + 1}</span>
            {info.name}
          </button>
        ))}
      </div>
    </div>
  )
}
