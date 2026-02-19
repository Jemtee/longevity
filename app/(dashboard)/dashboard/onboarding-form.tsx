'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Target, ArrowRight, Activity, Heart, TrendingUp, Leaf, Shield } from 'lucide-react'
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
      if (!user) throw new Error('User not authenticated')
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
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 text-forest-600 text-sm font-medium border border-forest-200/50">
          <Leaf className="w-3.5 h-3.5" />
          Welcome to Wellspring
        </div>
        <h1 className="text-4xl font-display font-bold text-ink-800">Let&apos;s get started</h1>
        <p className="text-lg text-ink-400 max-w-md mx-auto font-light leading-relaxed">Tell us about yourself so we can personalize your longevity recommendations.</p>
      </div>

      <div className="card-elevated p-8 space-y-8 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-forest-500 text-white text-sm font-semibold font-display">1</div>
            <h3 className="font-display font-semibold text-ink-800">About you</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-ink-600">Age range</label>
              <select value={formData.ageRange} onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })} className="w-full px-3.5 py-2.5 text-sm">
                <option value="">Select age range</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65+">65+</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-ink-600">Primary goal</label>
              <select value={formData.primaryGoal} onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })} className="w-full px-3.5 py-2.5 text-sm">
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

        <div className="border-t border-cream-300/60" />

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold font-display ${isFormValid ? 'bg-forest-500 text-white' : 'bg-cream-300 text-ink-400'}`}>2</div>
            <h3 className="font-display font-semibold text-ink-800">Health focus areas</h3>
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
                <label key={area.id} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer group ${isSelected ? 'border-forest-300 bg-forest-50/50' : 'border-cream-300 hover:border-forest-200 hover:bg-forest-50/30'}`}>
                  <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${isSelected ? 'bg-forest-100' : 'bg-cream-200 group-hover:bg-forest-50'}`}>
                    <area.icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-forest-600' : 'text-ink-300 group-hover:text-forest-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-ink-800 block">{area.label}</span>
                    <span className="text-xs text-ink-400">{area.desc}</span>
                  </div>
                  <input type="checkbox" checked={isSelected} onChange={() => handleCheckbox('healthFocus', area.id)} className="w-4 h-4" />
                </label>
              )
            })}
          </div>
        </div>

        <div className="border-t border-cream-300/60" />

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold font-display ${formData.healthFocus.length > 0 ? 'bg-forest-500 text-white' : 'bg-cream-300 text-ink-400'}`}>3</div>
            <h3 className="font-display font-semibold text-ink-800">Current habits</h3>
          </div>
          <div className="space-y-1.5 pl-10">
            {[
              { id: 'exercise', label: 'Exercise regularly (3+ times per week)' },
              { id: 'diet', label: 'Follow a specific diet plan' },
              { id: 'supplements', label: 'Take supplements or medications' },
              { id: 'sleep', label: 'Track sleep and recovery' },
              { id: 'bloodtests', label: 'Have recent blood test results' },
            ].map((habit) => (
              <label key={habit.id} className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-cream-200/50 cursor-pointer transition-colors">
                <input type="checkbox" checked={formData.currentHabits.includes(habit.id)} onChange={() => handleCheckbox('currentHabits', habit.id)} className="w-4 h-4" />
                <span className="text-sm text-ink-600">{habit.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button className="w-full h-12 text-base font-medium bg-forest-500 hover:bg-forest-600 text-white shadow-warm" size="lg" onClick={handleSubmit} disabled={loading || !isFormValid}>
            {loading ? 'Setting up...' : 'Get My Recommendations'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-4 p-5 rounded-xl bg-cream-200/50 border border-cream-300/60 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <Shield className="w-5 h-5 text-forest-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-ink-800 mb-1">Your data stays private</p>
          <p className="text-sm text-ink-400 leading-relaxed">We use your profile to personalize recommendations. Your health data is encrypted and never shared.</p>
        </div>
      </div>
    </div>
  )
}
