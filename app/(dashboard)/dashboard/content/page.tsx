import { BookOpen, Search, Clock } from 'lucide-react'

export const metadata = { title: 'Content - Wellspring', description: 'Learn about longevity science' }

export default async function ContentPage() {
  const sampleArticles = [
    { title: 'Understanding HbA1c: Your Key to Metabolic Health', category: 'Metabolic Health', readTime: '5 min', excerpt: 'Learn what HbA1c measures and why it\'s one of the most important longevity biomarkers.' },
    { title: 'Optimizing Vitamin D for Longevity', category: 'Vitamins & Minerals', readTime: '7 min', excerpt: 'Discover the optimal Vitamin D levels and how to achieve them through diet and supplementation.' },
    { title: 'The Truth About LDL Cholesterol', category: 'Cardiovascular', readTime: '8 min', excerpt: 'Beyond the numbers: understanding particle size, oxidation, and what really matters.' },
    { title: 'Inflammation and Aging: The hs-CRP Connection', category: 'Inflammation', readTime: '6 min', excerpt: 'Why chronic inflammation accelerates aging and how to monitor it with hs-CRP testing.' },
    { title: 'Building Your Longevity Stack', category: 'Lifestyle', readTime: '10 min', excerpt: 'A comprehensive guide to supplements, diet, and lifestyle interventions backed by science.' },
    { title: 'How to Read Your Blood Test Results', category: 'Getting Started', readTime: '12 min', excerpt: 'A beginner\'s guide to understanding your biomarker results and what they mean.' },
  ]

  const categories = [
    { name: 'Getting Started', count: 6 },
    { name: 'Metabolic Health', count: 8 },
    { name: 'Cardiovascular', count: 7 },
    { name: 'Longevity Science', count: 12 },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 animate-fade-up">
        <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-forest-500" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink-800">Content Library</h1>
          <p className="text-sm text-ink-400">Learn about longevity science</p>
        </div>
      </div>

      <div className="relative animate-fade-up" style={{ animationDelay: '80ms' }}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-ink-300" />
        <input type="text" placeholder="Search articles, biomarkers, or topics..." className="w-full pl-11 pr-4 py-3 rounded-xl text-sm" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: '160ms' }}>
        {categories.map((cat) => (
          <div key={cat.name} className="group p-4 rounded-xl bg-white border border-cream-300/60 hover:border-forest-200 hover:shadow-warm transition-all duration-200 cursor-pointer text-center">
            <h3 className="text-sm font-medium text-ink-800 group-hover:text-forest-700 transition-colors">{cat.name}</h3>
            <p className="text-xs text-ink-300 mt-0.5">{cat.count} articles</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-base font-display font-semibold text-ink-800 mb-4">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleArticles.map((article, i) => (
            <div key={article.title} className="card-elevated p-5 group cursor-pointer animate-fade-up" style={{ animationDelay: `${240 + i * 60}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full">{article.category}</span>
                <span className="flex items-center gap-1 text-[11px] text-ink-300"><Clock className="w-3 h-3" />{article.readTime}</span>
              </div>
              <h3 className="text-sm font-medium text-ink-800 group-hover:text-forest-700 transition-colors mb-2 leading-snug">{article.title}</h3>
              <p className="text-xs text-ink-400 leading-relaxed">{article.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-4 p-5 rounded-xl bg-cream-200/50 border border-cream-300/60 animate-fade-up" style={{ animationDelay: '600ms' }}>
        <div className="w-9 h-9 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4.5 h-4.5 text-forest-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-ink-800 mb-1">Full library coming in Phase 2</p>
          <p className="text-sm text-ink-400 leading-relaxed">We&apos;re curating science-backed articles on longevity, biomarkers, and lifestyle interventions.</p>
        </div>
      </div>
    </div>
  )
}
