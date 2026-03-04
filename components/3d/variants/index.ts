// Variant components
export { ContourShaderBody } from './ContourShaderBody'
export { StackedSlicesBody } from './StackedSlicesBody'
export { ParallaxLayersBody } from './ParallaxLayersBody'
export { MeshLineContourBody } from './MeshLineContourBody'

// Dev toggle
export { DevVariantToggle } from './DevVariantToggle'

// Shared components
export { HorizontalControls } from './shared/HorizontalControls'
export * from './shared/contour-utils'

// Variant type definition
export type VisualizationVariant = 'shader' | 'slices' | 'parallax' | 'meshline'

// Variant metadata for UI/debugging
export const VARIANT_INFO: Record<VisualizationVariant, { name: string; description: string }> = {
  shader: {
    name: 'Contour Shader',
    description: 'Runtime shader stripes on 3D mesh',
  },
  slices: {
    name: 'Stacked Slices',
    description: 'Layered horizontal slice planes',
  },
  parallax: {
    name: 'Parallax Layers',
    description: 'CSS 3D layers with parallax effect',
  },
  meshline: {
    name: 'Mesh Line Contours',
    description: 'Extracted iso-height line contours',
  },
}
