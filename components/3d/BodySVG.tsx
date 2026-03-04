'use client'

import { useState, useEffect } from 'react'
import { useBodyViewerStore } from '@/lib/stores/body-viewer-store'
import { getRegionsArray, getRegionHealthStatus, HealthStatus, STATUS_COLORS } from '@/lib/body-regions'

interface BodySVGProps {
  className?: string
}

// Hotspot positions mapped to SVG coordinates (percentage-based)
const HOTSPOT_POSITIONS: Record<string, { x: number; y: number }> = {
  brain: { x: 50, y: 8 },
  thyroid: { x: 50, y: 16 },
  heart: { x: 53, y: 28 },
  lungs: { x: 50, y: 26 },
  liver: { x: 42, y: 34 },
  pancreas: { x: 52, y: 38 },
  kidneys: { x: 50, y: 40 },
  gut: { x: 50, y: 48 },
  bones: { x: 50, y: 70 },
  blood: { x: 38, y: 32 },
}

function Hotspot({
  id,
  x,
  y,
  status,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: {
  id: string
  x: number
  y: number
  status: HealthStatus
  isSelected: boolean
  isHovered: boolean
  onSelect: () => void
  onHover: (hovering: boolean) => void
}) {
  const colors = STATUS_COLORS[status]
  const size = isSelected || isHovered ? 14 : 10
  const glowSize = isSelected || isHovered ? 28 : 20

  return (
    <g
      className="cursor-pointer transition-transform"
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Outer glow */}
      <circle
        cx={`${x}%`}
        cy={`${y}%`}
        r={glowSize}
        fill={colors.glow}
        opacity={isSelected || isHovered ? 0.4 : 0.2}
        className="transition-all duration-300"
      />
      {/* Pulse ring */}
      <circle
        cx={`${x}%`}
        cy={`${y}%`}
        r={size + 4}
        fill="none"
        stroke={colors.main}
        strokeWidth="1"
        opacity={0.5}
        className="animate-ping"
      />
      {/* Core */}
      <circle
        cx={`${x}%`}
        cy={`${y}%`}
        r={size}
        fill={colors.main}
        className="transition-all duration-200"
        filter="url(#glow)"
      />
    </g>
  )
}

