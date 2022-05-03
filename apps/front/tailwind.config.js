const colors = require('tailwindcss/colors')

module.exports = {
  content: ['index.html', 'public/**/*.html', 'src/**/*.{js,vue,css}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.blue[500],
        },
        secondary: {
          DEFAULT: '#0A15AF',
        },
        link: {
          DEFAULT: colors.blue[400],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
