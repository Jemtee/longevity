import Link from 'next/link'
import { ArrowRight, Heart, Shield, TrendingUp, Leaf } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-100 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob-accent w-[500px] h-[500px] bg-forest-500 -top-40 -right-40 fixed" />
      <div className="blob-accent w-[400px] h-[400px] bg-sand-400 top-1/2 -left-32 fixed" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-cream-100/80 backdrop-blur-xl border-b border-cream-300/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center shadow-warm group-hover:shadow-warm-lg transition-shadow">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-ink-800 tracking-tight">
              Wellspring
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-medium text-ink-500 hover:text-ink-800 transition-colors px-4 py-2 rounded-xl"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-forest-500 hover:bg-forest-600 transition-all px-5 py-2.5 rounded-xl shadow-warm hover:shadow-warm-lg"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 relative">
        <div className="pt-28 pb-20 max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 text-forest-600 text-sm font-medium mb-8 border border-forest-200/50">
            <Heart className="w-3.5 h-3.5" />
            Science-backed longevity tracking
          </div>
          <h1 className="text-5xl sm:text-[3.5rem] font-display font-bold text-ink-800 leading-[1.08] mb-6 text-balance">
            Your health,
            <br />
            <span className="text-forest-500">understood.</span>
          </h1>
          <p className="text-lg text-ink-400 max-w-md mb-10 leading-relaxed font-light">
            Track biomarkers, receive evidence-graded insights, and take meaningful steps toward a longer, healthier life.
          </p>
          <div className="flex gap-3">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-forest-500 text-white rounded-2xl hover:bg-forest-600 transition-all font-medium shadow-warm hover:shadow-warm-lg"
            >
              Start for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-ink-700 rounded-2xl hover:bg-cream-50 transition-colors font-medium border border-cream-300 shadow-warm"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Feature cards — asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-28">
          <div
            className="md:col-span-5 card-elevated p-8 animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="w-11 h-11 rounded-xl bg-forest-50 flex items-center justify-center mb-5">
              <TrendingUp className="w-5 h-5 text-forest-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-ink-800 mb-2">30+ biomarkers</h3>
            <p className="text-sm text-ink-400 leading-relaxed">
              Monitor metabolic, cardiovascular, hormonal, and inflammatory markers with optimal range guidance for Nordic populations.
            </p>
          </div>

          <div
            className="md:col-span-4 card-elevated p-8 md:translate-y-8 animate-fade-up"
            style={{ animationDelay: '320ms' }}
          >
            <div className="w-11 h-11 rounded-xl bg-sand-50 flex items-center justify-center mb-5">
              <Shield className="w-5 h-5 text-sand-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-ink-800 mb-2">Evidence graded</h3>
            <p className="text-sm text-ink-400 leading-relaxed">
              Every recommendation carries a science grade (A&ndash;D) with citations. No unsubstantiated claims.
            </p>
          </div>

          <div
            className="md:col-span-3 card-elevated p-8 md:translate-y-16 animate-fade-up"
            style={{ animationDelay: '440ms' }}
          >
            <div className="w-11 h-11 rounded-xl bg-terra-400/10 flex items-center justify-center mb-5">
              <Heart className="w-5 h-5 text-terra-400" />
            </div>
            <h3 className="text-lg font-display font-semibold text-ink-800 mb-2">Personal</h3>
            <p className="text-sm text-ink-400 leading-relaxed">
              AI-powered analysis connects your markers to actionable recommendations.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
