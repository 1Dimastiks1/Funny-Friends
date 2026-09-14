# Funny-Friends — Sitemap
## Нішевий інтернет-магазин преміум-парфумерії

---

## 1. Головна навігація (Primary)

```
/                           → Головна (Home)
/catalog                    → Каталог (Shop All)
/brand                      → Про бренд (Our Story)
/discovery-sets             → Конструктор наборів Discovery Sets
/scent-quiz                 → Тест на аромат (Scent Finder Quiz)
/contact                    → Контакти & Boutiques
```

---

## 2. Каталог — ієрархія категорій

```
/catalog
├── /catalog/all                          → Усі аромати
├── /catalog/olfactory-families           → Ольфакторні сімейства
│   ├── /catalog/olfactory-families/floral
│   ├── /catalog/olfactory-families/woody
│   ├── /catalog/olfactory-families/oriental
│   ├── /catalog/olfactory-families/fresh
│   ├── /catalog/olfactory-families/gourmand
│   └── /catalog/olfactory-families/chypre
├── /catalog/notes                          → За нотами
│   ├── /catalog/notes/oud
│   ├── /catalog/notes/vanilla
│   ├── /catalog/notes/amber
│   ├── /catalog/notes/citrus
│   ├── /catalog/notes/rose
│   └── /catalog/notes/sandalwood
├── /catalog/concentration                  → За концентрацією
│   ├── /catalog/concentration/edp          → Eau de Parfum
│   ├── /catalog/concentration/parfum       → Extrait de Parfum
│   └── /catalog/concentration/edt          → Eau de Toilette
├── /catalog/collections                    → Колекції
│   ├── /catalog/collections/signature
│   ├── /catalog/collections/limited-edition
│   └── /catalog/collections/artisan
├── /catalog/bestsellers                    → Бестселери
├── /catalog/new-arrivals                   → Новинки
└── /catalog/gift-sets                      → Подарункові набори
```

---

## 3. Картка товару (PDP)

```
/product/[slug]                             → Детальна сторінка аромату
/product/[slug]/reviews                     → Відгуки (якор #reviews)
/product/[slug]/ingredients                 → Склад & INCI (якор #ingredients)
```

**Приклад URL:** `/product/nocturne-oud-parfum`

**Динамічні варіанти (query params):**
- `?volume=30|50|100` — об'єм флакона
- `?sample=2ml` — додати пробник

---

## 4. Про бренд

```
/brand                                    → Історія & філософія
/brand/perfumers                          → Майстри-парфумери
/brand/sourcing                           → Видобуток рідкісних компонентів
/brand/craftsmanship                      → Процес створення
/brand/sustainability                     → Етика & сталість
/brand/press                              → Прес-кімната
```

---

## 5. Кошик & Checkout (Overlay / Modal Flow)

```
/cart                                       → Повна сторінка кошика (fallback)
/checkout                                   → 3-кроковий Checkout
/checkout/address                           → Крок 1: Адреса доставки
/checkout/shipping                          → Крок 2: Спосіб доставки
/checkout/payment                           → Крок 3: Оплата
/checkout/confirmation/[orderId]            → Підтвердження замовлення
```

**Slide-over Drawer (не окрема URL):**
- Відкривається з будь-якої сторінки через кнопку «Кошик (N)»
- Містить: line items, progress bar безкоштовної доставки, селектор пробника, CTA до checkout

---

## 6. Обліковий запис користувача

```
/account                                    → Dashboard
/account/orders                             → Історія замовлень
/account/orders/[id]                        → Деталі замовлення
/account/wishlist                           → Wishlist (обране)
/account/addresses                          → Адреси доставки
/account/scent-profile                      → Профіль ароматів (результати quiz)
/account/settings                           → Налаштування & валюта
/account/login                              → Вхід
/account/register                           → Реєстрація
/account/forgot-password                    → Відновлення пароля
```

---

## 7. Допоміжні & SEO-сторінки

```
/search?q=                                  → Результати пошуку (live + full page)
/scent-quiz                                 → Інтерактивний тест на аромат
/scent-quiz/results                         → Результати тесту
/faq                                        → FAQ
/shipping-returns                           → Доставка & повернення
/authenticity-guarantee                     → Гарантія автентичності
/privacy                                    → Політика конфіденційності
/terms                                      → Умови використання
/cookie-policy                              → Cookies
/404                                        → Сторінка не знайдена
/500                                        → Помилка сервера
```

---

## 8. Компоненти глобального рівня (Global UI)

| Компонент | Тригер | Опис |
|-----------|--------|------|
| Header (Floating Glass) | Завжди | Logo, Search, Currency, Wishlist, Cart |
| Search Autocomplete | Focus на search | Live suggestions: products, notes, collections |
| Cart Drawer | «Кошик (N)» | Slide-over з прогрес-баром доставки |
| Mini Wishlist | Heart icon | Quick peek або redirect to /account/wishlist |
| Mobile Nav | Hamburger | Full-screen glass menu |
| Footer Trust Block | Footer | Автентичність, пробники, доставка |
| Cookie Banner | First visit | GDPR consent |
| Newsletter Modal | Exit intent / scroll | Підписка на новинки |

---

## 9. User Flows

### Flow A: Швидка покупка
```
Home → Product Card «+ У кошик» → Cart Drawer → Checkout (3 steps) → Confirmation
```

### Flow B: Discovery через quiz
```
Home Hero «Пройти тест» → Scent Quiz (5–7 питань) → Results → Catalog (filtered) → PDP → Cart
```

### Flow C: Discovery Set Builder
```
Home Discovery Block → /discovery-sets → Select 3–5 samples → Add to Cart → Checkout
```

### Flow D: Фільтрація в каталозі
```
/catalog → Sticky Filters (notes, concentration, volume, price) → Grid update → PDP
```

---

## 10. Meta & Structured Data

- **Product schema** на PDP (price, availability, reviews)
- **BreadcrumbList** на catalog & PDP
- **Organization** на /brand
- **FAQPage** на /faq
- **Open Graph** images: 3D bottle renders per product

---

*Funny-Friends © 2026 — Ultra-Luxury Niche Perfumery*
