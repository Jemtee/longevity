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
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'warm': '0 1px 2px rgba(26, 26, 26, 0.04), 0 4px 12px rgba(26, 26, 26, 0.03)',
        'warm-lg': '0 2px 4px rgba(26, 26, 26, 0.04), 0 8px 24px rgba(26, 26, 26, 0.06)',
        'warm-xl': '0 4px 8px rgba(26, 26, 26, 0.04), 0 16px 40px rgba(26, 26, 26, 0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'draw-line': 'draw-line 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