export function BodySVG({ className = '' }: BodySVGProps) {
  const { biomarkerData, selectedRegion, setSelectedRegion, setHoveredRegion } = useBodyViewerStore()
  const regions = getRegionsArray()
  const [scanLineY, setScanLineY] = useState(0)

  // Animate scan line
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLineY(prev => (prev + 0.5) % 100)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative w-full h-full bg-[#0a0a12] overflow-hidden ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 via-transparent to-transparent" />

      {/* SVG Container */}
      <svg
        viewBox="0 0 400 700"
        className="w-full h-full"
        style={{ maxHeight: '100%' }}
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Strong glow for body */}
          <filter id="bodyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Grid pattern */}
          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.5"/>
          </pattern>

          {/* Gradient for body */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#0088cc" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#004466" stopOpacity="0.5"/>
          </linearGradient>
        </defs>

        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#gridPattern)" opacity="0.3"/>

        {/* Human body wireframe - detailed SVG paths */}
        <g transform="translate(200, 350)" filter="url(#bodyGlow)">
          {/* Head */}
          <ellipse cx="0" cy="-300" rx="35" ry="45" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          {/* Head grid lines - horizontal */}
          <path d="M-35,-300 Q0,-295 35,-300" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6"/>
          <path d="M-33,-285 Q0,-280 33,-285" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6"/>
          <path d="M-33,-315 Q0,-320 33,-315" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6"/>
          <path d="M-30,-330 Q0,-335 30,-330" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6"/>
          {/* Head grid lines - vertical */}
          <path d="M0,-345 L0,-255" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6"/>
          <path d="M-15,-342 Q-15,-300 -15,-258" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4"/>
          <path d="M15,-342 Q15,-300 15,-258" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4"/>

          {/* Face suggestion */}
          <ellipse cx="0" cy="-295" rx="20" ry="12" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4"/>

          {/* Neck */}
          <path d="M-15,-255 L-12,-235 M15,-255 L12,-235" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          <path d="M-13,-245 L13,-245" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5"/>

          {/* Shoulders */}
          <path d="M-12,-235 Q-30,-235 -70,-220" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          <path d="M12,-235 Q30,-235 70,-220" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>

          {/* Torso outline */}
          <path d="M-70,-220 L-65,-180 L-55,-120 L-50,-60 L-55,0 L-60,30" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          <path d="M70,-220 L65,-180 L55,-120 L50,-60 L55,0 L60,30" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>

          {/* Torso grid - horizontal lines */}
          {[-210, -190, -170, -150, -130, -110, -90, -70, -50, -30, -10, 10].map((y, i) => (
            <path
              key={`torso-h-${i}`}
              d={`M${-65 + Math.abs(y + 100) * 0.1},${y} Q0,${y + 5} ${65 - Math.abs(y + 100) * 0.1},${y}`}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}

          {/* Torso grid - vertical lines */}
          {[-50, -35, -20, 0, 20, 35, 50].map((x, i) => (
            <path
              key={`torso-v-${i}`}
              d={`M${x * 1.3},-220 Q${x},${-100} ${x * 1.1},30`}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity={0.3 + (1 - Math.abs(x) / 50) * 0.3}
            />
          ))}

          {/* Chest definition */}
          <path d="M-45,-200 Q-20,-180 0,-185 Q20,-180 45,-200" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6"/>
          <path d="M-40,-180 Q0,-160 40,-180" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5"/>

          {/* Abs suggestion */}
          <path d="M-25,-140 L-25,-40" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4"/>
          <path d="M25,-140 L25,-40" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4"/>
          <path d="M0,-150 L0,-30" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5"/>

          {/* Arms - Left */}
          <path d="M-70,-220 L-85,-170 L-95,-100 L-100,-30 L-95,30 L-90,70" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          {/* Left arm grid */}
          {[-190, -160, -130, -100, -70, -40, -10, 20, 50].map((y, i) => (
            <path
              key={`larm-${i}`}
              d={`M${-72 - (220 + y) * 0.08},${y} L${-82 - (220 + y) * 0.08},${y}`}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          {/* Left hand */}
          <ellipse cx="-88" cy="85" rx="12" ry="18" fill="none" stroke="url(#bodyGradient)" strokeWidth="1"/>
          <path d="M-95,75 L-95,95 M-88,72 L-88,98 M-81,75 L-81,95" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5"/>

          {/* Arms - Right */}
          <path d="M70,-220 L85,-170 L95,-100 L100,-30 L95,30 L90,70" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          {/* Right arm grid */}
          {[-190, -160, -130, -100, -70, -40, -10, 20, 50].map((y, i) => (
            <path
              key={`rarm-${i}`}
              d={`M${72 + (220 + y) * 0.08},${y} L${82 + (220 + y) * 0.08},${y}`}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          {/* Right hand */}
          <ellipse cx="88" cy="85" rx="12" ry="18" fill="none" stroke="url(#bodyGradient)" strokeWidth="1"/>
          <path d="M95,75 L95,95 M88,72 L88,98 M81,75 L81,95" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5"/>

          {/* Pelvis */}
          <path d="M-60,30 Q-50,50 -45,60 L-40,80" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          <path d="M60,30 Q50,50 45,60 L40,80" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          <path d="M-45,60 Q0,70 45,60" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5"/>

          {/* Legs - Left */}
          <path d="M-40,80 L-45,150 L-48,220 L-45,280 L-50,320" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          {/* Left leg inner */}
          <path d="M-20,70 L-25,150 L-28,220 L-30,280 L-35,320" fill="none" stroke="url(#bodyGradient)" strokeWidth="1"/>
          {/* Left leg grid */}
          {[100, 130, 160, 190, 220, 250, 280, 300].map((y, i) => (
            <path
              key={`lleg-${i}`}
              d={`M${-25 - (y - 80) * 0.03},${y} L${-45 - (y - 80) * 0.01},${y}`}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}
          {/* Left foot */}
          <path d="M-50,320 L-55,330 L-60,335 L-35,335 L-35,325" fill="none" stroke="url(#bodyGradient)" strokeWidth="1"/>

          {/* Legs - Right */}
          <path d="M40,80 L45,150 L48,220 L45,280 L50,320" fill="none" stroke="url(#bodyGradient)" strokeWidth="1.5"/>
          {/* Right leg inner */}
          <path d="M20,70 L25,150 L28,220 L30,280 L35,320" fill="none" stroke="url(#bodyGradient)" strokeWidth="1"/>
          {/* Right leg grid */}
          {[100, 130, 160, 190, 220, 250, 280, 300].map((y, i) => (
            <path
              key={`rleg-${i}`}
              d={`M${25 + (y - 80) * 0.03},${y} L${45 + (y - 80) * 0.01},${y}`}
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}
          {/* Right foot */}
          <path d="M50,320 L55,330 L60,335 L35,335 L35,325" fill="none" stroke="url(#bodyGradient)" strokeWidth="1"/>
        </g>

        {/* Scan line effect */}
        <line
          x1="0"
          y1={`${scanLineY}%`}
          x2="100%"
          y2={`${scanLineY}%`}
          stroke="#00d4ff"
          strokeWidth="1"
          opacity="0.3"
        />
        <line
          x1="0"
          y1={`${(scanLineY + 50) % 100}%`}
          x2="100%"
          y2={`${(scanLineY + 50) % 100}%`}
          stroke="#00d4ff"
          strokeWidth="0.5"
          opacity="0.15"
        />

        {/* Hotspots */}
        {regions.map(region => {
          const pos = HOTSPOT_POSITIONS[region.id]
          if (!pos) return null

          return (
            <Hotspot
              key={region.id}
              id={region.id}
              x={pos.x}
              y={pos.y}
              status={getRegionHealthStatus(region.id, biomarkerData)}
              isSelected={selectedRegion === region.id}
              isHovered={false}
              onSelect={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
              onHover={(hovering) => setHoveredRegion(hovering ? region.id : null)}
            />
          )
        })}
      </svg>

      {/* Corner decorations */}
      <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-cyan-500/40" />
      <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-cyan-500/40" />
      <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-cyan-500/40" />
      <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-cyan-500/40" />

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
