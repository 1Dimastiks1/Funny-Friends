"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SITE, uah } from "@/lib/site"
import { Button } from "./Button"
import { Reveal } from "./GlassCard"

const TIERS = [
  { label: "Верхні ноти", notes: ["цитрус", "грейпфрут", "мʼята"], tone: "bg-white/70" },
  { label: "Серце", notes: ["імбир", "жасмин"], tone: "bg-white/50" },
  { label: "База", notes: ["кедр", "сандал", "пачулі"], tone: "bg-white/35" },
]

/** Про аромат: флакон зліва, справа назва, обʼєм і піраміда нот (три пігулки). */
export function NotesPyramid() {
  return (
    <section id="aroma" aria-labelledby="aroma-title" className="mx-auto max-w-[1400px] px-3 py-20 sm:px-4 xl:px-5">
      <Reveal>
        <div className="glass grid items-center gap-10 overflow-clip p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] xl:p-14">
          <div className="relative flex h-[340px] items-center justify-center sm:h-[440px]">
            <span aria-hidden="true" className="absolute inset-[12%] rounded-full bg-sky-glow/80 blur-3xl" />
            <Image
              src={SITE.product.image}
              alt="Bleu de Chanel Eau de Parfum — флакон"
              width={852}
              height={1140}
              loading="lazy"
              sizes="(max-width: 1024px) 60vw, 420px"
              className="relative h-full w-auto rotate-[-8deg] drop-shadow-[0_30px_40px_rgba(20,40,70,0.35)]"
            />
          </div>
          <div id="notes">
            <span className="rounded-chip bg-white/50 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Про аромат</span>
            <h2 id="aroma-title" className="mt-5 font-display text-[44px] font-normal leading-[1.05] text-ink sm:text-[56px]">
              {SITE.product.name}
            </h2>
            <p className="mt-2 text-[16px] font-medium text-ink-soft">
              {SITE.product.type} · {SITE.product.volume} · {uah(SITE.product.price)}
            </p>
            <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-ink-soft">
              Свіжий деревний аромат: яскравий цитрусовий старт, пряне серце й тепла база з кедру та сандалу. Свіжо вдень, глибоко ввечері.
            </p>
            <div className="mt-8 grid gap-3">
              {TIERS.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-2 rounded-chip ${t.tone} px-5 py-3 backdrop-blur`}
                  style={{ marginLeft: `${i * 6}%` }}
                >
                  <span className="min-w-[104px] text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-mute">{t.label}</span>
                  <span className="text-[16px] font-medium text-ink">{t.notes.join(" · ")}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8"><Button href="#order">Замовити</Button></div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
