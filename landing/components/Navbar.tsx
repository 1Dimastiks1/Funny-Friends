"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { NAV, SITE } from "@/lib/site"
import { Close, Menu } from "./icons"

/** Навігація всередині hero-картки: лого, якорі по центру, біла пігулка «Замовити». */
export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="relative z-30 flex h-[72px] items-center justify-between px-5 sm:px-8 xl:px-10">
      <a href="#top" className="font-display text-[22px] font-medium uppercase tracking-[0.28em] text-ink" aria-label={`${SITE.brand} — на початок`}>
        {SITE.brand}
      </a>
      <nav aria-label="Розділи сторінки" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-chip bg-white/25 p-1 backdrop-blur-md lg:flex">
        {NAV.map((l) => (
          <a key={l.href} href={l.href} className="rounded-chip px-4 py-2 text-[14px] font-medium text-ink-soft transition hover:bg-white/50 hover:text-ink">
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <a href="#order" className="hidden h-11 items-center rounded-chip bg-white px-6 text-[14px] font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 sm:inline-flex">
          Замовити
        </a>
        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-white/60 text-ink backdrop-blur lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Меню"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass absolute left-4 right-4 top-[76px] grid gap-1 p-3 lg:hidden"
          >
            {NAV.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-[16px] font-medium text-ink hover:bg-white/40">
                {l.label}
              </a>
            ))}
            <a href="#order" onClick={() => setOpen(false)} className="mt-1 rounded-2xl bg-brand px-4 py-3 text-center text-[16px] font-semibold text-white">
              Замовити
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
