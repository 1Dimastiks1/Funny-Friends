import { GlassFold } from "@/components/ui/glass-fold"
import { Mark } from "./brand"

const COLS: [string, string[], boolean?][] = [
  ["Меню", ["Каталог", "Bleu de Chanel", "Dior Sauvage", "Нішеві аромати", "Orvelle Club"], true],
  ["Покупцям", ["Доставка й оплата", "Перевірка оригінальності", "Повернення", "Публічна оферта", "Конфіденційність"]],
  ["Зв'язок", ["Telegram", "Instagram", "Viber", "hello@orvelle.example", "Київ, Поділ"]],
]

export function Footer() {
  return (
    <footer className="footer" id="foot">
      <div className="footer__stage" aria-hidden="true">
        <div className="footer__img">
          <GlassFold color1="#1e3cc8" color2="#06081e" color3="#96d7ff" speed={0.25} scale={1.3} noise={0.08} />
        </div>
      </div>
      <p className="footer__wordmark" aria-hidden="true">Orvelle</p>
      <div className="footer__fog" aria-hidden="true" />
      <div className="footer__content">
        <div className="brand">
          <a className="brand__logo" href="#top">
            <span className="brand__mark"><Mark size={18} /></span>
            ORVELLE
          </a>
          <h2 className="brand__title">Оригінальна парфумерія з доставкою по Україні</h2>
          <p className="brand__text">14 ароматів від Chanel, Dior, Tom Ford, Creed та інших — лише з офіційних поставок, з чеком і фото батч-коду. Відправляємо щодня.</p>
          <a className="brand__cta" href="#catalog">Перейти до каталогу</a>
          <p className="brand__copy">© 2026 Orvelle. Київ, Україна.</p>
          <ul className="brand__status" aria-label="Статус магазину">
            <li className="fchip"><span className="fchip__dot" aria-hidden="true" />Відправка сьогодні до 18:00</li>
            <li className="fchip">Чек і батч-код</li>
            <li className="fchip">Оцінка 4,9</li>
          </ul>
        </div>
        {COLS.map(([t, links, menu]) => (
          <nav key={t} className={"col" + (menu ? " col--menu" : "")} aria-label={t}>
            <h3 className="col__title">{t}</h3>
            <ul className="col__list">
              {links.map((l) => (
                <li key={l}>
                  <a href={menu ? "#catalog" : "#foot"}>{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  )
}
