import * as THREE from 'three'

/**
 * Configuration for contour line generation
 */
export interface ContourConfig {
  lineCount: number        // Number of contour lines
  lineThickness: number    // Thickness of each line (0-1)
  color: string           // Base color (hex)
  glowColor: string       // Glow/emission color (hex)
  glowIntensity: number   // Emission strength (0-1)
  animationSpeed: number  // Pulse animation speed
}

export const DEFAULT_CONTOUR_CONFIG: ContourConfig = {
  lineCount: 40,
  lineThickness: 0.03,
  color: '#00d4ff',
  glowColor: '#00ffff',
  glowIntensity: 0.5,
  animationSpeed: 1.0,
}

/**
 * Contour shader vertex shader - passes world position to fragment
 */
export const contourVertexShader = `
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/**
 * Contour shader fragment shader - renders horizontal stripes
 */
export const contourFragmentShader = `
  uniform float uLineCount;
  uniform float uLineThickness;
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  uniform float uGlowIntensity;
  uniform float uTime;
  uniform float uMinY;
  uniform float uMaxY;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    // Normalize Y position to 0-1 range
    float normalizedY = (vWorldPosition.y - uMinY) / (uMaxY - uMinY);

    // Create stripe pattern
    float stripeY = fract(normalizedY * uLineCount);

    // Smooth line edges
    float line = smoothstep(0.0, uLineThickness, stripeY) *
                 (1.0 - smoothstep(uLineThickness, uLineThickness * 2.0, stripeY));

    // Add subtle pulse animation
    float pulse = 0.8 + 0.2 * sin(uTime * 2.0 + normalizedY * 6.28);

    // Fresnel edge glow
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

    // Combine colors
    vec3 baseColor = mix(uColor, uGlowColor, fresnel * 0.5);
    vec3 finalColor = baseColor * pulse;

    // Alpha based on line visibility
    float alpha = line * (0.7 + fresnel * 0.3);

    // Add glow contribution
    finalColor += uGlowColor * uGlowIntensity * line * fresnel;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

/**
 * Creates a ShaderMaterial for contour line rendering
 */
export function createContourMaterial(config: Partial<ContourConfig> = {}): THREE.ShaderMaterial {
  const cfg = { ...DEFAULT_CONTOUR_CONFIG, ...config }

  return new THREE.ShaderMaterial({
    vertexShader: contourVertexShader,
    fragmentShader: contourFragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uLineCount: { value: cfg.lineCount },
      uLineThickness: { value: cfg.lineThickness },
      uColor: { value: new THREE.Color(cfg.color) },
      uGlowColor: { value: new THREE.Color(cfg.glowColor) },
      uGlowIntensity: { value: cfg.glowIntensity },
      uTime: { value: 0 },
      uMinY: { value: -1.5 },
      uMaxY: { value: 1.5 },
    },
  })
}

/**
 * Updates contour material time uniform for animation
 */
export function updateContourMaterialTime(material: THREE.ShaderMaterial, time: number) {
  if (material.uniforms.uTime) {
    material.uniforms.uTime.value = time
  }
}

/**
 * Generates slice positions for stacked contour slices
 */
export function generateSlicePositions(
  count: number,
  minY: number = -1.1,
  maxY: number = 1.1
): number[] {
  const positions: number[] = []
  const step = (maxY - minY) / (count - 1)

  for (let i = 0; i < count; i++) {
    positions.push(minY + i * step)
  }

  return positions
}

/**
 * Color palette for contour visualization
 */
export const CONTOUR_COLORS = {
  primary: '#00d4ff',
  secondary: '#0066ff',
  glow: '#00ffff',
  accent: '#ff00ff',
  background: '#050510',
}
