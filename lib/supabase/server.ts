import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Supabase client for server-side usage (Server Components, API Routes)
 * Uses the new Supabase API key format (sb_publishable_*)
 *
 * Important: The new API keys are NOT JWTs and should not be used
 * in Authorization headers. User authentication is handled via cookies.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Admin client for server-side operations that bypass RLS
 * Uses the secret key (sb_secret_*)
 *
 * WARNING: Use with caution! This bypasses Row Level Security.
 * Only use for admin operations, migrations, or background jobs.
 */
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // Admin client doesn't need cookies
        },
      },
    }
  )
}
