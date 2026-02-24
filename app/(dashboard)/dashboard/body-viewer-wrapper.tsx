'use client'

import { BodyViewer } from '@/components/3d/BodyViewer'

export function BodyViewerWrapper() {
  return (
    <div className="card-elevated p-6">
      <BodyViewer
        height="450px"
        title="Your Body Map"
        subtitle="Interactive 3D visualization of your health data"
      />
    </div>
  )
}
