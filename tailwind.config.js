/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21356a",
        gray: "#777777",
        green: "#009541",
      },
      fontFamily: {
        IRANYekan: ["PeydaWeb", "sans-serif"],
      },
    },
  },
  plugins: [],
};
