'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Droplet, Lightbulb, Target, BookOpen, LogOut, Menu, X, Leaf } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface DashboardNavProps {
  user: User
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Biomarkers', href: '/dashboard/biomarkers', icon: Droplet },
    { name: 'Insights', href: '/dashboard/insights', icon: Lightbulb },
    { name: 'Goals', href: '/dashboard/goals', icon: Target },
    { name: 'Content', href: '/dashboard/content', icon: BookOpen },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-cream-100/80 backdrop-blur-xl border-b border-cream-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center shadow-warm group-hover:shadow-warm-lg transition-shadow">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-ink-800 tracking-tight">
              Wellspring
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/'))
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-forest-50 text-forest-700 shadow-warm'
                      : 'text-ink-400 hover:text-ink-700 hover:bg-cream-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-forest-500' : ''}`} />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-forest-50 flex items-center justify-center border border-forest-200/50">
                <span className="text-xs font-semibold text-forest-700">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-ink-400 max-w-[150px] truncate">
                {user.email}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              disabled={loading}
              className="text-ink-400 hover:text-ink-700 hover:bg-cream-200/50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-1.5">{loading ? 'Signing out...' : 'Sign out'}</span>
            </Button>

            <button
              className="md:hidden p-2 rounded-xl hover:bg-cream-200/50 text-ink-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-cream-300/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/'))
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-forest-50 text-forest-700'
                        : 'text-ink-400 hover:bg-cream-200/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-forest-500' : ''}`} />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
