'use client'

import { OrbitControls } from '@react-three/drei'

interface HorizontalControlsProps {
  autoRotate?: boolean
  autoRotateSpeed?: number
  enableZoom?: boolean
  minDistance?: number
  maxDistance?: number
}

/**
 * OrbitControls locked to horizontal rotation only (Y-axis).
 * User can spin to see front/back but cannot tilt up/down.
 */
export function HorizontalControls({
  autoRotate = false,
  autoRotateSpeed = 0.5,
  enableZoom = true,
  minDistance = 1.5,
  maxDistance = 4,
}: HorizontalControlsProps) {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={enableZoom}
      minDistance={minDistance}
      maxDistance={maxDistance}
      // Lock to horizontal plane - no vertical rotation
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      target={[0, 0, 0]}
    />
  )
}
