import { surgery } from "@/content/home";

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity="0.35" />
      <path d="m6.5 10.2 2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Seção 7 — Vou precisar operar? Dois caminhos a partir do diagnóstico. */
export function Surgery() {
  const [conservative, operative] = surgery.paths;
  return (
    <section id="cirurgia" aria-labelledby="surgery-title" className="surface-light relative z-10 bg-mist text-ink">
      <div className="container-x py-24 md:py-32">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <p data-reveal-item className="eyebrow text-accent-ink">
            {surgery.eyebrow}
          </p>
          <h2 id="surgery-title" data-reveal-item className="display mt-5 text-balance text-[clamp(2rem,4.6vw,3.7rem)]">
            {surgery.title}
          </h2>
          <p data-reveal-item className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
            {surgery.lead}
          </p>
        </div>

        {/* bifurcação */}
        <div data-reveal className="relative mx-auto mt-14 max-w-5xl">
          <div data-reveal-item className="flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold shadow-[0_8px_30px_-12px_rgb(10_22_40/0.25)]">
              <span className="size-2 rounded-full bg-accent shadow-[0_0_0_4px_rgb(0_229_211/0.2)]" />
              {surgery.origin}
            </span>
          </div>
          <svg viewBox="0 0 1000 110" className="hidden h-[110px] w-full lg:block" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="fork" x1="0" y1="0" x2="0" y2="110" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00756c" />
                <stop offset="1" stopColor="#1a9bd7" />
              </linearGradient>
            </defs>
            <path d="M500 0 V30 C500 70 250 50 250 110" stroke="url(#fork)" strokeWidth="1.5" />
            <path d="M500 0 V30 C500 70 750 50 750 110" stroke="url(#fork)" strokeWidth="1.5" />
          </svg>
          <div className="mx-auto h-10 w-px bg-ink/15 lg:hidden" aria-hidden="true" />

          <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
            <article data-reveal-item className="frame flex flex-col bg-white p-7 sm:p-9">
              <p className="eyebrow text-accent-ink">{conservative.tag}</p>
              <h3 className="display mt-4 text-2xl md:text-[1.9rem]">{conservative.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{conservative.text}</p>
              <ul className="mt-6 space-y-3 border-t border-ink/8 pt-6">
                {conservative.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.97rem] text-ink">
                    <span className="text-accent-ink">
                      <Check />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </article>
            <article data-reveal-item className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-navy-800 p-7 text-white sm:p-9">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow text-accent">{operative.tag}</p>
                <h3 className="display mt-4 text-2xl md:text-[1.9rem]">{operative.title}</h3>
                <p className="mt-3 leading-relaxed text-on-dark">{operative.text}</p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {operative.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.97rem]">
                      <span className="text-accent">
                        <Check />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">{surgery.note}</p>
        </div>
      </div>
    </section>
  );
}
