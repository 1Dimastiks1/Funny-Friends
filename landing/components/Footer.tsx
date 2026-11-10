import { NAV, SITE } from "@/lib/site"
import { Instagram, Telegram, Viber } from "./icons"

export function Footer() {
  const social = [
    { href: SITE.telegram, label: "Telegram", Icon: Telegram },
    { href: SITE.viber, label: "Viber", Icon: Viber },
    { href: SITE.instagram, label: "Instagram", Icon: Instagram },
  ]
  return (
    <footer id="contacts" className="mx-auto max-w-[1400px] px-3 pb-28 pt-8 sm:px-4 md:pb-10 xl:px-5">
      <div className="glass grid gap-10 p-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] xl:p-12">
        <div>
          <a href="#top" className="font-display text-[26px] font-medium uppercase tracking-[0.28em] text-ink">{SITE.brand}</a>
          <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-ink-soft">Оригінальна парфумерія з гарантією автентичності та доставкою по Україні.</p>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-ink">Контакти</h2>
          <ul className="mt-4 grid gap-2 text-[15px] text-ink-soft">
            <li><a className="hover:text-ink" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></li>
            <li><a className="hover:text-ink" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>Щодня 9:00–21:00</li>
          </ul>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-ink">Ми в соцмережах</h2>
          <div className="mt-4 flex gap-2">
            {social.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full bg-white/60 text-ink transition hover:-translate-y-0.5 hover:bg-white">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <nav aria-label="Розділи" className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[14px] text-ink-soft">
            {NAV.map((l) => <a key={l.href} href={l.href} className="hover:text-ink">{l.label}</a>)}
          </nav>
        </div>
        <p className="text-[13px] text-ink-mute sm:col-span-2 lg:col-span-3">© {new Date().getFullYear()} {SITE.brand}. Усі права захищено. Торгові марки належать їхнім власникам.</p>
      </div>
    </footer>
  )
}
