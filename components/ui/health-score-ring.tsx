'use client'

interface HealthScoreRingProps {
  score: number
  maxScore?: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
}

export function HealthScoreRing({
  score,
  maxScore = 100,
  size = 200,
  strokeWidth = 12,
  label = 'Health Score',
  sublabel,
}: HealthScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (score / maxScore) * 100
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return { stroke: '#2D6A4F', bg: '#F0F7F4', text: 'Excellent' }
    if (score >= 60) return { stroke: '#52A67F', bg: '#D8EDE3', text: 'Good' }
    if (score >= 40) return { stroke: '#D4A373', bg: '#FDF8F3', text: 'Fair' }
    return { stroke: '#E76F51', bg: '#FEF2F2', text: 'Needs Attention' }
  }

  const colors = getScoreColor(score)

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EBE4DA"
          strokeWidth={strokeWidth}
          className="opacity-40"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.stroke} />
            <stop offset="100%" stopColor={colors.stroke} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-display font-bold text-ink-800">{score}</span>
        <span className="text-sm font-medium text-ink-400 mt-1">{label}</span>
        {sublabel && (
          <span
            className="text-xs font-medium mt-2 px-3 py-1 rounded-full"
            style={{ backgroundColor: colors.bg, color: colors.stroke }}
          >
            {colors.text}
          </span>
        )}
      </div>
    </div>
  )
}
