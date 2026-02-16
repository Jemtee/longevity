import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Target, TrendingUp, Heart, Activity, ArrowRight, CheckCircle2, Circle, Sparkles, Shield } from 'lucide-react'

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

  // Check if user has completed onboarding (has set any goals or added biomarkers)
  const { count: goalsCount } = await supabase
    .from('user_goals')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  const { count: testResultsCount } = await supabase
    .from('test_results')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  const isNewUser = !goalsCount && !testResultsCount

  if (isNewUser) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Hero welcome */}
        <div className="text-center space-y-3 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Welcome to your health journey
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Let&apos;s get started
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Tell us about yourself so we can personalize your longevity recommendations.
          </p>
        </div>

        {/* Onboarding Card */}
        <Card className="border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-8 space-y-8">
            {/* Step 1 */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500 text-white text-sm font-semibold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900">About you</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Age range
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Select age range</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Primary goal
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Select your goal</option>
                    <option value="optimize">Optimize overall health</option>
                    <option value="prevent">Prevent disease</option>
                    <option value="performance">Improve athletic performance</option>
                    <option value="longevity">Longevity &amp; anti-aging</option>
                    <option value="manage">Manage existing condition</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Step 2 */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-sm font-semibold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900">Health focus areas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
                {[
                  { icon: Activity, label: 'Metabolic Health', desc: 'Blood sugar & insulin' },
                  { icon: Heart, label: 'Cardiovascular', desc: 'Heart & circulation' },
                  { icon: TrendingUp, label: 'Energy & Performance', desc: 'Vitality & fitness' },
                  { icon: Target, label: 'Body Composition', desc: 'Weight & muscle' },
                ].map((area) => (
                  <label
                    key={area.label}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-primary-50 transition-colors">
                      <area.icon className="w-4.5 h-4.5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900 block">{area.label}</span>
                      <span className="text-xs text-gray-500">{area.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Step 3 */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-sm font-semibold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900">Current habits</h3>
              </div>
              <div className="space-y-2 pl-10">
                {[
                  'Exercise regularly (3+ times per week)',
                  'Follow a specific diet plan',
                  'Take supplements or medications',
                  'Track sleep and recovery',
                  'Have recent blood test results',
                ].map((habit) => (
                  <label key={habit} className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{habit}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button className="w-full h-12 text-base font-medium" size="lg">
                Get My Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust card */}
        <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50/80 border border-gray-100 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">Your data stays private</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              We use your profile to personalize recommendations and insights.
              Your health data is encrypted and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    )
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
                <CheckCircle2 className="w-4.5 h-4.5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Track key metabolic markers</p>
                  <p className="text-xs text-gray-500 mt-0.5">HbA1c, fasting glucose, and insulin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <Circle className="w-4.5 h-4.5 text-gray-300 flex-shrink-0 mt-0.5" />
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
