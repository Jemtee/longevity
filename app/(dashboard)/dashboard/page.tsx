import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Target, TrendingUp, Heart, Activity, ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import OnboardingForm from './onboarding-form'

export const metadata = {
  title: 'Dashboard - Wellspring',
  description: 'Your longevity health dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  // Check if user has completed onboarding
  const isNewUser = !profile?.onboarding_completed

  // Fetch counts for dashboard stats
  const { count: goalsCount } = await supabase
    .from('user_goals')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  const { count: testResultsCount } = await supabase
    .from('test_results')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  if (isNewUser) {
    return <OnboardingForm />
  }

  // Returning user dashboard
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Here&apos;s your health overview</p>
        </div>
        <Link href="/dashboard/biomarkers">
          <Button className="shadow-sm">
            <Activity className="w-4 h-4 mr-2" />
            Track Biomarkers
          </Button>
        </Link>
      </div>

      {/* Active Goals */}
      <Card className="border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: '50ms' }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <CardTitle className="text-base">Active Goals</CardTitle>
                <CardDescription className="text-xs">Track your health objectives</CardDescription>
              </div>
            </div>
            <Link href="/dashboard/goals">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                View All
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: 'Optimize Metabolic Health', progress: 60, current: '3', target: '5', unit: 'biomarkers tracked' },
              { title: 'Improve Cardiovascular Markers', progress: 40, current: '2', target: '5', unit: 'biomarkers tracked' },
            ].map((goal) => (
              <div key={goal.title} className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{goal.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {goal.current} of {goal.target} {goal.unit}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                    {goal.progress}%
                  </span>
                </div>
                <Progress value={goal.progress} className="h-1.5" />
              </div>
            ))}

            {goalsCount === 0 && (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mb-4">No active goals yet</p>
                <Link href="/dashboard/goals">
                  <Button variant="outline" size="sm">Set Your First Goal</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {testResultsCount === 0 ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mb-4">No biomarker data yet</p>
                <Link href="/dashboard/biomarkers">
                  <Button variant="outline" size="sm">Track Your First Biomarker</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{testResultsCount} biomarker{testResultsCount !== null && testResultsCount > 1 ? 's' : ''} tracked</p>
                <Link href="/dashboard/biomarkers">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Results
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: '150ms' }}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              <CardTitle className="text-base">Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-primary-50/50 border border-primary-100">
                <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Track key metabolic markers</p>
                  <p className="text-xs text-gray-500 mt-0.5">HbA1c, fasting glucose, and insulin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Monitor cardiovascular health</p>
                  <p className="text-xs text-gray-500 mt-0.5">LDL, HDL, triglycerides, and hs-CRP</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
