'use client'

import { useRoadmapStore } from '@/lib/stores/roadmap-store'
import { CheckCircle2, Circle } from 'lucide-react'

interface TestCheckboxProps {
  testId: string
  testName: string
}

export default function TestCheckbox({ testId, testName }: TestCheckboxProps) {
  const { completedTests, markTestCompleted, unmarkTestCompleted } = useRoadmapStore()

  const isCompleted = completedTests.some((t) => t.testId === testId)

  const handleToggle = () => {
    if (isCompleted) {
      unmarkTestCompleted(testId)
    } else {
      markTestCompleted(testId)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all ${
        isCompleted
          ? 'bg-forest-500 text-white shadow-warm'
          : 'bg-cream-100 text-ink-300 hover:bg-forest-50 hover:text-forest-500'
      }`}
      title={isCompleted ? `Mark ${testName} incomplete` : `Mark ${testName} complete`}
    >
      {isCompleted ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <Circle className="w-4 h-4" />
      )}
    </button>
  )
}
