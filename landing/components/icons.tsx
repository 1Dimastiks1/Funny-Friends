type P = { className?: string }
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true }

export const ArrowUpRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const Shield = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6Z" /><path d="m8.8 12 2.2 2.2 4.4-4.6" /></svg>
)
export const Truck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="2.5" y="6.5" width="12" height="10" rx="1.5" /><path d="M14.5 9.5h3.6l3.4 3.6v3.4h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></svg>
)
export const Gift = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3.5" y="8.5" width="17" height="4" rx="1" /><path d="M5 12.5V20h14v-7.5M12 8.5V20M12 8.5C10 5 6.5 5 6.5 7c0 1.5 3 1.5 5.5 1.5Zm0 0c2-3.5 5.5-3.5 5.5-1.5 0 1.5-3 1.5-5.5 1.5Z" /></svg>
)
export const Return = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="m8 5-4 4 4 4" /></svg>
)
export const Star = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.4 1.1 6.3L12 17.2l-5.7 3 1.1-6.3-4.6-4.4 6.4-.9Z" /></svg>
)
export const Telegram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M21 4 3 11l6 2.5M21 4l-3 16-6.5-5M21 4 9 13.5V19l2.5-4" /></svg>
)
export const Instagram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>
)
export const Viber = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 3c-5 0-8 2.2-8 7.5 0 3 1 5 3 6.2V21l3.2-3c.6.1 1.2.1 1.8.1 5 0 8-2.2 8-7.6S17 3 12 3Z" /><path d="M9.5 8.2c.3-.3.9-.3 1.1.1l.6 1.2c.1.3 0 .6-.2.8l-.4.4c.4 1 1.2 1.8 2.2 2.2l.4-.4c.2-.2.5-.3.8-.2l1.2.6c.4.2.4.8.1 1.1-.7.8-1.8.9-2.8.4a7 7 0 0 1-3.4-3.4c-.5-1-.4-2.1.4-2.8Z" /></svg>
)
export const Menu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
)
export const Close = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Check = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="m5 12 5 5 9-10" /></svg>
)
