import * as React from "react"
import { toast } from "@yusufceng1z/ding-react"
import { ShoppingBag, X, Minus, Plus } from "lucide-react"
import { byId, cart, onOpenCart, openCart, uah, type CartLine, type Product, type Volume } from "./data"

/** Знак Orvelle: тонке кільце з вертикальним «променем» — крапля світла у флаконі. */
export const Mark = ({ size = 26 }: { size?: number }) => (
  <svg className="mark" width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14.25" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="16" cy="16" r="9.5" stroke="currentColor" strokeOpacity=".35" strokeWidth=".8" />
    <path d="M16 5.5v21" stroke="url(#ov-beam)" strokeWidth="1.6" strokeLinecap="round" />
    <defs>
      <linearGradient id="ov-beam" x1="16" y1="5" x2="16" y2="27" gradientUnits="userSpaceOnUse">
        <stop stopColor="#bcd4ff" stopOpacity="0" />
        <stop offset=".5" stopColor="#7fb0ff" />
        <stop offset="1" stopColor="#bcd4ff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

export const Logo = ({ href = "#top" }: { href?: string }) => (
  <a className="logo" href={href} aria-label="Orvelle — на головну">
    <Mark />
    <span>ORVELLE</span>
  </a>
)

/** Додає в кошик і показує ding-сповіщення з кнопкою «Кошик». */
export function addToCart(p: Product, v: Volume) {
  cart.add(p, v)
  toast.success(`${p.name} у кошику`, {
    description: `${p.brand} · ${v.ml} мл · ${uah(v.price)}`,
    duration: 3200,
    action: { label: "Кошик", onClick: () => openCart() },
  })
}

function useCart() {
  const [lines, setLines] = React.useState<CartLine[]>(cart.lines())
  React.useEffect(() => cart.subscribe((l) => setLines([...l])), [])
  return lines
}

export function Nav() {
  const lines = useCart()
  const n = lines.reduce((s, l) => s + l.qty, 0)
  const [light, setLight] = React.useState(false)
  const [bump, setBump] = React.useState(false)
  React.useEffect(() => {
    if (!n) return
    setBump(true)
    const t = window.setTimeout(() => setBump(false), 450)
    return () => window.clearTimeout(t)
  }, [n])
  // над світлою панеллю каталогу навігація стає темною
  React.useEffect(() => {
    const check = () => {
      const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top ?? 1e9
      const cat = top("catalog"), club = top("club"), foot = top("foot")
      setLight((cat <= 40 && club > 40) || foot <= 40)
    }
    check()
    addEventListener("scroll", check, { passive: true })
    addEventListener("resize", check)
    return () => {
      removeEventListener("scroll", check)
      removeEventListener("resize", check)
    }
  }, [])
  return (
    <header className={"nav" + (light ? " light" : "")} id="nav">
      <Logo />
      <nav className="menu" aria-label="Головне меню">
        <a href="#catalog">Каталог<i /></a>
        <a href="#story-notes">Ноти<i /></a>
        <a href="#club">Orvelle Club<i /></a>
        <a href="#foot">Доставка</a>
      </nav>
      <button className={"talk" + (bump ? " bump" : "")} onClick={openCart} aria-label={`Кошик, товарів: ${n}`}>
        Кошик <b>{n}</b>
      </button>
    </header>
  )
}

export function CartDrawer() {
  const lines = useCart()
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => onOpenCart(() => setOpen(true)), [])
  React.useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    addEventListener("keydown", k)
    return () => removeEventListener("keydown", k)
  }, [])
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0)
  const free = 3000
  return (
    <div className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
      <div className="drawer__shade" onClick={() => setOpen(false)} />
      <aside className="drawer__panel" role="dialog" aria-label="Кошик" aria-modal="true">
        <div className="drawer__head">
          <h3>Кошик</h3>
          <button className="iconbtn" onClick={() => setOpen(false)} aria-label="Закрити кошик">
            <X size={18} />
          </button>
        </div>
        {lines.length ? (
          <>
            <div className="drawer__ship">
              <span>{total >= free ? "Безкоштовна доставка — твоя" : `До безкоштовної доставки ${uah(free - total)}`}</span>
              <div className="track"><i style={{ width: Math.min(100, (total / free) * 100) + "%" }} /></div>
            </div>
            <ul className="drawer__list">
              {lines.map((l) => {
                const p = byId(l.id)
                return (
                  <li key={l.key}>
                    <span className="drawer__thumb" style={{ background: p.tone[0], color: p.tone[1] }}>
                      {p.cutout ? <img src={p.cutout} alt="" /> : p.name.slice(0, 1)}
                    </span>
                    <div>
                      <strong>{p.name}</strong>
                      <span>{p.brand} · {l.ml} мл</span>
                      <div className="qty">
                        <button onClick={() => cart.setQty(l.key, l.qty - 1)} aria-label="Менше"><Minus size={13} /></button>
                        <output>{l.qty}</output>
                        <button onClick={() => cart.setQty(l.key, l.qty + 1)} aria-label="Більше"><Plus size={13} /></button>
                      </div>
                    </div>
                    <b>{uah(l.price * l.qty)}</b>
                  </li>
                )
              })}
            </ul>
            <div className="drawer__foot">
              <div><span>Разом</span><b>{uah(total)}</b></div>
              <a className="btn ink wide" href="checkout.html">Оформити замовлення</a>
              <p>Оплата при отриманні або карткою. Відправка Новою поштою сьогодні до 18:00.</p>
            </div>
          </>
        ) : (
          <div className="drawer__empty">
            <ShoppingBag size={28} strokeWidth={1.2} />
            <h4>Кошик порожній</h4>
            <p>Почни з Bleu de Chanel або Dior Sauvage — найпопулярніших ароматів сезону.</p>
            <a className="btn ink" href="#catalog" onClick={() => setOpen(false)}>До каталогу</a>
          </div>
        )}
      </aside>
    </div>
  )
}
