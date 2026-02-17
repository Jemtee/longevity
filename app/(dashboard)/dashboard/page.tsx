import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Target, TrendingUp, Activity, ArrowRight, CheckCircle2, Circle } from 'lucide-react'
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
    <div className="space-y-16 -mt-8">
      {/* Hero Section with Background Image */}
      <div className="hero-section relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80&fit=crop"
            alt="Health and wellness"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="relative z-10 px-8 md:px-16 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6 font-bold">
              Welcome back
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mb-8 font-light leading-relaxed">
              Your personalized longevity journey continues.
              Track, optimize, and thrive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard/biomarkers">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 shadow-premium font-semibold px-8 py-6 text-base">
                  <Activity className="w-5 h-5 mr-2" />
                  Track Biomarkers
                </Button>
              </Link>
              <Link href="/dashboard/insights">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-6 text-base">
                  View Insights
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-12">

        {/* Active Goals - Premium Design */}
        <div className="glass-card rounded-3xl p-8 md:p-10 shadow-premium-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Your Active Goals</h2>
                <p className="text-gray-600 mt-1">Track progress towards your health objectives</p>
              </div>
            </div>
            <Link href="/dashboard/goals">
              <Button variant="ghost" size="lg" className="font-semibold">
                View All
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Example Goals - These will be dynamic from database */}
            {[
              { title: 'Optimize Metabolic Health', progress: 60, current: '3', target: '5', unit: 'biomarkers tracked', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&q=80&fit=crop' },
              { title: 'Improve Cardiovascular Markers', progress: 40, current: '2', target: '5', unit: 'biomarkers tracked', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80&fit=crop' },
            ].map((goal) => (
              <div key={goal.title} className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-premium">
                <div className="flex items-center gap-6 p-6">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={goal.image} alt={goal.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{goal.title}</h3>
                        <p className="text-sm text-gray-600">
                          {goal.current} of {goal.target} {goal.unit}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-bold text-gradient">{goal.progress}%</span>
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {goalsCount === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <Target className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No active goals yet</h3>
                <p className="text-gray-600 mb-6">Start your longevity journey with personalized health goals</p>
                <Link href="/dashboard/goals">
                  <Button size="lg" className="gradient-primary text-white font-semibold px-8">
                    Set Your First Goal
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity & Recommendations - Premium Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="glass-card rounded-3xl p-8 shadow-premium">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Recent Activity</h3>
            </div>

            {testResultsCount === 0 ? (
              <div className="text-center py-12">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80&fit=crop"
                    alt="Lab testing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
                </div>
                <p className="text-gray-600 mb-6 font-medium">No biomarker data yet</p>
                <Link href="/dashboard/biomarkers">
                  <Button className="gradient-primary text-white font-semibold">
                    Track Your First Biomarker
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-2xl font-bold text-gray-900">{testResultsCount} biomarker{testResultsCount > 1 ? 's' : ''} tracked</p>
                <Link href="/dashboard/biomarkers">
                  <Button variant="ghost" size="lg" className="w-full justify-between font-semibold">
                    View All Results
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="glass-card rounded-3xl p-8 shadow-premium">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Recommendations</h3>
            </div>

            <div className="space-y-4">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-5 hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Track key metabolic markers</p>
                    <p className="text-sm text-gray-600">HbA1c, fasting glucose, and insulin</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white/50 p-5 hover:border-purple-200 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <Circle className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Monitor cardiovascular health</p>
                    <p className="text-sm text-gray-600">LDL, HDL, triglycerides, and hs-CRP</p>
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
