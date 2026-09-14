# Funny-Friends Style Guide
## Ultra-Luxury Liquid Glass & Gold

---

## 1. Brand Identity

| Атрибут | Значення |
|---------|----------|
| **Назва** | Funny-Friends |
| **Сегмент** | Нішова преміум-парфумерія |
| **Тон** | Розкішний, інтимний, artisanal |
| **Візуальна метафора** | Рідке скло, золото, ніч, аромат |

---

## 2. Color System

### Primary Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#050505` | Основний фон сторінки |
| `--color-bg-secondary` | `#121212` | Секції, footer |
| `--color-bg-glass` | `rgba(18,18,18,0.65)` | Скляні панелі |

### Accents
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-gold` | `#D4AF37` | CTA, borders, icons |
| `--color-accent-champagne` | `#E5C158` | Hover, highlights, urgency |
| `--color-accent-gold-muted` | `rgba(212,175,55,0.25)` | Borders, dividers |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#FFFFFF` | Заголовки, body primary |
| `--color-text-secondary` | `#A1A1AA` | Підзаголовки, descriptions |
| `--color-text-muted` | `#71717A` | Placeholders, meta |

---

## 3. Typography

### Font Pairing

```
Display / Headlines  →  Cormorant Garamond (primary)
                       Playfair Display (fallback)
UI / Body            →  Inter (primary)
                       Montserrat (fallback)
```

### Type Scale

| Level | Size | Weight | Font | Use Case |
|-------|------|--------|------|----------|
| Hero | clamp(2.5rem, 5vw, 4.5rem) | 500 | Serif | Hero headlines |
| H1 | 3.5rem / 56px | 500 | Serif | Page titles |
| H2 | 2.5rem / 40px | 500 | Serif | Section titles |
| H3 | 1.5rem / 24px | 500 | Serif | Card titles |
| Body | 1rem / 16px | 400 | Sans | Paragraphs |
| Small | 0.875rem / 14px | 400 | Sans | Captions |
| Label | 0.75rem / 12px | 600 | Sans | Badges, uppercase labels |

### Letter Spacing
- Headlines: `-0.02em`
- UI Labels (uppercase): `0.08em` – `0.15em`

---

## 4. Liquid Glass Components

### Glass Panel
```css
background: rgba(18, 18, 18, 0.65);
backdrop-filter: blur(24px);
border: 1px solid rgba(212, 175, 55, 0.25);
box-shadow: 0 8px 32px rgba(0,0,0,0.4),
            0 0 0 1px rgba(212,175,55,0.08),
            inset 0 1px 0 rgba(255,255,255,0.05);
border-radius: 16px;
```

### Gold Glow (hover state)
```css
box-shadow: 0 0 24px rgba(212, 175, 55, 0.12),
            0 8px 32px rgba(0, 0, 0, 0.5);
```

---

## 5. Button System

| Variant | Background | Text | Use |
|---------|------------|------|-----|
| **Primary** | Gold gradient | `#050505` | «Купити зараз», «В кошик» |
| **Glass** | Dark glass + gold border | White | «Пройти тест», secondary |
| **Ghost** | Transparent | Gold | Text links, tertiary |
| **Icon** | Glass circle | Gold icon | Wishlist, close |

### Button States
- **Default:** Matte dark glass or gold gradient
- **Hover:** Liquid shine overlay + gold glow + `translateY(-1px)`
- **Active:** Slightly darker, no lift
- **Disabled:** 40% opacity, no pointer

---

## 6. Component Library

### Header (Floating Glass)
- Position: `fixed`, top 16px, centered container
- Height: 72px desktop / 64px mobile
- Elements: Logo | Nav | Search | Currency | Wishlist | Cart badge

### Product Card
- 3-column grid (desktop), 1-column (mobile)
- 3D bottle image on glass background
- Volume toggle: 30 / 50 / 100 ml pills
- Urgency badge: «Залишилося N шт.»
- Rating: 4.9 ★
- CTA: Gold «+ У кошик»

### Filter Sidebar (Sticky)
- Width: 280px
- Price range slider (gold thumb)
- Checkbox groups: Notes, Concentration, Volume, Availability

### Cart Drawer
- Width: 420px, slide from right
- Progress bar: free shipping threshold
- Sample selector dropdown
- Quick pay: Apple Pay | Google Pay | Card

### Olfactory Pyramid (PDP)
- 3 tiers: Top / Heart / Base notes
- Interactive hover reveals note details
- Visual: ascending triangle with gold accents

---

## 7. Spacing & Grid

- **Container max-width:** 1440px
- **Grid columns:** 3 (catalog), 1 (mobile)
- **Grid gap:** 24px
- **Section padding:** 80px vertical (desktop), 48px (mobile)

---

## 8. Motion & Animation

| Effect | Duration | Easing |
|--------|----------|--------|
| Hover transitions | 250ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Drawer slide | 400ms | cubic-bezier(0.23, 1, 0.32, 1) |
| Liquid shine | 600ms | ease-out |
| Price update | 150ms | fade + scale |

---

## 9. Icons & Imagery

- **Product:** 3D bottle renders, dark background, subtle gold rim light
- **Hero:** Full-bleed video with obsidian overlay gradient
- **Icons:** Thin stroke (1.5px), gold on hover
- **Badges:** Pill shape, champagne background at 15% opacity

---

## 10. Accessibility

- Minimum contrast ratio: 4.5:1 for body text
- Focus rings: 2px gold outline
- Touch targets: minimum 44×44px
- Reduced motion: respect `prefers-reduced-motion`

---

*Design tokens: `/styles/design-tokens.css`*
