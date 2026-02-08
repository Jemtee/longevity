import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Target, TrendingUp, Heart, Activity, ArrowRight, CheckCircle2, Circle } from 'lucide-react'

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
    // Onboarding flow for new users
    return (
      <div className="container mx-auto p-6 max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Wellspring</h1>
          <p className="text-lg text-gray-600">
            Let's personalize your longevity journey. Tell us about yourself to get tailored recommendations.
          </p>
        </div>

        {/* Onboarding Steps */}
        <Card className="border-primary-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-500" />
              Complete Your Profile
            </CardTitle>
            <CardDescription>Help us understand your health goals and current situation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Tell us about yourself</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age range
                      </label>
                      <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Select age range</option>
                        <option>25-34</option>
                        <option>35-44</option>
                        <option>45-54</option>
                        <option>55-64</option>
                        <option>65+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary goal
                      </label>
                      <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Select your goal</option>
                        <option>Optimize overall health</option>
                        <option>Prevent disease</option>
                        <option>Improve athletic performance</option>
                        <option>Longevity & anti-aging</option>
                        <option>Manage existing condition</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Health Focus */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">What areas do you want to improve?</h3>
                  <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { icon: Activity, label: 'Metabolic Health', desc: 'Blood sugar & insulin' },
                      { icon: Heart, label: 'Cardiovascular', desc: 'Heart & circulation' },
                      { icon: TrendingUp, label: 'Energy & Performance', desc: 'Vitality & fitness' },
                      { icon: Target, label: 'Body Composition', desc: 'Weight & muscle' },
                    ].map((area) => (
                      <label
                        key={area.label}
                        className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary-500 transition-colors cursor-pointer"
                      >
                        <input type="checkbox" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <area.icon className="w-4 h-4 text-primary-500" />
                            <span className="font-medium">{area.label}</span>
                          </div>
                          <p className="text-xs text-gray-600">{area.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Current Status */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Track your current habits</h3>
                  <p className="text-sm text-gray-600 mb-4">We'll use this to provide personalized recommendations</p>
                  <div className="space-y-3">
                    {[
                      'Exercise regularly (3+ times per week)',
                      'Follow a specific diet plan',
                      'Take supplements or medications',
                      'Track sleep and recovery',
                      'Have recent blood test results',
                    ].map((habit) => (
                      <label key={habit} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" />
                        <span className="text-sm">{habit}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button className="w-full" size="lg">
                Complete Setup & Get My Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Why This Matters */}
        <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Target className="w-10 h-10 text-primary-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Why we ask these questions</h3>
                <p className="text-sm text-gray-600">
                  Wellspring uses your profile to provide personalized content, biomarker recommendations, and
                  actionable insights tailored to your specific goals and situation. Your data stays private and secure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Returning user dashboard
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-600 mt-1">Here's your health progress today</p>
        </div>
        <Link href="/dashboard/biomarkers">
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Track Biomarkers
          </Button>
        </Link>
      </div>

      {/* Active Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-500" />
              <CardTitle>Your Active Goals</CardTitle>
            </div>
            <Link href="/dashboard/goals">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <CardDescription>Track progress towards your health objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example Goals - These will be dynamic from database */}
            {[
              { title: 'Optimize Metabolic Health', progress: 60, current: '3', target: '5', unit: 'biomarkers tracked' },
              { title: 'Improve Cardiovascular Markers', progress: 40, current: '2', target: '5', unit: 'biomarkers tracked' },
            ].map((goal) => (
              <div key={goal.title} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{goal.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {goal.current} of {goal.target} {goal.unit}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary-600">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}

            {goalsCount === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="mb-4">No active goals yet</p>
                <Link href="/dashboard/goals">
                  <Button variant="outline">Set Your First Goal</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {testResultsCount === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No biomarker data yet</p>
                <Link href="/dashboard/biomarkers">
                  <Button variant="outline">Track Your First Biomarker</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">{testResultsCount} biomarker{testResultsCount > 1 ? 's' : ''} tracked</p>
                <Link href="/dashboard/biomarkers">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Results
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-primary-900">Track key metabolic markers</p>
                  <p className="text-primary-700 text-xs mt-1">HbA1c, fasting glucose, and insulin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Monitor cardiovascular health</p>
                  <p className="text-gray-600 text-xs mt-1">LDL, HDL, triglycerides, and hs-CRP</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
