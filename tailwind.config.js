/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPurple: "#6652D5",
        darkBlue: "#25293D",
      },
    },
  },
  plugins: [],
};
