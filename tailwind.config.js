/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        saffron: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdca8',
          300: '#ffc371',
          400: '#ffa038',
          500: '#ff8210',
          600: '#f06307',
          700: '#c74808',
          800: '#9e390f',
          900: '#7f3110',
          950: '#451606'
        },
        forest: {
          50: '#f2f9f2',
          100: '#e0f2e1',
          200: '#c2e5c4',
          300: '#93d097',
          400: '#5cb362',
          500: '#369a3d',
          600: '#267a2d',
          700: '#206126',
          800: '#1d4e22',
          900: '#19401e',
          950: '#0a230f'
        },
        cream: {
          50: '#fdfcf7',
          100: '#faf7ed',
          200: '#f4edd6',
          300: '#ebddb5',
          400: '#dfc78c',
          500: '#d4b069',
          600: '#c4965a',
          700: '#a47a4b',
          800: '#856242',
          900: '#6c5039',
          950: '#3a2a1c'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
}
