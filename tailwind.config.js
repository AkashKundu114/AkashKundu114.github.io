/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#080C16',
        surface:  '#111827',
        surfaceHover: '#1F2937',
        ink:      '#F9FAFB',
        muted:    '#9CA3AF',
        accent:   '#3B82F6',
        accentHover: '#2563EB',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
