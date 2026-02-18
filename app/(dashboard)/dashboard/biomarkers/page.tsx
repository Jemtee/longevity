import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Droplet, Activity, Heart, Flame, FlaskConical, Sun, Dumbbell, Brain } from 'lucide-react'

const categoryConfig: Record<string, { icon: any; color: string; bg: string }> = {
  'Metabolic': { icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
  'Cardiovascular': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
  'Hormonal': { icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' },
  'Inflammatory': { icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
  'Nutritional': { icon: Sun, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  'Kidney & Liver': { icon: FlaskConical, color: 'text-teal-600', bg: 'bg-teal-50' },
  'Physical Performance': { icon: Dumbbell, color: 'text-blue-600', bg: 'bg-blue-50' },
}

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <Droplet className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biomarkers</h1>
          <p className="text-sm text-gray-500">Track your health metrics over time</p>
        </div>
      </div>

      {/* Categories */}
      {groupedBiomarkers && Object.entries(groupedBiomarkers).map(([category, markers]: [string, any], catIdx) => {
        const config = categoryConfig[category] || { icon: Droplet, color: 'text-gray-600', bg: 'bg-gray-50' }
        const Icon = config.icon

        return (
          <Card
            key={category}
            className="border-gray-100 shadow-sm animate-slide-up"
            style={{ animationDelay: `${50 + catIdx * 50}ms` }}
          >
            <CardContent className="p-6">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.bg}`}>
                  <Icon className={`w-4.5 h-4.5 ${config.color}`} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{category}</h2>
                  <p className="text-xs text-gray-500">{markers.length} biomarker{markers.length > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Biomarker Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {markers.map((marker: any) => (
                  <div
                    key={marker.id}
                    className="group p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{marker.name_en}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{marker.name_sv}</p>
                      </div>
                      {marker.is_premium && (
                        <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full flex-shrink-0 ml-2">
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Range visualization */}
                    {marker.reference_range_min != null && marker.reference_range_max != null && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{marker.reference_range_min}</span>
                          <span className="text-gray-500 font-medium">{marker.unit}</span>
                          <span className="text-gray-400">{marker.reference_range_max}</span>
                        </div>
                        <div className="relative h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          {marker.optimal_range_min != null && marker.optimal_range_max != null && (
                            <div
                              className="absolute h-full rounded-full bg-green-300"
                              style={{
                                marginLeft: `${((marker.optimal_range_min - marker.reference_range_min) / (marker.reference_range_max - marker.reference_range_min)) * 100}%`,
                                width: `${((marker.optimal_range_max - marker.optimal_range_min) / (marker.reference_range_max - marker.reference_range_min)) * 100}%`,
                              }}
                            />
                          )}
                        </div>
                        {marker.optimal_range_min != null && marker.optimal_range_max != null && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-300" />
                            <span className="text-[10px] text-gray-500">
                              Optimal: {marker.optimal_range_min}&ndash;{marker.optimal_range_max} {marker.unit}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
