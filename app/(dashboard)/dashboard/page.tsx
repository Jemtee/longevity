import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Target, TrendingUp, Activity, ArrowRight, CheckCircle2, Circle, Droplet } from 'lucide-react'
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

  if (isNewUser) return <OnboardingForm />

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink-800">Welcome back</h1>
          <p className="text-ink-400 mt-1">Here&apos;s your health overview</p>
        </div>
        <Link href="/dashboard/biomarkers">
          <Button className="bg-forest-500 hover:bg-forest-600 text-white shadow-warm">
            <Droplet className="w-4 h-4 mr-2" />
            Track Biomarkers
          </Button>
        </Link>
      </div>

      {/* Goals */}
      <div className="card-elevated p-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-forest-50 flex items-center justify-center">
              <Target className="w-4.5 h-4.5 text-forest-500" />
            </div>
            <div>
              <h2 className="text-base font-display font-semibold text-ink-800">Active Goals</h2>
              <p className="text-xs text-ink-400">Track your health objectives</p>
            </div>
          </div>
          <Link href="/dashboard/goals">
            <Button variant="ghost" size="sm" className="text-ink-400 hover:text-ink-700">View All <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
          </Link>
        </div>

        <div className="space-y-3">
          {[
            { title: 'Optimize Metabolic Health', progress: 60, current: '3', target: '5', unit: 'biomarkers tracked' },
            { title: 'Improve Cardiovascular Markers', progress: 40, current: '2', target: '5', unit: 'biomarkers tracked' },
          ].map((goal) => (
            <div key={goal.title} className="p-4 rounded-xl bg-cream-100 border border-cream-300/60">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium text-ink-800">{goal.title}</h3>
                  <p className="text-xs text-ink-400 mt-0.5">{goal.current} of {goal.target} {goal.unit}</p>
                </div>
                <span className="text-xs font-semibold text-forest-600 bg-forest-50 px-2 py-0.5 rounded-full">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-1.5" />
            </div>
          ))}

          {goalsCount === 0 && (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-xl bg-cream-200 flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-ink-300" />
              </div>
              <p className="text-sm text-ink-400 mb-4">No active goals yet</p>
              <Link href="/dashboard/goals"><Button variant="outline" size="sm" className="border-cream-300">Set Your First Goal</Button></Link>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-elevated p-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-forest-50 flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-forest-400" />
            </div>
            <h2 className="text-base font-display font-semibold text-ink-800">Recent Activity</h2>
          </div>
          {testResultsCount === 0 ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-xl bg-cream-200 flex items-center justify-center mx-auto mb-3"><Activity className="w-6 h-6 text-ink-300" /></div>
              <p className="text-sm text-ink-400 mb-4">No biomarker data yet</p>
              <Link href="/dashboard/biomarkers"><Button variant="outline" size="sm" className="border-cream-300">Track Your First Biomarker</Button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-ink-500">{testResultsCount} biomarker{testResultsCount !== null && testResultsCount > 1 ? 's' : ''} tracked</p>
              <Link href="/dashboard/biomarkers"><Button variant="ghost" size="sm" className="w-full text-ink-400">View All Results <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button></Link>
            </div>
          )}
        </div>

        <div className="card-elevated p-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-sand-50 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-sand-500" />
            </div>
            <h2 className="text-base font-display font-semibold text-ink-800">Recommendations</h2>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-forest-50/50 border border-forest-200/50">
              <CheckCircle2 className="w-4 h-4 text-forest-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-ink-800">Track key metabolic markers</p>
                <p className="text-xs text-ink-400 mt-0.5">HbA1c, fasting glucose, and insulin</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cream-100 border border-cream-300/60">
              <Circle className="w-4 h-4 text-ink-200 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-ink-800">Monitor cardiovascular health</p>
                <p className="text-xs text-ink-400 mt-0.5">LDL, HDL, triglycerides, and hs-CRP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
