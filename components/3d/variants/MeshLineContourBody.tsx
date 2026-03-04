'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, Line } from '@react-three/drei'
import * as THREE from 'three'
import { HorizontalControls } from './shared/HorizontalControls'
import { generateSlicePositions, CONTOUR_COLORS } from './shared/contour-utils'

interface MeshLineContourBodyProps {
  autoRotate?: boolean
  lineCount?: number
  animateDrawing?: boolean
}

/**
 * Variant 4: Mesh Line Contours
 *
 * Extracts iso-height contour lines from the mesh geometry
 * and renders them as thick lines using drei's Line component.
 * Supports animated line drawing reveal effect.
 */
export function MeshLineContourBody({
  autoRotate = true,
  lineCount = 40,
  animateDrawing = true,
}: MeshLineContourBodyProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [drawProgress, setDrawProgress] = useState(animateDrawing ? 0 : 1)

  // Load the GLTF model
  const { scene } = useGLTF('/models/scene.gltf')

  // Extract contour lines from mesh
  const contourLines = useMemo(() => {
    let geometry: THREE.BufferGeometry | null = null

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        geometry = child.geometry.clone()
      }
    })

    if (!geometry) {
      return generateFallbackContours(lineCount)
    }

    return extractMeshContours(geometry, lineCount)
  }, [scene, lineCount])

  // Animate drawing effect
  useEffect(() => {
    if (!animateDrawing) return

    const duration = 2000 // 2 seconds to fully draw
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic for smooth finish
      const eased = 1 - Math.pow(1 - progress, 3)
      setDrawProgress(eased)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [animateDrawing])

  // Breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.003
      groupRef.current.scale.y = breath
    }
  })

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 2.8]} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[2, 2, 2]} intensity={0.3} color={CONTOUR_COLORS.primary} />
      <pointLight position={[-2, -1, 2]} intensity={0.15} color={CONTOUR_COLORS.secondary} />
      <pointLight position={[0, 0, 3]} intensity={0.2} color={CONTOUR_COLORS.glow} />

      {/* Contour lines group */}
      <group ref={groupRef}>
        {contourLines.map((contour, index) => (
          <ContourLine
            key={index}
            points={contour.points}
            y={contour.y}
            index={index}
            total={contourLines.length}
            drawProgress={drawProgress}
          />
        ))}
      </group>

      {/* Center glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={CONTOUR_COLORS.glow}
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Ambient particles */}
      <MeshLineParticles drawProgress={drawProgress} />

      {/* Controls */}
      <HorizontalControls autoRotate={autoRotate} autoRotateSpeed={0.35} />
    </>
  )
}

interface ContourData {
  points: THREE.Vector3[]
  y: number
}

interface ContourLineProps {
  points: THREE.Vector3[]
  y: number
  index: number
  total: number
  drawProgress: number
}

/**
 * Individual contour line with animated drawing
 */
function ContourLine({ points, y, index, total, drawProgress }: ContourLineProps) {
  // Calculate which lines should be visible based on draw progress
  const lineProgress = index / total
  const isVisible = lineProgress <= drawProgress
  const lineOpacity = isVisible ? Math.min((drawProgress - lineProgress) * total * 0.5, 1) : 0

  // Color gradient based on Y position
  const normalizedY = (y + 1.2) / 2.4
  const color = new THREE.Color().lerpColors(
    new THREE.Color(CONTOUR_COLORS.secondary),
    new THREE.Color(CONTOUR_COLORS.primary),
    normalizedY
  )

  // Line width varies by position - thicker in middle
  const centerDistance = Math.abs(normalizedY - 0.5) * 2
  const lineWidth = 1.5 + (1 - centerDistance) * 1.5

  // Dash animation based on index
  const dashOffset = useMemo(() => {
    return index * 0.5
  }, [index])

  if (!isVisible || points.length < 3) return null

  return (
    <Line
      points={points}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={lineOpacity * (0.5 + normalizedY * 0.4)}
      depthWrite={false}
      dashed={false}
    />
  )
}

