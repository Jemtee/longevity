'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { HorizontalControls } from './shared/HorizontalControls'
import {
  createContourMaterial,
  updateContourMaterialTime,
  CONTOUR_COLORS,
  type ContourConfig,
} from './shared/contour-utils'

interface ContourShaderBodyProps {
  autoRotate?: boolean
  config?: Partial<ContourConfig>
}

/**
 * Variant 1: Contour Shader Body
 *
 * Applies a custom shader material to the GLTF body mesh that renders
 * horizontal contour stripes based on world-space Y position.
 * Creates a topographic/MRI slice aesthetic.
 */
export function ContourShaderBody({
  autoRotate = true,
  config = {},
}: ContourShaderBodyProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  // Load the GLTF model
  const { scene } = useGLTF('/models/scene.gltf')

  // Extract geometry and create contour material
  const { geometry, material } = useMemo(() => {
    let extractedGeometry: THREE.BufferGeometry | null = null

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        extractedGeometry = child.geometry.clone()
      }
    })

    if (!extractedGeometry) {
      // Fallback geometry
      extractedGeometry = new THREE.CapsuleGeometry(0.4, 1.2, 16, 32)
    }

    // Compute bounding box for shader Y range
    extractedGeometry.computeBoundingBox()
    const bbox = extractedGeometry.boundingBox

    const contourMat = createContourMaterial({
      lineCount: 50,
      lineThickness: 0.025,
      color: CONTOUR_COLORS.primary,
      glowColor: CONTOUR_COLORS.glow,
      glowIntensity: 0.6,
      ...config,
    })

    // Set Y range based on geometry bounds
    if (bbox) {
      contourMat.uniforms.uMinY.value = bbox.min.y * 2.2 - 1.1
      contourMat.uniforms.uMaxY.value = bbox.max.y * 2.2 - 1.1
    }

    return {
      geometry: extractedGeometry,
      material: contourMat,
    }
  }, [scene, config])

  // Animate
  useFrame((state) => {
    // Update shader time for animation
    updateContourMaterialTime(material, state.clock.elapsedTime)

    // Subtle breathing animation
    if (groupRef.current) {
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.003
      groupRef.current.scale.y = breath * 2.2
    }
  })

  // Cleanup material on unmount
  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={50} />

      {/* Subtle lighting for ambient effect */}
      <ambientLight intensity={0.1} />
      <pointLight position={[2, 2, 2]} intensity={0.3} color={CONTOUR_COLORS.primary} />
      <pointLight position={[-2, -1, 2]} intensity={0.15} color={CONTOUR_COLORS.secondary} />

      {/* Contour body */}
      <group
        ref={groupRef}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={[2.2, 2.2, 2.2]}
        position={[0, -1.1, 0]}
      >
        <mesh ref={meshRef} geometry={geometry} material={material} />

        {/* Outer glow mesh - slightly larger, more transparent */}
        <mesh geometry={geometry} scale={[1.02, 1.02, 1.02]}>
          <meshBasicMaterial
            color={CONTOUR_COLORS.glow}
            transparent
            opacity={0.05}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Ambient particles */}
      <ContourParticles />

      {/* Horizontal-only controls */}
      <HorizontalControls autoRotate={autoRotate} autoRotateSpeed={0.4} />
    </>
  )
}

/**
 * Floating particles around the body for ambient effect
 */
function ContourParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1 + Math.random() * 1.5
      const height = (Math.random() - 0.5) * 2.5

      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={CONTOUR_COLORS.primary}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Preload the model
useGLTF.preload('/models/scene.gltf')
