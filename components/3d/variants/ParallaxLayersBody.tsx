'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { CONTOUR_COLORS } from './shared/contour-utils'

interface ParallaxLayersBodyProps {
  autoRotate?: boolean
  className?: string
}

/**
 * Variant 3: Parallax Layers Body
 *
 * CSS-only 2D approach using multiple SVG layers at different depths.
 * Mouse/touch movement creates parallax effect simulating 3D rotation.
 * No Three.js/WebGL required - works everywhere.
 */
export function ParallaxLayersBody({
  autoRotate = true,
  className = '',
}: ParallaxLayersBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || isHovering) return

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [autoRotate, isHovering])

  // Mouse/touch interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const mouseX = e.clientX - rect.left

    // Map mouse position to rotation (-30 to 30 degrees)
    const normalizedX = (mouseX - centerX) / centerX
    setRotation(normalizedX * 30)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const touchX = e.touches[0].clientX - rect.left

    const normalizedX = (touchX - centerX) / centerX
    setRotation(normalizedX * 30)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#050510] ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ perspective: '1000px' }}
    >
      {/* 3D transform container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
          transition: isHovering ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* Back silhouette - Layer 0 */}
        <BodyLayer
          depth={-80}
          opacity={0.15}
          strokeWidth={1}
          color={CONTOUR_COLORS.secondary}
          scale={0.95}
        />

        {/* Back detail - Layer 1 */}
        <BodyLayer
          depth={-50}
          opacity={0.25}
          strokeWidth={1}
          color={CONTOUR_COLORS.secondary}
          scale={0.97}
        />

        {/* Core - Layer 2 */}
        <BodyLayer
          depth={-20}
          opacity={0.4}
          strokeWidth={1.5}
          color={CONTOUR_COLORS.primary}
          scale={0.99}
        />

        {/* Mid - Layer 3 */}
        <BodyLayer
          depth={0}
          opacity={0.6}
          strokeWidth={2}
          color={CONTOUR_COLORS.primary}
          scale={1}
        />

        {/* Front detail - Layer 4 */}
        <BodyLayer
          depth={20}
          opacity={0.75}
          strokeWidth={2}
          color={CONTOUR_COLORS.primary}
          scale={1.01}
        />

        {/* Front outline - Layer 5 */}
        <BodyLayer
          depth={50}
          opacity={0.9}
          strokeWidth={2.5}
          color={CONTOUR_COLORS.glow}
          scale={1.02}
        />
      </div>

      {/* Ambient glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${CONTOUR_COLORS.primary}15` }}
        />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,16,0.7)_100%)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-cyan-500/30" />
      <div className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r border-t border-cyan-500/30" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b border-l border-cyan-500/30" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-cyan-500/30" />
    </div>
  )
}

interface BodyLayerProps {
  depth: number
  opacity: number
  strokeWidth: number
  color: string
  scale: number
}

/**
 * Single body contour layer
 */
function BodyLayer({ depth, opacity, strokeWidth, color, scale }: BodyLayerProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: `translateZ(${depth}px) scale(${scale})`,
      }}
    >
      <svg
        viewBox="0 0 200 400"
        className="w-auto h-[80%] max-h-[350px]"
        style={{ opacity }}
      >
        {/* Body contour path - stylized human silhouette */}
        <path
          d={BODY_CONTOUR_PATH}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Internal contour lines for depth effect */}
        <g opacity={0.5}>
          {INTERNAL_CONTOUR_PATHS.map((path, i) => (
            <path
              key={i}
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth * 0.5}
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

// SVG path for body outline - front view
const BODY_CONTOUR_PATH = `
  M100 20
  C120 20 135 35 135 55
  C135 75 125 85 115 90
  C125 95 130 100 130 110
  C130 115 125 118 120 120
  L120 125
  C145 130 165 150 170 190
  C175 230 170 270 165 300
  C160 330 145 350 140 370
  L140 380
  L60 380
  L60 370
  C55 350 40 330 35 300
  C30 270 25 230 30 190
  C35 150 55 130 80 125
  L80 120
  C75 118 70 115 70 110
  C70 100 75 95 85 90
  C75 85 65 75 65 55
  C65 35 80 20 100 20
  Z
`

// Internal contour lines for additional depth effect
const INTERNAL_CONTOUR_PATHS = [
  // Shoulder line
  'M75 130 C85 125 115 125 125 130',
  // Chest line
  'M80 160 C90 155 110 155 120 160',
  // Waist line
  'M75 220 C85 215 115 215 125 220',
  // Hip line
  'M70 260 C85 255 115 255 130 260',
  // Neck circle
  'M90 100 C95 95 105 95 110 100',
  // Face oval
  'M90 55 C95 45 105 45 110 55',
]

// Wrapper for R3F Canvas integration (returns null, this is CSS-only)
export function ParallaxLayersBodyWrapper(props: ParallaxLayersBodyProps) {
  // This variant doesn't use R3F Canvas, so we return null here
  // The actual component is rendered outside Canvas in BodyVisualization
  return null
}
