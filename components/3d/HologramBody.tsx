'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Create a human body wireframe mesh with clear edges
function createBodyGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()

  // Human body profile (front half, will be lathed)
  // Starting from top of head, going down right side
  const points: THREE.Vector2[] = []

  // Head - top
  points.push(new THREE.Vector2(0, 1.95))
  points.push(new THREE.Vector2(0.08, 1.92))
  points.push(new THREE.Vector2(0.11, 1.85))
  points.push(new THREE.Vector2(0.12, 1.78))
  points.push(new THREE.Vector2(0.11, 1.70))
  points.push(new THREE.Vector2(0.10, 1.65))

  // Neck
  points.push(new THREE.Vector2(0.05, 1.60))
  points.push(new THREE.Vector2(0.05, 1.55))

  // Shoulders to torso
  points.push(new THREE.Vector2(0.20, 1.50))
  points.push(new THREE.Vector2(0.22, 1.45))
  points.push(new THREE.Vector2(0.20, 1.35))
  points.push(new THREE.Vector2(0.18, 1.20))
  points.push(new THREE.Vector2(0.16, 1.05))
  points.push(new THREE.Vector2(0.15, 0.90))

  // Waist
  points.push(new THREE.Vector2(0.13, 0.80))
  points.push(new THREE.Vector2(0.14, 0.70))

  // Hips
  points.push(new THREE.Vector2(0.16, 0.60))
  points.push(new THREE.Vector2(0.15, 0.50))

  // Upper leg
  points.push(new THREE.Vector2(0.10, 0.45))
  points.push(new THREE.Vector2(0.09, 0.35))
  points.push(new THREE.Vector2(0.08, 0.20))
  points.push(new THREE.Vector2(0.07, 0.05))

  // Lower leg
  points.push(new THREE.Vector2(0.06, -0.05))
  points.push(new THREE.Vector2(0.05, -0.15))
  points.push(new THREE.Vector2(0.045, -0.25))

  // Foot
  points.push(new THREE.Vector2(0.04, -0.30))
  points.push(new THREE.Vector2(0.02, -0.32))
  points.push(new THREE.Vector2(0, -0.32))

  // Create lathe geometry (rotates profile around Y axis)
  const geometry = new THREE.LatheGeometry(points, 24, 0, Math.PI * 2)

  return geometry
}

// Main torso mesh with wireframe
function TorsoMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => createBodyGeometry(), [])

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle breathing
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.008
      meshRef.current.scale.x = breath
      meshRef.current.scale.z = breath
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

// Arm geometry
function ArmMesh({ side }: { side: 'left' | 'right' }) {
  const armRef = useRef<THREE.Group>(null)
  const multiplier = side === 'left' ? -1 : 1

  // Create arm as series of connected segments
  const segments = useMemo(() => {
    const segs: { start: THREE.Vector3; end: THREE.Vector3; radius: number }[] = []

    // Upper arm
    segs.push({
      start: new THREE.Vector3(multiplier * 0.22, 1.45, 0),
      end: new THREE.Vector3(multiplier * 0.32, 1.15, 0),
      radius: 0.04
    })

    // Lower arm
    segs.push({
      start: new THREE.Vector3(multiplier * 0.32, 1.15, 0),
      end: new THREE.Vector3(multiplier * 0.38, 0.85, 0.02),
      radius: 0.035
    })

    // Hand
    segs.push({
      start: new THREE.Vector3(multiplier * 0.38, 0.85, 0.02),
      end: new THREE.Vector3(multiplier * 0.40, 0.75, 0.03),
      radius: 0.025
    })

    return segs
  }, [multiplier])

  return (
    <group ref={armRef}>
      {segments.map((seg, i) => {
        const direction = new THREE.Vector3().subVectors(seg.end, seg.start)
        const length = direction.length()
        const midpoint = new THREE.Vector3().addVectors(seg.start, seg.end).multiplyScalar(0.5)

        // Calculate rotation to align cylinder with segment
        const up = new THREE.Vector3(0, 1, 0)
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction.normalize())

        return (
          <mesh
            key={i}
            position={midpoint}
            quaternion={quaternion}
          >
            <cylinderGeometry args={[seg.radius * 0.9, seg.radius, length, 8, 4, true]} />
            <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.6} />
          </mesh>
        )
      })}
    </group>
  )
}

