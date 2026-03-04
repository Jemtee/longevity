'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, Line } from '@react-three/drei'
import * as THREE from 'three'
import { HorizontalControls } from './shared/HorizontalControls'
import { generateSlicePositions, CONTOUR_COLORS } from './shared/contour-utils'

interface StackedSlicesBodyProps {
  autoRotate?: boolean
  sliceCount?: number
}

/**
 * Variant 2: Stacked Slices Body
 *
 * Generates horizontal slice planes through the body mesh,
 * extracting the contour outline at each Y level.
 * Creates a literal "stacked contour" effect like topographic maps.
 */
export function StackedSlicesBody({
  autoRotate = true,
  sliceCount = 35,
}: StackedSlicesBodyProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Load the GLTF model
  const { scene } = useGLTF('/models/scene.gltf')

  // Extract geometry and generate contour slices
  const slices = useMemo(() => {
    let geometry: THREE.BufferGeometry | null = null

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        geometry = child.geometry.clone()
      }
    })

    if (!geometry) {
      // Generate fallback ellipse slices for capsule shape
      return generateFallbackSlices(sliceCount)
    }

    // Generate contour slices from the mesh
    return generateMeshContourSlices(geometry, sliceCount)
  }, [scene, sliceCount])

  // Animate
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.003
      groupRef.current.scale.y = breath
    }
  })

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 2.8]} fov={50} />

      {/* Subtle lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[2, 2, 2]} intensity={0.3} color={CONTOUR_COLORS.primary} />
      <pointLight position={[-2, -1, 2]} intensity={0.15} color={CONTOUR_COLORS.secondary} />

      {/* Stacked slices */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {slices.map((slice, index) => (
          <ContourSlice
            key={index}
            points={slice.points}
            y={slice.y}
            index={index}
            total={slices.length}
          />
        ))}
      </group>

      {/* Ambient particles */}
      <SliceParticles />

      {/* Horizontal-only controls */}
      <HorizontalControls autoRotate={autoRotate} autoRotateSpeed={0.4} />
    </>
  )
}

interface SliceData {
  points: THREE.Vector3[]
  y: number
}

/**
 * Individual contour slice rendered as a line
 */
function ContourSlice({
  points,
  y,
  index,
  total,
}: {
  points: THREE.Vector3[]
  y: number
  index: number
  total: number
}) {
  // Color gradient from bottom to top
  const normalizedY = (y + 1.2) / 2.4 // Normalize to 0-1
  const color = useMemo(() => {
    return new THREE.Color().lerpColors(
      new THREE.Color(CONTOUR_COLORS.secondary),
      new THREE.Color(CONTOUR_COLORS.primary),
      normalizedY
    )
  }, [normalizedY])

  // Opacity variation - stronger in middle, fade at extremes
  const centerDistance = Math.abs(normalizedY - 0.5) * 2
  const baseOpacity = 0.4 + (1 - centerDistance) * 0.5

  // Animated opacity using state
  const [opacity, setOpacity] = useState(baseOpacity)

  useFrame((state) => {
    // Subtle pulse animation staggered by slice position
    const pulse = 0.9 + Math.sin(state.clock.elapsedTime * 2 + index * 0.2) * 0.1
    setOpacity(baseOpacity * pulse)
  })

  if (points.length < 3) return null

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={opacity}
      depthWrite={false}
    />
  )
}

/**
 * Generate contour slices from actual mesh geometry
 * Uses simple sampling approach - for each Y level, find mesh edges that cross it
 */
function generateMeshContourSlices(
  geometry: THREE.BufferGeometry,
  count: number
): SliceData[] {
  const slices: SliceData[] = []
  const positions = geometry.attributes.position.array as Float32Array

  // Compute bounds
  geometry.computeBoundingBox()
  const bbox = geometry.boundingBox!
  const minY = bbox.min.y
  const maxY = bbox.max.y

  // Generate Y positions for slices
  const yPositions = generateSlicePositions(count, minY, maxY)

  // For each Y level, generate an elliptical approximation based on mesh width at that level
  for (const yLevel of yPositions) {
    // Sample mesh width at this Y level (simplified approach)
    let maxX = 0
    let maxZ = 0

    for (let i = 0; i < positions.length; i += 3) {
      const py = positions[i + 1]
      // Check if vertex is near this Y level
      if (Math.abs(py - yLevel) < (maxY - minY) / count) {
        const px = Math.abs(positions[i])
        const pz = Math.abs(positions[i + 2])
        if (px > maxX) maxX = px
        if (pz > maxZ) maxZ = pz
      }
    }

    // Skip if no vertices found at this level
    if (maxX === 0 && maxZ === 0) {
      maxX = 0.3
      maxZ = 0.15
    }

    // Generate ellipse points
    const points: THREE.Vector3[] = []
    const segments = 64

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * maxX * 2.2
      const z = Math.sin(angle) * maxZ * 2.2
      // Transform Y to match body orientation (rotated -90 on X)
      const worldY = (yLevel - (minY + maxY) / 2) * 2.2
      points.push(new THREE.Vector3(x, worldY, z))
    }

    slices.push({ points, y: yLevel })
  }

  return slices
}

/**
 * Generate fallback ellipse slices for when mesh loading fails
 */
function generateFallbackSlices(count: number): SliceData[] {
  const slices: SliceData[] = []
  const yPositions = generateSlicePositions(count, -1.1, 1.1)

  for (const y of yPositions) {
    // Body shape approximation
    const normalizedY = (y + 1.1) / 2.2
    let radiusX: number
    let radiusZ: number

    if (normalizedY > 0.85) {
      // Head
      const headProgress = (normalizedY - 0.85) / 0.15
      radiusX = 0.25 * (1 - headProgress * 0.3)
      radiusZ = 0.2 * (1 - headProgress * 0.3)
    } else if (normalizedY > 0.7) {
      // Neck
      radiusX = 0.12
      radiusZ = 0.1
    } else if (normalizedY > 0.4) {
      // Torso
      const torsoProgress = (normalizedY - 0.4) / 0.3
      radiusX = 0.35 - torsoProgress * 0.1
      radiusZ = 0.18 - torsoProgress * 0.03
    } else if (normalizedY > 0.1) {
      // Hips to legs
      const legProgress = (normalizedY - 0.1) / 0.3
      radiusX = 0.35 - legProgress * 0.2
      radiusZ = 0.18 - legProgress * 0.05
    } else {
      // Feet
      radiusX = 0.15
      radiusZ = 0.1
    }

    const points: THREE.Vector3[] = []
    const segments = 64

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * radiusX
      const z = Math.sin(angle) * radiusZ
      points.push(new THREE.Vector3(x, y, z))
    }

    slices.push({ points, y })
  }

  return slices
}

/**
 * Floating particles for ambient effect
 */
function SliceParticles({ count = 50 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.8 + Math.random() * 1.2
      const height = (Math.random() - 0.5) * 2.2

      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color={CONTOUR_COLORS.primary}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Preload the model
useGLTF.preload('/models/scene.gltf')
