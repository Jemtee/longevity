'use client'

// Step-specific illustrations for the onboarding flow

export function WelcomeIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft background */}
      <ellipse cx="150" cy="100" rx="140" ry="90" fill="#F0F7F4" />

      {/* Person silhouette - abstract, welcoming */}
      <circle cx="150" cy="65" r="30" fill="#2D6A4F" opacity="0.9" />
      <path
        d="M110 110 C110 95 130 90 150 90 C170 90 190 95 190 110 L190 150 C190 160 180 170 150 170 C120 170 110 160 110 150 Z"
        fill="#2D6A4F"
        opacity="0.8"
      />

      {/* Radiating wellness elements */}
      <circle cx="70" cy="60" r="12" fill="#D4A373" opacity="0.5" />
      <circle cx="230" cy="60" r="15" fill="#84C4A7" opacity="0.6" />
      <circle cx="50" cy="130" r="10" fill="#E5BF99" opacity="0.4" />
      <circle cx="250" cy="130" r="8" fill="#52A67F" opacity="0.5" />

      {/* Heart beat line around */}
      <path
        d="M30 100 L60 100 L70 80 L85 120 L100 100 L120 100"
        stroke="#84C4A7"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M180 100 L200 100 L210 80 L225 120 L240 100 L270 100"
        stroke="#84C4A7"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}

export function GoalSelectionIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <ellipse cx="150" cy="100" rx="130" ry="85" fill="#FDF8F3" />

      {/* Target/Bullseye */}
      <circle cx="150" cy="100" r="70" stroke="#EBE4DA" strokeWidth="3" fill="none" />
      <circle cx="150" cy="100" r="50" stroke="#D8EDE3" strokeWidth="3" fill="none" />
      <circle cx="150" cy="100" r="30" stroke="#84C4A7" strokeWidth="4" fill="none" />
      <circle cx="150" cy="100" r="12" fill="#2D6A4F" />

      {/* Arrow hitting target */}
      <path
        d="M230 40 L165 95"
        stroke="#D4A373"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <polygon points="165,95 175,85 180,100" fill="#D4A373" />

      {/* Feathers on arrow */}
      <path d="M230 40 L240 35 M230 40 L240 45 M230 40 L235 30" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />

      {/* Sparkles */}
      <circle cx="70" cy="70" r="5" fill="#E5BF99" opacity="0.6" />
      <circle cx="240" cy="150" r="6" fill="#84C4A7" opacity="0.5" />
    </svg>
  )
}

export function HealthFocusIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <ellipse cx="150" cy="100" rx="130" ry="85" fill="#F0F7F4" />

      {/* Body outline - abstract */}
      <path
        d="M150 30 C120 30 100 60 100 100 C100 140 120 170 150 170 C180 170 200 140 200 100 C200 60 180 30 150 30"
        stroke="#84C4A7"
        strokeWidth="2"
        fill="none"
        strokeDasharray="8 4"
      />

      {/* Health focus areas as glowing points */}
      {/* Heart */}
      <circle cx="130" cy="80" r="15" fill="#2D6A4F" opacity="0.8" />
      <path d="M125 80 L128 77 L132 83 L138 73 L142 80" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Brain/Mind */}
      <circle cx="150" cy="50" r="12" fill="#D4A373" opacity="0.7" />

      {/* Gut */}
      <ellipse cx="150" cy="120" rx="18" ry="12" fill="#52A67F" opacity="0.6" />

      {/* Energy/Vitality */}
      <circle cx="175" cy="90" r="10" fill="#E5BF99" opacity="0.7" />
      <path d="M172 90 L175 85 L178 90 L175 95 Z" fill="#D4A373" />

      {/* Connection lines */}
      <path d="M130 80 L150 50" stroke="#EBE4DA" strokeWidth="1" />
      <path d="M150 50 L175 90" stroke="#EBE4DA" strokeWidth="1" />
      <path d="M175 90 L150 120" stroke="#EBE4DA" strokeWidth="1" />
      <path d="M150 120 L130 80" stroke="#EBE4DA" strokeWidth="1" />
    </svg>
  )
}

export function HabitsIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="20" y="20" width="260" height="160" rx="20" fill="#FDF8F3" />

      {/* Calendar/Habit tracker grid */}
      {[0, 1, 2, 3, 4, 5, 6].map((col) => (
        [0, 1, 2, 3].map((row) => {
          const filled = Math.random() > 0.3
          return (
            <rect
              key={`${col}-${row}`}
              x={50 + col * 30}
              y={40 + row * 35}
              width={22}
              height={22}
              rx={5}
              fill={filled ? '#2D6A4F' : '#EBE4DA'}
              opacity={filled ? 0.8 : 0.4}
            />
          )
        })
      ))}

      {/* Streak flame icon */}
      <path
        d="M260 50 C255 60 250 55 250 65 C250 80 265 85 265 70 C270 80 280 75 275 60 C270 50 265 45 260 50"
        fill="#D4A373"
        opacity="0.8"
      />

      {/* Check marks on some cells */}
      <path d="M58 52 L63 57 L72 48" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M88 87 L93 92 L102 83" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function SuccessIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Celebration background */}
      <ellipse cx="150" cy="100" rx="140" ry="95" fill="#F0F7F4" />

      {/* Central checkmark in circle */}
      <circle cx="150" cy="100" r="50" fill="#2D6A4F" />
      <path
        d="M125 100 L142 117 L178 81"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Confetti/celebration particles */}
      <circle cx="70" cy="50" r="6" fill="#D4A373" opacity="0.7" />
      <circle cx="230" cy="60" r="8" fill="#84C4A7" opacity="0.6" />
      <circle cx="50" cy="130" r="5" fill="#E5BF99" opacity="0.6" />
      <circle cx="250" cy="140" r="7" fill="#52A67F" opacity="0.5" />
      <circle cx="100" cy="170" r="4" fill="#D4A373" opacity="0.5" />
      <circle cx="200" cy="30" r="5" fill="#84C4A7" opacity="0.7" />

      {/* Star bursts */}
      <path d="M80 80 L85 75 L90 80 L85 85 Z" fill="#E5BF99" />
      <path d="M220 120 L225 115 L230 120 L225 125 Z" fill="#D4A373" />

      {/* Radiating lines */}
      <path d="M150 35 L150 25" stroke="#84C4A7" strokeWidth="2" strokeLinecap="round" />
      <path d="M200 55 L210 45" stroke="#84C4A7" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 55 L90 45" stroke="#84C4A7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
