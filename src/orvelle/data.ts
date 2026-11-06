/*
 * Каталог Orvelle. Ціни звірено з цінами оригіналів у eva.ua (листопад 2026);
 * остаточну націнку магазин визначає сам.
 * Вирізаний флакон є лише для Bleu de Chanel (з кадру клієнта); решта карток
 * показують «етикетку» аромату, доки не буде офіційних пекшотів на прозорому фоні.
 */
export type Family = "fresh" | "woody" | "amber" | "powdery"
export type Volume = { ml: number; price: number }
export type Product = {
  id: string
  brand: string
  name: string
  type: string
  family: Family
  niche?: boolean
  notes: [string, string, string]
  wear: string
  volumes: Volume[]
  /** вирізаний флакон на прозорому фоні (поки є лише для Bleu de Chanel) */
  cutout?: string
  /** показувати великою карткою над сіткою */
  featured?: boolean
  /** тон «етикетки»: фон, колір тексту */
  tone: [string, string]
}

export const FAMILIES: { id: Family | "all" | "niche"; label: string }[] = [
  { id: "all", label: "Усі" },
  { id: "fresh", label: "Свіжі" },
  { id: "woody", label: "Деревні" },
  { id: "amber", label: "Пряні й амброві" },
  { id: "powdery", label: "Пудрові" },
  { id: "niche", label: "Нішеві" },
]

const P = (p: Product) => p

