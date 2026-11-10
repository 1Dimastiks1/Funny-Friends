import * as React from "react"
import { Heart } from "lucide-react"
import { addToCart } from "./brand"
import { Bottle } from "./bottle"
import { FAMILIES, fromPrice, PRODUCTS, uah, type Family, type Product } from "./data"

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Картка аромату (дизайн-система: ProductCard). */
function Card({ p, i }: { p: Product; i: number }) {
  const [v, setV] = React.useState(0)
  const [wish, setWish] = React.useState(false)
  const vol = p.volumes[v]
  return (
    <article className="ov-card catalog__card">
      <div className="ov-card__stage" data-theme="night">
        <p className="ov-ghost" aria-hidden="true">{p.word ?? p.name.split(" ")[0]}</p>
        <span className="ov-card__idx">{String(i + 1).padStart(2, "0")}</span>
        <button className={"ov-btn ov-btn--icon ov-glass ov-card__wish" + (wish ? " is-on" : "")} aria-pressed={wish} aria-label={`В обране: ${p.name}`} onClick={() => setWish((w) => !w)}>
          <Heart fill={wish ? "currentColor" : "none"} />
        </button>
        <Bottle p={p} />
        <span className="ov-chip ov-chip--solid ov-card__badge">{p.niche ? "Ніша" : "Оригінал"}</span>
      </div>
      <div className="ov-card__body">
        <div>
          <span className="ov-label">{p.brand} · {p.type}</span>
          <h3 className="ov-card__name">{p.name}</h3>
        </div>
        <p className="ov-card__notes">{p.notes[0]} · {p.notes[2]}</p>
        <div className="ov-vols" role="group" aria-label="Об'єм">
          {p.volumes.map((o, k) => (
            <button key={o.ml} aria-pressed={k === v} onClick={() => setV(k)}>{o.ml} ml</button>
          ))}
        </div>
        <div className="ov-card__foot">
          <div className="ov-price">{uah(vol.price)}<small>{p.wear}</small></div>
          <button className="ov-btn ov-btn--primary" onClick={() => addToCart(p, vol)}>У кошик</button>
        </div>
      </div>
    </article>
  )
}

type Sort = "pop" | "asc" | "desc"

const STATS: [number, number, string, string][] = [
  [14, 0, "", "Ароматів у наявності"],
  [2, 0, " дні", "Доставка по Україні"],
  [14, 0, " днів", "На повернення"],
  [4.9, 1, "", "Оцінка покупців"],
]

export function Catalog() {
  const ref = React.useRef<HTMLElement>(null)
  const nums = React.useRef<(HTMLElement | null)[]>([])
  const [fam, setFam] = React.useState<Family | "all" | "niche">("all")
  const [sort, setSort] = React.useState<Sort>("pop")

  const list = React.useMemo(() => {
    const l = PRODUCTS.filter((p) => fam === "all" || (fam === "niche" ? p.niche : p.family === fam))
    if (sort === "asc") return [...l].sort((a, b) => fromPrice(a) - fromPrice(b))
    if (sort === "desc") return [...l].sort((a, b) => fromPrice(b) - fromPrice(a))
    return l
  }, [fam, sort])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const fmt = (n: number, d: number) => n.toLocaleString("uk-UA", { minimumFractionDigits: d, maximumFractionDigits: d })
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (now: number) => {
        const k = ease(Math.min((now - t0) / 1600, 1))
        STATS.forEach(([n, d], i) => {
          const node = nums.current[i]
          if (node) node.textContent = fmt(n * k, d)
        })
        if (k < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.4 })
    const stats = el.querySelector(".catalog__stats")
    if (stats) io.observe(stats)
    return () => io.disconnect()
  }, [])

  return (
    <section id="catalog" className="catalog" ref={ref} data-theme="mist">
      <div className="catalog__head">
        <div>
          <span className="ov-label ov-label--accent">Orvelle / Каталог</span>
          <h2 className="section-title">Оригінальні аромати з офіційних поставок</h2>
        </div>
        <p>Працюємо напряму з дистриб'юторами в ЄС. До кожного замовлення додаємо чек і фото батч-коду флакона, який їде саме до вас.</p>
      </div>

      <div className="catalog__toolbar">
        <div className="catalog__filters" role="tablist" aria-label="Сімейство ароматів">
          {FAMILIES.map((f) => (
            <button key={f.id} role="tab" aria-selected={fam === f.id} className={"ov-btn " + (fam === f.id ? "ov-btn--primary" : "ov-btn--line")} onClick={() => setFam(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="catalog__sort">
          <span className="ov-label">{list.length} ароматів</span>
          <label>
            <span className="sr">Сортування</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="pop">Популярні</option>
              <option value="asc">Спочатку дешевші</option>
              <option value="desc">Спочатку дорожчі</option>
            </select>
          </label>
        </div>
      </div>

      <div className="catalog__grid">
        {list.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </div>

      <div className="catalog__stats">
        {STATS.map(([, , unit, label], i) => (
          <div key={label}>
            <b><span ref={(n) => void (nums.current[i] = n)}>0</span>{unit}</b>
            <span className="ov-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
