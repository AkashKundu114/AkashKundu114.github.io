export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        bg:       '#0B1228',
        surface:  '#182350',
        ink:      '#FEFAEF',
        muted:    '#AFD2FA',
        accent:   '#B9915E',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
