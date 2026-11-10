# Orvelle — лендінг Bleu de Chanel

Односторінковий лендінг для продажу одного аромату: glassmorphism, світлий блакитний градієнт, велике напівпрозоре слово BLEU за флаконом. Єдина дія — залишити заявку (імʼя + телефон) або написати в Telegram.

Стек: Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · next/font (Bodoni Moda + Manrope).

## Запуск

```bash
cd landing
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-збірка
npm run start    # запуск зібраної версії
```

## Структура

```
app/
  layout.tsx         шрифти, SEO, OG-теги
  page.tsx           секції + schema.org Product
  globals.css        скло, градієнт hero, маски
  api/lead/route.ts  приймає заявку (поки логує в консоль, TODO: Telegram-бот)
components/
  Navbar  Hero  GlassCard  Button  NotesPyramid  Benefits  Reviews  OrderForm  Footer  StickyOrder  icons
lib/site.ts          ціна, контакти, посилання — усе, що треба замінити
tailwind.config.ts   кольори, радіуси, тіні, анімація плавання
public/bottle.png    фото флакона (прозорий фон)
```

## Що замінити перед запуском

| Що | Де |
|---|---|
| Фото флакона (PNG/WebP на прозорому фоні, ~850×1140) | `public/bottle.png` |
| Ціна | `lib/site.ts` → `product.price` |
| Телефон, email | `lib/site.ts` → `phone`, `email` |
| Telegram, Viber, Instagram | `lib/site.ts` → `telegram`, `viber`, `instagram` |
| Кількість клієнтів і рейтинг у hero | `lib/site.ts` → `clients`, `rating` |
| Домен (для OG і schema.org) | `lib/site.ts` → `url` |
| Демо-відгуки | `components/Reviews.tsx` |
| Відправка заявок | `app/api/lead/route.ts` (інструкція в TODO) + `.env.local` з `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
