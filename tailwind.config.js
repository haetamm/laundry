/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: '500px',
        tab: '845px',
        max: '1370px',
        lap: '1440px'
      }
    },
  },
  plugins: [],
}

