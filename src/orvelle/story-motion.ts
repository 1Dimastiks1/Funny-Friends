/*
 * Один rAF-цикл веде всю історію: флакон наїжджає на камеру, заява
 * проявляється з розмиття, абзац про ноти пишеться по словах, точки нот
 * спливають на флаконі, далі — картка перевірки з лічильником і список.
 * Флакон весь час «живий»: плаває, ловить нахил за вказівником.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

type Cam = { at: number; x: number; y: number; s: number; r: number; b: number; l: number }
const K = (at: number, x: number, y: number, s: number, r: number, b = 0, l = 1): Cam => ({ at, x, y, s, r, b, l })
const DESK: Cam[] = [
  K(0, 71, 49, 1, -4),
  K(0.1, 71, 49, 1.02, -4),
  K(0.28, 50, 50, 1.22, 0, 7, 0.42),
  K(0.42, 50, 50, 1.26, 0, 7, 0.42),
  K(0.5, 64, 51, 1.04, 3),
  K(0.66, 64, 51, 1.08, 3),
  K(0.76, 50, 52, 0.92, -2, 6, 0.32),
  K(1, 50, 52, 0.94, -2, 6, 0.32),
]
const PHONE: Cam[] = DESK.map((c, i) => ({ ...c, x: 50, y: [28, 28, 46, 46, 59, 59, 44, 44][i], s: c.s * 0.9 }))

const camAt = (list: Cam[], p: number): Omit<Cam, "at"> => {
  for (let i = 1; i < list.length; i++) {
    const a = list[i - 1], b = list[i]
    if (p <= b.at) {
      const t = ease(seg(p, a.at, b.at))
      const m = (k: keyof Cam) => a[k] + (b[k] - a[k]) * t
      return { x: m("x"), y: m("y"), s: m("s"), r: m("r"), b: m("b"), l: m("l") }
    }
  }
  return list[list.length - 1]
}

export function initStory(story: HTMLElement) {
  const $ = <T extends Element = HTMLElement>(s: string) => story.querySelector(s) as T
  const $$ = (s: string) => Array.from(story.querySelectorAll<HTMLElement>(s))
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches
  const cam = $("[data-cam]"), tilt = $("[data-tilt]")
  const L = [0, 1, 2, 3, 4].map((i) => $(`[data-l${i}]`))
  const hero = $("[data-hero]"), hud = $("[data-hud]"), caps = $$("[data-cap]")
  const vWords = $$(".vision .w"), vFade = $$("[data-vfade]")
  const aWords = $$(".acct .aw"), aTag = $(".acct .tagline"), spots = $$("[data-hs]")
  const fog = $("[data-fog]")
  const cred = $("[data-cred]"), card = $("[data-card]"), count = $("[data-count]")
  const spark = $<SVGPolylineElement>("[data-spark]")
  const rows = $$("[data-feats] li"), prog = $("[data-prog]")
  const sparkLen = spark.getTotalLength()
  spark.style.strokeDasharray = String(sparkLen)

  let mx = 0, my = 0, sx = 0, sy = 0
  const onMove = (e: PointerEvent) => {
    mx = e.clientX / innerWidth - 0.5
    my = e.clientY / innerHeight - 0.5
  }
  addEventListener("pointermove", onMove, { passive: true })

  const show = (el: HTMLElement, v: number) => {
    el.style.visibility = v > 0.001 ? "visible" : "hidden"
  }

  let sp = -1
  let t = 0
  let last = performance.now()
  let raf = 0
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(now - last, 64)
    last = now
    if (!still) t += dt / 1000
    const r = story.getBoundingClientRect()
    if (r.bottom < -innerHeight) return // історію вже прогорнули — не рахуємо
    const p = clamp(-r.top / (story.offsetHeight - innerHeight))
    if (sp < 0 || still) sp = p
    sp += (p - sp) * (1 - Math.pow(0.86, dt / 16.7))
    if (Math.abs(p - sp) < 0.0002) sp = p
    sx += (mx - sx) * 0.06
    sy += (my - sy) * 0.06

    // камера і живий флакон
    const c = camAt(innerWidth <= 820 ? PHONE : DESK, sp)
    cam.style.transform = `translate3d(calc(${c.x}vw - 50% + ${-sx * 18}px), calc(${c.y}vh - 50% + ${-sy * 12}px), 0) scale(${c.s}) rotate(${c.r}deg)`
    cam.style.filter = c.b > 0.05 || c.l < 0.99 ? `blur(${c.b.toFixed(2)}px) brightness(${c.l.toFixed(3)})` : "none"
    const float = Math.sin(t * 1.1) * 8
    tilt.style.transform = `translateY(${float}px) rotateY(${sx * 16}deg) rotateX(${-sy * 10}deg) rotateZ(${Math.sin(t * 0.7) * 0.8}deg)`
    tilt.style.setProperty("--shine", String(50 + sx * 60))

    // герой
    const h = seg(sp, 0.02, 0.1)
    hero.style.transform = `translate3d(${-sx * 10}px, ${-h * 80 - sy * 6}px, 0) scale(${1 + h * 0.06})`
    hero.style.filter = h > 0 ? `blur(${h * 14}px)` : "none"
    hero.style.opacity = String(1 - h)
    show(L[0], 1 - h)
    hud.style.transform = `translate3d(${sx * 26}px, ${sy * 18 - h * 40}px, 0)`
    hud.style.opacity = String(1 - seg(sp, 0.02, 0.08))
    caps.forEach((e) => (e.style.opacity = String(1 - seg(sp, 0.01, 0.05))))
    show(L[1], 1 - h)

    // заява
    const vIn = seg(sp, 0.14, 0.26), vOut = seg(sp, 0.36, 0.44)
    vWords.forEach((w, i) => {
      const k = clamp(vIn * 1.6 - i * 0.08)
      w.style.transform = `translate3d(0, ${(1 - k) * 30 - vOut * 60}px, 0)`
      w.style.filter = `blur(${(1 - k) * 12 + vOut * 14}px)`
      w.style.opacity = String(k * (1 - vOut))
    })
    vFade.forEach((e) => {
      e.style.opacity = String(clamp(vIn * 2 - 0.6) * (1 - vOut))
      e.style.transform = `translateY(${-vOut * 50}px)`
    })
    show(L[2], vIn * (1 - vOut))

    // туман прибирає фон за текстом зліва
    const fg = ease(seg(sp, 0.42, 0.5))
    fog.style.opacity = String(fg)
    fog.style.transform = `translate3d(${(fg - 1) * 18 + sx * -10}vw, ${sy * -6}px, 0)`
    show(fog, fg)

    // ноти
    const aIn = seg(sp, 0.46, 0.56), aOut = seg(sp, 0.66, 0.71)
    aWords.forEach((w, i) => {
      const k = clamp(aIn * 2.2 - (i / aWords.length) * 1.2)
      w.style.opacity = String((0.15 + 0.85 * k) * (1 - aOut))
      w.style.filter = `blur(${(1 - k) * 6 + aOut * 10}px)`
    })
    aTag.style.opacity = String(clamp(aIn * 3) * (1 - aOut))
    spots.forEach((s, i) => {
      const k = seg(sp, 0.5 + i * 0.02, 0.54 + i * 0.02)
      s.style.transform = `translate3d(calc(-11px + ${sx * -30}px), calc(-11px + ${sy * -20}px), 0) scale(${k * (1 - aOut)})`
      show(s, k * (1 - aOut))
    })
    show(L[3], aIn * (1 - aOut))

    // перевірка
    const sIn = seg(sp, 0.73, 0.82), cIn = ease(seg(sp, 0.75, 0.86))
    cred.style.opacity = String(sIn)
    cred.style.transform = `translateY(${(1 - sIn) * 30}px)`
    cred.style.filter = `blur(${(1 - sIn) * 8}px)`
    card.style.opacity = String(cIn)
    card.style.transform = `translate3d(${sx * -14}px, ${(1 - cIn) * 60 + sy * -10}px, 0) rotateY(${sx * 8}deg) rotateX(${-sy * 8}deg)`
    count.textContent = Math.round(12480 * seg(sp, 0.76, 0.9)).toLocaleString("uk-UA").replace(/ /g, " ")
    spark.style.strokeDashoffset = String(sparkLen * (1 - seg(sp, 0.77, 0.92)))
    rows.forEach((row, i) => {
      const k = ease(seg(sp, 0.76 + i * 0.025, 0.82 + i * 0.025))
      row.style.opacity = String(k)
      row.style.transform = `translateX(${(1 - k) * 40}px)`
    })
    show(L[4], sIn)

    prog.style.transform = `scaleX(${sp})`
  }
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    removeEventListener("pointermove", onMove)
  }
}
