/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iws: {
          teal: '#1a4d4d',
          gold: '#C5A059',
          red: '#ef4444'
        }
      }
    },
  },
  plugins: [],
}
