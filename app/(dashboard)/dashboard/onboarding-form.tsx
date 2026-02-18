'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, ArrowRight, Activity, Heart, TrendingUp, Sparkles, Shield } from 'lucide-react'
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
                <select
                  value={formData.ageRange}
                  onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
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
                <select
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
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
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${formData.ageRange && formData.primaryGoal ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <h3 className="font-semibold text-gray-900">Health focus areas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
              {[
                { id: 'metabolic', icon: Activity, label: 'Metabolic Health', desc: 'Blood sugar & insulin' },
                { id: 'cardiovascular', icon: Heart, label: 'Cardiovascular', desc: 'Heart & circulation' },
                { id: 'energy', icon: TrendingUp, label: 'Energy & Performance', desc: 'Vitality & fitness' },
                { id: 'body', icon: Target, label: 'Body Composition', desc: 'Weight & muscle' },
              ].map((area) => {
                const isSelected = formData.healthFocus.includes(area.id)
                return (
                  <label
                    key={area.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? 'border-primary-300 bg-primary-50/50'
                        : 'border-gray-100 hover:border-primary-200 hover:bg-primary-50/30'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                      isSelected ? 'bg-primary-100' : 'bg-gray-50 group-hover:bg-primary-50'
                    }`}>
                      <area.icon className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900 block">{area.label}</span>
                      <span className="text-xs text-gray-500">{area.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckbox('healthFocus', area.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </label>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Step 3 */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${formData.healthFocus.length > 0 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <h3 className="font-semibold text-gray-900">Current habits</h3>
            </div>
            <div className="space-y-2 pl-10">
              {[
                { id: 'exercise', label: 'Exercise regularly (3+ times per week)' },
                { id: 'diet', label: 'Follow a specific diet plan' },
                { id: 'supplements', label: 'Take supplements or medications' },
                { id: 'sleep', label: 'Track sleep and recovery' },
                { id: 'bloodtests', label: 'Have recent blood test results' },
              ].map((habit) => (
                <label key={habit.id} className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.currentHabits.includes(habit.id)}
                    onChange={() => handleCheckbox('currentHabits', habit.id)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{habit.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              className="w-full h-12 text-base font-medium"
              size="lg"
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
            >
              {loading ? 'Setting up...' : 'Get My Recommendations'}
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
