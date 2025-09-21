/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#FFD700', // Base gold color
          600: '#E6C200', 
          200: '#f8de4bff',
        },
        salmon: {
          500: '#f0b5a0',
          600: '#e69e8c',
        },
        teal: {
          600: '#3d5b58',
          700: '#2f4543',
          800: '#1f2f2e',
        },
      },
    },
  },
  plugins: [],
}