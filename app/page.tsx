import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Activity, Shield, TrendingUp, Sparkles, Heart, Zap, ChevronRight, Play, Star, Check } from 'lucide-react'
import { DotGridCSS } from '@/components/ui/dot-grid'

// Curated Unsplash images
const IMAGES = {
  heroRunner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85',
  nordicLake: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  meditation: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  healthyFood: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  labScience: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
  yogaSunrise: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  forestPath: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
  // Testimonial avatars
  avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  avatar3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-100 relative overflow-hidden">
      {/* Subtle dot grid */}
      <DotGridCSS
        className="fixed inset-0 z-0"
        size={1}
        gap={32}
        color="rgba(45, 106, 79, 0.08)"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-cream-100/70 backdrop-blur-2xl border-b border-cream-300/30">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-16 lg:h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-forest-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
              <Activity className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-ink-800 tracking-tight">
              Wellspring
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-ink-500 hover:text-ink-800 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-ink-500 hover:text-ink-800 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-ink-500 hover:text-ink-800 transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-ink-500 hover:text-ink-800 transition-colors px-4 py-2 rounded-xl hidden sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="group flex items-center gap-2 text-sm font-medium text-white bg-ink-800 hover:bg-ink-900 transition-all px-5 py-2.5 rounded-xl shadow-warm hover:shadow-warm-lg"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — Split layout with large image */}
      <section className="relative z-10 w-full">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-20">
            {/* Left: Content */}
            <div className="order-2 lg:order-1">
              {/* Tag */}
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Science-backed longevity tracking
                </span>
              </div>

              {/* Headline */}
              <h1
                className="mt-6 text-display-md sm:text-display-lg lg:text-display-xl font-display font-bold text-ink-900 animate-fade-up"
                style={{ animationDelay: '100ms' }}
              >
                Live longer.
                <br />
                <span className="text-gradient">Live better.</span>
              </h1>

              {/* Subtitle */}
              <p
                className="mt-6 text-lg sm:text-xl text-ink-400 max-w-lg leading-relaxed animate-fade-up"
                style={{ animationDelay: '200ms' }}
              >
                Track your biomarkers, understand your health with evidence-graded insights, and take meaningful steps toward a longer, healthier life.
              </p>

              {/* CTA */}
              <div
                className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up"
                style={{ animationDelay: '300ms' }}
              >
                <Link
                  href="/signup"
                  className="btn-glow group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-forest-500 text-white rounded-2xl hover:bg-forest-600 transition-all font-medium text-base"
                >
                  Start for free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-4 text-ink-700 rounded-2xl hover:bg-white/50 transition-all font-medium">
                  <div className="w-10 h-10 rounded-full bg-white shadow-warm flex items-center justify-center">
                    <Play className="w-4 h-4 text-forest-600 ml-0.5" />
                  </div>
                  Watch demo
                </button>
              </div>

              {/* Social proof */}
              <div
                className="mt-10 flex items-center gap-4 animate-fade-up"
                style={{ animationDelay: '400ms' }}
              >
                <div className="flex -space-x-3">
                  {[IMAGES.avatar1, IMAGES.avatar2, IMAGES.avatar3].map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-cream-100 overflow-hidden">
                      <Image
                        src={src}
                        alt="User"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sand-400 text-sand-400" />
                    ))}
                  </div>
                  <p className="text-sm text-ink-400 mt-0.5">
                    Loved by <span className="text-ink-700 font-medium">2,000+</span> health optimizers
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="order-1 lg:order-2 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-forest-400/20 rounded-3xl blur-3xl scale-95" />

                {/* Main image */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-xl">
                  <Image
                    src={IMAGES.heroRunner}
                    alt="Person running at sunrise - active healthy lifestyle"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />

                  {/* Floating stats card */}
                  <div className="absolute bottom-6 left-6 right-6 card-elevated p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-ink-400 mb-1">Today&apos;s Health Score</p>
                        <div className="flex items-baseline gap-2">
                          <span className="stat-number text-3xl text-forest-500">78</span>
                          <span className="flex items-center gap-1 text-forest-600 text-sm font-medium">
                            <TrendingUp className="w-3.5 h-3.5" />
                            +5
                          </span>
                        </div>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-forest-500 flex items-center justify-center">
                        <span className="stat-number text-lg text-forest-600">A+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-4 top-1/4 card-elevated px-4 py-3 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-forest-500" />
                    </div>
                    <div>
                      <p className="text-xs text-ink-400">Cardiovascular</p>
                      <p className="text-sm font-semibold text-forest-600">Optimal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="relative z-10 py-12 border-y border-cream-300/50 bg-white/30 backdrop-blur-sm">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '30+', label: 'Biomarkers tracked', icon: Activity },
              { value: 'A-D', label: 'Evidence grading system', icon: Shield },
              { value: '24/7', label: 'Health monitoring', icon: Heart },
              { value: '100%', label: 'Privacy focused', icon: Zap },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-forest-500" />
                  </div>
                  <div>
                    <p className="stat-number text-2xl lg:text-3xl text-ink-800">{stat.value}</p>
                    <p className="text-sm text-ink-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features with imagery */}
      <section id="features" className="relative z-10 py-20 lg:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag tag-secondary">Features</span>
            <h2 className="mt-4 text-display-sm lg:text-display-md font-display font-bold text-ink-900">
              Everything you need to optimize your health
            </h2>
            <p className="mt-4 text-lg text-ink-400">
              A complete platform designed for evidence-based health optimization
            </p>
          </div>

          {/* Feature grid with images */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Feature 1: Biomarker tracking */}
            <div className="card-elevated overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={IMAGES.labScience}
                  alt="Scientific lab testing"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="tag bg-white/20 text-white backdrop-blur-sm border-white/30">
                    30+ biomarkers
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-ink-800 mb-2">
                  Comprehensive biomarker tracking
                </h3>
                <p className="text-ink-400 leading-relaxed">
                  Monitor metabolic, cardiovascular, hormonal, and inflammatory markers with optimal range guidance tailored for Nordic populations.
                </p>
              </div>
            </div>

            {/* Feature 2: Evidence grading */}
            <div className="card-elevated overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-forest-500 to-forest-700">
                <div className="absolute inset-0 flex items-center justify-center gap-4 p-8">
                  {['A', 'B', 'C', 'D'].map((grade, i) => (
                    <div
                      key={grade}
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center font-mono font-bold text-2xl transition-transform duration-300 ${
                        i === 0 ? 'bg-white text-forest-700 scale-110' :
                        'bg-white/20 text-white'
                      }`}
                    >
                      {grade}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-ink-800 mb-2">
                  Evidence-graded recommendations
                </h3>
                <p className="text-ink-400 leading-relaxed">
                  Every recommendation carries a science grade (A–D) with citations. No unsubstantiated health claims.
                </p>
              </div>
            </div>

            {/* Feature 3: Personalized insights */}
            <div className="card-elevated overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={IMAGES.meditation}
                  alt="Person meditating at sunrise"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-ink-800 mb-2">
                  AI-powered personal insights
                </h3>
                <p className="text-ink-400 leading-relaxed">
                  Intelligent analysis connects your markers to actionable recommendations unique to your health profile.
                </p>
              </div>
            </div>

            {/* Feature 4: Swedish roadmap */}
            <div className="card-elevated overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={IMAGES.nordicLake}
                  alt="Nordic mountain landscape"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                  {['Baseline', 'Deepening', 'Performance', 'Advanced'].map((phase, i) => (
                    <div key={phase} className="flex items-center gap-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-forest-400' : 'bg-white/50'}`} />
                      <span className={`text-xs font-medium ${i === 0 ? 'text-white' : 'text-white/70'}`}>
                        {phase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-ink-800 mb-2">
                  Swedish testing roadmap
                </h3>
                <p className="text-ink-400 leading-relaxed">
                  A phased approach adapted for Swedish healthcare providers. Based on Blueprint and Superpower methodologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-20 lg:py-32 bg-white/50">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag tag-primary">Testimonials</span>
            <h2 className="mt-4 text-display-sm lg:text-display-md font-display font-bold text-ink-900">
              Loved by health optimizers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Finally, a health app that respects science. The evidence grading gives me confidence in every recommendation.",
                name: "Erik Lindström",
                role: "Software Engineer, Stockholm",
                avatar: IMAGES.avatar2,
              },
              {
                quote: "The Swedish testing roadmap made it easy to know exactly which tests to prioritize. Saved me thousands of kronor.",
                name: "Maria Johansson",
                role: "Product Designer, Malmö",
                avatar: IMAGES.avatar1,
              },
              {
                quote: "I've tried many health tracking apps. Wellspring is the first one that actually helps me understand my results.",
                name: "Anna Bergström",
                role: "Entrepreneur, Gothenburg",
                avatar: IMAGES.avatar3,
              },
            ].map((testimonial, i) => (
              <div key={i} className="card-elevated p-6 lg:p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sand-400 text-sand-400" />
                  ))}
                </div>
                <p className="text-ink-600 leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-ink-800">{testimonial.name}</p>
                    <p className="text-sm text-ink-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-20 lg:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag tag-secondary">Pricing</span>
            <h2 className="mt-4 text-display-sm lg:text-display-md font-display font-bold text-ink-900">
              Start optimizing your health today
            </h2>
            <p className="mt-4 text-lg text-ink-400">
              Free to start. Upgrade when you&apos;re ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free tier */}
            <div className="card-elevated p-8">
              <h3 className="text-lg font-display font-semibold text-ink-800 mb-2">Free</h3>
              <p className="text-ink-400 text-sm mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="stat-number text-4xl text-ink-800">0 kr</span>
                <span className="text-ink-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Track up to 10 biomarkers', 'Basic trend analysis', 'Evidence grades on all insights'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-ink-600">
                    <Check className="w-4 h-4 text-forest-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 bg-cream-200 text-ink-700 rounded-xl font-medium hover:bg-cream-300 transition-colors"
              >
                Get started free
              </Link>
            </div>

            {/* Pro tier */}
            <div className="card-elevated p-8 border-2 border-forest-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-forest-500 text-white text-xs font-semibold rounded-full">
                  Most popular
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-ink-800 mb-2">Pro</h3>
              <p className="text-ink-400 text-sm mb-6">For serious health optimizers</p>
              <div className="mb-6">
                <span className="stat-number text-4xl text-ink-800">99 kr</span>
                <span className="text-ink-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited biomarkers',
                  'AI-powered insights',
                  'Swedish testing roadmap',
                  'Export & share reports',
                  'Priority support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-ink-600">
                    <Check className="w-4 h-4 text-forest-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 bg-forest-500 text-white rounded-xl font-medium hover:bg-forest-600 transition-colors"
              >
                Start free trial
              </Link>
            </div>

            {/* Team tier */}
            <div className="card-elevated p-8 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-display font-semibold text-ink-800 mb-2">Team</h3>
              <p className="text-ink-400 text-sm mb-6">For clinics & organizations</p>
              <div className="mb-6">
                <span className="stat-number text-4xl text-ink-800">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Pro',
                  'Multi-user management',
                  'Custom integrations',
                  'Dedicated support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-ink-600">
                    <Check className="w-4 h-4 text-forest-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="block w-full text-center px-6 py-3 bg-cream-200 text-ink-700 rounded-xl font-medium hover:bg-cream-300 transition-colors">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with image */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={IMAGES.forestPath}
                alt="Forest path - journey to better health"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/70 to-forest-900/50" />
            </div>

            {/* Content */}
            <div className="relative py-16 lg:py-24 px-8 lg:px-16">
              <div className="max-w-xl">
                <h2 className="text-display-sm lg:text-display-md font-display font-bold text-white mb-4">
                  Start your longevity journey today
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Join thousands of health-conscious individuals tracking their way to a longer, healthier life.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/signup"
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-forest-700 rounded-2xl hover:bg-cream-50 transition-all font-medium text-base"
                  >
                    Get started free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white/90 hover:text-white transition-colors font-medium"
                  >
                    Sign in
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-cream-300/50">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-display font-semibold text-ink-700">
                Wellspring
              </span>
            </div>

            <p className="text-sm text-ink-400">
              © {new Date().getFullYear()} Wellspring. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-ink-400 hover:text-ink-600 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-ink-400 hover:text-ink-600 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
