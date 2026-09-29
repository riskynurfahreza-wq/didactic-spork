/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        leaf: {
          DEFAULT: '#4A7C59',
          dark: '#375E43',
          light: '#6E9A7B',
        },
        cream: '#F5F1E8',
        terracotta: {
          DEFAULT: '#C97B5B',
          dark: '#A85F42',
        },
        sand: '#E8E2D6',
        ink: '#2E2A22',
        inkmuted: '#6B6455',
      },
      fontFamily: {
        serif: ['"Spectral"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Karla"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        organic: '1.75rem',
      },
      boxShadow: {
        soft: '0 8px 24px -12px rgba(46, 42, 34, 0.18)',
        card: '0 4px 14px -6px rgba(46, 42, 34, 0.14)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(0.72)', opacity: '0.65' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        breathe: 'breathe 8s ease-in-out infinite',
        rise: 'rise 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
