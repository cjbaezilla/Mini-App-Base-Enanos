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
        // Colores específicos para móviles con mejor compatibilidad
        'mobile-bg': '#f5f1e8',
        'mobile-bg-dark': '#1a1611',
        'mobile-text': '#3d3526',
        'mobile-text-dark': '#f5f1e8',
        'mobile-accent': '#8b4513',
        'mobile-accent-dark': '#d4a574',
      },
      // Mejorar compatibilidad con móviles
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
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
