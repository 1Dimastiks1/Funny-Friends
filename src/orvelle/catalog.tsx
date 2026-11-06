import * as React from "react"
import { Plus } from "lucide-react"
import { addToCart } from "./brand"
import { FAMILIES, fromPrice, PRODUCTS, uah, type Family, type Product } from "./data"

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Нахил картки за вказівником (лише миша). */
function useTilt<T extends HTMLElement>(deg = 6) {
  const ref = React.useRef<T>(null)
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * deg}deg) rotateX(${-y * deg}deg)`
  }
  const onPointerLeave = () => ref.current && (ref.current.style.transform = "")
  return { ref, onPointerMove, onPointerLeave }
}

function Vols({ p, v, setV }: { p: Product; v: number; setV: (n: number) => void }) {
  return (
    <div className="vols" role="group" aria-label="Об'єм">
      {p.volumes.map((o, k) => (
        <button key={o.ml} className={k === v ? "on" : ""} aria-pressed={k === v} onClick={() => setV(k)}>
          {o.ml} мл
        </button>
      ))}
    </div>
  )
}

function Featured({ p, i }: { p: Product; i: number }) {
  const [v, setV] = React.useState(p.volumes.length > 2 ? 1 : p.volumes.length - 1)
  const tilt = useTilt<HTMLElement>(5)
  const vol = p.volumes[v]
  return (
    <article className="pcard" {...tilt}>
      <div className={"pimg" + (p.cutout ? " pimg--cut" : " pimg--label")} style={{ background: p.tone[0], color: p.tone[1] }}>
        {p.cutout ? (
          <img src={p.cutout} alt={`${p.brand} ${p.name} ${p.type}`} loading="lazy" />
        ) : (
          <div className="label label--lg" aria-label={`${p.brand} ${p.name}`}>
            <span className="label__brand">{p.brand}</span>
            <span className="label__name">{p.name}</span>
            <span className="label__type">{p.type} · {p.volumes[p.volumes.length - 1].ml} ml</span>
          </div>
        )}
        <span className="pidx">[0{i + 1} · {p.brand}]</span>
        <span className="porig">Хіт сезону</span>
      </div>
      <div className="pbody">
        <div className="phead">
          <div>
            <span className="ptype">{p.brand} · {p.type}</span>
            <h3>{p.name}</h3>
          </div>
          <b className="pprice">{uah(vol.price)}</b>
        </div>
        <dl className="pnotes">
          {(["Верхні", "Серце", "База"] as const).map((k, j) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{p.notes[j]}</dd>
            </div>
          ))}
          <div>
            <dt>Стійкість</dt>
            <dd>{p.wear}</dd>
          </div>
        </dl>
        <div className="pfoot">
          <Vols p={p} v={v} setV={setV} />
          <button className="btn ink" onClick={() => addToCart(p, vol)}>
            Додати в кошик
          </button>
        </div>
      </div>
    </article>
  )
}

function Tile({ p }: { p: Product }) {
  const [v, setV] = React.useState(p.volumes.length - 1)
  const tilt = useTilt<HTMLElement>(7)
  const vol = p.volumes[v]
  return (
    <article className="tile" {...tilt}>
      <div className="tile__label" style={{ background: p.tone[0], color: p.tone[1] }}>
        {p.cutout ? (
          <img className="cut" src={p.cutout} alt={`${p.brand} ${p.name}`} loading="lazy" />
        ) : (
          <div className="label" aria-label={`${p.brand} ${p.name}`}>
            <span className="label__brand">{p.brand}</span>
            <span className="label__name">{p.name}</span>
            <span className="label__type">{p.type} · {p.volumes[p.volumes.length - 1].ml} ml</span>
          </div>
        )}
        {p.niche && <span className="tile__tag">Ніша</span>}
        <button className="tile__add" onClick={() => addToCart(p, vol)} aria-label={`Додати ${p.name} ${vol.ml} мл у кошик`}>
          <Plus size={16} />
        </button>
      </div>
      <div className="tile__body">
        <span className="tile__brand">{p.brand}</span>
        <h4>{p.name}</h4>
        <p>{p.notes.join(" · ")}</p>
        <div className="tile__foot">
          <Vols p={p} v={v} setV={setV} />
          <b>{uah(vol.price)}</b>
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
    const run = () => {
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
    }
    let done = false
    const check = () => {
      if (done || el.getBoundingClientRect().top > innerHeight * 0.6) return
      done = true
      removeEventListener("scroll", check)
      run()
    }
    addEventListener("scroll", check, { passive: true })
    check()
    return () => removeEventListener("scroll", check)
  }, [])

  return (
    <section id="catalog" className="sol" ref={ref}>
      <div className="sol-head">
        <div>
          <span className="chip">Каталог</span>
          <h2>Оригінальні аромати з офіційних поставок</h2>
        </div>
        <p>Працюємо напряму з дистриб'юторами в ЄС. До кожного замовлення додаємо чек і фото батч-коду флакона, який їде саме до тебе.</p>
      </div>

      <div className="pgrid">
        {PRODUCTS.filter((p) => p.featured).map((p, i) => (
          <Featured key={p.id} p={p} i={i} />
        ))}
      </div>

      <div className="toolbar">
        <div className="filters" role="tablist" aria-label="Сімейство ароматів">
          {FAMILIES.map((f) => (
            <button key={f.id} role="tab" aria-selected={fam === f.id} className={fam === f.id ? "on" : ""} onClick={() => setFam(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="sort">
          <span>{list.length} ароматів</span>
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

      <div className="tgrid">
        {list.map((p) => (
          <Tile key={p.id} p={p} />
        ))}
      </div>

      <div className="stats">
        {STATS.map(([, , unit, label], i) => (
          <div key={label}>
            <b>
              <span ref={(n) => void (nums.current[i] = n)}>0</span>
              {unit}
            </b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
