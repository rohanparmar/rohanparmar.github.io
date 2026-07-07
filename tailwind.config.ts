import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        field: {
          DEFAULT: "rgb(var(--field) / <alpha-value>)",
          deep: "rgb(var(--field-deep) / <alpha-value>)",
        },
        paper: "rgb(var(--paper) / <alpha-value>)",
        mark: "rgb(var(--mark) / <alpha-value>)",
        mist: "var(--mist)",
        trace: "var(--trace)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        label: "0.14em",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
