'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowLeft, Leaf } from 'lucide-react'

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
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/update-password` })
      if (resetError) throw resetError
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred while resetting password')
    } finally { setLoading(false) }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 p-4">
        <div className="w-full max-w-sm animate-scale-in">
          <div className="card-elevated p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-forest-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-forest-500" />
            </div>
            <h1 className="text-xl font-display font-semibold text-ink-800 mb-2">Check your email</h1>
            <p className="text-sm text-ink-400 mb-1">We&apos;ve sent a reset link to</p>
            <p className="text-sm font-medium text-ink-700 mb-4">{email}</p>
            <p className="text-xs text-ink-300 mb-6">The link will expire in 1 hour.</p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-cream-300 hover:bg-cream-100 text-ink-600" onClick={() => setSuccess(false)}>Send another link</Button>
              <Link href="/login" className="block text-sm text-forest-600 hover:text-forest-700 font-medium">Back to sign in</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100 p-4 relative overflow-hidden">
      <div className="blob-accent w-[350px] h-[350px] bg-forest-500 -top-24 right-0 fixed" />

      <div className="w-full max-w-sm animate-fade-up relative">
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-lg bg-forest-500 flex items-center justify-center shadow-warm">
            <Leaf className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-2xl font-display font-bold text-ink-800 tracking-tight">Wellspring</span>
        </div>

        <div className="card-elevated p-8">
          <div className="text-center mb-7">
            <h1 className="text-xl font-display font-semibold text-ink-800">Reset password</h1>
            <p className="text-sm text-ink-400 mt-1.5">Enter your email to receive a reset link</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-ink-600">Email</label>
              <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3.5 py-2.5 text-sm" />
            </div>
            {error && <div className="p-3 text-sm text-terra-500 bg-terra-400/10 border border-terra-400/20 rounded-xl">{error}</div>}
            <Button type="submit" className="w-full h-11 bg-forest-500 hover:bg-forest-600 text-white font-medium shadow-warm" disabled={loading}>
              {loading ? 'Sending link...' : 'Send reset link'}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
