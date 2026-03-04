'use client'

import { useEffect, useRef } from 'react'

interface DotGridProps {
  className?: string
  dotColor?: string
  dotSize?: number
  gap?: number
  fadeEdges?: boolean
  animate?: boolean
  pulseIntensity?: 'subtle' | 'medium' | 'strong'
}

export function DotGrid({
  className = '',
  dotColor = 'currentColor',
  dotSize = 1.5,
  gap = 24,
  fadeEdges = true,
  animate = true,
  pulseIntensity = 'subtle',
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const intensityMap = {
      subtle: 0.15,
      medium: 0.3,
      strong: 0.5,
    }

    const draw = (timestamp: number) => {
      if (!ctx || !canvas) return

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const cols = Math.ceil(rect.width / gap) + 1
      const rows = Math.ceil(rect.height / gap) + 1

      // Parse color
      const tempDiv = document.createElement('div')
      tempDiv.style.color = dotColor
      document.body.appendChild(tempDiv)
      const computedColor = getComputedStyle(tempDiv).color
      document.body.removeChild(tempDiv)

      // Extract RGB values
      const rgbMatch = computedColor.match(/\d+/g)
      const [r, g, b] = rgbMatch ? rgbMatch.map(Number) : [45, 106, 79]

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap
          const y = j * gap

          // Calculate distance from center for edge fade
          let opacity = 0.4

          if (fadeEdges) {
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
            const dist = Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            )
            opacity = Math.max(0.05, 0.5 * (1 - dist / maxDist))
          }

          // Animate with wave effect
          if (animate) {
            const waveX = Math.sin((x / 100 + timestamp / 3000) * Math.PI) * 0.5 + 0.5
            const waveY = Math.cos((y / 80 + timestamp / 4000) * Math.PI) * 0.5 + 0.5
            const pulse = (waveX + waveY) / 2
            opacity *= 0.6 + pulse * intensityMap[pulseIntensity]
          }

          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
          ctx.fill()
        }
      }

      if (animate) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    if (animate) {
      animationRef.current = requestAnimationFrame(draw)
    } else {
      draw(0)
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dotColor, dotSize, gap, fadeEdges, animate, pulseIntensity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  )
}

// CSS-only version for simpler use cases
export function DotGridCSS({
  className = '',
  size = 1,
  gap = 20,
  color = 'var(--dot-color, rgba(45, 106, 79, 0.2))',
}: {
  className?: string
  size?: number
  gap?: number
  color?: string
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
      }}
    />
  )
}
