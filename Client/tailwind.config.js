/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-theme': '#121212',
        'grey-theme': '#282828',
        'light-grey-theme': '#555555',
        'text-primary': '#ffffff',
        'text-secondary': '#cccccc',
        'primary': '#6200EE',
      },
    },
  },
  plugins: [],
}