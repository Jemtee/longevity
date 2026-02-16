import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplet } from 'lucide-react'

export default async function BiomarkersPage() {
  const supabase = await createClient()

  const { data: biomarkers } = await supabase
    .from('biomarkers')
    .select('*, biomarker_categories(*)')
    .order('category_id')
    .order('name_en')

  // Group biomarkers by category
  const groupedBiomarkers = biomarkers?.reduce((acc: any, marker: any) => {
    const categoryName = marker.biomarker_categories?.name_en || 'Other'
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push(marker)
    return acc
  }, {})

  const categoryImages: Record<string, string> = {
    'Metabolic': 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80&fit=crop',
    'Cardiovascular': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80&fit=crop',
    'Hormonal': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&fit=crop',
    'Inflammatory': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80&fit=crop',
    'Nutritional': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&fit=crop',
    'Other': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&fit=crop',
  }

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-5 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
            <Droplet className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Biomarkers</h1>
            <p className="text-xl text-gray-600 mt-2">Track your health metrics over time</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-10">
        {groupedBiomarkers && Object.entries(groupedBiomarkers).map(([category, markers]: [string, any]) => (
          <div key={category} className="glass-card rounded-3xl overflow-hidden shadow-premium-lg">
            {/* Category Header with Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={categoryImages[category] || categoryImages['Other']}
                alt={category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/80" />
              <div className="absolute inset-0 flex items-center px-10">
                <div>
                  <h2 className="text-white font-bold mb-2">{category}</h2>
                  <p className="text-white/90 text-lg">{markers.length} biomarkers available</p>
                </div>
              </div>
            </div>

            {/* Biomarkers Grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {markers.map((marker: any) => (
                  <div
                    key={marker.id}
                    className="group relative p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-premium transition-all duration-300 cursor-pointer bg-white"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{marker.name_en}</h3>
                        <p className="text-sm text-gray-500">{marker.name_sv}</p>
                      </div>
                      {marker.is_premium && (
                        <span className="text-xs bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                          Premium
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      {marker.reference_range_min && marker.reference_range_max && (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="font-semibold text-gray-700">Reference:</span>
                          <span className="text-gray-900 font-medium">
                            {marker.reference_range_min} - {marker.reference_range_max} {marker.unit}
                          </span>
                        </div>
                      )}
                      {marker.optimal_range_min && marker.optimal_range_max && (
                        <div className="flex items-center justify-between p-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                          <span className="font-semibold text-emerald-700">Optimal:</span>
                          <span className="text-emerald-900 font-medium">
                            {marker.optimal_range_min} - {marker.optimal_range_max} {marker.unit}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
