import Link from 'next/link'
import { ArrowRight, Heart, Shield, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-display font-bold text-gray-900 tracking-tight">
              Wellspring
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors px-4 py-2 rounded-lg"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6">
        <div className="pt-24 pb-16 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
            <Heart className="w-3.5 h-3.5" />
            Science-based longevity tracking
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Understand your<br />
            <span className="text-primary-500">health deeply</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
            Track biomarkers, get AI-powered insights, and take control of your longevity journey with evidence-graded recommendations.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium border border-gray-200"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
          {[
            {
              icon: TrendingUp,
              title: 'Track 30+ biomarkers',
              desc: 'Monitor metabolic, cardiovascular, hormonal, and inflammatory markers with optimal range guidance.',
              color: 'bg-blue-50 text-blue-600',
            },
            {
              icon: Shield,
              title: 'Evidence graded',
              desc: 'Every recommendation carries a science grade (A-D) with citations. No unsubstantiated health claims.',
              color: 'bg-green-50 text-green-600',
            },
            {
              icon: Heart,
              title: 'Personalized insights',
              desc: 'AI-powered analysis connects your biomarkers to actionable lifestyle and supplement recommendations.',
              color: 'bg-amber-50 text-amber-600',
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm animate-slide-up"
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color.split(' ')[0]}`}>
                <feature.icon className={`w-5 h-5 ${feature.color.split(' ')[1]}`} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
