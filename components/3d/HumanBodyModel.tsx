'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface HumanBodyModelProps {
  wireframe?: boolean
  showVertices?: boolean
  color?: string
  emissiveIntensity?: number
}

export function HumanBodyModel({
  wireframe = true,
  showVertices = true,
  color = '#00d4ff',
  emissiveIntensity = 0.5,
}: HumanBodyModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  // Load the GLTF model
  const { scene } = useGLTF('/models/scene.gltf')

  // Extract geometry from the loaded model
  const { geometry, vertexPositions } = useMemo(() => {
    let extractedGeometry: THREE.BufferGeometry | null = null

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        extractedGeometry = child.geometry.clone()
      }
    })

    if (!extractedGeometry) {
      // Fallback to a simple geometry if model fails to load
      extractedGeometry = new THREE.BoxGeometry(1, 2, 0.5)
    }

    // Get vertex positions for point cloud
    const positions = extractedGeometry.attributes.position.array as Float32Array

    return {
      geometry: extractedGeometry,
      vertexPositions: positions,
    }
  }, [scene])

  // Create edges geometry for wireframe effect
  const edgesGeometry = useMemo(() => {
    if (!geometry) return null
    return new THREE.EdgesGeometry(geometry, 15) // threshold angle for edge detection
  }, [geometry])

  // Animate
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.005
      groupRef.current.scale.y = breath
    }

    // Pulse the emissive intensity
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      if (mat.emissive) {
        mat.emissiveIntensity = emissiveIntensity + Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
    }
  })

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, Math.PI]} scale={[2.2, 2.2, 2.2]} position={[0, -1.1, 0]}>
      {/* Main mesh with semi-transparent fill */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity * 0.3}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      {wireframe && (
        <mesh geometry={geometry}>
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Edge lines for stronger definition */}
      {edgesGeometry && (
        <lineSegments ref={edgesRef} geometry={edgesGeometry}>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={0.8}
            linewidth={1}
          />
        </lineSegments>
      )}

      {/* Vertex points for that glowing node effect */}
      {showVertices && vertexPositions && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[vertexPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.008}
            color="#ffffff"
            transparent
            opacity={0.6}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/scene.gltf')
