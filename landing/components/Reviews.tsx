import { GlassCard, Reveal } from "./GlassCard"
import { Star } from "./icons"

// Демо-відгуки — замініть на реальні.
const REVIEWS = [
  { name: "Олена, Київ", initials: "О", color: "from-[#f6d6c6] to-[#e7a98f]", text: "Купувала чоловікові на річницю. Флакон з батч-кодом, перевірила — оригінал. Доставили наступного дня." },
  { name: "Максим, Львів", initials: "М", color: "from-[#cfe0ff] to-[#7fa6e8]", text: "Тримається весь день, ввечері ще чути сандал. Менеджер передзвонив за 10 хвилин після заявки." },
  { name: "Дарина, Одеса", initials: "Д", color: "from-[#d7efe4] to-[#8cc5ab]", text: "Приємно, що поклали пробники. Упаковано дуже акуратно, як у бутику." },
]

/** Відгуки: 3 картки. */
export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="mx-auto max-w-[1400px] px-3 py-16 sm:px-4 xl:px-5">
      <Reveal>
        <h2 id="reviews-title" className="text-center font-display text-[40px] font-normal text-ink sm:text-[52px]">Відгуки</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <GlassCard className="flex h-full flex-col p-7">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className={`grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${r.color} text-[16px] font-semibold text-ink/80`}>
                  {r.initials}
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-ink">{r.name}</p>
                  <div className="mt-1 flex gap-0.5 text-[#F5B83D]" role="img" aria-label="Оцінка 5 з 5">
                    {Array.from({ length: 5 }, (_, k) => <Star key={k} className="h-4 w-4" />)}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">«{r.text}»</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
