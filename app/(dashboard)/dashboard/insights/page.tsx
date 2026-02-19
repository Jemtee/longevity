import { Lightbulb, Sparkles, TrendingUp, AlertTriangle, Heart } from 'lucide-react'

export const metadata = { title: 'Insights - Wellspring', description: 'AI-powered health insights and recommendations' }

export default async function InsightsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 animate-fade-up">
        <div className="w-10 h-10 rounded-xl bg-sand-50 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-sand-500" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink-800">AI Insights</h1>
          <p className="text-sm text-ink-400">Personalized recommendations based on your data</p>
        </div>
      </div>

      <div className="card-elevated p-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-forest-50 flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7 text-forest-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink-800">Coming in Phase 3</h2>
            <p className="text-sm text-ink-400 leading-relaxed">AI-powered insights will analyze your biomarker data and provide science-graded, personalized recommendations.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {[
            { icon: TrendingUp, label: 'Trend analysis', desc: 'Track how your markers change over time', color: 'text-forest-500', bg: 'bg-forest-50' },
            { icon: AlertTriangle, label: 'Early warnings', desc: 'Get alerts for concerning patterns', color: 'text-sand-500', bg: 'bg-sand-50' },
            { icon: Lightbulb, label: 'Smart recommendations', desc: 'Evidence-graded lifestyle suggestions', color: 'text-forest-600', bg: 'bg-forest-50' },
            { icon: Heart, label: 'Cross-correlations', desc: 'See how markers connect to each other', color: 'text-terra-400', bg: 'bg-terra-400/10' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-cream-100 border border-cream-300/60">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-800">{item.label}</p>
                <p className="text-xs text-ink-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
