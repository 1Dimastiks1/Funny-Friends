import type { CSSProperties } from "react"
import { GlassFold } from "@/components/ui/glass-fold"
import GlassWorkspace, {
  type WorkspaceCashFlowPeriod,
  type WorkspaceGoal,
  type WorkspaceTransaction,
} from "@/components/ui/adjustable-glass-dashboard"

/* Палітра кабінету з кадру Bleu de Chanel: нічний синій і крижане світло. */
const nightPalette = {
  "--gw-ink": "#eef3ff",
  "--gw-muted": "#9fb0cf",
  "--gw-accent": "#9cc2ff",
  "--gw-line": "#c8d8ff22",
  "--gw-background": "transparent",
  "--gw-shade": "#03070f99",
  "--gw-surface": "#0e1524",
  "--gw-panel": "#12285a",
  "--gw-brand": "#e8eef8",
  "--gw-brand-ink": "#071230",
  "--gw-avatar": "#1e3cc8",
  "--gw-rail-active": "#96d7ff26",
  "--gw-positive-surface": "#96d7ff1f",
  "--gw-account-surface": "#ffffff12",
  "--gw-account-action": "#ffffff14",
  "--gw-segment": "#ffffff0f",
  "--gw-segment-active": "#ffffff26",
  "--gw-transaction-surface": "#ffffff10",
  "--gw-income-surface": "#96d7ff1f",
  "--gw-pending": "#e6c18f",
  "--gw-goal-surface": "#ffffff10",
  "--gw-dock": "#0b1a3ccc",
  "--gw-dock-active": "#eef3ff",
  "--gw-button": "#eef3ff",
  "--gw-button-ink": "#071230",
  "--gw-search": "#ffffff0c",
  "--gw-savings-orb": "#96d7ff1f",
  "--gw-popover": "#0a1736f2",
  "--gw-notification": "#0a1736f2",
  "--gw-fallback": "#0b1a3c",
  "--gw-mobile-dock": "#0b1a3c99",
  "--gw-shadow": "#00000088",
  "--gw-panel-shadow": "#00000066",
  "--gw-soft-shadow": "#00000033",
  "--gw-segment-shadow": "#00000033",
  "--gw-dock-shadow": "#00000033",
  "--gw-popover-shadow": "#00000088",
  "--gw-sample-shadow": "#00000088",
  "--gw-toast-shadow": "#0006",
  "--gw-toast": "#eef3ff",
  "--gw-dock-ink": "#071230",
  "--gw-selection": "#96d7ff55",
  "--gw-scrollbar": "#5a6a8a",
  "--gw-hover": "#ffffff14",
  "--gw-dock-hover": "#ffffff18",
  "--gw-control-hover": "#ffffff1c",
  "--gw-strong-edge": "#ffffff55",
  "--gw-soft-edge": "#ffffff40",
  "--gw-toast-ink": "#071230",
  "--gw-highlight": "#cfe0ff",
} as CSSProperties

const transactions: WorkspaceTransaction[] = [
  { id: "1", name: "Бонуси за замовлення №10482", category: "Бонуси", date: "Сьогодні", amount: 375, status: "Completed" },
  { id: "2", name: "Bleu de Chanel EDP 100 мл", category: "Покупка", date: "Сьогодні", amount: -7490, status: "Pending" },
  { id: "3", name: "Набір пробників, 3 × 8 мл", category: "Пробник", date: "3 листопада", amount: -390, status: "Completed" },
  { id: "4", name: "Dior Sauvage Parfum 60 мл", category: "Покупка", date: "28 жовтня", amount: -5890, status: "Completed" },
  { id: "5", name: "Подарункова упаковка", category: "Подарунок", date: "28 жовтня", amount: -250, status: "Completed" },
  { id: "6", name: "Бонуси за відгук", category: "Бонуси", date: "20 жовтня", amount: 150, status: "Completed" },
  { id: "7", name: "Експрес-доставка Київ", category: "Доставка", date: "12 жовтня", amount: -180, status: "Completed" },
]

const goals: WorkspaceGoal[] = [
  { id: "gold", name: "До рівня Gold (−7% на все)", saved: 21900, target: 30000, color: "#96d7ff" },
  { id: "gift", name: "Бонуси на подарунковий набір", saved: 1840, target: 3000, color: "#e6c18f" },
]

const cashFlowPeriods: WorkspaceCashFlowPeriod[] = [
  {
    id: "month",
    label: "Місяць",
    description: "Бонуси за листопад. Кожна точка — тиждень.",
    points: [
      { label: "1 лист", income: 120, expenses: 0 },
      { label: "8 лист", income: 260, expenses: 150 },
      { label: "15 лист", income: 180, expenses: 0 },
      { label: "22 лист", income: 375, expenses: 200 },
      { label: "29 лист", income: 220, expenses: 90 },
    ],
  },
  {
    id: "year",
    label: "Рік",
    description: "Бонуси за 2026 рік, по місяцях.",
    points: [
      { label: "Січ", income: 210, expenses: 0 },
      { label: "Лют", income: 340, expenses: 120 },
      { label: "Бер", income: 190, expenses: 300 },
      { label: "Кві", income: 420, expenses: 0 },
      { label: "Тра", income: 380, expenses: 250 },
      { label: "Чер", income: 520, expenses: 100 },
      { label: "Лип", income: 300, expenses: 400 },
      { label: "Сер", income: 610, expenses: 0 },
      { label: "Вер", income: 450, expenses: 350 },
      { label: "Жов", income: 690, expenses: 200 },
      { label: "Лис", income: 525, expenses: 150 },
      { label: "Гру", income: 0, expenses: 0 },
    ],
  },
]

export function Club() {
  return (
    <section id="club" className="club" data-theme="night">
      <div className="club__head">
        <div>
          <span className="ov-label ov-label--accent">Orvelle Club</span>
          <h2 className="section-title">5% бонусами з кожної покупки</h2>
        </div>
        <p>Бонуси, замовлення й статус доставки — в одному кабінеті. Рівень Gold відкривається після 30 000 ₴ покупок і дає −7% назавжди.</p>
      </div>
      <div className="club__frame">
        <div className="club__fold" aria-hidden="true">
          <GlassFold color1="#12285a" color2="#070b14" color3="#9cc2ff" speed={0.2} scale={0.8} noise={0.1} />
        </div>
        <GlassWorkspace
          brand="Orvelle Club"
          userName="Олена"
          balance={1840}
          balanceChange={{ percent: 12, label: "порівняно з минулим місяцем" }}
          account={{ name: "Картка клубу Silver", lastFour: "0428" }}
          periodLabel="Листопад 2026"
          cashFlowPeriods={cashFlowPeriods}
          initialPeriodId="year"
          footerNote="Приклад кабінету: дані умовні"
          savingsNote="Бонуси згоряють через 12 місяців після нарахування."
          useHostTheme={false}
          theme="dark"
          style={nightPalette}
          glass={{ blur: 22, opacity: 0.34, saturation: 1.2, edge: 0.45, tint: "#96d7ff" }}
          transactions={transactions}
          goals={goals}
        />
      </div>
    </section>
  )
}
