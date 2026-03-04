'use client'

import { useEffect, useRef } from 'react'

type ImageVariant = 'abstract-cells' | 'data-flow' | 'organic-mesh' | 'gradient-orb' | 'dna-helix'

interface PlaceholderImageProps {
  variant?: ImageVariant
  className?: string
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  animate?: boolean
}

export function PlaceholderImage({
  variant = 'abstract-cells',
  className = '',
  width = 400,
  height = 300,
  primaryColor = '#2D6A4F',
  secondaryColor = '#D4A373',
  animate = false,
}: PlaceholderImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const drawAbstractCells = (time: number = 0) => {
      ctx.clearRect(0, 0, width, height)

      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, width, height)
      bgGradient.addColorStop(0, '#FAF8F5')
      bgGradient.addColorStop(1, '#F0F7F4')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      // Draw cell-like circles
      const cells = 15
      for (let i = 0; i < cells; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const radius = 20 + Math.random() * 60
        const offset = animate ? Math.sin(time / 1000 + i) * 10 : 0

        const gradient = ctx.createRadialGradient(
          x + offset,
          y,
          0,
          x + offset,
          y,
          radius
        )
        gradient.addColorStop(0, `${primaryColor}40`)
        gradient.addColorStop(0.6, `${primaryColor}15`)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(x + offset, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Add connecting lines
      ctx.strokeStyle = `${secondaryColor}30`
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * width, Math.random() * height)
        ctx.bezierCurveTo(
          Math.random() * width,
          Math.random() * height,
          Math.random() * width,
          Math.random() * height,
          Math.random() * width,
          Math.random() * height
        )
        ctx.stroke()
      }
    }

    const drawDataFlow = (time: number = 0) => {
      ctx.clearRect(0, 0, width, height)

      // Dark background
      ctx.fillStyle = '#1A1A1A'
      ctx.fillRect(0, 0, width, height)

      // Flowing data lines
      const lines = 12
      for (let i = 0; i < lines; i++) {
        const startY = (height / lines) * i + (animate ? Math.sin(time / 500 + i) * 5 : 0)

        ctx.beginPath()
        ctx.moveTo(0, startY)

        for (let x = 0; x < width; x += 5) {
          const y = startY + Math.sin((x + time / 100) / 30 + i) * 15
          ctx.lineTo(x, y)
        }

        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.3, `${primaryColor}80`)
        gradient.addColorStop(0.7, `${secondaryColor}60`)
        gradient.addColorStop(1, 'transparent')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Glowing dots
      for (let i = 0; i < 20; i++) {
        const x = (width / 20) * i + (animate ? time / 50 : 0) % width
        const y = height / 2 + Math.sin(i + time / 200) * (height / 3)

        const glow = ctx.createRadialGradient(x, y, 0, x, y, 8)
        glow.addColorStop(0, `${primaryColor}FF`)
        glow.addColorStop(0.5, `${primaryColor}40`)
        glow.addColorStop(1, 'transparent')

        ctx.fillStyle = glow
        ctx.fillRect(x - 8, y - 8, 16, 16)
      }
    }

    const drawOrganicMesh = () => {
      ctx.clearRect(0, 0, width, height)

      // Warm gradient background
      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      bgGradient.addColorStop(0, '#FDF8F3')
      bgGradient.addColorStop(1, '#F5F0EA')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      // Organic mesh pattern
      const points: [number, number][] = []
      const gridSize = 40

      for (let x = 0; x < width + gridSize; x += gridSize) {
        for (let y = 0; y < height + gridSize; y += gridSize) {
          points.push([
            x + (Math.random() - 0.5) * gridSize * 0.6,
            y + (Math.random() - 0.5) * gridSize * 0.6,
          ])
        }
      }

      // Draw connections
      ctx.strokeStyle = `${primaryColor}15`
      ctx.lineWidth = 1

      points.forEach((p1, i) => {
        points.slice(i + 1).forEach((p2) => {
          const dist = Math.sqrt(
            Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)
          )
          if (dist < gridSize * 1.8) {
            ctx.beginPath()
            ctx.moveTo(p1[0], p1[1])
            ctx.lineTo(p2[0], p2[1])
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      points.forEach((p, i) => {
        const size = 2 + Math.random() * 3
        ctx.beginPath()
        ctx.arc(p[0], p[1], size, 0, Math.PI * 2)
        ctx.fillStyle = i % 3 === 0 ? `${primaryColor}60` : `${secondaryColor}40`
        ctx.fill()
      })
    }

    const drawGradientOrb = () => {
      ctx.clearRect(0, 0, width, height)

      // Light background
      ctx.fillStyle = '#FAF8F5'
      ctx.fillRect(0, 0, width, height)

      // Large gradient orb
      const centerX = width * 0.6
      const centerY = height * 0.4
      const radius = Math.min(width, height) * 0.5

      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        0,
        centerX,
        centerY,
        radius
      )
      gradient.addColorStop(0, `${primaryColor}50`)
      gradient.addColorStop(0.4, `${primaryColor}30`)
      gradient.addColorStop(0.7, `${secondaryColor}20`)
      gradient.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Secondary orb
      const gradient2 = ctx.createRadialGradient(
        width * 0.3,
        height * 0.7,
        0,
        width * 0.3,
        height * 0.7,
        radius * 0.6
      )
      gradient2.addColorStop(0, `${secondaryColor}40`)
      gradient2.addColorStop(0.5, `${secondaryColor}15`)
      gradient2.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(width * 0.3, height * 0.7, radius * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = gradient2
      ctx.fill()
    }

    const drawDnaHelix = (time: number = 0) => {
      ctx.clearRect(0, 0, width, height)

      // Gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
      bgGradient.addColorStop(0, '#F0F7F4')
      bgGradient.addColorStop(1, '#FDF8F3')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const amplitude = width * 0.25
      const frequency = 0.03
      const phaseOffset = animate ? time / 500 : 0

      // Draw helix strands
      for (let y = -20; y < height + 20; y += 3) {
        const x1 = centerX + Math.sin((y + phaseOffset) * frequency) * amplitude
        const x2 = centerX + Math.sin((y + phaseOffset) * frequency + Math.PI) * amplitude

        // Strand 1
        ctx.beginPath()
        ctx.arc(x1, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `${primaryColor}${Math.floor((1 - Math.abs(y - height / 2) / (height / 2)) * 200 + 55).toString(16).padStart(2, '0')}`
        ctx.fill()

        // Strand 2
        ctx.beginPath()
        ctx.arc(x2, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `${secondaryColor}${Math.floor((1 - Math.abs(y - height / 2) / (height / 2)) * 200 + 55).toString(16).padStart(2, '0')}`
        ctx.fill()

        // Connection bars
        if (y % 15 === 0) {
          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(x2, y)
          ctx.strokeStyle = `${primaryColor}25`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    const draw = (time: number = 0) => {
      switch (variant) {
        case 'abstract-cells':
          drawAbstractCells(time)
          break
        case 'data-flow':
          drawDataFlow(time)
          break
        case 'organic-mesh':
          drawOrganicMesh()
          break
        case 'gradient-orb':
          drawGradientOrb()
          break
        case 'dna-helix':
          drawDnaHelix(time)
          break
      }

      if (animate) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [variant, width, height, primaryColor, secondaryColor, animate])

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ width, height }}
    />
  )
}

// Static SVG placeholder for faster initial load
export function PlaceholderSVG({
  variant = 'cells',
  className = '',
}: {
  variant?: 'cells' | 'waves' | 'orb'
  className?: string
}) {
  if (variant === 'cells') {
    return (
      <svg className={className} viewBox="0 0 400 300" fill="none">
        <rect width="400" height="300" fill="url(#bgGrad)" />
        <circle cx="100" cy="80" r="60" fill="url(#cellGrad1)" />
        <circle cx="280" cy="120" r="80" fill="url(#cellGrad2)" />
        <circle cx="180" cy="220" r="50" fill="url(#cellGrad3)" />
        <circle cx="350" cy="250" r="40" fill="url(#cellGrad1)" />
        <circle cx="50" cy="200" r="35" fill="url(#cellGrad2)" />
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="400" y2="300">
            <stop stopColor="#FAF8F5" />
            <stop offset="1" stopColor="#F0F7F4" />
          </linearGradient>
          <radialGradient id="cellGrad1">
            <stop stopColor="#2D6A4F" stopOpacity="0.3" />
            <stop offset="1" stopColor="#2D6A4F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cellGrad2">
            <stop stopColor="#D4A373" stopOpacity="0.25" />
            <stop offset="1" stopColor="#D4A373" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cellGrad3">
            <stop stopColor="#2D6A4F" stopOpacity="0.2" />
            <stop offset="1" stopColor="#2D6A4F" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    )
  }

  if (variant === 'waves') {
    return (
      <svg className={className} viewBox="0 0 400 300" fill="none">
        <rect width="400" height="300" fill="#1A1A1A" />
        <path
          d="M0 150 Q100 100 200 150 T400 150"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 180 Q100 130 200 180 T400 180"
          stroke="url(#waveGrad2)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 120 Q100 170 200 120 T400 120"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          fill="none"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="400">
            <stop stopColor="transparent" />
            <stop offset="0.3" stopColor="#2D6A4F" stopOpacity="0.6" />
            <stop offset="0.7" stopColor="#D4A373" stopOpacity="0.4" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0" x2="400">
            <stop stopColor="transparent" />
            <stop offset="0.4" stopColor="#D4A373" stopOpacity="0.5" />
            <stop offset="0.6" stopColor="#2D6A4F" stopOpacity="0.3" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 400 300" fill="none">
      <rect width="400" height="300" fill="#FAF8F5" />
      <circle cx="240" cy="120" r="120" fill="url(#orbGrad1)" />
      <circle cx="120" cy="210" r="80" fill="url(#orbGrad2)" />
      <defs>
        <radialGradient id="orbGrad1" cx="0.3" cy="0.3">
          <stop stopColor="#2D6A4F" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#2D6A4F" stopOpacity="0.15" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="orbGrad2" cx="0.3" cy="0.3">
          <stop stopColor="#D4A373" stopOpacity="0.3" />
          <stop offset="0.6" stopColor="#D4A373" stopOpacity="0.1" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  )
}
