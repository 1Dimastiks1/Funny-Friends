import * as React from "react"
import { GlassFold } from "@/components/ui/glass-fold"
import { addToCart } from "./brand"
import { byId } from "./data"
import { initStory } from "./story-motion"

const words = (s: string, cls: string) =>
  s.split(" ").map((w, i) => (
    <React.Fragment key={i}>
      <span className={cls}>{w}</span>{" "}
    </React.Fragment>
  ))

const NOTE_TEXT =
  "Bleu de Chanel відкривається грейпфрутом і м'ятою, а за годину осідає ладаном, кедром і сандалом. Свіжо вдень, глибоко ввечері."

/* точки нот — у координатах самого флакона */
const SPOTS = [
  { l: "64%", t: "6%", k: "Верхні ноти", v: "грейпфрут · м'ята", flip: true },
  { l: "97%", t: "44%", k: "Серце", v: "імбир · жасмин", flip: true },
  { l: "3%", t: "62%", k: "База", v: "ладан · кедр", flip: true },
  { l: "96%", t: "90%", k: "Стійкість", v: "8–10 годин", flip: true },
]

const FEATS = [
  "Офіційні дистриб'ютори ЄС",
  "Батч-код і дата виробництва",
  "Фото флакона перед відправкою",
  "Оплата при отриманні",
  "Повернення протягом 14 днів",
]

export function Story() {
  const root = React.useRef<HTMLElement>(null)
  React.useEffect(() => (root.current ? initStory(root.current) : undefined), [])
  const [spot, setSpot] = React.useState(-1)
  const [feat, setFeat] = React.useState(-1)
  const bleu = byId("bleu")

  return (
    <section id="story" ref={root}>
      <span id="story-notes" className="anchor" style={{ top: "52%" }} />
      <span id="story-check" className="anchor" style={{ top: "80%" }} />
      <div className="stage">
        <div className="fold" aria-hidden="true">
          <GlassFold color1="#1e3cc8" color2="#06081e" color3="#96d7ff" speed={0.35} scale={1} noise={0.1} />
        </div>
        <div className="stage__shade" aria-hidden="true" />
        <div className="beam" aria-hidden="true" />

        {/* флакон: камера → нахил за вказівником → сам флакон з відображенням */}
        <div className="cam" data-cam>
          <div className="tilt" data-tilt>
            <div className="halo" aria-hidden="true" />
            <div className="bottle">
              <img className="bottle__img" src="/img/bleu-bottle.png" alt="Флакон Bleu de Chanel Eau de Parfum" draggable={false} />
              <div className="bottle__sheen" aria-hidden="true" />
              <div className="spots">
                {SPOTS.map((s, i) => (
                  <button
                    key={s.k}
                    className={"hs" + (s.flip ? " flip" : "") + (spot === i ? " on" : "")}
                    style={{ left: s.l, top: s.t }}
                    onClick={() => setSpot(spot === i ? -1 : i)}
                    data-hs
                  >
                    <span className="dot" />
                    <span className="hl">
                      {s.k}
                      <em>{s.v}</em>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <img className="bottle__mirror" src="/img/bleu-bottle.png" alt="" aria-hidden="true" draggable={false} />
            <div className="floor" aria-hidden="true" />
          </div>
        </div>
        <div className="fog" data-fog aria-hidden="true">
          <i className="f0" />
          <i className="f1" />
          <i className="f2" />
        </div>

        {/* 1 — герой */}
        <div className="layer L0" data-l0>
          <div className="hero-copy" data-hero>
            <span className="chip">Оригінальна парфумерія · Київ</span>
            <h1>
              <span className="ln"><span>Володій</span></span>
              <span className="ln"><span>ніччю</span></span>
            </h1>
            <p className="hero-sub">Bleu de Chanel, Dior Sauvage та ще 12 ароматів від офіційних дистриб'юторів. Доставка по Україні за 1–2 дні.</p>
            <div className="hero-cta">
              <button className="btn light" onClick={() => addToCart(bleu, bleu.volumes[1])}>
                Купити Bleu · 7 490 ₴
              </button>
              <a className="btn line" href="#catalog">Весь каталог</a>
            </div>
          </div>
        </div>
        <div className="layer L1" data-l1>
          <div className="hud" data-hud>
            <span className="chip">Bleu de Chanel</span>
            <pre>{"EAU DE PARFUM\n100 МЛ · 3.4 FL.OZ\nAROMATIC WOODY"}</pre>
          </div>
          <p className="caption" data-cap>
            Тільки оригінали.
            <br />
            Чек і батч-код
            <br />
            до кожного флакона.
          </p>
          <span className="hint" data-cap>
            <i />
            Гортай далі
          </span>
        </div>

        {/* 2 — заява */}
        <div className="layer L2" data-l2>
          <div className="vision">
            <span className="chip" data-vfade>Чому Orvelle</span>
            <h2>
              {words("Аромат, який", "w")}
              <br />
              {words("впізнають раніше,", "w")}
              <br />
              {words("ніж тебе.", "w")}
            </h2>
            <p data-vfade>Ми продаємо лише те, що можемо підтвердити документами постачальника.</p>
          </div>
        </div>

        {/* 3 — ноти */}
        <div className="layer L3" data-l3>
          <div className="acct">
            <span className="tagline">Піраміда нот</span>
            <p>{words(NOTE_TEXT, "aw")}</p>
          </div>
        </div>

        {/* 4 — перевірка */}
        <div className="layer L4" data-l4>
          <div className="cred" data-cred>
            <span className="tagline">✕ Контроль якості</span>
            <h3>Кожен флакон перевіряємо до відправки</h3>
          </div>
          <div className="ccard" data-card>
            <h4>
              Перевірено флаконів
              <br />у 2026 році
            </h4>
            <span className="cnote">Склад у Києві · щоденно</span>
            <div className="cnum">
              <b data-count>0</b>
              <span>шт.</span>
              <span className="ctag">+340 / тиждень</span>
            </div>
            <svg viewBox="0 0 220 70" aria-hidden="true">
              <polyline data-spark points="0,60 30,55 60,57 90,44 120,46 150,30 180,24 214,10" />
              <circle cx="90" cy="44" r="2.4" fill="#fff" />
              <circle cx="150" cy="30" r="2.4" fill="#fff" />
              <circle cx="214" cy="10" r="3.4" fill="#96d7ff" />
            </svg>
            <span className="cfoot">Січ · Квіт · Лип · Жовт</span>
          </div>
          <ol className="feats" data-feats>
            {FEATS.map((f, i) => (
              <li key={f} className={feat === i ? "on" : ""} onClick={() => setFeat(feat === i ? -1 : i)}>
                <span>0{i + 1}</span>
                {f}
                <i>→</i>
              </li>
            ))}
          </ol>
        </div>

        <div className="prog" aria-hidden="true">
          <i data-prog />
        </div>
      </div>
    </section>
  )
}
