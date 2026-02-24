'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Target,
  ArrowRight,
  ArrowLeft,
  Activity,
  Heart,
  TrendingUp,
  Leaf,
  Shield,
  Sparkles,
  Brain,
  Moon,
  Dumbbell,
  Apple,
  Pill,
  FlaskConical,
  CheckCircle2,
} from 'lucide-react'
import {
  WelcomeIllustration,
  GoalSelectionIllustration,
  HealthFocusIllustration,
  HabitsIllustration,
  SuccessIllustration,
} from '@/components/illustrations/onboarding-illustrations'
import { createClient } from '@/lib/supabase/client'

const STEPS = [
  { id: 'welcome', title: 'Welcome', subtitle: 'Start your journey' },
  { id: 'about', title: 'About You', subtitle: 'Tell us a bit about yourself' },
  { id: 'goals', title: 'Your Goals', subtitle: 'What matters most to you' },
  { id: 'focus', title: 'Health Focus', subtitle: 'Areas to improve' },
  { id: 'habits', title: 'Your Habits', subtitle: 'Current wellness practices' },
]

const AGE_RANGES = [
  { value: '25-34', label: '25-34', description: 'Building foundations' },
  { value: '35-44', label: '35-44', description: 'Peak optimization' },
  { value: '45-54', label: '45-54', description: 'Prevention focus' },
  { value: '55-64', label: '55-64', description: 'Active longevity' },
  { value: '65+', label: '65+', description: 'Healthy aging' },
]

const GOALS = [
  { value: 'optimize', label: 'Optimize Health', icon: TrendingUp, description: 'Fine-tune your body for peak performance' },
  { value: 'prevent', label: 'Prevent Disease', icon: Shield, description: 'Stay ahead of potential health issues' },
  { value: 'performance', label: 'Athletic Performance', icon: Dumbbell, description: 'Push your physical limits' },
  { value: 'longevity', label: 'Longevity', icon: Sparkles, description: 'Maximize your healthspan' },
  { value: 'manage', label: 'Manage Condition', icon: Heart, description: 'Take control of existing health concerns' },
]

const HEALTH_FOCUS_AREAS = [
  { id: 'metabolic', icon: Activity, label: 'Metabolic Health', desc: 'Blood sugar, insulin, energy', color: 'forest' },
  { id: 'cardiovascular', icon: Heart, label: 'Heart Health', desc: 'Cholesterol, blood pressure', color: 'terra' },
  { id: 'energy', icon: TrendingUp, label: 'Energy & Vitality', desc: 'Stamina and daily performance', color: 'sand' },
  { id: 'body', icon: Target, label: 'Body Composition', desc: 'Weight, muscle, fat balance', color: 'forest' },
  { id: 'brain', icon: Brain, label: 'Cognitive Health', desc: 'Focus, memory, mental clarity', color: 'sand' },
  { id: 'sleep', icon: Moon, label: 'Sleep Quality', desc: 'Rest and recovery', color: 'terra' },
]

const CURRENT_HABITS = [
  { id: 'exercise', icon: Dumbbell, label: 'Exercise regularly', desc: '3+ times per week' },
  { id: 'diet', icon: Apple, label: 'Follow a diet plan', desc: 'Mediterranean, keto, etc.' },
  { id: 'supplements', icon: Pill, label: 'Take supplements', desc: 'Vitamins, minerals, etc.' },
  { id: 'sleep', icon: Moon, label: 'Track sleep', desc: 'Using wearable or app' },
  { id: 'bloodtests', icon: FlaskConical, label: 'Regular blood tests', desc: 'Within the last year' },
]

