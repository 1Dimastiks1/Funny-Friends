"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

/** Скляна картка; `hover` — підйом на 4px. */
export function GlassCard({ className = "", hover = true, children, ...rest }: HTMLMotionProps<"div"> & { hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`glass ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Поява при скролі (один раз). */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
