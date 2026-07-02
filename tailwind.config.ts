import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        graphite: "var(--graphite)",
        cobalt: {
          DEFAULT: "var(--cobalt)",
          deep: "var(--cobalt-deep)",
        },
        wash: "var(--wash)",
        hairline: "var(--hairline)",
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
