/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        primary:      'var(--color-primary)',
        secondary:    'var(--color-secondary)',
        card:         'var(--color-card)',
        'card-alt':   'var(--color-card-alt)',
        'card-hover': 'var(--color-card-hover)',
        'blue-accent':'#3d7eff',
        'blue-light': '#60b4ff',
        'blue-dark':  '#1a4fcf',
        muted:        'var(--color-muted)',
        border:       'var(--color-border)',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body:    ['Outfit', 'sans-serif'],
      },
      animation: {
        float:        'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        marquee:      'marquee 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-18px) rotate(2deg)' },
          '66%':      { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(61,126,255,0.2)' },
          '50%':      { boxShadow: '0 0 50px rgba(61,126,255,0.5)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};