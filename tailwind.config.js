/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This is crucial for dark mode to work
  theme: {
    extend: {
       fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    }
    },
  },
  plugins: [],
}