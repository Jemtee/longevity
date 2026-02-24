'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Abstract, stylized human body using Three.js primitives
// Inspired by anatomical wireframe/hologram aesthetics
export function BodyModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const breath = Math.sin(state.clock.elapsedTime * 0.8) * 0.01
      groupRef.current.scale.y = 1 + breath
    }
  })

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: '#3d9970',
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  })

  const solidMaterial = new THREE.MeshStandardMaterial({
    color: '#1a5a3a',
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  })

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.12, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Torso - Upper chest */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.3, 12]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Torso - Middle */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 0.3, 12]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Torso - Lower abdomen */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 0.3, 12]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Pelvis */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.2, 12]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Shoulders - Left */}
      <mesh position={[-0.25, 1.45, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Shoulders - Right */}
      <mesh position={[0.25, 1.45, 0]} rotation={[0, 0, Math.PI / 6]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Arms - Left upper */}
      <mesh position={[-0.32, 1.28, 0]} rotation={[0, 0, Math.PI / 12]}>
        <cylinderGeometry args={[0.035, 0.04, 0.3, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Arms - Right upper */}
      <mesh position={[0.32, 1.28, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <cylinderGeometry args={[0.035, 0.04, 0.3, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Arms - Left lower */}
      <mesh position={[-0.36, 1.0, 0]} rotation={[0, 0, Math.PI / 16]}>
        <cylinderGeometry args={[0.03, 0.035, 0.28, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Arms - Right lower */}
      <mesh position={[0.36, 1.0, 0]} rotation={[0, 0, -Math.PI / 16]}>
        <cylinderGeometry args={[0.03, 0.035, 0.28, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Legs - Left thigh */}
      <mesh position={[-0.08, 0.32, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.35, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Legs - Right thigh */}
      <mesh position={[0.08, 0.32, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.35, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Legs - Left calf */}
      <mesh position={[-0.08, 0.02, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Legs - Right calf */}
      <mesh position={[0.08, 0.02, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
        <primitive object={bodyMaterial.clone()} attach="material" />
      </mesh>

      {/* Internal body silhouette (solid) for depth */}
      <mesh position={[0, 1.1, 0]}>
        <capsuleGeometry args={[0.14, 0.8, 8, 16]} />
        <primitive object={solidMaterial.clone()} attach="material" />
      </mesh>

      {/* Spine line */}
      <mesh position={[0, 1.1, -0.05]}>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 6]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
