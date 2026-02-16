import { Card, CardContent } from '@/components/ui/card'
import { Target, Plus, Activity, Heart, Flame, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Goals - Wellspring',
  description: 'Set and track your health goals',
}

export default async function GoalsPage() {
  const goals = [
    {
      title: 'Optimize Metabolic Health',
      description: 'Keep HbA1c below 35 mmol/mol',
      category: 'Metabolic',
      icon: Flame,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      title: 'Improve Cardiovascular Markers',
      description: 'Reduce LDL cholesterol to optimal range',
      category: 'Cardiovascular',
      icon: Heart,
      color: 'text-red-600 bg-red-50',
    },
    {
      title: 'Reduce Inflammation',
      description: 'Lower hs-CRP below 1.0 mg/L',
      category: 'Inflammation',
      icon: Activity,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Optimize Vitamin D',
      description: 'Maintain levels between 75-125 nmol/L',
      category: 'Vitamins',
      icon: Sun,
      color: 'text-yellow-600 bg-yellow-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Goals</h1>
            <p className="text-sm text-gray-500">Set and track your health objectives</p>
          </div>
        </div>
        <Button className="shadow-sm">
          <Plus className="w-4 h-4 mr-1.5" />
          New Goal
        </Button>
      </div>

      {/* Recommended Goals */}
      <Card className="border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: '50ms' }}>
        <CardContent className="p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-gray-900">Recommended Goals</h2>
            <p className="text-xs text-gray-500 mt-0.5">Based on common longevity objectives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goals.map((goal, i) => (
              <div
                key={goal.title}
                className="group p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${goal.color.split(' ')[1]}`}>
                    <goal.icon className={`w-4.5 h-4.5 ${goal.color.split(' ')[0]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{goal.title}</h3>
                      <span className="text-[10px] font-medium text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{goal.description}</p>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs border-gray-200 group-hover:border-primary-200 group-hover:text-primary-700">
                      Track This Goal
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info card */}
      <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50/80 border border-gray-100 animate-fade-in" style={{ animationDelay: '150ms' }}>
        <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
          <Target className="w-4.5 h-4.5 text-primary-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">Goal tracking coming soon</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Set custom goals, track progress automatically, and receive recommendations on how to achieve your targets.
          </p>
        </div>
      </div>
    </div>
  )
}
