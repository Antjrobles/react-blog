/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#010026',  // Dark Blue
      secondary: '#DC4492', // Pink
      third: '#2CBCE9'  // Blue
    },
  },
  plugins: [],
}
