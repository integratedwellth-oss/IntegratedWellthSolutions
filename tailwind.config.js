/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        iws: {
          teal: '#1a4d4d', // That deep green/teal from your screenshots
          gold: '#C5A059', // The premium gold accent
          red: '#ef4444'   // The War Room red
        }
      }
    },
  },
  plugins: [],
}
