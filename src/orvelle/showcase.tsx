import * as React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Bottle } from "./bottle"
import { SHOWCASE } from "./data"
import { startWater } from "./water"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HALOS = ["rgba(70, 130, 255, 0.36)", "rgba(40, 70, 200, 0.4)", "rgba(156, 194, 255, 0.2)"]

/**
 * Шоукейс (дизайн-система: Showcase): інтерфейс стоїть, а флакон при гортанні
 * перетікає в наступний — поворот, масштаб, розмиття. Прив'язано до скролу
 * через GSAP ScrollTrigger (scrub), гортати можна в обидва боки.
 */
export function Showcase() {
  const root = React.useRef<HTMLElement>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const water = React.useRef<HTMLCanvasElement>(null)
  const [step, setStep] = React.useState(0)
  const N = SHOWCASE.length

  React.useEffect(() => {
    if (!water.current || !stage.current) return
    return startWater(water.current, stage.current, { x: 0.6, y: 0.8 })
  }, [])

  useGSAP(
    () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
      const bots = gsap.utils.toArray<HTMLElement>(".sc-b")
      const names = gsap.utils.toArray<HTMLElement>(".sc-name")
      const metas = gsap.utils.toArray<HTMLElement>(".sc-meta")
      const halo = root.current?.querySelector<HTMLElement>(".ov-show__halo")
      gsap.set(bots, { xPercent: -50, yPercent: -50, rotation: -12 })
      gsap.set(bots.slice(1), { opacity: 0 })
      gsap.set([...names.slice(1), ...metas.slice(1)], { yPercent: 110 })
      halo?.style.setProperty("--halo", HALOS[0])
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "bottom bottom", scrub: reduce ? true : 1.2,
          onUpdate: (st) => setStep(Math.min(N - 1, Math.round(st.progress * (N - 1) + 0.15))),
        },
      })
      for (let i = 0; i < N - 1; i++) {
        const at = i * 1.6 + 0.3
        if (reduce) {
          tl.to(bots[i], { opacity: 0, duration: 0.5 }, at).to(bots[i + 1], { opacity: 1, duration: 0.5 }, at)
        } else {
          tl.to(bots[i], { rotation: -34, scale: 0.72, filter: "blur(14px)", opacity: 0, duration: 1, ease: "power2.in" }, at)
            .fromTo(bots[i + 1], { rotation: 26, scale: 1.25, filter: "blur(14px)", opacity: 0 },
              { rotation: -12, scale: 1, filter: "blur(0px)", opacity: 1, duration: 1, ease: "power2.out", immediateRender: false }, at + 0.15)
        }
        tl.to([names[i], metas[i]], { yPercent: -110, duration: 0.5, ease: "power3.in" }, at + 0.1)
          .fromTo([names[i + 1], metas[i + 1]], { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "power3.out", immediateRender: false }, at + 0.6)
        if (halo) tl.to(halo, { "--halo": HALOS[i + 1], duration: 1, ease: "none" }, at)
      }
      tl.to({}, { duration: 0.5 })
    },
    { scope: root },
  )

  return (
    <section className="showcase ov-show" id="showcase" ref={root} data-theme="night">
      <div className="showcase__stage" ref={stage}>
        <canvas className="ov-water" ref={water} aria-hidden="true" />
        <div className="ov-show__halo" aria-hidden="true" />
        <div className="ov-show__bottles">
          {SHOWCASE.map((p) => (
            <div className="sc-b" key={p.id}><Bottle p={p} /></div>
          ))}
        </div>
        <div className="ov-show__title">
          <span className="ov-label ov-label--accent">Orvelle / Колекція</span>
          <div className="ov-show__name">
            {SHOWCASE.map((p) => (
              <span className={"sc-name" + ((p.word ?? "").length > 4 ? " is-long" : "")} key={p.id}>{p.word}</span>
            ))}
          </div>
          <div className="ov-show__meta">
            {SHOWCASE.map((p) => (
              <span className="sc-meta ov-label" key={p.id}>{p.brand} · {p.type}</span>
            ))}
          </div>
        </div>
        <div className="ov-show__steps" aria-label={`Аромат ${step + 1} з ${N}`}>
          <span>0{step + 1}</span>
          {SHOWCASE.map((p, i) => <i key={p.id} className={i === step ? "is-on" : ""} />)}
          <span>0{N}</span>
        </div>
        <a className="ov-btn ov-btn--glass ov-glass ov-show__cta" href="#catalog">Обрати аромат</a>
        <span className="ov-show__hint">Гортайте ↓</span>
      </div>
    </section>
  )
}
