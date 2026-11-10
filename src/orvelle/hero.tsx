import * as React from "react"
import { ArrowDown } from "lucide-react"
import { Bottle } from "./bottle"
import { byId } from "./data"

const E = "cubic-bezier(0.16, 1, 0.3, 1)"
const pad = (n: number) => String(n).padStart(4, "0")

/**
 * Перший екран у стилі референсу Azzaro (дизайн-система: Hero):
 * «екран» у рамці, справжній флакон під нахилом, велике слово за ним,
 * тихі підписи в кутах. Флакон виїжджає справа й нахиляється за курсором.
 */
export function Hero() {
  const p = byId("bleu")
  const screen = React.useRef<HTMLDivElement>(null)
  const bottle = React.useRef<HTMLDivElement>(null)
  const ghost = React.useRef<HTMLParagraphElement>(null)
  const xy = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const scr = screen.current, b = bottle.current, g = ghost.current
    if (!scr || !b || !g) return
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    let ready = reduce
    let raf = 0
    let tx = 0, ty = 0, cx = 0, cy = 0
    const anims: Animation[] = []
    if (!reduce) {
      anims.push(g.animate([{ opacity: 0, transform: "translate(-50%, -30%)" }, { opacity: 1, transform: "translate(-50%, -50%)" }], { duration: 1200, easing: E, fill: "both" }))
      const enter = b.animate(
        [{ opacity: 0, transform: "translate(calc(-50% + 50vw), -50%) rotate(14deg)" }, { opacity: 1, transform: "translate(-50%, -50%) rotate(-16deg)" }],
        { duration: 1400, delay: 150, easing: E, fill: "both" },
      )
      anims.push(enter)
      enter.finished.then(() => (ready = true)).catch(() => {})
      scr.querySelectorAll<HTMLElement>("[data-in]").forEach((el, i) => {
        anims.push(el.animate([{ opacity: 0, translate: "0 14px" }, { opacity: 1, translate: "0 0" }], { duration: 1000, delay: 600 + i * 110, easing: E, fill: "both" }))
      })
    }
    const move = (e: PointerEvent) => {
      const r = scr.getBoundingClientRect()
      const u = (e.clientX - r.left) / r.width, v = (e.clientY - r.top) / r.height
      if (e.pointerType === "mouse") { tx = u - 0.5; ty = v - 0.5 }
      if (xy.current) xy.current.textContent = `${pad(Math.round(u * 1440))} X ${pad(Math.round(v * 900))} Y`
    }
    const leave = () => { tx = 0; ty = 0 }
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!ready || reduce) return
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      b.getAnimations().forEach((a) => { a.commitStyles(); a.cancel() })
      b.style.opacity = "1"
      b.style.transform = `translate(calc(-50% + ${(cx * 20).toFixed(2)}px), calc(-50% + ${(cy * 20).toFixed(2)}px)) rotate(${(-16 + cx * 12).toFixed(2)}deg)`
    }
    scr.addEventListener("pointermove", move)
    scr.addEventListener("pointerleave", leave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      anims.forEach((a) => a.cancel())
      scr.removeEventListener("pointermove", move)
      scr.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <section className="hero ov-hero ov-surround" id="top" data-theme="night">
      <div className="ov-screen hero__screen" ref={screen}>
        <h1 className="sr">Orvelle — оригінальна парфумерія з доставкою по Україні</h1>
        <p className="ov-ghost hero__ghost" ref={ghost} aria-hidden="true">{p.word}</p>
        <div className="ov-hero__bottle hero__bottle" ref={bottle}>
          <Bottle p={p} />
        </div>
        <div className="hero__intro" data-in>
          <span className="ov-label ov-label--accent">Orvelle / Оригінальна парфумерія</span>
        </div>
        <p className="ov-corner ov-corner--l" data-in>
          <b>{p.name}</b> — свіжий деревний аромат, що звучить чистотою, ясністю і впевненістю.
        </p>
        <span className="ov-coords" ref={xy} data-in>0720 X 0450 Y</span>
        <div className="ov-corner ov-corner--r" data-in>
          <span>Гортайте колекцію</span>
          <a className="ov-btn ov-btn--icon ov-glass" href="#showcase" aria-label="До колекції"><ArrowDown /></a>
        </div>
      </div>
    </section>
  )
}
