/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nanum Myeongjo", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
