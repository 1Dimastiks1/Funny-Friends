import { useShots } from "@/components/three/shots"

const ALTS = ["Флакон Noir Absolu крупним планом", "Флакон Nuit Bleue", "Кришка й скло Ambre Doré"]

export function About() {
  const shots = useShots()
  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
        {/* ліва колонка лишається порожньою — сюди прилітає флакон */}
        <div className="hidden md:block" />
        <div>
          <h2
            data-split
            className="chrome chrome-glow font-[family-name:var(--font-display)] text-6xl font-black uppercase tracking-tight sm:text-8xl"
          >
            Про нас
          </h2>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/60 sm:text-base">
            <p data-reveal>
              Funny·Friends — преміальний сервіс підписки на парфуми для тих, хто цінує свій час і свій стиль. Ми даємо
              можливість носити легендарні аромати — від класичних дизайнерських до рідкісних нішевих — не обмежуючи себе одним флаконом.
            </p>
            <p data-reveal="0.1">
              Підписка відкриває доступ до колекцій, які інакше довелося б збирати роками. Новий аромат щомісяця — щоб
              завжди мати свій шлейф для будь-якого настрою. Це не просто магазин. Це клуб, де аромат стає частиною вашого образу.
            </p>
          </div>
          <div data-stagger className="mt-12 grid grid-cols-3 gap-3 sm:gap-4">
            {ALTS.map((alt, i) => (
              <div
                key={alt}
                className={"group overflow-hidden rounded-2xl border border-white/10 " + (i === 1 ? "translate-y-6" : "")}
              >
                {shots ? (
                  <img
                    src={shots.about[i]}
                    alt={alt}
                    className="aspect-[4/5] w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="aspect-[4/5] w-full animate-pulse bg-white/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
