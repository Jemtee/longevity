import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard - Wellspring',
  description: 'Your longevity health dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  // Count test results
  const { count: testResultsCount } = await supabase
    .from('test_results')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  // Count unread insights
  const { count: unreadInsightsCount } = await supabase
    .from('ai_insights')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)
    .is('read_at', null)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold text-gray-900">
          Welcome back! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Your longevity dashboard is ready. Let's track your health journey.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-600">
              {testResultsCount || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Biomarker measurements recorded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              New Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {unreadInsightsCount || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              AI-powered recommendations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 capitalize">
              {profile?.subscription_tier || 'Free'}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {profile?.subscription_tier === 'premium'
                ? 'All features unlocked'
                : 'Upgrade for unlimited access'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Quick Actions</CardTitle>
          <CardDescription>
            Get started with tracking your health biomarkers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/biomarkers/add">
              <Button className="w-full h-auto py-6 flex flex-col items-center gap-2">
                <span className="text-2xl">➕</span>
                <span className="font-semibold">Add Test Result</span>
                <span className="text-xs opacity-90">
                  Manually enter biomarker values
                </span>
              </Button>
            </Link>

            <Link href="/upload">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2">
                <span className="text-2xl">📄</span>
                <span className="font-semibold">Upload Lab Report</span>
                <span className="text-xs opacity-75">
                  Auto-extract data from PDF
                </span>
              </Button>
            </Link>

            <Link href="/content">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2">
                <span className="text-2xl">📚</span>
                <span className="font-semibold">Browse Content</span>
                <span className="text-xs opacity-75">
                  Learn about longevity science
                </span>
              </Button>
            </Link>

            <Link href="/goals">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold">Set Goals</span>
                <span className="text-xs opacity-75">
                  Track your health targets
                </span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      {(!testResultsCount || testResultsCount === 0) && (
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <CardTitle className="font-display text-primary-900">
              Getting Started with Wellspring
            </CardTitle>
            <CardDescription className="text-primary-700">
              Follow these steps to get the most out of your longevity dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold mr-3 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-primary-900">Add your first biomarker</strong>
                  <p className="text-primary-700">
                    Start with common markers like HbA1c, cholesterol, or vitamin D
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold mr-3 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-primary-900">Get AI-powered insights</strong>
                  <p className="text-primary-700">
                    Receive personalized recommendations based on your data
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold mr-3 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-primary-900">Track your progress</strong>
                  <p className="text-primary-700">
                    Watch trends over time and celebrate improvements
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
