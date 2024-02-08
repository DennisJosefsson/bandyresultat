const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        inter: ['Inter'],
      },
    },
    screens: {
      xxs: '375px',
      xs: '430px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
