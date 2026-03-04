import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  getPhasesInOrder,
  getTiersInOrder,
  getTestsByPhase,
  getFirstTenOrdered,
  getFirstTenEstimatedCost,
  getProvider,
  isInFirstTen,
  getTestPriority,
  ROADMAP_TESTS,
} from '@/lib/roadmap'
import type { RoadmapTest, RoadmapPhaseConfig, RoadmapTierConfig } from '@/lib/roadmap'
import { RoadmapControls, TestCheckbox } from '@/components/roadmap'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Circle,
  ChevronRight,
  ExternalLink,
  FlaskConical,
  Heart,
  Activity,
  Sparkles,
  Target,
  Clock,
  MapPin,
  AlertCircle,
  Shield,
  TrendingUp,
  Zap,
  Info,
  Star,
} from 'lucide-react'

export const metadata = {
  title: 'Longevity Roadmap - Wellspring',
  description: 'Your personalized longevity testing roadmap for Swedish users',
}

import type { LucideIcon } from 'lucide-react'

// Phase icon mapping
const PHASE_ICONS: Record<string, LucideIcon> = {
  baseline: FlaskConical,
  deepening: Heart,
  performance: Activity,
  'advanced-modules': Sparkles,
}

// Tier color classes
const TIER_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  basic: {
    bg: 'bg-forest-50',
    text: 'text-forest-700',
    border: 'border-forest-200',
    badge: 'bg-forest-100 text-forest-700',
  },
  intermediate: {
    bg: 'bg-sand-50',
    text: 'text-sand-700',
    border: 'border-sand-200',
    badge: 'bg-sand-100 text-sand-700',
  },
  advanced: {
    bg: 'bg-terra-50',
    text: 'text-terra-600',
    border: 'border-terra-200',
    badge: 'bg-terra-100 text-terra-600',
  },
  clinical: {
    bg: 'bg-ink-50',
    text: 'text-ink-700',
    border: 'border-ink-200',
    badge: 'bg-ink-100 text-ink-700',
  },
}

// Evidence grade badges
const EVIDENCE_GRADES: Record<string, { bg: string; text: string; label: string }> = {
  A: { bg: 'bg-forest-500', text: 'text-white', label: 'Grade A' },
  B: { bg: 'bg-forest-100', text: 'text-forest-700', label: 'Grade B' },
  C: { bg: 'bg-sand-100', text: 'text-sand-700', label: 'Grade C' },
  D: { bg: 'bg-ink-100', text: 'text-ink-600', label: 'Grade D' },
}

