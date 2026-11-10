/**
 * Вода й світні частинки (дизайн-система: Showcase). Один canvas 2D:
 * еліптичні брижі від основи флакона кожні 1.5 s і від курсора, 70 частинок,
 * що спливають і мерехтять. Малює лише поки сцена на екрані.
 */
export function startWater(cv: HTMLCanvasElement, host: HTMLElement, at = { x: 0.6, y: 0.8 }) {
  const ctx = cv.getContext("2d")
  if (!ctx) return () => {}
  const cs = getComputedStyle(host)
  const rgb = (name: string, fallback: string) => {
    const h = (cs.getPropertyValue(name).trim() || fallback).replace("#", "")
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",")
  }
  const RIP = rgb("--ripple", "#9cc2ff")
  const PAR = rgb("--particle", "#cfe0ff")
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
  const dpr = Math.min(devicePixelRatio || 1, 2)
  let W = 0
  let H = 0
  type Ripple = { x: number; y: number; r: number; max: number }
  let rip: Ripple[] = []
  const par = Array.from({ length: 70 }, () => ({
    x: Math.random(), y: Math.random(), s: 0.6 + Math.random() * 1.8, v: 0.004 + Math.random() * 0.012, ph: Math.random() * 6.3,
  }))
  let last = 0
  let lastPtr = 0
  let prev = 0
  let raf = 0
  let visible = false

  const size = () => {
    const r = host.getBoundingClientRect()
    W = r.width
    H = r.height
    cv.width = W * dpr
    cv.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  const ripple = (x: number, y: number, max = 260) => {
    rip.push({ x, y, r: 4, max })
    if (rip.length > 14) rip.shift()
  }
  const onMove = (e: PointerEvent) => {
    const t = performance.now()
    if (e.pointerType !== "mouse" || t - lastPtr < 140) return
    lastPtr = t
    const r = host.getBoundingClientRect()
    ripple(e.clientX - r.left, e.clientY - r.top, 140)
  }

  const frame = (t: number) => {
    raf = requestAnimationFrame(frame)
    if (!visible) return
    const dt = Math.min((t - (prev || t)) / 1000, 0.05)
    prev = t
    if (t - last > 1500) {
      last = t
      ripple(W * at.x, H * at.y, Math.min(320, W * 0.35))
    }
    ctx.clearRect(0, 0, W, H)
    ctx.lineWidth = 1.2
    for (const p of rip) {
      if (!reduce) p.r += 46 * dt
      const a = Math.max(0, 1 - p.r / p.max)
      for (let k = 0; k < 3; k++) {
        const rr = p.r - k * 14
        if (rr <= 0) continue
        ctx.strokeStyle = `rgba(${RIP},${(a * (0.42 - k * 0.12)).toFixed(3)})`
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, rr, rr * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
    rip = rip.filter((p) => p.r < p.max)
    ctx.shadowColor = `rgba(${PAR},0.9)`
    ctx.shadowBlur = 8
    for (const p of par) {
      if (!reduce) {
        p.y -= p.v * dt * 4
        if (p.y < -0.02) {
          p.y = 1.02
          p.x = Math.random()
        }
      }
      const a = 0.2 + 0.7 * (0.5 + 0.5 * Math.sin(t / 900 + p.ph))
      ctx.fillStyle = `rgba(${PAR},${a.toFixed(3)})`
      ctx.beginPath()
      ctx.arc(p.x * W, p.y * H, p.s, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.shadowBlur = 0
  }

  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(host)
  size()
  addEventListener("resize", size)
  host.addEventListener("pointermove", onMove)
  raf = requestAnimationFrame(frame)
  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    removeEventListener("resize", size)
    host.removeEventListener("pointermove", onMove)
  }
}
