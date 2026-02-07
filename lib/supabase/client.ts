import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for client-side usage (browser)
 * Uses the new Supabase API key format (sb_publishable_*)
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