// Detailed head with grid
function HeadMesh() {
  const headRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (headRef.current) {
      // Very subtle head movement
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }
  })

  return (
    <group>
      {/* Main head sphere */}
      <mesh ref={headRef} position={[0, 1.80, 0]}>
        <sphereGeometry args={[0.12, 16, 12]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.7} />
      </mesh>

      {/* Face detail - front plane */}
      <mesh position={[0, 1.78, 0.08]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.12, 0.15, 4, 5]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Enhanced body with grid overlay for more detail
function BodyGridOverlay() {
  const gridRef = useRef<THREE.Group>(null)

  // Create horizontal grid rings at different heights
  const rings = useMemo(() => {
    const r: { y: number; radius: number }[] = []

    // Torso rings
    for (let y = 0.6; y <= 1.5; y += 0.08) {
      // Calculate radius based on body profile
      let radius = 0.15
      if (y > 1.4) radius = 0.18 + (y - 1.4) * 0.3 // shoulders
      else if (y > 1.2) radius = 0.17
      else if (y > 1.0) radius = 0.16
      else if (y > 0.85) radius = 0.14
      else if (y > 0.7) radius = 0.13
      else radius = 0.14 + (0.7 - y) * 0.2 // hips

      r.push({ y, radius })
    }

    return r
  }, [])

  useFrame((state) => {
    if (gridRef.current) {
      // Subtle pulse
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.01
      gridRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={gridRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, ring.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.002, 4, 32]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// Leg meshes
function LegMesh({ side }: { side: 'left' | 'right' }) {
  const multiplier = side === 'left' ? -1 : 1
  const xOffset = multiplier * 0.08

  const segments = useMemo(() => [
    // Thigh
    { start: [xOffset, 0.50, 0], end: [xOffset, 0.20, 0], radius: 0.065 },
    // Knee area
    { start: [xOffset, 0.20, 0], end: [xOffset, 0.10, 0], radius: 0.055 },
    // Shin
    { start: [xOffset, 0.10, 0], end: [xOffset, -0.20, 0], radius: 0.045 },
    // Ankle
    { start: [xOffset, -0.20, 0], end: [xOffset, -0.28, 0.02], radius: 0.035 },
  ], [xOffset])

  return (
    <group>
      {segments.map((seg, i) => {
        const start = new THREE.Vector3(...(seg.start as [number, number, number]))
        const end = new THREE.Vector3(...(seg.end as [number, number, number]))
        const direction = new THREE.Vector3().subVectors(end, start)
        const length = direction.length()
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.normalize()
        )

        return (
          <mesh key={i} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[seg.radius * 0.85, seg.radius, length, 8, 3, true]} />
            <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.6} />
          </mesh>
        )
      })}

      {/* Foot */}
      <mesh position={[xOffset, -0.30, 0.04]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.05, 0.03, 0.10, 2, 1, 3]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// Glowing edge effect using slightly larger wireframe
function GlowingEdges() {
  const glowRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (glowRef.current) {
      const pulse = 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
      glowRef.current.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial
          mat.opacity = pulse
        }
      })
    }
  })

  return (
    <group ref={glowRef} scale={[1.02, 1.0, 1.02]}>
      {/* Outer glow torso */}
      <mesh>
        <cylinderGeometry args={[0.16, 0.14, 0.9, 12, 6, true]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glow head */}
      <mesh position={[0, 1.80, 0]}>
        <sphereGeometry args={[0.14, 12, 8]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// Floating scan rings
function ScanRings() {
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ringsRef.current) {
      // Move rings up and down
      ringsRef.current.children.forEach((ring, i) => {
        const speed = 0.3 + i * 0.1
        const range = 1.8
        const y = ((state.clock.elapsedTime * speed + i * 0.5) % range) - 0.2
        ring.position.y = y

        // Fade based on position
        const mat = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial
        const fadeTop = y > 1.4 ? (1.6 - y) / 0.2 : 1
        const fadeBottom = y < 0 ? (y + 0.2) / 0.2 : 1
        mat.opacity = Math.max(0, Math.min(0.4, fadeTop * fadeBottom * 0.4))
      })
    }
  })

  return (
    <group ref={ringsRef}>
      {[0, 1, 2].map(i => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.003, 4, 48]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// Ambient particles (subtle, in background)
function AmbientParticles({ count = 150 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.8 + Math.random() * 1.2
      const height = Math.random() * 2.2 - 0.3

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      velocities[i * 3] = (Math.random() - 0.5) * 0.001
      velocities[i * 3 + 1] = 0.002 + Math.random() * 0.002
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }

    return { positions, velocities }
  }, [count])

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < count; i++) {
        pos[i * 3] += velocities[i * 3]
        pos[i * 3 + 1] += velocities[i * 3 + 1]
        pos[i * 3 + 2] += velocities[i * 3 + 2]

        // Reset if too high
        if (pos[i * 3 + 1] > 2.2) {
          const angle = Math.random() * Math.PI * 2
          const radius = 0.8 + Math.random() * 0.5
          pos[i * 3] = Math.cos(angle) * radius
          pos[i * 3 + 1] = -0.3
          pos[i * 3 + 2] = Math.sin(angle) * radius
        }

        // Gentle rotation
        const x = pos[i * 3]
        const z = pos[i * 3 + 2]
        const angle = 0.002
        pos[i * 3] = x * Math.cos(angle) - z * Math.sin(angle)
        pos[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle)
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00d4ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Inner glow/core effect
function InnerGlow() {
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 2) * 0.03
    }
  })

  return (
    <mesh ref={glowRef} position={[0, 1.0, 0]}>
      <capsuleGeometry args={[0.12, 0.7, 8, 12]} />
      <meshBasicMaterial
        color="#00aaff"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Main hologram body component
export function HologramBody() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.015
    }
  })

  return (
    <group ref={groupRef}>
      {/* Core body structure */}
      <TorsoMesh />
      <HeadMesh />
      <ArmMesh side="left" />
      <ArmMesh side="right" />
      <LegMesh side="left" />
      <LegMesh side="right" />

      {/* Detail layers */}
      <BodyGridOverlay />
      <GlowingEdges />
      <InnerGlow />

      {/* Animated elements */}
      <ScanRings />
      <AmbientParticles count={120} />
    </group>
  )
}
