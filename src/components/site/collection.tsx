import * as React from "react"
import { SCENTS, setScent } from "@/lib/bottle-state"
import { gsap, reducedMotion } from "@/lib/motion"
import { useShots } from "@/components/three/shots"

const pad = (n: number) => String(n + 1).padStart(2, "0")
const fmt = (n: number) => n.toLocaleString("uk-UA") + " ₴"

/**
 * Карусель ароматів. Центральний слот порожній — у ньому стоїть 3D-флакон,
 * який перефарбовується під обраний аромат. Бокові картки — сусідні аромати.
 */
export function Collection({ onAdd }: { onAdd: (name: string) => void }) {
  const [i, setI] = React.useState(0)
  const info = React.useRef<HTMLDivElement>(null)
  const n = SCENTS.length
  const go = React.useCallback((d: number) => setI((v) => (v + d + n) % n), [n])

  React.useEffect(() => {
    setScent(i)
    if (info.current && !reducedMotion())
      gsap.fromTo(info.current.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" })
  }, [i])

  const shots = useShots()
  // свайп на телефоні
  const touch = React.useRef(0)

  const s = SCENTS[i]
  const prev = SCENTS[(i - 1 + n) % n]
  const next = SCENTS[(i + 1) % n]

  return (
    <section id="collection" className="relative px-5 py-28 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h2
            data-split
            className="chrome chrome-glow font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight sm:text-8xl"
          >
            Колекція
          </h2>
          {/* лічильник 01 ——— 02 03 04 05 */}
          <div data-reveal className="mt-10 flex items-center gap-3 font-[family-name:var(--font-display)] text-xs text-white/40">
            {SCENTS.map((_, k) => (
              <React.Fragment key={k}>
                <button
                  onClick={() => setI(k)}
                  className={"transition " + (k === i ? "text-white" : "hover:text-white/80")}
                  aria-label={`Аромат ${k + 1}`}
                >
                  {pad(k)}
                </button>
                {k === i && <span className="h-px w-16 bg-white/60 sm:w-40" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div
          className="relative mt-12 grid h-[62svh] min-h-[420px] grid-cols-[1fr_1.3fr_1fr] items-center gap-3 sm:gap-6"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touch.current
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
          }}
        >
          <SideCard scent={prev} photo={shots?.scents[(i - 1 + n) % n]} side="left" onClick={() => go(-1)} />
          <div className="h-full" />
          <SideCard scent={next} photo={shots?.scents[(i + 1) % n]} side="right" onClick={() => go(1)} />
        </div>

        <div ref={info} className="relative mx-auto mt-4 max-w-md text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{s.family}</p>
          <h3 className="chrome mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase sm:text-4xl">{s.name}</h3>
          <p className="mt-3 text-sm text-white/60">{s.notes}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold">{fmt(s.price)}</span>
            <button className="btn-light !h-11" onClick={() => onAdd(s.name)}>
              У кошик
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SideCard({ scent, photo, side, onClick }: { scent: (typeof SCENTS)[number]; photo?: string; side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Попередній аромат" : "Наступний аромат"}
      className={
        "glass-card group relative h-[70%] overflow-hidden transition-transform duration-500 hover:scale-[1.03] " +
        (side === "left" ? "rounded-r-[3rem] rounded-l-2xl" : "rounded-l-[3rem] rounded-r-2xl")
      }
    >
      {photo && (
        <img
          src={photo}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:opacity-100 group-hover:grayscale-0"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span className={"absolute top-1/2 -translate-y-1/2 text-3xl text-white/70 " + (side === "left" ? "left-4" : "right-4")}>
        {side === "left" ? "‹" : "›"}
      </span>
      <span className="absolute inset-x-3 bottom-4 hidden font-[family-name:var(--font-display)] text-xs font-bold uppercase sm:block">
        {scent.name}
      </span>
    </button>
  )
}
