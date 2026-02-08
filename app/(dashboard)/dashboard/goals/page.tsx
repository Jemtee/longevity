import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function GoalsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-primary-500" />
          <div>
            <h1 className="text-3xl font-bold">Health Goals</h1>
            <p className="text-gray-600">Set and track your personalized health objectives</p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Goals</CardTitle>
          <CardDescription>Based on common longevity objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="p-4 border rounded-lg hover:border-primary-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{goal.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {goal.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Track This Goal
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary-200 bg-gradient-to-br from-primary-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Target className="w-10 h-10 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-2">Goal tracking coming soon</h3>
              <p className="text-sm text-gray-600">
                You'll be able to set custom goals, track progress automatically, and receive recommendations
                on how to achieve your targets faster.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
