// Body region definitions with 3D positions and biomarker mappings
// Positions are in normalized coordinates (relative to body center)

export type HealthStatus = 'optimal' | 'borderline' | 'out-of-range' | 'unknown'

export interface BodyRegion {
  id: string
  name: string
  position: [number, number, number] // [x, y, z] in 3D space
  biomarkers: string[]
  description: string
  icon: string // Lucide icon name
}

export interface BiomarkerValue {
  id: string
  name: string
  value: number | null
  unit: string
  status: HealthStatus
  optimalMin?: number
  optimalMax?: number
  referenceMin?: number
  referenceMax?: number
  lastUpdated?: string
}

// Health status color mapping
export const STATUS_COLORS: Record<HealthStatus, { main: string; glow: string; hex: string }> = {
  optimal: { main: '#22c55e', glow: '#4ade80', hex: '22c55e' },
  borderline: { main: '#f59e0b', glow: '#fbbf24', hex: 'f59e0b' },
  'out-of-range': { main: '#ef4444', glow: '#f87171', hex: 'ef4444' },
  unknown: { main: '#6b7280', glow: '#9ca3af', hex: '6b7280' },
}

// Body regions mapped to biomarkers and 3D positions
// Y-axis: 0 = feet, 2 = head. Body is ~2 units tall, centered at x=0
export const BODY_REGIONS: Record<string, BodyRegion> = {
  brain: {
    id: 'brain',
    name: 'Brain & Cognition',
    position: [0, 1.85, 0.05],
    biomarkers: ['homocysteine', 'b12', 'folate', 'omega3-index'],
    description: 'Cognitive function, memory, and neurological health',
    icon: 'Brain',
  },
  thyroid: {
    id: 'thyroid',
    name: 'Thyroid',
    position: [0, 1.55, 0.12],
    biomarkers: ['tsh', 't3', 't4'],
    description: 'Metabolism regulation and energy',
    icon: 'Activity',
  },
  heart: {
    id: 'heart',
    name: 'Cardiovascular',
    position: [-0.08, 1.25, 0.15],
    biomarkers: ['ldl', 'hdl', 'triglycerides', 'apob', 'lp-a', 'hs-crp'],
    description: 'Heart health, cholesterol, and circulation',
    icon: 'Heart',
  },
  lungs: {
    id: 'lungs',
    name: 'Respiratory',
    position: [0, 1.2, 0.1],
    biomarkers: ['vo2max'],
    description: 'Respiratory capacity and oxygen efficiency',
    icon: 'Wind',
  },
  liver: {
    id: 'liver',
    name: 'Liver',
    position: [0.15, 1.0, 0.1],
    biomarkers: ['alt', 'ast', 'ggt'],
    description: 'Detoxification and metabolic processing',
    icon: 'Droplets',
  },
  pancreas: {
    id: 'pancreas',
    name: 'Metabolic / Pancreas',
    position: [0, 0.95, 0.05],
    biomarkers: ['hba1c', 'fasting-glucose', 'fasting-insulin', 'homa-ir'],
    description: 'Blood sugar regulation and insulin function',
    icon: 'Gauge',
  },
  kidneys: {
    id: 'kidneys',
    name: 'Kidneys',
    position: [0, 0.85, -0.05],
    biomarkers: ['creatinine', 'egfr', 'cystatin-c'],
    description: 'Filtration and waste removal',
    icon: 'Filter',
  },
  gut: {
    id: 'gut',
    name: 'Gut Health',
    position: [0, 0.65, 0.1],
    biomarkers: ['calprotectin', 'microbiome-diversity', 'zonulin'],
    description: 'Digestive health and microbiome balance',
    icon: 'Circle',
  },
  bones: {
    id: 'bones',
    name: 'Bone & Mineral',
    position: [0.2, 0.5, 0],
    biomarkers: ['vitamin-d', 'calcium', 'magnesium'],
    description: 'Bone density and mineral balance',
    icon: 'Bone',
  },
  blood: {
    id: 'blood',
    name: 'Blood & Iron',
    position: [-0.2, 0.5, 0],
    biomarkers: ['ferritin', 'iron', 'hemoglobin'],
    description: 'Oxygen transport and iron stores',
    icon: 'Droplet',
  },
}

// Helper function to get region health status based on biomarker values
export function getRegionHealthStatus(
  regionId: string,
  biomarkerData: Record<string, BiomarkerValue>
): HealthStatus {
  const region = BODY_REGIONS[regionId]
  if (!region) return 'unknown'

  const regionBiomarkers = region.biomarkers
    .map((id) => biomarkerData[id])
    .filter(Boolean)

  if (regionBiomarkers.length === 0) return 'unknown'

  // If any biomarker is out of range, the region is out of range
  if (regionBiomarkers.some((b) => b.status === 'out-of-range')) {
    return 'out-of-range'
  }

  // If any biomarker is borderline, the region is borderline
  if (regionBiomarkers.some((b) => b.status === 'borderline')) {
    return 'borderline'
  }

  // If all have known values and none are problematic, it's optimal
  if (regionBiomarkers.every((b) => b.status === 'optimal')) {
    return 'optimal'
  }

  return 'unknown'
}

