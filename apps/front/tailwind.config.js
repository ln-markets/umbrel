const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue',
      './src/assets/style/**/*.css',
    ],
    options: {
      keyframes: true,
    },
  },
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
