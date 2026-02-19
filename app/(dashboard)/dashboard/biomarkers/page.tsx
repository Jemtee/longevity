import { createClient } from '@/lib/supabase/server'
import { Droplet, Activity, Heart, Flame, FlaskConical, Sun, Dumbbell, Brain } from 'lucide-react'

const categoryConfig: Record<string, { icon: any; color: string; bg: string; bar: string }> = {
  'Metabolic': { icon: Flame, color: 'text-sand-600', bg: 'bg-sand-50', bar: 'bg-sand-400' },
  'Cardiovascular': { icon: Heart, color: 'text-terra-400', bg: 'bg-terra-400/10', bar: 'bg-terra-400' },
  'Hormonal': { icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50', bar: 'bg-purple-400' },
  'Inflammatory': { icon: Activity, color: 'text-sand-500', bg: 'bg-sand-50', bar: 'bg-sand-400' },
  'Nutritional': { icon: Sun, color: 'text-forest-500', bg: 'bg-forest-50', bar: 'bg-forest-400' },
  'Kidney & Liver': { icon: FlaskConical, color: 'text-teal-600', bg: 'bg-teal-50', bar: 'bg-teal-400' },
  'Physical Performance': { icon: Dumbbell, color: 'text-forest-600', bg: 'bg-forest-50', bar: 'bg-forest-500' },
}

export default async function BiomarkersPage() {
  const supabase = await createClient()
  const { data: biomarkers } = await supabase.from('biomarkers').select('*, biomarker_categories(*)').order('category_id').order('name_en')

  const groupedBiomarkers = biomarkers?.reduce((acc: any, marker: any) => {
    const categoryName = marker.biomarker_categories?.name_en || 'Other'
    if (!acc[categoryName]) acc[categoryName] = []
    acc[categoryName].push(marker)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 animate-fade-up">
        <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center">
          <Droplet className="w-5 h-5 text-forest-500" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink-800">Biomarkers</h1>
          <p className="text-sm text-ink-400">Track your health metrics over time</p>
        </div>
      </div>

      {groupedBiomarkers && Object.entries(groupedBiomarkers).map(([category, markers]: [string, any], catIdx) => {
        const config = categoryConfig[category] || { icon: Droplet, color: 'text-ink-500', bg: 'bg-cream-200', bar: 'bg-ink-300' }
        const Icon = config.icon
        return (
          <div key={category} className="card-elevated p-6 animate-fade-up" style={{ animationDelay: `${80 + catIdx * 60}ms` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.bg}`}>
                <Icon className={`w-4.5 h-4.5 ${config.color}`} />
              </div>
              <div>
                <h2 className="text-base font-display font-semibold text-ink-800">{category}</h2>
                <p className="text-xs text-ink-400">{markers.length} biomarker{markers.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {markers.map((marker: any) => (
                <div key={marker.id} className="group p-4 rounded-xl border border-cream-300/60 hover:border-forest-200 hover:shadow-warm transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-ink-800 truncate">{marker.name_en}</h3>
                      <p className="text-xs text-ink-300 mt-0.5">{marker.name_sv}</p>
                    </div>
                    {marker.is_premium && (
                      <span className="text-[10px] font-medium text-sand-700 bg-sand-50 px-1.5 py-0.5 rounded-full flex-shrink-0 ml-2">Premium</span>
                    )}
                  </div>
                  {marker.reference_range_min != null && marker.reference_range_max != null && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink-300">{marker.reference_range_min}</span>
                        <span className="text-ink-500 font-medium">{marker.unit}</span>
                        <span className="text-ink-300">{marker.reference_range_max}</span>
                      </div>
                      <div className="relative h-1.5 rounded-full bg-cream-200 overflow-hidden">
                        {marker.optimal_range_min != null && marker.optimal_range_max != null && (
                          <div className={`absolute h-full rounded-full ${config.bar} opacity-60`} style={{
                            marginLeft: `${((marker.optimal_range_min - marker.reference_range_min) / (marker.reference_range_max - marker.reference_range_min)) * 100}%`,
                            width: `${((marker.optimal_range_max - marker.optimal_range_min) / (marker.reference_range_max - marker.reference_range_min)) * 100}%`,
                          }} />
                        )}
                      </div>
                      {marker.optimal_range_min != null && marker.optimal_range_max != null && (
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${config.bar} opacity-60`} />
                          <span className="text-[10px] text-ink-400">Optimal: {marker.optimal_range_min}&ndash;{marker.optimal_range_max} {marker.unit}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
