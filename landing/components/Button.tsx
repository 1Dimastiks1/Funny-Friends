import type { ReactNode } from "react"
import { ArrowUpRight } from "./icons"

type Props = {
  href?: string
  children: ReactNode
  variant?: "primary" | "light"
  arrow?: boolean
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
}

/**
 * Кнопка-пігулка. `primary` — синя #0B5FFF з круглою білою стрілкою,
 * `light` — біла пігулка. Стрілка повертається на ховері.
 */
export function Button({ href, children, variant = "primary", arrow = variant === "primary", className = "", type = "button", disabled, onClick }: Props) {
  const cls =
    "group inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-chip text-[15px] font-semibold transition duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 " +
    (variant === "primary"
      ? `bg-brand text-white shadow-[0_14px_30px_-12px_rgba(11,95,255,0.7)] hover:bg-brand-hover ${arrow ? "pl-6 pr-1.5" : "px-6"} `
      : "bg-white px-6 text-ink hover:bg-white/90 ") +
    className
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      )}
    </>
  )
  if (href) return <a href={href} className={cls} onClick={onClick}>{inner}</a>
  return <button type={type} className={cls} disabled={disabled} onClick={onClick}>{inner}</button>
}
