'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (resetError) throw resetError

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred while resetting password')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
        <div className="w-full max-w-sm animate-scale-in">
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="pt-8 pb-6 px-7 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-semibold text-gray-900">Check your email</h1>
                <p className="text-sm text-gray-500">
                  We&apos;ve sent a reset link to <span className="font-medium text-gray-700">{email}</span>
                </p>
              </div>
              <p className="text-xs text-gray-400">The link will expire in 1 hour.</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pb-7 px-7">
              <Button
                variant="outline"
                className="w-full border-gray-200"
                onClick={() => setSuccess(false)}
              >
                Send another link
              </Button>
              <Link href="/login" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Back to sign in
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">W</span>
          </div>
          <span className="text-2xl font-display font-bold text-gray-900 tracking-tight">
            Wellspring
          </span>
        </div>

        <Card className="border-gray-100 shadow-sm">
          <CardContent className="pt-8 pb-6 px-7 space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-xl font-semibold text-gray-900">Reset password</h1>
              <p className="text-sm text-gray-500">Enter your email to receive a reset link</p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-10" disabled={loading}>
                {loading ? 'Sending link...' : 'Send reset link'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center pb-7">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
