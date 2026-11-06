import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Розбиває текст елемента на слова у <span>, щоб їх можна було анімувати по черзі. */
export function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return Array.from(el.querySelectorAll<HTMLElement>(".ff-w > span"))
  const walk = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent ?? "").split(/(\s+)/)
      return parts.map((p) => {
        if (!p.trim()) return document.createTextNode(p)
        const outer = document.createElement("span")
        outer.className = "ff-w"
        outer.style.display = "inline-block"
        outer.style.overflow = "hidden"
        outer.style.verticalAlign = "top"
        outer.style.padding = "0.12em 0.04em 0.1em"
        outer.style.margin = "-0.12em -0.04em -0.1em"
        const inner = document.createElement("span")
        inner.style.display = "inline-block"
        inner.textContent = p
        // background-clip:text не проходить крізь inline-block — переносимо градієнт на слово
        const clip = node.parentElement?.closest<HTMLElement>(".text-gold-gradient, .chrome")
        if (clip) inner.className = clip.classList.contains("chrome") ? "chrome" : "text-gold-gradient"
        outer.appendChild(inner)
        return outer
      })
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const kids = Array.from(node.childNodes)
      kids.forEach((k) => {
        const repl = walk(k)
        if (repl.length === 1 && repl[0] === k) return
        repl.forEach((r) => node.insertBefore(r, k))
        node.removeChild(k)
      })
    }
    return [node]
  }
  walk(el)
  el.dataset.splitDone = "1"
  return Array.from(el.querySelectorAll<HTMLElement>(".ff-w > span"))
}

/**
 * Глобальні появи на скролі:
 *  [data-split]   — заголовок з'являється по словах
 *  [data-reveal]  — блок виїжджає знизу і проявляється
 *  [data-stagger] — діти блоку з'являються по черзі
 */
export function initReveals(root: HTMLElement) {
  if (reducedMotion()) return () => {}
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      const words = splitWords(el)
      gsap.from(words, {
        yPercent: 110,
        rotate: 4,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 85%" },
      })
    })
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1.1,
        ease: "power3.out",
        delay: Number(el.dataset.reveal) || 0,
        scrollTrigger: { trigger: el, start: "top 88%" },
      })
    })
    root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
      gsap.from(el.children, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 85%" },
      })
    })
  }, root)
  return () => ctx.revert()
}
