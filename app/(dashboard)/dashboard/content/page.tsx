import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Search, Clock } from 'lucide-react'

export const metadata = {
  title: 'Content - Wellspring',
  description: 'Learn about longevity science',
}

export default async function ContentPage() {
  const sampleArticles = [
    {
      title: 'Understanding HbA1c: Your Key to Metabolic Health',
      category: 'Metabolic Health',
      readTime: '5 min',
      excerpt: 'Learn what HbA1c measures and why it\'s one of the most important longevity biomarkers.',
    },
    {
      title: 'Optimizing Vitamin D for Longevity',
      category: 'Vitamins & Minerals',
      readTime: '7 min',
      excerpt: 'Discover the optimal Vitamin D levels and how to achieve them through diet and supplementation.',
    },
    {
      title: 'The Truth About LDL Cholesterol',
      category: 'Cardiovascular',
      readTime: '8 min',
      excerpt: 'Beyond the numbers: understanding particle size, oxidation, and what really matters for heart health.',
    },
    {
      title: 'Inflammation and Aging: The hs-CRP Connection',
      category: 'Inflammation',
      readTime: '6 min',
      excerpt: 'Why chronic inflammation accelerates aging and how to monitor it with hs-CRP testing.',
    },
    {
      title: 'Building Your Longevity Stack',
      category: 'Lifestyle',
      readTime: '10 min',
      excerpt: 'A comprehensive guide to supplements, diet, and lifestyle interventions backed by science.',
    },
    {
      title: 'How to Read Your Blood Test Results',
      category: 'Getting Started',
      readTime: '12 min',
      excerpt: 'A beginner\'s guide to understanding your biomarker results and what they mean for your health.',
    },
  ]

  const categories = [
    { name: 'Getting Started', count: 6, color: 'bg-blue-50 text-blue-700' },
    { name: 'Metabolic Health', count: 8, color: 'bg-orange-50 text-orange-700' },
    { name: 'Cardiovascular', count: 7, color: 'bg-red-50 text-red-700' },
    { name: 'Longevity Science', count: 12, color: 'bg-green-50 text-green-700' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
          <p className="text-sm text-gray-500">Learn about longevity science</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative animate-fade-in" style={{ animationDelay: '50ms' }}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles, biomarkers, or topics..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group p-4 rounded-xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all duration-200 cursor-pointer text-center"
          >
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors">{cat.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{cat.count} articles</p>
          </div>
        ))}
      </div>

      {/* Articles */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleArticles.map((article, i) => (
            <Card
              key={article.title}
              className="group border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 cursor-pointer animate-slide-up overflow-hidden"
              style={{ animationDelay: `${150 + i * 50}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{article.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Phase 2 notice */}
      <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50/80 border border-gray-100 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4.5 h-4.5 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">Full library coming in Phase 2</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            We&apos;re curating science-backed articles on longevity, biomarkers, and lifestyle interventions.
          </p>
        </div>
      </div>
    </div>
  )
}
