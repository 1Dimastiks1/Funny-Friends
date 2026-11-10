"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SITE, uah } from "@/lib/site"
import { Button } from "./Button"
import { Reveal } from "./GlassCard"
import { Check, Instagram, Telegram } from "./icons"

/** Маска +380 (XX) XXX-XX-XX: зберігаємо лише 9 цифр після коду країни. */
const digitsOf = (v: string) => {
  let d = v.replace(/\D/g, "")
  if (d.startsWith("380")) d = d.slice(3)
  else if (d.startsWith("0")) d = d.slice(1)
  return d.slice(0, 9)
}
const formatPhone = (d: string) => {
  if (!d) return ""
  let s = "+380 (" + d.slice(0, 2)
  if (d.length >= 2) s += ")"
  if (d.length > 2) s += " " + d.slice(2, 5)
  if (d.length > 5) s += "-" + d.slice(5, 7)
  if (d.length > 7) s += "-" + d.slice(7, 9)
  return s
}

type Status = "idle" | "sending" | "done" | "error"

export function OrderForm() {
  const [name, setName] = useState("")
  const [digits, setDigits] = useState("")
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [status, setStatus] = useState<Status>("idle")

  const validate = () => {
    const e: typeof errors = {}
    if (name.trim().length < 2) e.name = "Вкажіть імʼя (щонайменше 2 літери)"
    if (digits.length !== 9) e.phone = "Вкажіть номер повністю: +380 (XX) XXX-XX-XX"
    setErrors(e)
    return !e.name && !e.phone
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus("sending")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: "+380" + digits, product: `${SITE.product.name} ${SITE.product.type} ${SITE.product.volume}` }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  const field = "h-14 w-full rounded-2xl border bg-white/70 px-5 text-[16px] text-ink placeholder:text-ink-mute/80 outline-none transition focus:bg-white focus:border-brand"

  return (
    <section id="order" aria-labelledby="order-title" className="mx-auto max-w-[1400px] px-3 py-16 sm:px-4 xl:px-5">
      <Reveal>
        <div className="glass relative overflow-clip p-6 sm:p-10 xl:p-14">
          <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-glow/70 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 id="order-title" className="max-w-[560px] text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[44px]">
                Залиште заявку, і ми звʼяжемось <span className="font-extralight">за 15 хвилин</span>
              </h2>
              <p className="mt-4 text-[16px] text-ink-soft">
                {SITE.product.name} {SITE.product.type}, {SITE.product.volume} — <b className="font-semibold text-ink">{uah(SITE.product.price)}</b>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-chip bg-white px-5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5">
                  <Telegram className="h-5 w-5 text-[#229ED9]" /> Написати в Telegram
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-chip bg-white/60 px-5 text-[15px] font-semibold text-ink transition hover:-translate-y-0.5">
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start justify-center rounded-card bg-white/70 p-8"
                  role="status"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white"><Check className="h-7 w-7" /></span>
                  <h3 className="mt-5 text-[26px] font-semibold text-ink">Дякуємо, заявку отримано</h3>
                  <p className="mt-2 text-[15px] text-ink-soft">Менеджер передзвонить вам протягом 15 хвилин у робочий час.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, scale: 0.96 }} className="grid content-start gap-4">
                  <div>
                    <label htmlFor="lead-name" className="mb-2 block text-[14px] font-semibold text-ink">Імʼя</label>
                    <input
                      id="lead-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Як до вас звертатися"
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "lead-name-err" : undefined}
                      className={`${field} ${errors.name ? "border-[#C2362F]" : "border-white/70"}`}
                    />
                    {errors.name && <p id="lead-name-err" className="mt-2 text-[13px] font-medium text-[#B42A23]">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="mb-2 block text-[14px] font-semibold text-ink">Телефон</label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+380 (__) ___-__-__"
                      value={formatPhone(digits)}
                      onChange={(e) => setDigits(digitsOf(e.target.value))}
                      onFocus={() => !digits && setDigits("")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "lead-phone-err" : undefined}
                      className={`${field} ${errors.phone ? "border-[#C2362F]" : "border-white/70"}`}
                    />
                    {errors.phone && <p id="lead-phone-err" className="mt-2 text-[13px] font-medium text-[#B42A23]">{errors.phone}</p>}
                  </div>
                  <Button type="submit" className="mt-2 w-full justify-between" disabled={status === "sending"}>
                    {status === "sending" ? "Надсилаємо…" : "Замовити"}
                  </Button>
                  {status === "error" && <p className="text-[13px] font-medium text-[#B42A23]" role="alert">Не вдалося надіслати. Спробуйте ще раз або напишіть нам у Telegram.</p>}
                  <p className="text-[12px] leading-relaxed text-ink-mute">Натискаючи «Замовити», ви погоджуєтеся на обробку даних для звʼязку щодо замовлення.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
