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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Droplet className="w-8 h-8 text-primary-500" />
        <div>
          <h1 className="text-3xl font-bold">Biomarkers</h1>
          <p className="text-gray-600">Track your health metrics over time</p>
        </div>
      </div>

      {groupedBiomarkers && Object.entries(groupedBiomarkers).map(([category, markers]: [string, any]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
            <CardDescription>{markers.length} biomarkers available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {markers.map((marker: any) => (
                <div
                  key={marker.id}
                  className="p-4 border rounded-lg hover:border-primary-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{marker.name_en}</h3>
                      <p className="text-xs text-gray-500 mt-1">{marker.name_sv}</p>
                    </div>
                    {marker.is_premium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-gray-600 space-y-1">
                    {marker.reference_range_min && marker.reference_range_max && (
                      <div>
                        <span className="font-medium">Reference:</span>{' '}
                        {marker.reference_range_min} - {marker.reference_range_max} {marker.unit}
                      </div>
                    )}
                    {marker.optimal_range_min && marker.optimal_range_max && (
                      <div>
                        <span className="font-medium text-green-600">Optimal:</span>{' '}
                        {marker.optimal_range_min} - {marker.optimal_range_max} {marker.unit}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
