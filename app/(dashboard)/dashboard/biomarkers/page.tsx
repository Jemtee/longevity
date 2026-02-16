import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplet } from 'lucide-react'

export const metadata = {
  title: 'Biomarkers - Wellspring',
  description: 'Track your health biomarkers over time',
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

  const categoryIcons: Record<string, string> = {
    'Metabolic': 'bg-orange-50 text-orange-600',
    'Cardiovascular': 'bg-red-50 text-red-600',
    'Inflammation': 'bg-amber-50 text-amber-600',
    'Hormones': 'bg-purple-50 text-purple-600',
    'Vitamins & Minerals': 'bg-green-50 text-green-600',
    'Kidney & Liver': 'bg-blue-50 text-blue-600',
    'Physical Performance': 'bg-cyan-50 text-cyan-600',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <Droplet className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biomarkers</h1>
          <p className="text-sm text-gray-500">Track and understand your health metrics</p>
        </div>
      </div>

      {/* Category cards */}
      {groupedBiomarkers && Object.entries(groupedBiomarkers).map(([category, markers]: [string, any], categoryIndex: number) => {
        const colorClass = categoryIcons[category] || 'bg-gray-50 text-gray-600'
        return (
          <Card
            key={category}
            className="border-gray-100 shadow-sm animate-slide-up"
            style={{ animationDelay: `${categoryIndex * 60}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass.split(' ')[0]}`}>
                  <Droplet className={`w-4 h-4 ${colorClass.split(' ')[1]}`} />
                </div>
                <div>
                  <CardTitle className="text-base">{category}</CardTitle>
                  <CardDescription className="text-xs">{markers.length} biomarkers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {markers.map((marker: any, i: number) => (
                  <div
                    key={marker.id}
                    className="group p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                          {marker.name_en}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{marker.name_sv}</p>
                      </div>
                      {marker.is_premium && (
                        <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Range visualization */}
                    {marker.reference_range_min != null && marker.reference_range_max != null && (
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-gray-400">Reference range</span>
                          <span className="text-gray-600 font-medium">
                            {marker.reference_range_min}&ndash;{marker.reference_range_max} {marker.unit}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          {marker.optimal_range_min != null && marker.optimal_range_max != null && (
                            <div
                              className="h-full rounded-full bg-green-300"
                              style={{
                                marginLeft: `${((marker.optimal_range_min - marker.reference_range_min) / (marker.reference_range_max - marker.reference_range_min)) * 100}%`,
                                width: `${((marker.optimal_range_max - marker.optimal_range_min) / (marker.reference_range_max - marker.reference_range_min)) * 100}%`,
                              }}
                            />
                          )}
                        </div>
                        {marker.optimal_range_min != null && marker.optimal_range_max != null && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-green-600">Optimal</span>
                            <span className="text-green-600 font-medium">
                              {marker.optimal_range_min}&ndash;{marker.optimal_range_max} {marker.unit}
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
