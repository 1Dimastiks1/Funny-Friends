import * as React from "react"
import { ArrowRight, Check } from "lucide-react"

/**
 * Підписка на клуб (дизайн-система: EmailCapture): кнопка стає полем email,
 * підказка друкується по літері. Надсилання поки нікуди не йде — підключіть
 * свій сервіс розсилки в `onSubmit`.
 */
export function Signup() {
  const [mode, setMode] = React.useState<"button" | "form" | "done">("button")
  const [ph, setPh] = React.useState("")
  const input = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (mode === "button") return
    const text = mode === "form" ? "Введіть email — новинки й пробники першими" : "Дякуємо, напишемо на вашу пошту"
    let i = 0
    setPh("")
    const t = window.setInterval(() => {
      setPh(text.slice(0, ++i))
      if (i >= text.length) window.clearInterval(t)
    }, 60)
    if (mode === "form") input.current?.focus()
    const back = mode === "done" ? window.setTimeout(() => setMode("button"), 4000) : 0
    return () => { window.clearInterval(t); window.clearTimeout(back) }
  }, [mode])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
    setMode("done")
  }

  return (
    <section className="signup ov-club" data-theme="night">
      <span className="ov-label">Клуб Orvelle · Ранній доступ</span>
      <h2>Новинки й рідкісні аромати — раніше за всіх</h2>
      <div className="ov-club__cta">
        {mode === "button" ? (
          <button className="ov-btn ov-btn--line ov-pop" onClick={() => setMode("form")}>Отримати ранній доступ</button>
        ) : (
          <form className="ov-email ov-pop" onSubmit={onSubmit}>
            <input ref={input} type="email" required aria-label="Email" placeholder={ph} readOnly={mode === "done"} />
            <button aria-label="Надіслати">{mode === "done" ? <Check /> : <ArrowRight />}</button>
          </form>
        )}
      </div>
      <a className="ov-btn ov-btn--link" href="#catalog">Переглянути колекцію</a>
    </section>
  )
}
