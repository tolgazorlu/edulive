/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/ @material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: "&nbsp;&nbsp;",
            },
            "code::after": {
              content: "&nbsp;&nbsp;",
            },
            code: {
              wordWrap: "break-word",
              boxDecorationBreak: "clone",
              padding: ".1rem .3rem .2rem",
              borderRadius: ".2rem",
            },
          },
        },
      },
    },
    fontFamily: {
      poppins: "Poppins",
      aubette: "Aubette",
      bandal: "Bandal",
      bricolage: "Bricolage",
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      // {
      //   light: {
      //     ...require("daisyui/src/theming/themes")["light"],
      //     "primary": "#141BEB",
      //     "primary-content": "#FFFFFF",
      //     "accent": "#00ECBD"
      //   },
      // },
      // {
      //   dark: {
      //     ...require("daisyui/src/theming/themes")["dark"],
      //     "primary": "#435bff",
      //     "primary-content": "#FFFFFF",
      //     "accent": "#00e8b7"
      //   },
      // },
    ],
  },
  plugins: [require("@tailwindcss/typography")],
});
