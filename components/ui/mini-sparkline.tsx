'use client'

interface MiniSparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  showDot?: boolean
}

export function MiniSparkline({
  data,
  width = 64,
  height = 24,
  color = '#2D6A4F',
  showDot = true,
}: MiniSparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')

  const lastPoint = data[data.length - 1]
  const lastX = width
  const lastY = height - ((lastPoint - min) / range) * (height - 4) - 2

  // Determine trend
  const trend = data[data.length - 1] > data[0] ? 'up' : data[data.length - 1] < data[0] ? 'down' : 'stable'
  const trendColor = trend === 'up' ? '#2D6A4F' : trend === 'down' ? '#E76F51' : '#737373'

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Gradient fill under line */}
      <defs>
        <linearGradient id={`sparkGradient-${data.join('-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={trendColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={trendColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#sparkGradient-${data.join('-')})`}
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={trendColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      {showDot && (
        <circle
          cx={lastX}
          cy={lastY}
          r="3"
          fill={trendColor}
          className="animate-pulse-gentle"
        />
      )}
    </svg>
  )
}
