import("tailwindcss").Config;
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#1F2336",
        darkPurle:'#171430',
        lightPurple: "#6652D5",
        darkBlue: "#25293D",
        pagie: "#F8F3F3",
        creme: "#D9D9D9",
        grayLight: "#665B5B",
        purpleBlue: "#26233C",
        mainBlue: "#171430",
        cremeText: "#CBCBCB",
        goldBrown: "#4A4A4A",
      },
    },
    screens: {
      "2xl": { min: "1735px" },
      // => @media (max-width: 1535px) { ... }

      xl: { min: "1579px" },
      // => @media (max-width: 1279px) { ... }

      lg: { min: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { min: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { min: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { min: "420px" },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
