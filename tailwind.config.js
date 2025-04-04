// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'army-black': '#221F20',
        'army-gold': '#FFCC01',
        'army-green': '#2F372F',
        'tan': '#F1E4C7',
        'field-01': '#565557',
        'field-02': '#B2B0B1',
        'gray-01': '#565557',
        'gray-02': '#97999B',
      },
    },
  },
  plugins: [],
}