/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
      },
      colors: {
        "dark-purple": "#4b0082",
        "light-purple": "#800080",

      },
    },
  },
  plugins: [],
};
