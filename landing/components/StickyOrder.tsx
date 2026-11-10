"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SITE, uah } from "@/lib/site"
import { ArrowUpRight } from "./icons"

/** Мобільна sticky-кнопка «Замовити»: зʼявляється після hero, ховається біля форми. */
export function StickyOrder() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const check = () => {
      const form = document.getElementById("order")?.getBoundingClientRect()
      const nearForm = !!form && form.top < innerHeight && form.bottom > 0
      setShow(scrollY > innerHeight * 0.7 && !nearForm)
    }
    check()
    addEventListener("scroll", check, { passive: true })
    addEventListener("resize", check)
    return () => { removeEventListener("scroll", check); removeEventListener("resize", check) }
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#order"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-50 flex h-14 items-center justify-between rounded-chip bg-brand pl-6 pr-2 text-[16px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(11,95,255,0.75)] md:hidden"
        >
          Замовити · {uah(SITE.product.price)}
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand"><ArrowUpRight className="h-4 w-4" /></span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
