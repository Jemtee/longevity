'use client'

// Abstract, warm illustrations for the health dashboard
// Inspired by Headspace's playful but sophisticated style

export function WellnessHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background blobs */}
      <ellipse cx="200" cy="150" rx="180" ry="120" fill="#F0F7F4" />
      <ellipse cx="280" cy="180" rx="80" ry="60" fill="#D8EDE3" opacity="0.6" />
      <ellipse cx="100" cy="120" rx="60" ry="50" fill="#FDF8F3" opacity="0.8" />

      {/* Abstract person figure - flowing, organic shape */}
      <path
        d="M200 80 C220 80 240 100 240 130 C240 160 220 180 200 200 C180 180 160 160 160 130 C160 100 180 80 200 80Z"
        fill="#2D6A4F"
        opacity="0.9"
      />

      {/* Heart pulse line */}
      <path
        d="M80 160 L120 160 L140 120 L160 200 L180 140 L200 160 L320 160"
        stroke="#52A67F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Floating wellness elements */}
      <circle cx="320" cy="100" r="20" fill="#D4A373" opacity="0.6" />
      <circle cx="80" cy="200" r="15" fill="#84C4A7" opacity="0.7" />
      <circle cx="340" cy="200" r="12" fill="#E5BF99" opacity="0.5" />

      {/* Leaf motif */}
      <path
        d="M290 70 C300 60 320 60 330 80 C340 100 330 120 310 120 C290 120 280 100 290 80Z"
        fill="#2D6A4F"
        opacity="0.3"
      />
    </svg>
  )
}

export function GoalProgressIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Target rings */}
      <circle cx="60" cy="60" r="50" stroke="#EBE4DA" strokeWidth="2" fill="none" />
      <circle cx="60" cy="60" r="35" stroke="#D8EDE3" strokeWidth="2" fill="none" />
      <circle cx="60" cy="60" r="20" stroke="#84C4A7" strokeWidth="3" fill="none" />

      {/* Center dot */}
      <circle cx="60" cy="60" r="8" fill="#2D6A4F" />

      {/* Arrow hitting target */}
      <path
        d="M95 25 L70 50 M95 25 L85 25 M95 25 L95 35"
        stroke="#D4A373"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BiomarkerIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* DNA helix simplified */}
      <path
        d="M40 20 C60 30 80 30 100 20 M40 40 C60 50 80 50 100 40 M40 60 C60 70 80 70 100 60 M40 80 C60 90 80 90 100 80 M40 100 C60 110 80 110 100 100"
        stroke="#84C4A7"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Connection dots */}
      <circle cx="40" cy="20" r="4" fill="#2D6A4F" />
      <circle cx="100" cy="20" r="4" fill="#D4A373" />
      <circle cx="40" cy="60" r="4" fill="#2D6A4F" />
      <circle cx="100" cy="60" r="4" fill="#D4A373" />
      <circle cx="40" cy="100" r="4" fill="#2D6A4F" />
      <circle cx="100" cy="100" r="4" fill="#D4A373" />
    </svg>
  )
}

export function InsightIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Light bulb shape */}
      <path
        d="M60 20 C40 20 25 40 25 60 C25 75 35 85 45 95 L75 95 C85 85 95 75 95 60 C95 40 80 20 60 20Z"
        fill="#FDF8F3"
        stroke="#D4A373"
        strokeWidth="2"
      />

      {/* Filament */}
      <path
        d="M50 60 C55 55 65 55 70 60 C75 65 65 75 60 70 C55 65 55 65 50 60Z"
        stroke="#2D6A4F"
        strokeWidth="2"
        fill="none"
      />

      {/* Base */}
      <rect x="45" y="95" width="30" height="15" rx="3" fill="#EBE4DA" />

      {/* Rays */}
      <path d="M60 5 L60 12" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 30 L36 36" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 30 L84 36" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 60 L22 60" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
      <path d="M105 60 L98 60" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function EmptyStateIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft background shape */}
      <ellipse cx="100" cy="80" rx="90" ry="70" fill="#F0F7F4" />

      {/* Clipboard */}
      <rect x="60" y="30" width="80" height="100" rx="8" fill="white" stroke="#EBE4DA" strokeWidth="2" />
      <rect x="85" y="22" width="30" height="16" rx="4" fill="#D8EDE3" />

      {/* Lines on clipboard */}
      <rect x="75" y="55" width="50" height="4" rx="2" fill="#EBE4DA" />
      <rect x="75" y="70" width="40" height="4" rx="2" fill="#EBE4DA" />
      <rect x="75" y="85" width="45" height="4" rx="2" fill="#EBE4DA" />
      <rect x="75" y="100" width="35" height="4" rx="2" fill="#EBE4DA" />

      {/* Decorative elements */}
      <circle cx="160" cy="50" r="15" fill="#D4A373" opacity="0.3" />
      <circle cx="40" cy="100" r="10" fill="#84C4A7" opacity="0.4" />

      {/* Plus sign */}
      <path
        d="M100 115 L100 135 M90 125 L110 125"
        stroke="#2D6A4F"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function JourneyPathIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Winding path */}
      <path
        d="M20 50 C60 20 100 80 150 50 C200 20 240 80 290 50 C340 20 380 50 380 50"
        stroke="#D8EDE3"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Milestone dots */}
      <circle cx="20" cy="50" r="8" fill="#2D6A4F" />
      <circle cx="150" cy="50" r="6" fill="#84C4A7" />
      <circle cx="290" cy="50" r="6" fill="#84C4A7" />
      <circle cx="380" cy="50" r="10" fill="#D4A373" stroke="#2D6A4F" strokeWidth="2" />

      {/* Flag at end */}
      <path d="M380 40 L380 25 L395 30 L380 35" fill="#2D6A4F" />
    </svg>
  )
}
