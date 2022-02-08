module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
  theme: {
    extend: {
      colors: {
        'main-purple': "rgba(61, 47, 190, 0.9)",
        'main-purple-xs': "rgba(61, 47, 190, 0.1)",
        'main-purple-light': '#C7C1FF',
        'main-blue': '#F1F1FC',
        'main-modal-blur': 'rgba(0,0,0,0.6)',
        'shadow': '#F2F2F2',
        'gray': '#D7D9DD'
      },
      screens: {
        '1440': '1440px',
      },
      variants: {
        display: ['children', 'default', 'children-first', 'children-last', 'children-odd', 'children-even', 'children-not-first', 'children-not-last', 'children-hover', 'hover', 'children-focus', 'focus', 'children-focus-within', 'focus-within', 'children-active', 'active', 'children-visited', 'visited', 'children-disabled', 'disabled', 'responsive']
      }
    },
  },
  plugins: [require('tailwindcss-children')],
}
