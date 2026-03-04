import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/dashboard/dashboard-nav'
import { DotGridCSS } from '@/components/ui/dot-grid'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-cream-100 relative">
      {/* Ambient dot grid background */}
      <DotGridCSS
        className="fixed inset-0 z-0"
        size={1}
        gap={32}
        color="rgba(45, 106, 79, 0.06)"
      />

      {/* Gradient mesh overlay */}
      <div className="fixed inset-0 z-0 mesh-gradient pointer-events-none opacity-60" />

      {/* Content */}
      <div className="relative z-10">
        <DashboardNav user={user} />
        <main className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  )
}
