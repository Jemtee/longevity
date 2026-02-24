'use client'

interface RangeBarProps {
  value: number
  optimalMin: number
  optimalMax: number
  referenceMin: number
  referenceMax: number
  unit?: string
  showLabels?: boolean
}

export function RangeBar({
  value,
  optimalMin,
  optimalMax,
  referenceMin,
  referenceMax,
  unit = '',
  showLabels = false,
}: RangeBarProps) {
  // Calculate position as percentage
  const range = referenceMax - referenceMin
  const position = ((value - referenceMin) / range) * 100
  const clampedPosition = Math.max(0, Math.min(100, position))

  // Optimal zone positions
  const optimalStart = ((optimalMin - referenceMin) / range) * 100
  const optimalEnd = ((optimalMax - referenceMin) / range) * 100

  // Determine status
  const isOptimal = value >= optimalMin && value <= optimalMax
  const isLow = value < optimalMin
  const isHigh = value > optimalMax
  const isCritical = value < referenceMin || value > referenceMax

  const statusColor = isOptimal
    ? '#2D6A4F'
    : isCritical
    ? '#E76F51'
    : '#D4A373'

  return (
    <div className="w-full">
      <div className="relative h-2 rounded-full bg-cream-200 overflow-hidden">
        {/* Reference range background */}
        <div className="absolute inset-0 bg-cream-200" />

        {/* Low zone */}
        <div
          className="absolute top-0 bottom-0 bg-terra-400/20"
          style={{ left: 0, width: `${optimalStart}%` }}
        />

        {/* Optimal zone */}
        <div
          className="absolute top-0 bottom-0 bg-forest-200"
          style={{ left: `${optimalStart}%`, width: `${optimalEnd - optimalStart}%` }}
        />

        {/* High zone */}
        <div
          className="absolute top-0 bottom-0 bg-terra-400/20"
          style={{ left: `${optimalEnd}%`, right: 0 }}
        />

        {/* Value indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-all duration-500"
          style={{
            left: `${clampedPosition}%`,
            transform: `translateX(-50%) translateY(-50%)`,
            backgroundColor: statusColor,
          }}
        />
      </div>

      {showLabels && (
        <div className="flex justify-between mt-1.5 text-xs text-ink-300">
          <span>{referenceMin}{unit}</span>
          <span className="text-forest-500 font-medium">
            {optimalMin}-{optimalMax}{unit}
          </span>
          <span>{referenceMax}{unit}</span>
        </div>
      )}
    </div>
  )
}
