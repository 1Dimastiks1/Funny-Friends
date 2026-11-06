import * as React from "react"
import { MetalButton } from "@/components/ui/liquid-glass-button"
import { gsap, reducedMotion, splitWords } from "@/lib/motion"

const LINKS = [
  { href: "#hero", label: "Головна" },
  { href: "#about", label: "Про нас" },
  { href: "#collection", label: "Колекція" },
  { href: "#footer", label: "Контакти" },
]

export function Nav() {
  const [active, setActive] = React.useState("#hero")
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const mid = window.innerHeight * 0.4
      for (const l of [...LINKS].reverse()) {
        const el = document.querySelector(l.href)
        if (el && el.getBoundingClientRect().top < mid) {
          setActive(l.href)
          break
        }
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        className={
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 " +
          (scrolled ? "glass-card" : "border border-transparent")
        }
      >
        <a href="#hero" className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight sm:text-xl">
          <span className="chrome">Funny·Friends</span>
        </a>
        <nav className="hidden items-center gap-1 rounded-xl border border-white/15 bg-black/40 p-1 backdrop-blur md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                "rounded-lg px-4 py-2 font-[family-name:var(--font-display)] text-[10px] font-bold uppercase tracking-[0.12em] transition " +
                (active === l.href ? "bg-white text-black" : "text-white/70 hover:text-white")
              }
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#pricing" className="btn-light !h-9 !px-4 !text-[9px] sm:!px-5">Реєстрація</a>
          <a href="#pricing" className="btn-dark hidden !h-9 !px-5 !text-[9px] sm:inline-flex">Увійти</a>
        </div>
      </div>
    </header>
  )
}

export function Hero() {
  const root = React.useRef<HTMLElement>(null)

  React.useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    const ctx = gsap.context(() => {
      const words = splitWords(q(".hr-title")[0] as HTMLElement)
      if (reducedMotion()) return
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(q(".hr-tag"), { y: 20, opacity: 0, duration: 0.8 }, 0.3)
        .from(words, { yPercent: 115, duration: 1.2, stagger: 0.07 }, 0.4)
        .from(q(".hr-sub, .hr-cta, .hr-stat"), { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 1)
      gsap.to(q(".hr-copy"), {
        yPercent: -25,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={root} className="relative flex min-h-[120svh] items-end pb-[10vh] pt-28 sm:min-h-svh sm:items-center sm:pb-0">
      <div className="hr-copy mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-[46rem]">
          <p className="hr-tag mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/70 backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#7ea0ff] shadow-[0_0_10px_#7ea0ff]" />
            Підписка на нішеву парфумерію
          </p>
          <h1 className="hr-title chrome chrome-glow font-[family-name:var(--font-display)] text-[10vw] font-black uppercase leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]">
            Аромат, який належить тобі
          </h1>
          <p className="hr-sub mt-6 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
            Funny·Friends — преміум-підписка на парфуми. Щомісяця новий флакон із колекцій нішевих і дизайнерських брендів:
            носіть, відкривайте, міняйте — без переплат за повний об'єм.
          </p>
          <div className="hr-cta mt-9 flex flex-wrap items-center gap-3">
            <MetalButton onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
              ОФОРМИТИ ПІДПИСКУ
            </MetalButton>
            <a href="#collection" className="btn-dark">Переглянути колекцію</a>
          </div>
          <div className="mt-12 hidden gap-10 sm:flex">
            {[
              ["120+", "ароматів"],
              ["12 год", "стійкість"],
              ["4.9★", "відгуки"],
            ].map(([n, l]) => (
              <div key={l} className="hr-stat">
                <div className="chrome font-[family-name:var(--font-display)] text-2xl font-extrabold">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
