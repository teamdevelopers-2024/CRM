/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '8px': '8px',
        '15px': '15px',
      },
      screens: {
        'custom-lg': '900px', // Custom breakpoint at 900px
      },
    },
  },
  plugins: [],
}