export default async function RoadmapPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const phases = getPhasesInOrder()
  const tiers = getTiersInOrder()
  const firstTen = getFirstTenOrdered()
  const firstTenCost = getFirstTenEstimatedCost()

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-50 via-cream-50 to-sand-50 p-8 lg:p-10 animate-fade-up">
        <div className="absolute -right-10 -top-10 w-64 h-64 opacity-10">
          <Target className="w-full h-full text-forest-500" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-forest-500 flex items-center justify-center shadow-warm">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-forest-600 bg-forest-100 px-3 py-1 rounded-full">
              Swedish Edition
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink-800 mb-3">
            Your Longevity Testing Roadmap
          </h1>

          <p className="text-lg text-ink-500 mb-6">
            A phased approach to comprehensive health tracking, adapted for Swedish healthcare
            providers. Based on Blueprint and Superpower methodologies with Swedish equivalents.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="#first-ten">
              <Button className="bg-forest-500 hover:bg-forest-600 text-white shadow-warm h-11 px-5">
                <Star className="w-4 h-4 mr-2" />
                Start with First 10
              </Button>
            </Link>
            <Link href="#phases">
              <Button
                variant="outline"
                className="border-forest-200 text-forest-700 hover:bg-forest-50 h-11 px-5"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Full Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        {[
          { label: 'Testing Phases', value: '4', icon: Calendar, color: 'forest' },
          { label: 'Recommended Tests', value: '15+', icon: FlaskConical, color: 'sand' },
          { label: 'Swedish Providers', value: '8', icon: MapPin, color: 'terra' },
          {
            label: 'First Year Cost',
            value: `~${Math.round(firstTenCost.min / 1000)}k kr`,
            icon: TrendingUp,
            color: 'forest',
          },
        ].map((stat) => (
          <div key={stat.label} className="card-elevated p-5">
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-ink-800">{stat.value}</p>
            <p className="text-sm text-ink-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Interactive Controls */}
      <RoadmapControls totalTests={ROADMAP_TESTS.length} />

      {/* Tier Explanation */}
      <div
        className="card-elevated p-6 animate-fade-up"
        style={{ animationDelay: '150ms' }}
        id="tiers"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sand-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-sand-600" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-ink-800">
              Understanding Test Tiers
            </h2>
            <p className="text-sm text-ink-400">Choose your commitment level</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => {
            const colors = TIER_COLORS[tier.id]
            return (
              <div
                key={tier.id}
                className={`p-4 rounded-2xl ${colors.bg} border ${colors.border} hover:shadow-warm transition-all`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors.badge}`}>
                    {tier.nameEn}
                  </span>
                  <span className="text-xs text-ink-400 capitalize">
                    {tier.commitmentLevel} effort
                  </span>
                </div>
                <p className="text-sm text-ink-600 line-clamp-3">{tier.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* First Ten Priority Tests */}
      <div
        className="card-elevated overflow-hidden animate-fade-up"
        style={{ animationDelay: '200ms' }}
        id="first-ten"
      >
        <div className="p-6 border-b border-cream-200 bg-gradient-to-r from-forest-50/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-forest-500 flex items-center justify-center shadow-warm">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-ink-800">
                  First 10 Priority Tests
                </h2>
                <p className="text-sm text-ink-400">
                  Maximize impact on major morbidity/mortality pathways
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm text-ink-400">Estimated total cost</p>
              <p className="text-lg font-display font-bold text-forest-600">
                {firstTenCost.min.toLocaleString('sv-SE')} - {firstTenCost.max.toLocaleString('sv-SE')} kr
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-cream-200">
          {firstTen.map((item, idx) => (
            <FirstTenTestCard key={item.testId} item={item} index={idx} />
          ))}
        </div>
      </div>

      {/* Phased Roadmap Timeline */}
      <div
        className="space-y-6 animate-fade-up"
        style={{ animationDelay: '250ms' }}
        id="phases"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-forest-500" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-ink-800">
              12-Month Phased Roadmap
            </h2>
            <p className="text-sm text-ink-400">
              Progress from baseline to comprehensive longevity tracking
            </p>
          </div>
        </div>

        {/* Timeline visualization */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-forest-300 via-sand-300 to-terra-300 rounded-full hidden lg:block" />

          <div className="space-y-6">
            {phases.map((phase, idx) => (
              <PhaseCard key={phase.id} phase={phase} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Swedish Provider Info */}
      <div
        className="card-elevated p-6 animate-fade-up"
        style={{ animationDelay: '300ms' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sand-50 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-sand-600" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-ink-800">
              Swedish Provider Landscape
            </h2>
            <p className="text-sm text-ink-400">How testing works in Sweden</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
            <h3 className="font-medium text-ink-800 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-500" />
              Private Self-Order Providers
            </h3>
            <p className="text-sm text-ink-500 mb-3">
              Order online, receive digital remiss, sample at connected sites, results in portal
              with physician analysis.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Werlabs', 'Blodkollen', 'Medisera'].map((name) => (
                <span
                  key={name}
                  className="text-xs px-2 py-1 rounded-full bg-forest-100 text-forest-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
            <h3 className="font-medium text-ink-800 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sand-500" />
              Typical Turnaround
            </h3>
            <p className="text-sm text-ink-500 mb-3">
              Blood panels: 2-5 days. Imaging (DEXA, MRI): 1-2 weeks for appointment. Epigenetic
              tests: 2-4 weeks.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Portal Results', 'Physician Comment', 'Digital Remiss'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-sand-100 text-sand-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-forest-50 border border-forest-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-ink-800 mb-1">Gap Analysis</h3>
              <p className="text-sm text-ink-500">
                Some US-centric tests (microplastics in blood, LDL particle fractionation) have
                limited Swedish availability. Where gaps exist, we note alternatives or research
                pathways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// First Ten Test Card Component
function FirstTenTestCard({
  item,
  index,
}: {
  item: { testId: string; priority: number; whyHighSignal: string; swedishExecution: string }
  index: number
}) {
  return (
    <div className="p-5 hover:bg-cream-50/50 transition-colors group">
      <div className="flex items-start gap-4">
        {/* Priority number */}
        <div className="w-10 h-10 rounded-xl bg-forest-500 flex items-center justify-center flex-shrink-0 shadow-warm">
          <span className="text-lg font-bold text-white">{item.priority}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-ink-800 capitalize">
              {item.testId.replace(/-/g, ' ')}
            </h3>
          </div>

          <p className="text-sm text-ink-500 mb-2 line-clamp-2">{item.whyHighSignal}</p>

          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-sand-500" />
            <span className="text-ink-400">{item.swedishExecution}</span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-ink-200 group-hover:text-ink-400 transition-colors flex-shrink-0" />
      </div>
    </div>
  )
}

// Phase Card Component
function PhaseCard({ phase, index }: { phase: RoadmapPhaseConfig; index: number }) {
  const tests = getTestsByPhase(phase.id)
  const Icon = PHASE_ICONS[phase.id] || FlaskConical

  const phaseColorsArray = [
    { bg: 'bg-forest-50', border: 'border-forest-200', icon: 'bg-forest-500' },
    { bg: 'bg-sand-50', border: 'border-sand-200', icon: 'bg-sand-500' },
    { bg: 'bg-terra-50', border: 'border-terra-200', icon: 'bg-terra-500' },
    { bg: 'bg-ink-50', border: 'border-ink-200', icon: 'bg-ink-500' },
  ]
  const phaseColors = phaseColorsArray[index] || phaseColorsArray[0]

  return (
    <div className="relative lg:pl-16">
      {/* Timeline dot */}
      <div
        className={`absolute left-3 top-6 w-6 h-6 rounded-full ${phaseColors.icon} flex items-center justify-center shadow-warm hidden lg:flex`}
      >
        <Icon className="w-3 h-3 text-white" />
      </div>

      <div className={`card-elevated overflow-hidden ${phaseColors.bg} ${phaseColors.border}`}>
        {/* Phase header */}
        <div className="p-5 border-b border-cream-200/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${phaseColors.icon} flex items-center justify-center shadow-warm lg:hidden`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-ink-400">
                    Month {phase.monthStart}-{phase.monthEnd}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-ink-800">{phase.nameEn}</h3>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-ink-400">Est. cost</p>
              <p className="text-sm font-semibold text-ink-600">
                {phase.estimatedCostKr.min.toLocaleString('sv-SE')} -{' '}
                {phase.estimatedCostKr.max.toLocaleString('sv-SE')} kr
              </p>
            </div>
          </div>
          <p className="text-sm text-ink-500 mt-2">{phase.description}</p>
        </div>

        {/* Goals */}
        <div className="p-5 border-b border-cream-200/50">
          <h4 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">
            Goals
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {phase.goals.map((goal, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-ink-600">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tests in this phase */}
        <div className="p-5">
          <h4 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">
            Recommended Tests
          </h4>
          <div className="space-y-3">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Individual Test Card
function TestCard({ test }: { test: RoadmapTest }) {
  const tierColors = TIER_COLORS[test.tier]
  const evidenceGrade = EVIDENCE_GRADES[test.evidenceGrade]
  const priority = getTestPriority(test.id)
  const inFirstTen = isInFirstTen(test.id)

  // Get cheapest Swedish provider price
  const cheapestPrice = test.swedishAvailability.available
    ? Math.min(...test.swedishAvailability.providers.map((p) => p.priceKr))
    : null

  return (
    <div className="p-4 rounded-xl bg-white/80 border border-cream-200 hover:shadow-warm transition-all group">
      <div className="flex items-start gap-3">
        {/* Completion checkbox */}
        <TestCheckbox testId={test.id} testName={test.nameEn} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-medium text-ink-800">{test.nameEn}</h4>
            {inFirstTen && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-forest-500 text-white flex items-center gap-1">
                <Star className="w-3 h-3" />#{priority}
              </span>
            )}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${evidenceGrade.bg} ${evidenceGrade.text}`}>
              {evidenceGrade.label}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${tierColors.badge}`}>
              {test.tier}
            </span>
          </div>

          <p className="text-sm text-ink-500 mb-2 line-clamp-2">{test.longevitySignal}</p>

          {/* Swedish availability */}
          {test.swedishAvailability.available ? (
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-forest-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available in Sweden
              </span>
              {cheapestPrice && (
                <span className="text-ink-400">from {cheapestPrice.toLocaleString('sv-SE')} kr</span>
              )}
              <span className="text-ink-300">•</span>
              <span className="text-ink-400">
                {test.swedishAvailability.providers.map((p) => getProvider(p.providerId)?.nameShort).join(', ')}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-terra-500" />
              <span className="text-terra-600">Limited Swedish availability</span>
              {test.swedishAvailability.gap && (
                <span className="text-ink-400">- {test.swedishAvailability.gap.reason}</span>
              )}
            </div>
          )}
        </div>

        <ChevronRight className="w-5 h-5 text-ink-200 group-hover:text-ink-400 transition-colors flex-shrink-0" />
      </div>
    </div>
  )
}