export default function OnboardingForm() {
  const router = useRouter()
  const supabase = createClient()
  const [currentStep, setCurrentStep] = useState(0)
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

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true // Welcome
      case 1: return formData.ageRange !== '' // About You
      case 2: return formData.primaryGoal !== '' // Goals
      case 3: return formData.healthFocus.length > 0 // Health Focus
      case 4: return true // Habits (optional)
      default: return true
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-ink-600">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span className="text-sm text-ink-400">
            {STEPS[currentStep].title}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col">
        {/* Step 0: Welcome */}
        {currentStep === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-up">
            <WelcomeIllustration className="w-72 h-48 mb-8" />
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-50 text-forest-600 text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Welcome to Wellspring
            </div>
            <h1 className="text-4xl font-display font-bold text-ink-800 mb-4">
              Your Longevity Journey<br />Starts Here
            </h1>
            <p className="text-lg text-ink-400 max-w-md mb-8 leading-relaxed">
              In the next few minutes, we&apos;ll learn about your health goals and create a personalized roadmap for your wellness journey.
            </p>
            <div className="flex items-center gap-6 text-sm text-ink-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-500" />
                <span>Personalized insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-500" />
                <span>Science-backed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-500" />
                <span>100% private</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: About You */}
        {currentStep === 1 && (
          <div className="flex-1 animate-fade-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-ink-800 mb-2">
                Tell us about yourself
              </h2>
              <p className="text-ink-400">
                Your age helps us tailor recommendations to your life stage
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <p className="text-sm font-medium text-ink-600 mb-4">What&apos;s your age range?</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {AGE_RANGES.map((age) => (
                  <button
                    key={age.value}
                    onClick={() => setFormData({ ...formData, ageRange: age.value })}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
                      formData.ageRange === age.value
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-cream-300 hover:border-forest-200 hover:bg-forest-50/30'
                    }`}
                  >
                    <span className="text-2xl font-display font-bold text-ink-800 block mb-1">
                      {age.label}
                    </span>
                    <span className="text-xs text-ink-400">{age.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Goals */}
        {currentStep === 2 && (
          <div className="flex-1 animate-fade-up">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/3">
                <GoalSelectionIllustration className="w-full max-w-xs mx-auto" />
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-display font-bold text-ink-800 mb-2">
                  What&apos;s your primary goal?
                </h2>
                <p className="text-ink-400 mb-6">
                  This helps us prioritize the most relevant biomarkers and insights for you
                </p>
                <div className="space-y-3">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => setFormData({ ...formData, primaryGoal: goal.value })}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                        formData.primaryGoal === goal.value
                          ? 'border-forest-500 bg-forest-50'
                          : 'border-cream-300 hover:border-forest-200 hover:bg-forest-50/30'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        formData.primaryGoal === goal.value ? 'bg-forest-100' : 'bg-cream-200'
                      }`}>
                        <goal.icon className={`w-6 h-6 ${
                          formData.primaryGoal === goal.value ? 'text-forest-600' : 'text-ink-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-ink-800 block">{goal.label}</span>
                        <span className="text-sm text-ink-400">{goal.description}</span>
                      </div>
                      {formData.primaryGoal === goal.value && (
                        <CheckCircle2 className="w-5 h-5 text-forest-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Health Focus */}
        {currentStep === 3 && (
          <div className="flex-1 animate-fade-up">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/3">
                <HealthFocusIllustration className="w-full max-w-xs mx-auto" />
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-display font-bold text-ink-800 mb-2">
                  Which areas do you want to improve?
                </h2>
                <p className="text-ink-400 mb-6">
                  Select all that apply — we&apos;ll help you track the right biomarkers
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {HEALTH_FOCUS_AREAS.map((area) => {
                    const isSelected = formData.healthFocus.includes(area.id)
                    return (
                      <button
                        key={area.id}
                        onClick={() => handleCheckbox('healthFocus', area.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                          isSelected
                            ? 'border-forest-500 bg-forest-50'
                            : 'border-cream-300 hover:border-forest-200 hover:bg-forest-50/30'
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-forest-100' : 'bg-cream-200'
                        }`}>
                          <area.icon className={`w-5 h-5 ${
                            isSelected ? 'text-forest-600' : 'text-ink-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-ink-800 block">{area.label}</span>
                          <span className="text-sm text-ink-400">{area.desc}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                          isSelected ? 'border-forest-500 bg-forest-500' : 'border-ink-200'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Habits */}
        {currentStep === 4 && (
          <div className="flex-1 animate-fade-up">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/3">
                <HabitsIllustration className="w-full max-w-xs mx-auto" />
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-display font-bold text-ink-800 mb-2">
                  What are your current habits?
                </h2>
                <p className="text-ink-400 mb-6">
                  Help us understand where you&apos;re starting from (optional)
                </p>
                <div className="space-y-3">
                  {CURRENT_HABITS.map((habit) => {
                    const isSelected = formData.currentHabits.includes(habit.id)
                    return (
                      <button
                        key={habit.id}
                        onClick={() => handleCheckbox('currentHabits', habit.id)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                          isSelected
                            ? 'border-forest-500 bg-forest-50'
                            : 'border-cream-300 hover:border-forest-200 hover:bg-forest-50/30'
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-forest-100' : 'bg-cream-200'
                        }`}>
                          <habit.icon className={`w-5 h-5 ${
                            isSelected ? 'text-forest-600' : 'text-ink-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-ink-800 block">{habit.label}</span>
                          <span className="text-sm text-ink-400">{habit.desc}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                          isSelected ? 'border-forest-500 bg-forest-500' : 'border-ink-200'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-cream-200">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="text-ink-400 hover:text-ink-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="bg-forest-500 hover:bg-forest-600 text-white shadow-warm h-12 px-8"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-forest-500 hover:bg-forest-600 text-white shadow-warm h-12 px-8"
            >
              {loading ? (
                <>
                  <span className="animate-pulse">Setting up...</span>
                </>
              ) : (
                <>
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Privacy note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-ink-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Your data is encrypted and never shared</span>
        </div>
      </div>
    </div>
  )
}
