# Funny-Friends
## Нішевий інтернет-магазин преміум-парфумерії

Ultra-Luxury Liquid Glass & Gold — повна структура, wireframes та High-Fi UI.

---

## Структура проєкту

```
Funny-Friends/
├── docs/
│   ├── SITEMAP.md          # Повна карта сайту
│   └── STYLE-GUIDE.md      # Style Guide & Design System
├── styles/
│   ├── design-tokens.css   # CSS Variables (системні токени)
│   ├── base.css            # Base styles & typography
│   └── components.css      # UI компоненти (Header, Cards, Cart...)
├── wireframes/             # Low-Fi wireframes
│   ├── index.html          # Навігація по wireframes
│   ├── desktop-home.html
│   ├── mobile-home.html
│   ├── desktop-catalog.html
│   ├── mobile-catalog.html
│   ├── desktop-pdp.html
│   ├── mobile-pdp.html
│   ├── cart-drawer.html
│   └── brand-page.html
├── js/
│   └── app.js              # Cart drawer, volume toggle, wishlist
├── index.html              # High-Fi: Головна
├── catalog.html            # High-Fi: Каталог
├── product.html            # High-Fi: PDP
└── checkout.html           # High-Fi: 3-step Checkout
```

---

## Як переглянути

Відкрийте в браузері:

- **High-Fi UI:** `index.html` — головна сторінка з повним Liquid Glass дизайном
- **Wireframes:** `wireframes/index.html` — навігація по Low-Fi макетам
- **Style Guide:** `docs/STYLE-GUIDE.md` — документація дизайн-системи

```bash
# Локальний сервер (опційно)
cd "/Users/dimastiks/Documents/ FRONTEND/Funny-Friends"
python3 -m http.server 8080
# → http://localhost:8080
```

---

## Дизайн-система

| Елемент | Значення |
|---------|----------|
| Фон | `#050505` (Obsidian Black) |
| Скло | `rgba(18,18,18,0.65)` + `blur(24px)` |
| Акцент | `#D4AF37` (Liquid Gold) |
| Шампань | `#E5C158` |
| Serif | Cormorant Garamond |
| Sans | Inter |

---

## Сторінки High-Fi

| Сторінка | Опис |
|----------|------|
| `index.html` | Hero, категорії, бестселери, Discovery Sets, відгуки, Cart Drawer |
| `catalog.html` | Sticky фільтри (ноти, концентрація, об'єм, ціна), 3-col grid |
| `product.html` | 3D флакон, ольфакторна піраміда, volume selector, пробник |
| `checkout.html` | 3 кроки: адреса → доставка → Apple Pay / картка |

---

## Функціонал (JS)

- Slide-over Cart Drawer з прогрес-баром безкоштовної доставки
- Перемикач об'єму 30/50/100 ml з live оновленням ціни
- Wishlist toggle на картках товарів
- 3-step Checkout flow

---

*Funny-Friends © 2026*
