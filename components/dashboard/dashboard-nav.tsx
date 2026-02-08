'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Droplet, Lightbulb, Target, BookOpen } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface DashboardNavProps {
  user: User
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

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
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-primary-500">
              Wellspring
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? 'Signing out...' : 'Sign out'}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
