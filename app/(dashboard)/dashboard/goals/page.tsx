import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function GoalsPage() {
  const goalImages: Record<string, string> = {
    'Metabolic': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80&fit=crop',
    'Cardiovascular': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80&fit=crop',
    'Inflammation': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&fit=crop',
    'Vitamins': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80&fit=crop',
  }

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Health Goals</h1>
              <p className="text-xl text-gray-600 mt-2">Set and track your personalized health objectives</p>
            </div>
          </div>
          <Button size="lg" className="gradient-primary text-white font-semibold px-8">
            <Plus className="w-5 h-5 mr-2" />
            New Goal
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-10">
        {/* Recommended Goals */}
        <div className="glass-card rounded-3xl p-10 shadow-premium-lg">
          <div className="mb-8">
            <h2 className="font-bold text-gray-900 mb-2">Recommended Goals</h2>
            <p className="text-gray-600 text-lg">Based on common longevity objectives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Optimize Metabolic Health',
                description: 'Keep HbA1c below 35 mmol/mol',
                category: 'Metabolic',
              },
              {
                title: 'Improve Cardiovascular Markers',
                description: 'Reduce LDL cholesterol to optimal range',
                category: 'Cardiovascular',
              },
              {
                title: 'Reduce Inflammation',
                description: 'Lower hs-CRP below 1.0 mg/L',
                category: 'Inflammation',
              },
              {
                title: 'Optimize Vitamin D',
                description: 'Maintain levels between 75-125 nmol/L',
                category: 'Vitamins',
              },
            ].map((goal) => (
              <div
                key={goal.title}
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 hover:shadow-premium bg-white"
              >
                {/* Background Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={goalImages[goal.category]}
                    alt={goal.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-indigo-600/80" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-semibold border border-white/30">
                      {goal.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{goal.title}</h3>
                  <p className="text-gray-600 mb-4">{goal.description}</p>
                  <Button variant="outline" size="lg" className="w-full font-semibold border-2 hover:bg-purple-50 hover:border-purple-300">
                    Track This Goal
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&fit=crop"
              alt="Goal tracking"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90" />
          </div>
          <div className="relative z-10 p-10 md:p-16">
            <div className="flex items-start gap-6 max-w-3xl">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">Goal tracking coming soon</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  You'll be able to set custom goals, track progress automatically, and receive personalized recommendations
                  on how to achieve your targets faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
