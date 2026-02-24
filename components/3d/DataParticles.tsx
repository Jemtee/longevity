'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DataParticlesProps {
  count?: number
}

// Ambient floating particles for "data flow" aesthetic
export function DataParticles({ count = 50 }: DataParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  // Generate random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const color1 = new THREE.Color('#22c55e') // Green
    const color2 = new THREE.Color('#84C4A7') // Light green
    const color3 = new THREE.Color('#D4A373') // Sand accent

    for (let i = 0; i < count; i++) {
      // Distribute particles around the body
      const radius = 0.4 + Math.random() * 0.6
      const theta = Math.random() * Math.PI * 2
      const y = Math.random() * 2 // Height from 0 to 2

      positions[i * 3] = Math.cos(theta) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(theta) * radius

      // Random color from palette
      const colorChoice = Math.random()
      let color: THREE.Color
      if (colorChoice < 0.5) {
        color = color1
      } else if (colorChoice < 0.8) {
        color = color2
      } else {
        color = color3
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 0.015 + 0.005
    }

    return { positions, colors, sizes }
  }, [count])

  // Animate particles
  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < count; i++) {
        // Slow upward drift
        positions[i * 3 + 1] += 0.002

        // Wrap around when reaching top
        if (positions[i * 3 + 1] > 2.2) {
          positions[i * 3 + 1] = -0.2
        }

        // Gentle orbital motion
        const x = positions[i * 3]
        const z = positions[i * 3 + 2]
        const angle = 0.001
        positions[i * 3] = x * Math.cos(angle) - z * Math.sin(angle)
        positions[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle)
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true

      // Rotate the whole particle system slowly
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