// Get all regions as an array
export function getRegionsArray(): BodyRegion[] {
  return Object.values(BODY_REGIONS)
}

// Mock biomarker data for demonstration
export const MOCK_BIOMARKER_DATA: Record<string, BiomarkerValue> = {
  ldl: {
    id: 'ldl',
    name: 'LDL Cholesterol',
    value: 2.8,
    unit: 'mmol/L',
    status: 'optimal',
    optimalMin: 0,
    optimalMax: 3.0,
    referenceMin: 0,
    referenceMax: 4.1,
    lastUpdated: '2024-02-15',
  },
  hdl: {
    id: 'hdl',
    name: 'HDL Cholesterol',
    value: 1.5,
    unit: 'mmol/L',
    status: 'optimal',
    optimalMin: 1.3,
    optimalMax: 3.0,
    referenceMin: 1.0,
    referenceMax: 3.0,
    lastUpdated: '2024-02-15',
  },
  triglycerides: {
    id: 'triglycerides',
    name: 'Triglycerides',
    value: 1.2,
    unit: 'mmol/L',
    status: 'optimal',
    optimalMin: 0,
    optimalMax: 1.5,
    referenceMin: 0,
    referenceMax: 2.0,
    lastUpdated: '2024-02-15',
  },
  hba1c: {
    id: 'hba1c',
    name: 'HbA1c',
    value: 5.4,
    unit: '%',
    status: 'optimal',
    optimalMin: 4.0,
    optimalMax: 5.6,
    referenceMin: 4.0,
    referenceMax: 6.4,
    lastUpdated: '2024-02-15',
  },
  'fasting-glucose': {
    id: 'fasting-glucose',
    name: 'Fasting Glucose',
    value: 5.2,
    unit: 'mmol/L',
    status: 'optimal',
    optimalMin: 3.9,
    optimalMax: 5.5,
    referenceMin: 3.9,
    referenceMax: 6.0,
    lastUpdated: '2024-02-15',
  },
  tsh: {
    id: 'tsh',
    name: 'TSH',
    value: 2.1,
    unit: 'mIU/L',
    status: 'optimal',
    optimalMin: 0.5,
    optimalMax: 2.5,
    referenceMin: 0.4,
    referenceMax: 4.0,
    lastUpdated: '2024-02-15',
  },
  'vitamin-d': {
    id: 'vitamin-d',
    name: 'Vitamin D',
    value: 45,
    unit: 'nmol/L',
    status: 'borderline',
    optimalMin: 75,
    optimalMax: 150,
    referenceMin: 50,
    referenceMax: 200,
    lastUpdated: '2024-02-15',
  },
  b12: {
    id: 'b12',
    name: 'Vitamin B12',
    value: 380,
    unit: 'pmol/L',
    status: 'optimal',
    optimalMin: 300,
    optimalMax: 800,
    referenceMin: 200,
    referenceMax: 900,
    lastUpdated: '2024-02-15',
  },
  ferritin: {
    id: 'ferritin',
    name: 'Ferritin',
    value: 85,
    unit: 'µg/L',
    status: 'optimal',
    optimalMin: 50,
    optimalMax: 200,
    referenceMin: 15,
    referenceMax: 300,
    lastUpdated: '2024-02-15',
  },
  homocysteine: {
    id: 'homocysteine',
    name: 'Homocysteine',
    value: 8.5,
    unit: 'µmol/L',
    status: 'optimal',
    optimalMin: 5,
    optimalMax: 10,
    referenceMin: 5,
    referenceMax: 15,
    lastUpdated: '2024-02-15',
  },
  'hs-crp': {
    id: 'hs-crp',
    name: 'hs-CRP',
    value: 1.8,
    unit: 'mg/L',
    status: 'borderline',
    optimalMin: 0,
    optimalMax: 1.0,
    referenceMin: 0,
    referenceMax: 3.0,
    lastUpdated: '2024-02-15',
  },
  creatinine: {
    id: 'creatinine',
    name: 'Creatinine',
    value: 82,
    unit: 'µmol/L',
    status: 'optimal',
    optimalMin: 60,
    optimalMax: 100,
    referenceMin: 50,
    referenceMax: 120,
    lastUpdated: '2024-02-15',
  },
  egfr: {
    id: 'egfr',
    name: 'eGFR',
    value: 95,
    unit: 'mL/min',
    status: 'optimal',
    optimalMin: 90,
    optimalMax: 150,
    referenceMin: 60,
    referenceMax: 150,
    lastUpdated: '2024-02-15',
  },
  alt: {
    id: 'alt',
    name: 'ALT',
    value: 28,
    unit: 'U/L',
    status: 'optimal',
    optimalMin: 0,
    optimalMax: 35,
    referenceMin: 0,
    referenceMax: 45,
    lastUpdated: '2024-02-15',
  },
  ast: {
    id: 'ast',
    name: 'AST',
    value: 24,
    unit: 'U/L',
    status: 'optimal',
    optimalMin: 0,
    optimalMax: 35,
    referenceMin: 0,
    referenceMax: 40,
    lastUpdated: '2024-02-15',
  },
}
