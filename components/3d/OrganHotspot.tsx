'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import { BodyRegion, HealthStatus, STATUS_COLORS } from '@/lib/body-regions'
import { useBodyViewerStore } from '@/lib/stores/body-viewer-store'

interface OrganHotspotProps {
  region: BodyRegion
  status: HealthStatus
}

export function OrganHotspot({ region, status }: OrganHotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const { selectedRegion, setSelectedRegion, setHoveredRegion, showLabels } =
    useBodyViewerStore()

  const isSelected = selectedRegion === region.id
  const colors = STATUS_COLORS[status]

  // Animate the hotspot
  useFrame((state) => {
    if (meshRef.current) {
      // Pulse effect
      const pulse = Math.sin(state.clock.elapsedTime * 2 + region.position[1] * 5) * 0.1 + 1
      const baseScale = hovered || isSelected ? 1.3 : 1
      meshRef.current.scale.setScalar(baseScale * pulse)
    }

    if (glowRef.current) {
      // Glow animation
      const glowPulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7
      glowRef.current.scale.setScalar((hovered || isSelected ? 2.5 : 2) * glowPulse)
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = (hovered || isSelected ? 0.4 : 0.2) * glowPulse
    }
  })

  const handleClick = () => {
    setSelectedRegion(isSelected ? null : region.id)
  }

  const handlePointerOver = () => {
    setHovered(true)
    setHoveredRegion(region.id)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    setHoveredRegion(null)
    document.body.style.cursor = 'auto'
  }

  return (
    <group position={region.position}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Core hotspot */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={colors.main}
          emissive={colors.main}
          emissiveIntensity={hovered || isSelected ? 1.5 : 0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight
        color={colors.main}
        intensity={hovered || isSelected ? 2 : 0.5}
        distance={0.5}
        decay={2}
      />

      {/* Label */}
      {showLabels && (hovered || isSelected) && (
        <Billboard position={[0, 0.12, 0]}>
          <Text
            fontSize={0.06}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.004}
            outlineColor="#000000"
          >
            {region.name}
          </Text>
        </Billboard>
      )}
    </group>
  )
}
