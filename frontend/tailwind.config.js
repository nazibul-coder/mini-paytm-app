/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-spinners': {
          '&::-webkit-outer-spin-button': {
            display: 'none',
          },
          '&::-webkit-inner-spin-button': {
            display: 'none',
          },
          '-moz-appearance': 'textfield',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}