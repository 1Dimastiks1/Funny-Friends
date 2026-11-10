import { Benefits } from "@/components/Benefits"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { NotesPyramid } from "@/components/NotesPyramid"
import { OrderForm } from "@/components/OrderForm"
import { Reviews } from "@/components/Reviews"
import { StickyOrder } from "@/components/StickyOrder"
import { SITE } from "@/lib/site"

const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${SITE.product.name} ${SITE.product.type} ${SITE.product.volume}`,
  image: `${SITE.url}${SITE.product.image}`,
  brand: { "@type": "Brand", name: "Chanel" },
  description: "Свіжий деревний аромат: цитрус, мʼята, грейпфрут, імбир, жасмин, кедр, сандал, пачулі.",
  offers: {
    "@type": "Offer",
    priceCurrency: "UAH",
    price: SITE.product.price,
    availability: "https://schema.org/InStock",
    url: SITE.url,
    seller: { "@type": "Organization", name: SITE.brand },
  },
  // aggregateRating додайте, лише коли будуть реальні відгуки (Google не приймає демо-дані).
}

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <NotesPyramid />
        <Benefits />
        <Reviews />
        <OrderForm />
      </main>
      <Footer />
      <StickyOrder />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd).replace(/</g, "\\u003c") }} />
    </>
  )
}
