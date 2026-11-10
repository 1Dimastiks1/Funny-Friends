import type { Metadata, Viewport } from "next"
import { Bodoni_Moda, Manrope } from "next/font/google"
import { SITE } from "@/lib/site"
import "./globals.css"

const display = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-display", display: "swap" })
const sans = Manrope({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans", display: "swap" })

const title = `${SITE.product.name} ${SITE.product.type} — оригінал з доставкою по Україні | ${SITE.brand}`
const description =
  "Оригінальний Bleu de Chanel Eau de Parfum 100 мл з гарантією автентичності. Доставка Новою Поштою, пробники в подарунок, повернення 14 днів. Залиште заявку — передзвонимо за 15 хвилин."

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: SITE.brand,
    title,
    description,
    images: [{ url: SITE.product.image, width: 852, height: 1140, alt: "Флакон Bleu de Chanel Eau de Parfum" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [SITE.product.image] },
}

export const viewport: Viewport = { themeColor: "#9DB9D5" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
