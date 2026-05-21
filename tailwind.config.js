/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        surface:  'var(--surface)',
        surface2: 'var(--surface2)',
        surface3: 'var(--surface3)',
        ink:      'var(--ink)',
        muted:    'var(--muted)',
        cborder:  'var(--border)',
        accent:   'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        danger:   'var(--red)',
        success:  'var(--green)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans:    ['Figtree', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        blink:  'blink 1.6s infinite',
        fadeUp: 'fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        fadeUp: { to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
