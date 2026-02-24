'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { BodyModel } from './BodyModel'
import { OrganHotspot } from './OrganHotspot'
import { DataParticles } from './DataParticles'
import {
  BODY_REGIONS,
  getRegionsArray,
  getRegionHealthStatus,
  BiomarkerValue,
} from '@/lib/body-regions'
import { useBodyViewerStore } from '@/lib/stores/body-viewer-store'

interface BodyVisualizationProps {
  biomarkerData?: Record<string, BiomarkerValue>
  className?: string
  height?: string
}

// Loading placeholder
function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-primary-100" />
        <p className="text-sm text-gray-500">Loading 3D visualization...</p>
      </div>
    </div>
  )
}

// Scene content
function Scene() {
  const { biomarkerData, autoRotate } = useBodyViewerStore()
  const regions = getRegionsArray()

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1, 2.5]} fov={45} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Body model */}
      <group position={[0, 0, 0]}>
        <BodyModel />

        {/* Organ hotspots */}
        {regions.map((region) => (
          <OrganHotspot
            key={region.id}
            region={region}
            status={getRegionHealthStatus(region.id, biomarkerData)}
          />
        ))}
      </group>

      {/* Ambient particles */}
      <DataParticles count={60} />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        target={[0, 1, 0]}
      />

      {/* Note: Post-processing effects (Bloom) can be added later with @react-three/postprocessing */}
    </>
  )
}

export function BodyVisualization({
  biomarkerData,
  className = '',
  height = '400px',
}: BodyVisualizationProps) {
  const { setBiomarkerData } = useBodyViewerStore()
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
    return <LoadingFallback />
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ${className}`}
      style={{ height }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </Suspense>

      {/* Overlay gradient for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />

      {/* Corner decoration */}
      <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-primary-500/30" />
      <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-primary-500/30" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-primary-500/30" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-primary-500/30" />
    </div>
  )
}
