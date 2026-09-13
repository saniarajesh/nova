/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#04050d',
          900: '#070919',
          800: '#0f1430',
          700: '#19204a',
        },
        nova: {
          violet: '#8b5cf6',
          purple: '#a855f7',
          cyan: '#06b6d4',
          electric: '#00f2ff',
          pink: '#f43f5e',
          gold: '#fbbf24',
        }
      },
      fontFamily: {
        sans: ['"Times New Roman"', 'Times', 'serif'],
        display: ['"Times New Roman"', 'Times', 'serif'],
        cinzel: ['"Times New Roman"', 'Times', 'serif'],
        'cinzel-dec': ['"Times New Roman"', 'Times', 'serif'],
        serif: ['"Times New Roman"', 'Times', 'serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'breathe': 'breathe 6s ease-in-out infinite',
        'sway': 'sway 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-rev 25s linear infinite',
        'star-pulse': 'starPulse 2.5s ease-in-out infinite',
        'mist-drift': 'mistDrift 18s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1) translateY(0px)' },
          '50%': { transform: 'scale(1.018) translateY(-6px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '33%': { transform: 'rotate(0.8deg)' },
          '66%': { transform: 'rotate(-0.8deg)' },
        },
        'spin-rev': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        starPulse: {
          '0%, 100%': { transform: 'scale(0.92)', opacity: '0.85', filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.8))' },
          '50%': { transform: 'scale(1.15)', opacity: '1', filter: 'drop-shadow(0 0 35px rgba(251, 191, 36, 1)) drop-shadow(0 0 60px rgba(225, 29, 72, 0.9))' },
        },
        mistDrift: {
          '0%': { transform: 'translateX(-5%) scale(1)' },
          '100%': { transform: 'translateX(5%) scale(1.08)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.7))' },
        }
      },
      backgroundImage: {
        'glass-radial': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(7, 9, 25, 0) 70%)',
        'hero-gradient': 'radial-gradient(ellipse at center top, rgba(99, 102, 241, 0.18), rgba(7, 9, 25, 0.95))',
        'crimson-radial': 'radial-gradient(circle at 50% 50%, rgba(185, 28, 28, 0.25) 0%, rgba(10, 2, 4, 0.95) 100%)',
      }
    },
  },
  plugins: [],
}
