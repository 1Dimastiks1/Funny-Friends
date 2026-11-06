const SPECS = [
  { k: "Концентрація", v: "Parfum 22%", pos: "md:left-[6%] md:top-[24%]" },
  { k: "Стійкість", v: "12+ годин", pos: "md:right-[6%] md:top-[24%] md:text-right" },
  { k: "Шлейф", v: "Глибокий", pos: "md:left-[6%] md:bottom-[22%]" },
  { k: "Об'єм", v: "50 / 100 ml", pos: "md:right-[6%] md:bottom-[22%] md:text-right" },
]

/** Порожня сцена, де флакон виходить на передній план і робить повний оберт. */
export function Showcase() {
  return (
    <section id="showcase" className="relative flex min-h-[110svh] items-center justify-center overflow-hidden px-5">
      <span
        data-reveal
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-[family-name:var(--font-display)] text-[15vw] font-black uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]"
      >
        Nuit Bleue
      </span>

      <div className="absolute inset-x-5 bottom-10 grid grid-cols-2 gap-6 md:inset-0 md:block">
        {SPECS.map((s, i) => (
          <div key={s.k} data-reveal={i * 0.1} className={"md:absolute " + s.pos}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{s.k}</div>
            <div className="chrome mt-2 font-[family-name:var(--font-display)] text-lg font-bold sm:text-2xl">{s.v}</div>
            <div className={"mt-3 hidden h-px w-24 bg-gradient-to-r from-white/40 to-transparent md:block " + (s.pos.includes("text-right") ? "ml-auto rotate-180" : "")} />
          </div>
        ))}
      </div>
    </section>
  )
}
