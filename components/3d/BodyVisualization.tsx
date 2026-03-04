'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { HumanBodyModel } from './HumanBodyModel'
import { OrganHotspot } from './OrganHotspot'
import {
  getRegionsArray,
  getRegionHealthStatus,
  BiomarkerValue,
} from '@/lib/body-regions'
import { useBodyViewerStore } from '@/lib/stores/body-viewer-store'
import * as THREE from 'three'

// 2.5D Variants
import { ContourShaderBody } from './variants/ContourShaderBody'
import { StackedSlicesBody } from './variants/StackedSlicesBody'
import { MeshLineContourBody } from './variants/MeshLineContourBody'
import { ParallaxLayersBody } from './variants/ParallaxLayersBody'
import { DevVariantToggle } from './variants/DevVariantToggle'

interface BodyVisualizationProps {
  biomarkerData?: Record<string, BiomarkerValue>
  className?: string
  height?: string
}

// Loading placeholder
function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#050510]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-cyan-500/20" />
        <p className="text-sm text-cyan-400/60">Loading 3D model...</p>
      </div>
    </div>
  )
}

// Ambient floating particles
function AmbientParticles({ count = 100 }: { count?: number }) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 1 + Math.random() * 2
    const height = (Math.random() - 0.5) * 3

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Original scene content (legacy variant)
function LegacyScene() {
  const { biomarkerData, autoRotate } = useBodyViewerStore()
  const regions = getRegionsArray()

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={50} />

      {/* Lighting - subtle for hologram effect */}
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} intensity={0.4} color="#00d4ff" />
      <pointLight position={[-2, -1, 2]} intensity={0.2} color="#0066ff" />
      <pointLight position={[0, 2, -2]} intensity={0.2} color="#00ffff" />

      {/* Human body model */}
      <Suspense fallback={null}>
        <HumanBodyModel
          wireframe={true}
          showVertices={true}
          color="#00d4ff"
          emissiveIntensity={0.4}
        />
      </Suspense>

      {/* Organ hotspots - temporarily hidden until body is properly positioned */}
      {/* TODO: Reposition hotspots to match the new model orientation */}
      {false && (
        <group position={[0, -1.1, 0]} scale={[2.2, 2.2, 2.2]}>
          {regions.map((region) => (
            <OrganHotspot
              key={region.id}
              region={region}
              status={getRegionHealthStatus(region.id, biomarkerData)}
            />
          ))}
        </group>
      )}

      {/* Ambient particles */}
      <AmbientParticles count={80} />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={autoRotate}
        autoRotateSpeed={0.3}
        target={[0, 0, 0]}
      />
    </>
  )
}

// Variant scene - renders the selected 2.5D variant
function VariantScene() {
  const { autoRotate, visualizationVariant } = useBodyViewerStore()

  switch (visualizationVariant) {
    case 'shader':
      return <ContourShaderBody autoRotate={autoRotate} />
    case 'slices':
      return <StackedSlicesBody autoRotate={autoRotate} />
    case 'meshline':
      return <MeshLineContourBody autoRotate={autoRotate} />
    default:
      // Parallax variant doesn't render in Canvas - handled separately
      return null
  }
}

export function BodyVisualization({
  biomarkerData,
  className = '',
  height = '400px',
}: BodyVisualizationProps) {
  const { setBiomarkerData, visualizationVariant, autoRotate } = useBodyViewerStore()
  const [mounted, setMounted] = useState(false)

  // Update store when biomarker data changes
  useEffect(() => {
    if (biomarkerData) {
      setBiomarkerData(biomarkerData)
    }
  }, [biomarkerData, setBiomarkerData])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ height }}>
        <LoadingFallback />
      </div>
    )
  }

  // Parallax variant uses CSS-only rendering, no Canvas
  if (visualizationVariant === 'parallax') {
    return (
      <div
        className={`relative overflow-hidden rounded-xl ${className}`}
        style={{ height }}
      >
        <ParallaxLayersBody autoRotate={autoRotate} />
        <DevVariantToggle />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#050510] ${className}`}
      style={{ height }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#050510']} />
          <fog attach="fog" args={['#050510', 3, 6]} />
          <VariantScene />
        </Canvas>
      </Suspense>

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,16,0.6)_100%)]" />

      {/* Ground glow effect */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-20 bg-gradient-to-t from-cyan-500/10 to-transparent blur-xl" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-cyan-500/30" />
      <div className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r border-t border-cyan-500/30" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b border-l border-cyan-500/30" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-cyan-500/30" />

      {/* Dev variant toggle (only shows in development) */}
      <DevVariantToggle />
    </div>
  )
}
