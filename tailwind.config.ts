import { type Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

export default {
  daisyui: {
    themes: ["dim"],
  },
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
