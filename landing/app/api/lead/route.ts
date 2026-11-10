import { NextResponse } from "next/server"

type Lead = { name?: unknown; phone?: unknown; product?: unknown }

/** Приймає заявку з форми. Поки що лише логує її в консоль сервера. */
export async function POST(req: Request) {
  let body: Lead
  try {
    body = (await req.json()) as Lead
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 })
  }
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : ""
  const phone = typeof body.phone === "string" ? body.phone.replace(/[^\d+]/g, "") : ""
  const product = typeof body.product === "string" ? body.product.slice(0, 120) : ""
  if (name.length < 2 || !/^\+380\d{9}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 })
  }

  const lead = { name, phone, product, at: new Date().toISOString() }
  console.log("[lead]", lead)

  // TODO: надіслати заявку в Telegram-бот.
  // 1) Створіть бота через @BotFather, отримайте токен; дізнайтеся chat_id менеджера.
  // 2) Додайте в .env.local: TELEGRAM_BOT_TOKEN=... і TELEGRAM_CHAT_ID=...
  // 3) Розкоментуйте:
  // await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: `Нова заявка\n${name}\n${phone}\n${product}` }),
  // })

  return NextResponse.json({ ok: true })
}
