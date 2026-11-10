import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#9DB9D5", // фон сторінки
        sky: { top: "#BFD6E0", glow: "#CDE8F3", deep: "#5E8399" }, // градієнт hero-картки
        ink: { DEFAULT: "#0E1B2B", soft: "#33475B", mute: "#4F6478" }, // текст
        brand: { DEFAULT: "#0B5FFF", hover: "#0A4FD6" }, // головна кнопка
      },
      borderRadius: {
        hero: "40px",
        card: "28px",
        chip: "999px",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 50px -20px rgba(22, 52, 84, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        lift: "0 30px 60px -24px rgba(22, 52, 84, 0.45)",
        bottle: "0 40px 60px rgba(20, 40, 70, 0.35)",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
      },
      animation: { float: "float 6s ease-in-out infinite" },
    },
  },
  plugins: [],
}

export default config
