import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import fs from "node:fs"

// Старі статичні сторінки (каталог, PDP, checkout) підключають звичайний
// скрипт src/js/main.js — копіюємо його у збірку як є.
const copyLegacyScript = () => ({
  name: "copy-legacy-script",
  closeBundle() {
    const out = path.resolve(__dirname, "dist/src/js")
    fs.mkdirSync(out, { recursive: true })
    fs.copyFileSync(path.resolve(__dirname, "src/js/main.js"), path.join(out, "main.js"))
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), copyLegacyScript()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        catalog: path.resolve(__dirname, "catalog.html"),
        product: path.resolve(__dirname, "product.html"),
        checkout: path.resolve(__dirname, "checkout.html"),
      },
    },
  },
})
