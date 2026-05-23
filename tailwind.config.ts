import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#17212b",
        panel: "#ffffff",
        line: "#d7e7df",
        accent: "#58cc02",
        banana: "#ffd43b",
        lagoon: "#1cb0f6",
        coral: "#ff6b6b",
      },
    },
  },
  plugins: [],
};

export default config;