/**
 * Extract contour lines from mesh geometry
 */
function extractMeshContours(
  geometry: THREE.BufferGeometry,
  count: number
): ContourData[] {
  const contours: ContourData[] = []
  const positions = geometry.attributes.position.array as Float32Array

  // Get bounding box
  geometry.computeBoundingBox()
  const bbox = geometry.boundingBox!

  // Generate Y levels
  const yLevels = generateSlicePositions(count, bbox.min.y, bbox.max.y)

  for (const yLevel of yLevels) {
    // Sample mesh width at each Y level
    let maxX = 0
    let maxZ = 0
    let sampleCount = 0

    for (let i = 0; i < positions.length; i += 3) {
      const py = positions[i + 1]
      const threshold = (bbox.max.y - bbox.min.y) / count

      if (Math.abs(py - yLevel) < threshold) {
        const px = Math.abs(positions[i])
        const pz = Math.abs(positions[i + 2])
        maxX = Math.max(maxX, px)
        maxZ = Math.max(maxZ, pz)
        sampleCount++
      }
    }

    // Skip if no samples
    if (sampleCount === 0) continue

    // Generate smooth ellipse contour
    const points: THREE.Vector3[] = []
    const segments = 80

    // Add some organic variation
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const noise = 1 + Math.sin(angle * 3) * 0.02 + Math.sin(angle * 7) * 0.01

      const x = Math.cos(angle) * maxX * 2.2 * noise
      const z = Math.sin(angle) * maxZ * 2.2 * noise
      const worldY = (yLevel - (bbox.min.y + bbox.max.y) / 2) * 2.2

      points.push(new THREE.Vector3(x, worldY, z))
    }

    contours.push({ points, y: yLevel })
  }

  return contours
}

/**
 * Generate fallback contours when mesh isn't available
 */
function generateFallbackContours(count: number): ContourData[] {
  const contours: ContourData[] = []
  const yLevels = generateSlicePositions(count, -1.1, 1.1)

  for (const y of yLevels) {
    const normalizedY = (y + 1.1) / 2.2

    // Human body shape approximation
    let radiusX: number
    let radiusZ: number

    if (normalizedY > 0.88) {
      // Top of head
      const t = (normalizedY - 0.88) / 0.12
      radiusX = 0.2 * (1 - t * 0.5)
      radiusZ = 0.18 * (1 - t * 0.5)
    } else if (normalizedY > 0.75) {
      // Head
      radiusX = 0.22
      radiusZ = 0.2
    } else if (normalizedY > 0.68) {
      // Neck
      radiusX = 0.1
      radiusZ = 0.08
    } else if (normalizedY > 0.35) {
      // Torso
      const t = (normalizedY - 0.35) / 0.33
      radiusX = 0.28 + t * 0.08
      radiusZ = 0.15 + t * 0.03
    } else if (normalizedY > 0.08) {
      // Hips and legs
      const t = (normalizedY - 0.08) / 0.27
      radiusX = 0.35 - t * 0.15
      radiusZ = 0.18 - t * 0.05
    } else {
      // Feet
      radiusX = 0.12
      radiusZ = 0.08
    }

    const points: THREE.Vector3[] = []
    const segments = 80

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const noise = 1 + Math.sin(angle * 4) * 0.015

      const x = Math.cos(angle) * radiusX * noise
      const z = Math.sin(angle) * radiusZ * noise

      points.push(new THREE.Vector3(x, y, z))
    }

    contours.push({ points, y })
  }

  return contours
}

/**
 * Particles that appear as lines are drawn
 */
function MeshLineParticles({ drawProgress }: { drawProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 80
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.6 + Math.random() * 1.4
      const height = (Math.random() - 0.5) * 2.4

      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }

    return pos
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04
      // Fade in particles with draw progress
      const mat = pointsRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.25 * drawProgress
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={CONTOUR_COLORS.glow}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Preload the model
useGLTF.preload('/models/scene.gltf')
