/**
 * Усі дані, які треба замінити на реальні, — тут.
 * TODO: перевірте ціну, контакти й посилання перед публікацією.
 */
export const SITE = {
  brand: "Orvelle",
  url: "https://orvelle.example", // TODO: ваш домен
  product: {
    name: "Bleu de Chanel",
    type: "Eau de Parfum",
    volume: "100 мл",
    price: 7490, // TODO: актуальна ціна, ₴
    image: "/bottle.png",
  },
  phone: "+380 00 000 00 00", // TODO
  email: "hello@orvelle.example", // TODO
  telegram: "https://t.me/your_shop", // TODO
  viber: "viber://chat?number=%2B380000000000", // TODO
  instagram: "https://instagram.com/your_shop", // TODO
  clients: "+12 000", // TODO: перевірте цифру
  rating: "4.9", // TODO: перевірте цифру
}

export const uah = (n: number) => n.toLocaleString("uk-UA").replace(/\s/g, " ") + " ₴"

export const NAV = [
  { href: "#aroma", label: "Аромат" },
  { href: "#notes", label: "Ноти" },
  { href: "#why", label: "Чому ми" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contacts", label: "Контакти" },
]