export const PRODUCTS: Product[] = [
  P({
    id: "bleu", brand: "Chanel", name: "Bleu de Chanel", type: "Eau de Parfum", family: "woody",
    notes: ["грейпфрут, лимон, м'ята", "імбир, мускатний горіх, жасмин", "ладан, кедр, сандал"], wear: "8–10 год",
    volumes: [{ ml: 50, price: 5290 }, { ml: 100, price: 7490 }, { ml: 150, price: 9690 }],
    cutout: "/img/bleu-bottle.png", featured: true, tone: ["#0b1d4d", "#dbe7ff"],
  }),
  P({
    id: "sauvage", brand: "Dior", name: "Sauvage", type: "Parfum", family: "amber",
    notes: ["бергамот, мандарин", "елемі, сандал", "ладан, боби тонка, ваніль"], wear: "10–12 год",
    volumes: [{ ml: 60, price: 5890 }, { ml: 100, price: 7990 }],
    featured: true, tone: ["#173263", "#dbe7ff"],
  }),
  P({
    id: "elixir", brand: "Dior", name: "Sauvage Elixir", type: "Parfum", family: "amber",
    notes: ["грейпфрут, кориця, мускатний горіх", "лаванда", "лакриця, сандал, амбра"], wear: "12+ год",
    volumes: [{ ml: 60, price: 9290 }, { ml: 100, price: 12490 }], tone: ["#1d1510", "#e9cfa6"],
  }),
  P({
    id: "allure", brand: "Chanel", name: "Allure Homme Sport", type: "Eau de Toilette", family: "fresh",
    notes: ["апельсин, морські ноти", "перець, неролі", "ветивер, боби тонка, мускус"], wear: "6–8 год",
    volumes: [{ ml: 50, price: 4390 }, { ml: 100, price: 5890 }], tone: ["#dfe3e9", "#0a0f1c"],
  }),
  P({
    id: "homme", brand: "Dior", name: "Dior Homme Intense", type: "Eau de Parfum", family: "powdery",
    notes: ["лаванда, груша", "ірис, амбретта", "кедр, ветивер"], wear: "8–10 год",
    volumes: [{ ml: 50, price: 4990 }, { ml: 100, price: 6690 }], tone: ["#45454d", "#ecebef"],
  }),
  P({
    id: "y", brand: "Yves Saint Laurent", name: "Y", type: "Eau de Parfum", family: "fresh",
    notes: ["яблуко, імбир, бергамот", "шавлія, ялівець", "амброві дерева, боби тонка"], wear: "7–9 год",
    volumes: [{ ml: 60, price: 4290 }, { ml: 100, price: 5490 }], tone: ["#161b26", "#d7dceb"],
  }),
  P({
    id: "profondo", brand: "Giorgio Armani", name: "Acqua di Giò Profondo", type: "Eau de Parfum", family: "fresh",
    notes: ["морські ноти, бергамот", "розмарин, лаванда", "пачулі, мускус"], wear: "7–9 год",
    volumes: [{ ml: 75, price: 4590 }, { ml: 125, price: 5990 }], tone: ["#0e3550", "#d3ecf7"],
  }),
  P({
    id: "oudwood", brand: "Tom Ford", name: "Oud Wood", type: "Eau de Parfum", family: "woody", niche: true,
    notes: ["кардамон, рожеве дерево", "уд, сандал", "боби тонка, амбра, ветивер"], wear: "8–10 год",
    volumes: [{ ml: 50, price: 12900 }, { ml: 100, price: 18900 }], tone: ["#3a2418", "#ecd3b4"],
  }),
  P({
    id: "aventus", brand: "Creed", name: "Aventus", type: "Eau de Parfum", family: "woody", niche: true,
    notes: ["ананас, бергамот, чорна смородина", "береза, пачулі, жасмин", "мускус, дубовий мох"], wear: "8–12 год",
    volumes: [{ ml: 50, price: 9990 }, { ml: 100, price: 13490 }], tone: ["#141619", "#d9dde2"],
  }),
  P({
    id: "br540", brand: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", type: "Eau de Parfum", family: "amber", niche: true,
    notes: ["шафран", "жасмин", "амбра, кедр"], wear: "10–12 год",
    volumes: [{ ml: 35, price: 9990 }, { ml: 70, price: 15490 }], tone: ["#7d1c27", "#f6d9d4"],
  }),
  P({
    id: "santal", brand: "Le Labo", name: "Santal 33", type: "Eau de Parfum", family: "woody", niche: true,
    notes: ["кардамон, фіалка", "ірис, папірус", "сандал, кедр, шкіра"], wear: "8–10 год",
    volumes: [{ ml: 50, price: 11900 }, { ml: 100, price: 16900 }], tone: ["#cdbea8", "#241c12"],
  }),
  P({
    id: "gypsy", brand: "Byredo", name: "Gypsy Water", type: "Eau de Parfum", family: "fresh", niche: true,
    notes: ["бергамот, лимон, ялівець", "ладан, хвоя", "сандал, ваніль, амбра"], wear: "5–7 год",
    volumes: [{ ml: 50, price: 9900 }, { ml: 100, price: 13900 }], tone: ["#e6dfd0", "#1f1a12"],
  }),
  P({
    id: "woodsage", brand: "Jo Malone London", name: "Wood Sage & Sea Salt", type: "Cologne", family: "fresh",
    notes: ["амбретта", "морська сіль", "шавлія, грейпфрут"], wear: "4–6 год",
    volumes: [{ ml: 30, price: 3290 }, { ml: 100, price: 6490 }], tone: ["#e7e5de", "#1b1d22"],
  }),
  P({
    id: "lhomme", brand: "Prada", name: "L'Homme", type: "Eau de Toilette", family: "powdery",
    notes: ["неролі, чорний перець, кардамон", "ірис, фіалка, герань", "амбра, пачулі, кедр"], wear: "6–8 год",
    volumes: [{ ml: 50, price: 3990 }, { ml: 100, price: 5290 }], tone: ["#e8ebef", "#14171d"],
  }),
]

export const uah = (n: number) => n.toLocaleString("uk-UA").replace(/ /g, " ") + " ₴"
export const fromPrice = (p: Product) => Math.min(...p.volumes.map((v) => v.price))

/* ── кошик ── */
export type CartLine = { key: string; id: string; ml: number; price: number; qty: number }
type L = (lines: CartLine[]) => void
const ls = new Set<L>()
let lines: CartLine[] = []
const emit = () => ls.forEach((l) => l(lines))

export const cart = {
  lines: () => lines,
  count: () => lines.reduce((s, l) => s + l.qty, 0),
  total: () => lines.reduce((s, l) => s + l.qty * l.price, 0),
  add(p: Product, v: Volume) {
    const key = `${p.id}-${v.ml}`
    const found = lines.find((l) => l.key === key)
    lines = found ? lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { key, id: p.id, ml: v.ml, price: v.price, qty: 1 }]
    emit()
  },
  setQty(key: string, qty: number) {
    lines = qty <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty } : l))
    emit()
  },
  subscribe(l: L) {
    ls.add(l)
    return () => void ls.delete(l)
  },
}
export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!

/* відкриття кошика з будь-якого місця */
const openers = new Set<() => void>()
export const openCart = () => openers.forEach((o) => o())
export const onOpenCart = (o: () => void) => {
  openers.add(o)
  return () => void openers.delete(o)
}
