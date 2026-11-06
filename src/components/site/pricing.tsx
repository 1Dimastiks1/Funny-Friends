const PLANS = [
  {
    name: "Базовий",
    price: "1 490",
    perks: ["1 аромат на місяць · 8 ml", "Дизайнерські бренди", "Заміна аромату раз на місяць", "Доставка 1–3 дні"],
  },
  {
    name: "Преміум",
    price: "2 990",
    featured: true,
    perks: ["2 аромати на місяць · 8 ml", "Нішеві бренди та лімітовані серії", "Заміна будь-коли", "Персональний підбір парфумером"],
  },
  {
    name: "Елітний",
    price: "5 490",
    perks: ["Повний флакон 50 ml щомісяця", "Колекційні та архівні аромати", "Ранній доступ до новинок", "Консьєрж 24/7"],
  },
]

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10" cy="10" r="8.5" opacity=".5" />
      <path d="M6.5 10.2l2.3 2.3 4.7-4.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <h2
          data-split
          className="chrome chrome-glow text-center font-[family-name:var(--font-display)] text-6xl font-black uppercase tracking-tight sm:text-8xl"
        >
          Прайс
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-md text-center text-sm text-white/55">
          Оберіть формат підписки. Скасувати можна в будь-який момент.
        </p>

        <div data-stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={
                "glass-card relative flex flex-col rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-2 " +
                (p.featured ? "md:-translate-y-4 ring-1 ring-white/30" : "")
              }
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 font-[family-name:var(--font-display)] text-[9px] font-bold uppercase tracking-[0.15em] text-black">
                  Найпопулярніший
                </span>
              )}
              <h3 className="chrome text-center font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase">{p.name}</h3>
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <ul className="flex-1 space-y-4 text-sm text-white/70">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <Check />
                    {perk}
                  </li>
                ))}
              </ul>
              <a href="#collection" className={"mt-8 w-full " + (p.featured ? "btn-light" : "btn-dark")}>
                {p.price} ₴ / міс
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
