const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "catamaran-light": ["Catamaran-Light"],
        "catamaran-regular": ["Catamaran-Regular"],
        "catamaran-medium": ["Catamaran-Medium"],
        "catamaran-bold": ["Catamaran-Bold"],
      },
    },
  },
  plugins: [],
}
