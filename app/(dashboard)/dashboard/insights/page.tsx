import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Sparkles } from 'lucide-react'

export default async function InsightsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="w-8 h-8 text-primary-500" />
        <div>
          <h1 className="text-3xl font-bold">AI Insights</h1>
          <p className="text-gray-600">Personalized recommendations based on your data</p>
        </div>
      </div>

      <Card className="border-primary-200 bg-gradient-to-br from-primary-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>
            AI-powered insights will analyze your biomarker data and provide personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border">
              <h3 className="font-medium mb-2">What you'll get:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Personalized analysis of your biomarker trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Science-backed recommendations for improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Early warnings for concerning patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Lifestyle adjustments tailored to your goals</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-500">
              This feature will be available in Phase 3 of development. Track biomarkers now to get the most value
              when insights launch!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
