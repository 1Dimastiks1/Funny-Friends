import { Toaster } from "@yusufceng1z/ding-react"
import { CartDrawer, Nav } from "@/orvelle/brand"
import { Hero } from "@/orvelle/hero"
import { Showcase } from "@/orvelle/showcase"
import { Story } from "@/orvelle/story"
import { Catalog } from "@/orvelle/catalog"
import { Gift } from "@/orvelle/gift"
import { Club } from "@/orvelle/club"
import { Signup } from "@/orvelle/signup"
import { Footer } from "@/orvelle/footer"

/*
 * Orvelle — інтернет-магазин оригінальної парфумерії.
 * Візуал і рух — з дизайн-системи Orvelle (галерейна тиша, синя ніч):
 * перший екран → шоукейс з водою → скрол-історія → каталог → подарунки →
 * Orvelle Club → підписка → футер.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Story />
        <Catalog />
        <Gift />
        <Club />
        <Signup />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster position="bottom-center" theme="dark" />
    </>
  )
}
