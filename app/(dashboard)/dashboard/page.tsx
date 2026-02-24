import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { HealthScoreRing } from '@/components/ui/health-score-ring'
import { MiniSparkline } from '@/components/ui/mini-sparkline'
import { RangeBar } from '@/components/ui/range-bar'
import {
  WellnessHeroIllustration,
  GoalProgressIllustration,
  InsightIllustration,
  EmptyStateIllustration,
  JourneyPathIllustration,
} from '@/components/illustrations/health-illustrations'
import { BodyViewerWrapper } from './body-viewer-wrapper'
import Link from 'next/link'
import {
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowRight,
  CheckCircle2,
  Circle,
  Droplet,
  Heart,
  Sparkles,
  Calendar,
  Plus,
  ChevronRight,
  Zap,
  Moon,
  Apple,
} from 'lucide-react'
import OnboardingForm from './onboarding-form'

export const metadata = {
  title: 'Dashboard - Wellspring',
  description: 'Your longevity health dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
  const isNewUser = !profile?.onboarding_completed
  const { count: goalsCount } = await supabase.from('user_goals').select('*', { count: 'exact', head: true }).eq('user_id', user?.id)
  const { count: testResultsCount } = await supabase.from('test_results').select('*', { count: 'exact', head: true }).eq('user_id', user?.id)

  // Get user's email for personalized greeting
  const firstName = user?.email?.split('@')[0] || 'there'
  const greeting = getGreeting()

  if (isNewUser) return <OnboardingForm />

  // Mock data for demonstration - replace with real data
  const healthScore = 72
  const recentBiomarkers = [
    { name: 'HbA1c', value: 5.4, unit: '%', trend: [5.6, 5.5, 5.4], status: 'optimal', optMin: 4.0, optMax: 5.6, refMin: 3.5, refMax: 7.0 },
    { name: 'Vitamin D', value: 68, unit: 'nmol/L', trend: [45, 52, 68], status: 'optimal', optMin: 75, optMax: 150, refMin: 30, refMax: 200 },
    { name: 'hs-CRP', value: 1.8, unit: 'mg/L', trend: [2.4, 2.1, 1.8], status: 'borderline', optMin: 0, optMax: 1.0, refMin: 0, refMax: 10 },
  ]

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section with Health Score */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-50 via-cream-50 to-sand-50 p-8 lg:p-10 animate-fade-up">
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 w-80 h-80 opacity-20">
          <WellnessHeroIllustration className="w-full h-full" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Left: Greeting & Score */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-medium text-forest-600 mb-1">{greeting}</p>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-ink-800 mb-2">
              Welcome back, {firstName}
            </h1>
            <p className="text-ink-400 text-lg mb-6 max-w-md">
              Your longevity journey is progressing well. Here&apos;s your health snapshot.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link href="/dashboard/biomarkers">
                <Button className="bg-forest-500 hover:bg-forest-600 text-white shadow-warm h-11 px-5">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Test Results
                </Button>
              </Link>
              <Button variant="outline" className="border-forest-200 text-forest-700 hover:bg-forest-50 h-11 px-5">
                <Calendar className="w-4 h-4 mr-2" />
                View Timeline
              </Button>
            </div>
          </div>

          {/* Right: Health Score Ring */}
          <div className="flex-shrink-0">
            <HealthScoreRing score={healthScore} label="Health Score" sublabel="show" />
          </div>
        </div>

        {/* Journey Path */}
        <div className="mt-8 pt-6 border-t border-forest-100">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-sand-500" />
            <span className="text-sm font-medium text-ink-600">Your Longevity Journey</span>
          </div>
          <JourneyPathIllustration className="w-full h-16 opacity-80" />
          <div className="flex justify-between text-xs text-ink-400 mt-2">
            <span>Started tracking</span>
            <span>3 biomarkers</span>
            <span>First insights</span>
            <span className="text-forest-600 font-medium">Next milestone →</span>
          </div>
        </div>
      </div>

      {/* 3D Body Visualization */}
      <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <BodyViewerWrapper />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
        {[
          { label: 'Biomarkers Tracked', value: testResultsCount || 0, icon: Droplet, color: 'forest' },
          { label: 'Active Goals', value: goalsCount || 0, icon: Target, color: 'sand' },
          { label: 'Days Streak', value: 12, icon: Zap, color: 'terra' },
          { label: 'Next Check-in', value: '5 days', icon: Calendar, color: 'forest' },
        ].map((stat) => (
          <div key={stat.label} className="card-elevated p-5 group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <ChevronRight className="w-4 h-4 text-ink-200 group-hover:text-ink-400 transition-colors" />
            </div>
            <p className="text-2xl font-display font-bold text-ink-800">{stat.value}</p>
            <p className="text-sm text-ink-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Biomarkers with Visualizations */}
      <div className="card-elevated overflow-hidden animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="p-6 border-b border-cream-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-forest-500" />
              </div>
              <div>
                <h2 className="text-lg font-display font-semibold text-ink-800">Recent Biomarkers</h2>
                <p className="text-sm text-ink-400">Your latest test results</p>
              </div>
            </div>
            <Link href="/dashboard/biomarkers">
              <Button variant="ghost" size="sm" className="text-forest-600 hover:text-forest-700 hover:bg-forest-50">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {testResultsCount === 0 ? (
          <div className="p-10 text-center">
            <EmptyStateIllustration className="w-48 h-40 mx-auto mb-4" />
            <h3 className="text-lg font-display font-semibold text-ink-800 mb-2">No biomarker data yet</h3>
            <p className="text-sm text-ink-400 mb-6 max-w-sm mx-auto">
              Start tracking your health by adding your first test result. We&apos;ll help you understand what your numbers mean.
            </p>
            <Link href="/dashboard/biomarkers">
              <Button className="bg-forest-500 hover:bg-forest-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Biomarker
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-cream-200">
            {recentBiomarkers.map((biomarker, idx) => (
              <div key={biomarker.name} className="p-5 hover:bg-cream-50/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  {/* Status indicator */}
                  <div className={`w-2 h-12 rounded-full ${
                    biomarker.status === 'optimal' ? 'bg-forest-400' :
                    biomarker.status === 'borderline' ? 'bg-sand-400' : 'bg-terra-400'
                  }`} />

                  {/* Biomarker info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-ink-800">{biomarker.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        biomarker.status === 'optimal' ? 'bg-forest-50 text-forest-600' :
                        biomarker.status === 'borderline' ? 'bg-sand-50 text-sand-600' : 'bg-terra-50 text-terra-500'
                      }`}>
                        {biomarker.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-display font-bold text-ink-800">
                        {biomarker.value}
                        <span className="text-sm font-normal text-ink-400 ml-1">{biomarker.unit}</span>
                      </span>
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div className="hidden sm:block">
                    <MiniSparkline data={biomarker.trend} width={80} height={32} />
                  </div>

                  {/* Range bar */}
                  <div className="hidden md:block w-40">
                    <RangeBar
                      value={biomarker.value}
                      optimalMin={biomarker.optMin}
                      optimalMax={biomarker.optMax}
                      referenceMin={biomarker.refMin}
                      referenceMax={biomarker.refMax}
                    />
                  </div>

                  {/* Trend indicator */}
                  <div className="flex items-center gap-1">
                    {biomarker.trend[biomarker.trend.length - 1] < biomarker.trend[0] ? (
                      <>
                        <TrendingDown className="w-4 h-4 text-forest-500" />
                        <span className="text-sm font-medium text-forest-600">Improving</span>
                      </>
                    ) : biomarker.trend[biomarker.trend.length - 1] > biomarker.trend[0] ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-terra-400" />
                        <span className="text-sm font-medium text-terra-500">Rising</span>
                      </>
                    ) : (
                      <>
                        <span className="w-4 h-0.5 bg-ink-300 rounded" />
                        <span className="text-sm font-medium text-ink-400">Stable</span>
                      </>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-ink-200 group-hover:text-ink-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two Column: Goals & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Card */}
        <div className="card-elevated p-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <GoalProgressIllustration className="w-12 h-12" />
              <div>
                <h2 className="text-lg font-display font-semibold text-ink-800">Active Goals</h2>
                <p className="text-sm text-ink-400">Track your progress</p>
              </div>
            </div>
            <Link href="/dashboard/goals">
              <Button variant="ghost" size="sm" className="text-ink-400 hover:text-ink-700">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Optimize Metabolic Health', progress: 60, icon: Activity, color: 'forest' },
              { title: 'Improve Sleep Quality', progress: 35, icon: Moon, color: 'sand' },
            ].map((goal) => (
              <div key={goal.title} className="p-4 rounded-2xl bg-cream-50 border border-cream-200 hover:border-forest-200 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-${goal.color}-100 flex items-center justify-center`}>
                    <goal.icon className={`w-4 h-4 text-${goal.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-ink-800">{goal.title}</h3>
                  </div>
                  <span className="text-sm font-bold text-forest-600">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}

            {goalsCount === 0 && (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-ink-300" />
                </div>
                <p className="text-sm text-ink-400 mb-4">Set your first health goal</p>
                <Link href="/dashboard/goals">
                  <Button variant="outline" size="sm" className="border-forest-200 text-forest-700">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Goal
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Personalized Insights */}
        <div className="card-elevated p-6 animate-fade-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <InsightIllustration className="w-12 h-12" />
              <div>
                <h2 className="text-lg font-display font-semibold text-ink-800">For You</h2>
                <p className="text-sm text-ink-400">Personalized recommendations</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Insight cards with different priorities */}
            <div className="p-4 rounded-2xl bg-forest-50 border border-forest-100 cursor-pointer hover:border-forest-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-forest-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-forest-500 text-white">Grade A</span>
                    <span className="text-xs text-ink-400">Cardiovascular</span>
                  </div>
                  <p className="text-sm font-medium text-ink-800 mb-1">
                    Consider tracking ApoB
                  </p>
                  <p className="text-xs text-ink-500">
                    Better predictor of heart disease than LDL alone
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 flex-shrink-0" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sand-50 border border-sand-100 cursor-pointer hover:border-sand-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center flex-shrink-0">
                  <Apple className="w-4 h-4 text-sand-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sand-500 text-white">Grade B</span>
                    <span className="text-xs text-ink-400">Nutrition</span>
                  </div>
                  <p className="text-sm font-medium text-ink-800 mb-1">
                    Your Vitamin D is improving
                  </p>
                  <p className="text-xs text-ink-500">
                    Continue supplementation for optimal levels
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-sand-400 flex-shrink-0" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 cursor-pointer hover:border-cream-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-ink-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink-800 mb-1">
                    Track 2 more biomarkers to unlock AI insights
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-cream-200 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-forest-400 rounded-full" />
                    </div>
                    <span className="text-xs text-ink-400">3/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return '☀️ Good morning'
  if (hour < 17) return '🌤️ Good afternoon'
  return '🌙 Good evening'
}
