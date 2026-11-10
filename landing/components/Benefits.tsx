import { GlassCard, Reveal } from "./GlassCard"
import { Gift, Return, Shield, Truck } from "./icons"

const ITEMS = [
  { Icon: Shield, title: "100% оригінал", text: "Лише офіційні поставки. До кожного флакона — чек і батч-код." },
  { Icon: Truck, title: "Швидка доставка", text: "Новою Поштою по всій Україні за 1–2 дні, оплата при отриманні." },
  { Icon: Gift, title: "Пробники в подарунок", text: "До кожного замовлення додаємо пробники інших ароматів." },
  { Icon: Return, title: "Повернення 14 днів", text: "Не підійшов аромат у закритій упаковці — повернемо гроші." },
]

/** Чому ми: 4 скляні картки. */
export function Benefits() {
  return (
    <section id="why" aria-labelledby="why-title" className="mx-auto max-w-[1400px] px-3 py-16 sm:px-4 xl:px-5">
      <Reveal>
        <h2 id="why-title" className="text-center font-display text-[40px] font-normal text-ink sm:text-[52px]">Чому ми</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ITEMS.map(({ Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <GlassCard className="h-full p-7">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/60 text-brand">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-[20px] font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{text}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
