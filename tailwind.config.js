/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'osint-black': '#000000',
        'osint-white': '#ffffff',
        'osint-gray': '#1f2937',
        'osint-light': '#f3f4f6'
      }
    },
  },
  plugins: [],
}