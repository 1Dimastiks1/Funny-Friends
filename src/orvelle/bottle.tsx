import type { CSSProperties } from "react"
import type { Product } from "./data"

/**
 * Флакон аромату: справжній пекшот, якщо він є (`cutout`), інакше CSS-силует
 * з дизайн-системи (`ov-flacon--*`) або нейтральний силует у тонах «етикетки».
 */
export function Bottle({ p, className = "" }: { p: Product; className?: string }) {
  const label = `${p.brand} ${p.name}`
  if (p.cutout) return <img className={`ov-shot ${className}`} src={p.cutout} alt={label} draggable={false} />
  const style = p.flacon
    ? undefined
    : ({
        "--glass": `linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(0, 0, 0, 0.42)), ${p.tone[0]}`,
        "--cap": "linear-gradient(90deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0) 60%), var(--material-lacquer)",
        "--lc": p.tone[1],
      } as CSSProperties)
  return (
    <div className={`ov-flacon${p.flacon ? ` ov-flacon--${p.flacon}` : ""} ${className}`} style={style} role="img" aria-label={label}>
      <div className="ov-flacon__cap" />
      <div className="ov-flacon__body" />
      <div className="ov-flacon__label">{p.name}</div>
    </div>
  )
}
