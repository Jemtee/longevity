'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, ArrowRight, Activity, Heart, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    ageRange: '',
    primaryGoal: '',
    healthFocus: [] as string[],
    currentHabits: [] as string[],
  })

  const handleCheckbox = (field: 'healthFocus' | 'currentHabits', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User not authenticated')
      }

      // Update user profile with onboarding data
      const { error } = await supabase
        .from('profiles')
        .update({
          age_range: formData.ageRange,
          primary_goal: formData.primaryGoal,
          health_focus: formData.healthFocus,
          current_habits: formData.currentHabits,
          onboarding_completed: true,
        })
        .eq('id', user.id)

      if (error) throw error

      // Refresh the page to show the returning user dashboard
      router.refresh()
    } catch (error) {
      console.error('Error completing onboarding:', error)
      alert('Failed to complete onboarding. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.ageRange && formData.primaryGoal

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Wellspring</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Let's personalize your longevity journey. Tell us about yourself to get tailored recommendations.
        </p>
      </div>

      <Card className="border-primary-200 dark:border-primary-800">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Age range
                    </label>
                    <select
                      value={formData.ageRange}
                      onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                      <option value="">Select age range</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="55-64">55-64</option>
                      <option value="65+">65+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary goal
                    </label>
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                      <option value="">Select your goal</option>
                      <option value="optimize">Optimize overall health</option>
                      <option value="prevent">Prevent disease</option>
                      <option value="performance">Improve athletic performance</option>
                      <option value="longevity">Longevity & anti-aging</option>
                      <option value="manage">Manage existing condition</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Health Focus */}
          <div className="space-y-4 pt-4 border-t dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">What areas do you want to improve?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'metabolic', icon: Activity, label: 'Metabolic Health', desc: 'Blood sugar & insulin' },
                    { id: 'cardiovascular', icon: Heart, label: 'Cardiovascular', desc: 'Heart & circulation' },
                    { id: 'energy', icon: TrendingUp, label: 'Energy & Performance', desc: 'Vitality & fitness' },
                    { id: 'body', icon: Target, label: 'Body Composition', desc: 'Weight & muscle' },
                  ].map((area) => (
                    <label
                      key={area.id}
                      className="flex items-start gap-3 p-4 border rounded-lg hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-500 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={formData.healthFocus.includes(area.id)}
                        onChange={() => handleCheckbox('healthFocus', area.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <area.icon className="w-4 h-4 text-primary-500" />
                          <span className="font-medium">{area.label}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{area.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Current Status */}
          <div className="space-y-4 pt-4 border-t dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Track your current habits</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  We'll use this to provide personalized recommendations
                </p>
                <div className="space-y-3">
                  {[
                    { id: 'exercise', label: 'Exercise regularly (3+ times per week)' },
                    { id: 'diet', label: 'Follow a specific diet plan' },
                    { id: 'supplements', label: 'Take supplements or medications' },
                    { id: 'sleep', label: 'Track sleep and recovery' },
                    { id: 'bloodtests', label: 'Have recent blood test results' },
                  ].map((habit) => (
                    <label
                      key={habit.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.currentHabits.includes(habit.id)}
                        onChange={() => handleCheckbox('currentHabits', habit.id)}
                      />
                      <span className="text-sm">{habit.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
            >
              {loading ? 'Setting up...' : 'Complete Setup & Get My Recommendations'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Why This Matters */}
      <Card className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-950 dark:to-gray-900 border-primary-200 dark:border-primary-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Target className="w-10 h-10 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Why we ask these questions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
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
