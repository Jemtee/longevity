/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEFDFB',
          100: '#FAF8F5',
          200: '#F5F0EA',
          300: '#EBE4DA',
          400: '#DDD3C5',
        },
        forest: {
          50: '#F0F7F4',
          100: '#D8EDE3',
          200: '#B4DBC9',
          300: '#84C4A7',
          400: '#52A67F',
          500: '#2D6A4F',
          600: '#245740',
          700: '#1E4534',
          800: '#19372A',
          900: '#142C22',
        },
        sand: {
          50: '#FDF8F3',
          100: '#F9EDE0',
          200: '#F0D9C1',
          300: '#E5BF99',
          400: '#D4A373',
          500: '#C48B56',
          600: '#A97243',
          700: '#8C5C38',
          800: '#6F4A2E',
          900: '#5A3D27',
        },
        terra: {
          400: '#E76F51',
          500: '#D65E3F',
          600: '#BE4D30',
        },
        ink: {
          50: '#F8F8F8',
          100: '#E8E8E8',
          200: '#D0D0D0',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#3D3D3D',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0F0F0F',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-md': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'warm': '0 1px 2px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'warm-lg': '0 2px 4px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(0, 0, 0, 0.05)',
        'warm-xl': '0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 40px rgba(0, 0, 0, 0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'glow-sm': '0 0 20px rgba(45, 106, 79, 0.15)',
        'glow-md': '0 0 40px rgba(45, 106, 79, 0.2)',
        'glow-lg': '0 0 60px rgba(45, 106, 79, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dot-pattern': 'radial-gradient(circle, var(--dot-color, rgba(45, 106, 79, 0.15)) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '16px 16px',
        'dot-md': '24px 24px',
        'dot-lg': '32px 32px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(45, 106, 79, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(45, 106, 79, 0.4)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slide-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slide-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'draw-line': 'draw-line 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
