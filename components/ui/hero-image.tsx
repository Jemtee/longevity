'use client'

import Image from 'next/image'
import { useState } from 'react'

interface HeroImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  overlay?: boolean
  overlayColor?: string
  rounded?: boolean
}

export function HeroImage({
  src,
  alt,
  className = '',
  priority = false,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.2)',
  rounded = true,
}: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${rounded ? 'rounded-3xl' : ''} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover transition-all duration-700 ${
          isLoading ? 'scale-105 blur-md' : 'scale-100 blur-0'
        }`}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: overlayColor }}
        />
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-cream-200 animate-pulse" />
      )}
    </div>
  )
}

// Curated Unsplash images for health/longevity themes
export const HERO_IMAGES = {
  // Wellness & Nature
  nordicNature: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Mountains
  morningLight: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80', // Sunrise
  forestPath: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80', // Forest
  oceanCalm: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80', // Ocean

  // Health & Vitality
  runningVitality: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80', // Running
  yogaWellness: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80', // Yoga
  healthyFood: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80', // Healthy food
  meditationPeace: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80', // Meditation

  // Abstract/Modern
  abstractGreen: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80', // Abstract gradient
  organicShapes: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80', // Organic
  lightWaves: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80', // Gradient waves

  // Science/Data
  dnaAbstract: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1200&q=80', // DNA
  labScience: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80', // Lab

  // People & Lifestyle
  happyCouple: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80', // Happy people
  activeLifestyle: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80', // Active
  contemplation: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80', // Peaceful
} as const

// Image card with glass effect
export function ImageCard({
  src,
  alt,
  children,
  className = '',
}: {
  src: string
  alt: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <HeroImage
        src={src}
        alt={alt}
        className="absolute inset-0"
        overlay
        overlayColor="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)"
        rounded={false}
      />
      {children && (
        <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
          {children}
        </div>
      )}
    </div>
  )
}

// Floating image with parallax-like effect
export function FloatingImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Shadow/glow effect */}
      <div className="absolute inset-4 bg-forest-500/20 rounded-3xl blur-2xl" />

      {/* Main image */}
      <div className="relative animate-float">
        <HeroImage
          src={src}
          alt={alt}
          className="aspect-[4/3] shadow-warm-xl"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sand-400/30 rounded-full blur-xl" />
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-forest-400/30 rounded-full blur-xl" />
    </div>
  )
}
