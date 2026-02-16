import { Card, CardContent } from '@/components/ui/card'
import { Lightbulb, Sparkles, TrendingUp, AlertTriangle, Heart } from 'lucide-react'

export const metadata = {
  title: 'Insights - Wellspring',
  description: 'AI-powered health insights and recommendations',
}

export default async function InsightsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-sm text-gray-500">Personalized recommendations based on your data</p>
        </div>
      </div>

      {/* Coming soon card */}
      <Card className="border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: '50ms' }}>
        <CardContent className="p-8">
          <div className="text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-primary-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Coming in Phase 3</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI-powered insights will analyze your biomarker data and provide science-graded, personalized recommendations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {[
              { icon: TrendingUp, label: 'Trend analysis', desc: 'Track how your markers change over time', color: 'text-blue-600 bg-blue-50' },
              { icon: AlertTriangle, label: 'Early warnings', desc: 'Get alerts for concerning patterns', color: 'text-amber-600 bg-amber-50' },
              { icon: Lightbulb, label: 'Smart recommendations', desc: 'Evidence-graded lifestyle suggestions', color: 'text-green-600 bg-green-50' },
              { icon: Heart, label: 'Cross-correlations', desc: 'See how markers connect to each other', color: 'text-red-600 bg-red-50' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color.split(' ')[1]}`}>
                  <item.icon className={`w-4 h-4 ${item.color.split(' ')[0]}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
