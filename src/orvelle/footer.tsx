import { Mark } from "./brand"

const COLS: [string, string[], string][] = [
  ["Меню", ["Каталог", "Bleu de Chanel", "Dior Sauvage", "Нішеві аромати", "Orvelle Club"], "#catalog"],
  ["Покупцям", ["Доставка й оплата", "Перевірка оригінальності", "Повернення", "Публічна оферта", "Конфіденційність"], "#foot"],
  ["Зв'язок", ["Telegram", "Instagram", "Viber", "hello@orvelle.example", "Київ, Поділ"], "#foot"],
]

/** Футер зі скляним вордмарком, що тоне в тумані (дизайн-система: Footer). */
export function Footer() {
  return (
    <footer className="ov-footer site-footer" id="foot" data-theme="night">
      <div className="ov-footer__glow" aria-hidden="true" />
      <p className="ov-wordmark" aria-hidden="true">ORVELLE</p>
      <div className="ov-fog" aria-hidden="true" />
      <div className="ov-footer__grid">
        <div>
          <a className="ov-logo site-logo" href="#top"><Mark />Orvelle</a>
          <h2 className="ov-footer__title">Оригінальна парфумерія з доставкою по Україні</h2>
          <p className="ov-footer__text">14 ароматів від Chanel, Dior, Tom Ford, Creed та інших — лише з офіційних поставок, з чеком і фото батч-коду. Відправляємо щодня.</p>
          <a className="ov-btn ov-btn--primary" href="#catalog">Перейти до каталогу</a>
          <p className="ov-footer__copy">© 2026 Orvelle. Київ, Україна.</p>
          <ul className="ov-row" aria-label="Статус магазину">
            <li className="ov-chip"><span className="ov-chip__dot" aria-hidden="true" />Відправка сьогодні до 18:00</li>
            <li className="ov-chip">Чек і батч-код</li>
            <li className="ov-chip">Оцінка 4,9</li>
          </ul>
        </div>
        {COLS.map(([t, links, href]) => (
          <nav key={t} className="ov-foot-col" aria-label={t}>
            <h4>{t}</h4>
            <ul>
              {links.map((l) => (
                <li key={l}><a href={href}>{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  )
}
