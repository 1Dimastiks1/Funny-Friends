import * as React from "react"
import { Bottle } from "./bottle"
import { byId } from "./data"

const LID = ["f", "bk", "l", "r", "t", "bt"] as const
const BASE = ["bt", "f", "bk", "l", "r"] as const

/**
 * Подарункова коробка, що левітує (дизайн-система: GiftBox): кришка, флакон і
 * дно пливуть кожен у своєму ритмі; «Відкрити» піднімає кришку.
 */
export function Gift() {
  const [open, setOpen] = React.useState(false)
  const p = byId("bleu")
  return (
    <section id="gift" className={"gift ov-gift" + (open ? " is-open" : "")} data-theme="night">
      <div className="ov-gift__copy">
        <span className="ov-label ov-label--accent">Подарункове пакування</span>
        <h3>Кожен флакон — у коробці, як у бутику</h3>
        <p>Чорний лак, золотий кант і стрічка Orvelle. Додайте до замовлення — з листівкою вашими словами.</p>
        <button className="ov-btn ov-btn--primary" onClick={() => setOpen((o) => !o)} aria-pressed={open}>
          {open ? "Закрити" : "Відкрити"}
        </button>
      </div>
      <div className="ov-gift__stage" aria-hidden="true">
        <div className="ov-gift__shadow" />
        <div className="ov-gift__scene">
          <div className="ov-gift__float">
            <div className="ov-gift__lid">
              <div className="ov-cube ov-cube--lid">
                {LID.map((f) => (
                  <i key={f} className={f}>{f === "f" ? <b>ORVELLE</b> : f === "t" ? <b>O</b> : null}</i>
                ))}
              </div>
            </div>
          </div>
          <div className="ov-gift__float ov-gift__float--b">
            <div className="ov-gift__bottle"><Bottle p={p} /></div>
          </div>
          <div className="ov-gift__float ov-gift__float--c">
            <div className="ov-gift__base">
              <div className="ov-cube ov-cube--base">
                {BASE.map((f) => <i key={f} className={f} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
