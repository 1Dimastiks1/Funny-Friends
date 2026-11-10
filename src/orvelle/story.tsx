import * as React from "react"
import { addToCart } from "./brand"
import { Bottle } from "./bottle"
import { STORY, fromPrice, uah } from "./data"

const SEG = 1.5 // висота сцени на один аромат
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const out = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Скрол-історія (дизайн-система: ScrollStory): сцена закріплена, кожен аромат
 * виїжджає справа, попередній іде вліво; зліва рядок за рядком проявляється
 * опис. Наприкінці сцена розсипається на точки й відкриває каталог.
 */
export function Story() {
  const root = React.useRef<HTMLElement>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const dotsRef = React.useRef<HTMLCanvasElement>(null)
  const [active, setActive] = React.useState(0)
  const [on, setOn] = React.useState(true)
  const [hint, setHint] = React.useState(true)
  const N = STORY.length

  React.useEffect(() => {
    const sec = root.current, st = stage.current, cv = dotsRef.current
    if (!sec || !st || !cv) return
    const ctx = cv.getContext("2d")
    const bottles = Array.from(st.querySelectorAll<HTMLElement>(".ov-story__bottle"))
    const bar = st.querySelector<HTMLElement>(".ov-story__bar i")
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    const dotColor = getComputedStyle(st).getPropertyValue("--surface-100").trim() || "#070b14"
    let raf = 0, visible = false, lastP = -1, t0 = performance.now()
    let cur = { a: -1, on: true, hint: true }

    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2)
      cv.width = st.clientWidth * d
      cv.height = st.clientHeight * d
      lastP = -1
    }
    const dots = (p: number) => {
      if (!ctx || Math.abs(p - lastP) < 0.002) return
      lastP = p
      const d = cv.width / st.clientWidth, cell = 4 * d, r = p * cell * 0.75
      ctx.clearRect(0, 0, cv.width, cv.height)
      if (p <= 0) return
      ctx.fillStyle = dotColor
      ctx.beginPath()
      for (let y = cell / 2; y < cv.height + cell; y += cell)
        for (let x = cell / 2; x < cv.width + cell; x += cell) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, Math.PI * 2) }
      ctx.fill()
    }
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const h = st.clientHeight, w = st.clientWidth
      const P = Math.max(0, -sec.getBoundingClientRect().top) / (h * SEG)
      const breathe = Math.sin((now - t0) / 900) * 4
      const a = clamp(Math.round(P), 0, N - 1)
      bottles.forEach((el, i) => {
        const u = P - i
        let x = 0, y = breathe, rot = -12, s = 1, o = 1
        if (u < -0.12) {
          const e = out(clamp((u + 0.5) / 0.38, 0, 1))
          x = (1 - e) * w * 0.6; rot = -12 + (1 - e) * 36; s = 0.88 + 0.12 * e; o = clamp(e * 1.6, 0, 1); y = 0
        } else if (u > 0.12 && i < N - 1) {
          const k = clamp((u - 0.12) / 0.38, 0, 1), ek = k * k
          x = -w * 0.4 * ek; y = -40 * ek; rot = -12 - 28 * ek; s = 1 - 0.15 * ek; o = 1 - k
        }
        if (reduce) { x = 0; y = 0; rot = -12; s = 1; o = Math.abs(u) < 0.5 ? 1 : 0 }
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`
        el.style.opacity = o.toFixed(3)
      })
      const isOn = Math.abs(P - a) < 0.3 || (a === N - 1 && P > a)
      const showHint = P < 0.08
      if (a !== cur.a || isOn !== cur.on || showHint !== cur.hint) {
        cur = { a, on: isOn, hint: showHint }
        setActive(a); setOn(isOn); setHint(showHint)
      }
      if (bar) bar.style.transform = `scaleY(${clamp(P / (N - 1), 0, 1).toFixed(3)})`
      dots(clamp((P - (N - 1) - 0.3) / 0.6, 0, 1))
    }
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(sec)
    size()
    addEventListener("resize", size)
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", size) }
  }, [N])

  return (
    <section className="story ov-story" id="story" ref={root} data-theme="night" style={{ height: `calc(100svh * ${((N - 1) * SEG + 2.4).toFixed(2)})` }}>
      <div className="ov-story__stage story__stage" ref={stage}>
        <span className="ov-cross" style={{ left: 40, top: 96 }} />
        <span className="ov-cross" style={{ right: 27, top: 96 }} />
        {STORY.map((p, i) => (
          <p key={p.id} className={"ov-ghost story__ghost" + (i === active && on ? " is-on" : "")} aria-hidden="true">{p.word}</p>
        ))}
        {STORY.map((p) => (
          <div key={p.id} className="ov-story__bottle"><Bottle p={p} /></div>
        ))}
        {STORY.map((p, i) => {
          const v = p.volumes[0]
          return (
            <article key={p.id} className={"ov-story__copy" + (i === active && on ? " is-on" : "")} aria-hidden={i !== active}>
              <span className="ov-label">{p.brand} · {p.type}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <dl className="ov-story__notes">
                <div><dt>Верх</dt><dd>{p.notes[0]}</dd></div>
                <div><dt>Серце</dt><dd>{p.notes[1]}</dd></div>
                <div><dt>База</dt><dd>{p.notes[2]}</dd></div>
                <div><dt>Стійкість</dt><dd>{p.wear}</dd></div>
              </dl>
              <div className="ov-story__buy">
                <span className="ov-price">від {uah(fromPrice(p))}</span>
                <button className="ov-btn ov-btn--primary" onClick={() => addToCart(p, v)} tabIndex={i === active ? 0 : -1}>У кошик · {v.ml} мл</button>
              </div>
            </article>
          )
        })}
        <div className="ov-story__idx"><b>0{active + 1}</b><span>/ 0{N}</span></div>
        <div className="ov-story__bar"><i /></div>
        <div className="ov-story__hint" style={{ opacity: hint ? 1 : 0 }}><i />Гортайте — аромати виходять справа</div>
        <canvas className="ov-dots" ref={dotsRef} aria-hidden="true" />
      </div>
    </section>
  )
}
