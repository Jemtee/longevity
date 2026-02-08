import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary-500" />
          <div>
            <h1 className="text-3xl font-bold">Content Library</h1>
            <p className="text-gray-600">Learn about longevity science and optimize your health</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, biomarkers, or topics..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Getting Started', 'Metabolic Health', 'Cardiovascular', 'Longevity Science'].map((category) => (
          <Card key={category} className="hover:border-primary-500 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <h3 className="font-medium">{category}</h3>
              <p className="text-sm text-gray-500 mt-1">12 articles</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Articles Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Articles</CardTitle>
          <CardDescription>Curated content to help you on your longevity journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleArticles.map((article) => (
              <div
                key={article.title}
                className="p-4 border rounded-lg hover:border-primary-500 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="font-medium mb-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
                <Button variant="ghost" size="sm" className="w-full">
                  Read More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary-200 bg-gradient-to-br from-primary-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <BookOpen className="w-10 h-10 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-2">Content library coming in Phase 2</h3>
              <p className="text-sm text-gray-600">
                We're curating high-quality, science-backed articles on longevity biomarkers, lifestyle interventions,
                and cutting-edge research. This preview shows what you can expect!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
