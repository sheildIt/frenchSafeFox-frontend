/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#1F2336",
        lightPurple: "#6652D5",
        darkBlue: "#25293D",
        pagie: "#F8F3F3",
        creme: "#D9D9D9",
        grayLight: "#665B5B",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
