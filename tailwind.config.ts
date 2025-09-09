import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Barriecito', 'cursive'],
        'body': ['Funnel Sans', 'sans-serif'],
      },
      colors: {
        background: "var(--app-background)",
        foreground: "var(--app-foreground)",
        accent: "var(--app-accent)",
        purple: "var(--app-purple)",
        cyan: "var(--app-cyan)",
        green: "var(--app-green)",
        surface: "var(--app-surface)",
      },
      animation: {
        "fade-out": "1s fadeOut 3s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px var(--app-accent-glow)" },
          "100%": { boxShadow: "0 0 20px var(--app-accent-glow), 0 0 30px var(--app-accent-glow)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
export default config;
