import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#09120e",
          900: "#0e1a14",
          850: "#13231b",
          800: "#182c23",
          700: "#223d31",
          600: "#2d4f40",
          500: "#3d6854",
        },
        sand: {
          50: "#faf8f4",
          100: "#f4f0e7",
          200: "#e9e2d3",
          300: "#ded4be",
          400: "#cbb898",
          500: "#b99c75",
          600: "#9e7f59",
        },
        gold: {
          300: "#f2dfb3",
          400: "#e5c88b",
          500: "#d4b36c",
          600: "#b8944d",
        },
        parchment: "#ded5c3",
        parchmentDark: "#212824",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        condensed: ["var(--font-condensed)", "Oswald", "Bebas Neue", "Impact", "sans-serif"],
        script: ["var(--font-script)", "Alex Brush", "Brush Script MT", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
