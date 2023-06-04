/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        1.75: "0.4375rem",
        4.5: "1.125rem",
        12.75: "3.1875rem",
        13.5: "3.375rem",
        160: "40rem",
      },
      fontFamily: {
        georgia: ["Georgia", "sans-serif"],
        helvetica: ["Helvetica", "sans-serif"],
      },
      backgroundImage: {
        newspaper: "url('/imgs/newspaper.jpeg')",
      },
    },
  },
  plugins: [],
};
