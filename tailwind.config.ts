import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          secondary: '#12121A',
          elevated: '#1A1A2E',
        },
        accent: {
          gold: '#D4AF37',
          emerald: '#00C853',
          ruby: '#E53935',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#9E9E9E',
        },
        border: {
          DEFAULT: '#2A2A3E',
        },
        category: {
          blackjack: '#1B5E20',
          rulet: '#B71C1C',
          poker: '#0D47A1',
          bakara: '#4A148C',
          slot: '#E65100',
          genel: '#263238',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#F5F5F5',
            a: {
              color: '#D4AF37',
              '&:hover': { color: '#E5C848' },
            },
            h1: { color: '#F5F5F5', fontFamily: 'Playfair Display, serif' },
            h2: { color: '#F5F5F5', fontFamily: 'Playfair Display, serif' },
            h3: { color: '#F5F5F5', fontFamily: 'Playfair Display, serif' },
            h4: { color: '#F5F5F5' },
            strong: { color: '#F5F5F5' },
            code: { color: '#D4AF37' },
            blockquote: {
              color: '#9E9E9E',
              borderLeftColor: '#D4AF37',
            },
            'thead th': { color: '#F5F5F5' },
            'tbody td': { color: '#F5F5F5' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
