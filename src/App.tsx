import { Toaster } from "@yusufceng1z/ding-react"
import { CartDrawer, Nav } from "@/orvelle/brand"
import { Story } from "@/orvelle/story"
import { Catalog } from "@/orvelle/catalog"
import { Club } from "@/orvelle/club"
import { Footer } from "@/orvelle/footer"

/*
 * Orvelle — інтернет-магазин оригінальної парфумерії.
 * Закріплена історія з флаконом → каталог → Orvelle Club → футер.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Story />
        <Catalog />
        <Club />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster position="bottom-center" theme="dark" />
    </>
  )
}
