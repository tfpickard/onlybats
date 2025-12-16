import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cave: {
          darkest: '#0a0a0a',
          dark: '#1a1a1a',
          medium: '#2a2a2a',
          light: '#3a3a3a',
        },
        bat: {
          primary: '#8b5cf6',
          secondary: '#a78bfa',
          glow: '#c4b5fd',
        },
        guano: {
          dark: '#78350f',
          medium: '#92400e',
          light: '#a16207',
        },
      },
      animation: {
        'flap': 'flap 0.3s ease-in-out infinite',
        'sonar-pulse': 'sonarPulse 2s ease-out infinite',
      },
      keyframes: {
        flap: {
          '0%, 100%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(0.8)' },
        },
        sonarPulse: {
          '0%': { opacity: '0.8', transform: 'scale(0)' },
          '100%': { opacity: '0', transform: 'scale(2)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
