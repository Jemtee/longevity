'use client'

import { useRoadmapStore } from '@/lib/stores/roadmap-store'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Calendar,
  CheckSquare,
  Star,
  Filter,
  ChevronDown,
  RotateCcw,
} from 'lucide-react'
import type { RoadmapTier } from '@/lib/roadmap/types'

const VIEW_MODES = [
  { id: 'timeline' as const, label: 'Timeline', icon: Calendar },
  { id: 'checklist' as const, label: 'Checklist', icon: CheckSquare },
  { id: 'first-ten' as const, label: 'First 10', icon: Star },
]

const TIER_OPTIONS: { id: RoadmapTier | 'all'; label: string }[] = [
  { id: 'all', label: 'All Tiers' },
  { id: 'basic', label: 'Basic' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'clinical', label: 'Clinical' },
]

interface RoadmapControlsProps {
  totalTests: number
}

export default function RoadmapControls({ totalTests }: RoadmapControlsProps) {
  const {
    viewMode,
    setViewMode,
    tierFilter,
    setTierFilter,
    completedTests,
    resetProgress,
  } = useRoadmapStore()

  const progressPercent = totalTests > 0
    ? Math.round((completedTests.length / totalTests) * 100)
    : 0

  return (
    <div className="card-elevated p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-cream-100 rounded-xl">
          {VIEW_MODES.map((mode) => {
            const Icon = mode.icon
            const isActive = viewMode === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-forest-700 shadow-warm'
                    : 'text-ink-400 hover:text-ink-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            )
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-ink-400">Progress</p>
              <p className="text-sm font-semibold text-ink-700">
                {completedTests.length}/{totalTests} tests
              </p>
            </div>
            <div className="w-24">
              <Progress value={progressPercent} className="h-2" />
            </div>
          </div>

          {/* Tier filter */}
          <div className="relative">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as RoadmapTier | 'all')}
              className="appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border border-cream-200 bg-white text-ink-600 hover:border-forest-200 focus:outline-none focus:ring-2 focus:ring-forest-200 cursor-pointer"
            >
              {TIER_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
          </div>

          {/* Reset button */}
          {completedTests.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Reset all progress? This cannot be undone.')) {
                  resetProgress()
                }
              }}
              className="text-ink-400 hover:text-terra-500"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
