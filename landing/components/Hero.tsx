"use client"

import Image from "next/image"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import type { PointerEvent } from "react"
import { SITE, uah } from "@/lib/site"
import { Button } from "./Button"
import { Navbar } from "./Navbar"
import { ArrowUpRight, Shield } from "./icons"

const EASE = [0.16, 1, 0.3, 1] as const
const AVATARS = [
  { i: "О", c: "from-[#f6d6c6] to-[#e7a98f]" },
  { i: "М", c: "from-[#cfe0ff] to-[#7fa6e8]" },
  { i: "А", c: "from-[#e6e0f6] to-[#a99bd8]" },
  { i: "Д", c: "from-[#d7efe4] to-[#8cc5ab]" },
]

const list = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }

export function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const bottleX = useTransform(sx, (v) => v * 22)
  const bottleY = useTransform(sy, (v) => v * 14)
  const wordX = useTransform(sx, (v) => v * -12)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <section id="top" className="p-3 sm:p-4 xl:p-5">
      <div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="hero-card relative overflow-clip rounded-[28px] sm:rounded-hero xl:h-[max(760px,calc(100svh-40px))] xl:max-h-[960px]"
      >
        <Navbar />

        {/* Велике слово й флакон */}
        <div className="relative h-[440px] sm:h-[560px] xl:absolute xl:inset-x-0 xl:top-[72px] xl:bottom-0 xl:h-auto">
          <motion.p
            aria-hidden="true"
            style={{ x: wordX }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.35, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="ghost-word pointer-events-none absolute inset-x-0 top-[2%] select-none whitespace-nowrap text-center font-display text-[128px] font-normal leading-none tracking-[0.01em] text-white sm:text-[220px] lg:text-[300px] xl:top-[1%] xl:text-[400px]"
          >
            BLEU
          </motion.p>

          <motion.div
            style={{ x: bottleX, y: bottleY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
            className="absolute left-1/2 top-[14%] h-[78%] sm:top-[10%] sm:h-[82%] xl:top-[7%] xl:h-[64%]"
          >
            <div className="h-full -translate-x-1/2">
            <div className="relative h-full animate-float">
              <Image
                src={SITE.product.image}
                alt="Флакон Bleu de Chanel Eau de Parfum 100 мл"
                width={852}
                height={1140}
                priority
                sizes="(max-width: 768px) 70vw, 480px"
                className="h-full w-auto -rotate-6 drop-shadow-[0_40px_45px_rgba(20,40,70,0.4)]"
              />
              {/* блік на склі */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-[30%] left-[18%] w-[10%] -rotate-6 rounded-full bg-white/25 blur-md" />
            </div>
            </div>
          </motion.div>
        </div>

        {/* Лівий нижній блок */}
        <div className="relative z-10 px-5 pb-8 sm:px-8 xl:absolute xl:bottom-10 xl:left-10 xl:max-w-[470px] xl:p-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[56px] xl:text-[60px]"
          >
            Аромат, що <span className="block font-extralight">запамʼятовується</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-4 max-w-[380px] text-[16px] leading-relaxed text-ink-soft"
          >
            Оригінальна парфумерія з гарантією. Доставка по Україні.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Button href="#order">Замовити</Button>
            <Button href="#aroma" variant="light">Дізнатись більше</Button>
          </motion.div>
        </div>

        {/* Правий нижній блок */}
        <motion.div
          variants={list}
          initial="hidden"
          animate="show"
          className="relative z-10 px-5 pb-6 sm:px-8 sm:pb-8 xl:absolute xl:bottom-10 xl:right-10 xl:p-0"
        >
          <motion.div variants={item} className="mb-4 flex items-center gap-3 xl:justify-end">
            <div className="flex -space-x-3" aria-hidden="true">
              {AVATARS.map((a) => (
                <span key={a.i} className={`grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${a.c} text-[14px] font-semibold text-ink/80`}>
                  {a.i}
                </span>
              ))}
            </div>
            <span className="rounded-chip bg-white/45 px-4 py-2 text-[13px] font-medium text-ink backdrop-blur">
              Задоволених клієнтів <b className="font-bold">{SITE.clients}</b>
            </span>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:items-end">
            <motion.div variants={item} whileHover={{ y: -4 }} className="glass flex flex-col justify-between p-5 xl:h-[176px] xl:w-[204px]">
              <div className="flex items-start justify-between gap-3">
                <span className="whitespace-nowrap rounded-chip bg-white/60 px-3 py-1 text-[12px] font-semibold text-ink">100% оригінал</span>
                <Shield className="h-6 w-6 shrink-0 text-ink" />
              </div>
              <p className="mt-6 text-[16px] font-semibold leading-snug text-ink">Гарантія автентичності</p>
            </motion.div>

            <motion.a
              variants={item}
              whileHover={{ y: -4 }}
              href="#order"
              className="notch group relative flex flex-col rounded-card bg-white p-5 shadow-lift sm:row-span-2 xl:h-[236px] xl:w-[212px]"
              aria-label={`Замовити ${SITE.product.name} ${SITE.product.volume} за ${uah(SITE.product.price)}`}
            >
              <div className="flex h-[96px] items-center justify-center">
                <Image src={SITE.product.image} alt="" width={852} height={1140} className="h-full w-auto -rotate-6" sizes="80px" />
              </div>
              <p className="mt-3 text-[14px] font-semibold leading-snug text-ink">{SITE.product.name} EDP {SITE.product.volume}</p>
              <div className="mt-auto flex items-end justify-between pt-3">
                <span className="text-[22px] font-bold tracking-tight text-ink">{uah(SITE.product.price)}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>
            </motion.a>

            <motion.div variants={item} whileHover={{ y: -4 }} className="glass flex flex-col justify-between p-5 xl:h-[176px] xl:w-[170px]">
              <span className="font-display text-[56px] font-normal leading-none text-ink">{SITE.rating}</span>
              <p className="mt-4 text-[13px] font-medium leading-snug text-ink-soft">Середня оцінка клієнтів</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
