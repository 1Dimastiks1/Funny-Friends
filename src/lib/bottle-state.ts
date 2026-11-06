/*
 * Спільний стан 3D-флакона. Секції сторінки пишуть сюди (через GSAP на скролі),
 * а сцена three.js щокадру читає і плавно доганяє.
 *
 * x, y — положення у частках половини екрана (-1…1, y вгору);
 * s    — висота флакона у частках висоти екрана;
 * ry   — оберт навколо вертикальної осі (рад);
 * rz   — нахил вліво/вправо (рад);
 * o    — видимість 0…1.
 */
export type Pose = { x: number; y: number; s: number; ry: number; rz: number; o: number }

export const pose: Pose = { x: 0.42, y: -0.04, s: 0.62, ry: -0.5, rz: 0.06, o: 1 }

export type Scent = {
  name: string
  family: string
  notes: string
  price: number
  /** відтінок скла */
  glass: string
  /** колір рідини */
  liquid: string
}

export const SCENTS: Scent[] = [
  {
    name: "Nuit Bleue",
    family: "Aromatic Woody",
    notes: "Грейпфрут · ладан · кедр",
    price: 7400,
    glass: "#2b4a8f",
    liquid: "#2449b5",
  },
  {
    name: "Noir Absolu",
    family: "Oriental Leather",
    notes: "Чорний перець · шкіра · оуд",
    price: 8200,
    glass: "#2a2a2e",
    liquid: "#3a3a44",
  },
  {
    name: "Ambre Doré",
    family: "Amber Spicy",
    notes: "Шафран · амбра · ваніль",
    price: 6900,
    glass: "#8a5a1e",
    liquid: "#b8741f",
  },
  {
    name: "Rose Velours",
    family: "Floral Musk",
    notes: "Троянда · лічі · мускус",
    price: 6400,
    glass: "#7a3346",
    liquid: "#a8405c",
  },
  {
    name: "Vétiver Glacé",
    family: "Fresh Green",
    notes: "Бергамот · ветивер · мох",
    price: 5900,
    glass: "#2f5a4a",
    liquid: "#3c7a5f",
  },
]

type Listener = (i: number) => void
const listeners = new Set<Listener>()
let current = 0

/** Перемикає аромат: сцена перефарбовує скло й рідину. */
export function setScent(i: number) {
  current = i
  listeners.forEach((l) => l(i))
}
export const currentScent = () => current
export function onScent(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
