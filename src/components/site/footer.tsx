import { GlassFold } from "@/components/ui/glass-fold"

export function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 opacity-60">
        <GlassFold color1="#1b2a4a" color2="#030304" color3="#c9d6ff" speed={0.35} scale={1.2} noise={0.14} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050506] via-transparent to-[#050506]" />
      <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <h2
          data-split
          className="chrome chrome-glow max-w-4xl font-[family-name:var(--font-display)] text-4xl font-black uppercase leading-[1] tracking-tight sm:text-7xl"
        >
          Перший місяць — мінус 50%
        </h2>
        <form className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Ваш email"
            className="h-[52px] flex-1 rounded-[10px] border border-white/20 bg-black/40 px-5 text-sm outline-none backdrop-blur placeholder:text-white/40 focus:border-white/60"
          />
          <button className="btn-light">Отримати код</button>
        </form>
        <div className="mt-24 grid gap-6 border-t border-white/10 pt-8 text-sm text-white/50 sm:grid-cols-4">
          <span className="chrome font-[family-name:var(--font-display)] font-black">Funny·Friends</span>
          <a href="catalog.html" className="hover:text-white">Каталог</a>
          <a href="mailto:hello@funny-friends.ua" className="hover:text-white">hello@funny-friends.ua</a>
          <span>© 2026 · Київ</span>
        </div>
      </div>
    </footer>
  )
}
