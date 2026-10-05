import Image from "next/image";
import { about } from "@/content/home";
import { site } from "@/content/site";

/** Seção 8 — Sobre o Dr. Lucas. Fotos reais, autoridade pela trajetória. */
export function About() {
  return (
    <section id="sobre" aria-labelledby="about-title" className="surface-light relative z-10 bg-white text-ink">
      <div className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
        {/* Foto institucional */}
        <div data-reveal className="lg:col-span-5">
          <div data-reveal-item className="relative mx-auto max-w-[30rem] lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist">
              <Image
                src="/images/dr-lucas-fraga-jaleco.jpg"
                alt="Dr. Lucas Fraga de jaleco, com o emblema da Sociedade Brasileira de Cirurgia do Ombro e Cotovelo"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover object-[50%_20%]"
              />
            </div>
            {/* contorno curvo, eco das molduras da identidade */}
            <svg
              viewBox="0 0 200 250"
              className="pointer-events-none absolute -right-4 -top-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M200 70 V24 A24 24 0 0 0 176 0 H120" stroke="#00756c" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
              <path d="M0 180 V226 A24 24 0 0 0 24 250 H80" stroke="#1a9bd7" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute -bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl border border-ink/8 bg-white/95 px-5 py-4 shadow-[0_20px_50px_-25px_rgb(10_22_40/0.45)] backdrop-blur sm:left-auto sm:right-6">
              <div>
                <p className="eyebrow text-[0.62rem] text-ink-soft">Registro profissional</p>
                <p className="mt-1 font-display text-sm font-semibold">
                  {site.crm}
                  {site.rqe ? ` · ${site.rqe}` : ""}
                </p>
              </div>
              <span className="h-8 w-px bg-ink/10" aria-hidden="true" />
              <p className="font-display text-sm font-semibold text-accent-ink">SBCOC</p>
            </div>
          </div>
        </div>

        {/* Texto + trajetória */}
        <div data-reveal className="lg:col-span-7 lg:pt-4">
          <p data-reveal-item className="eyebrow tick text-accent-ink">
            {about.eyebrow}
          </p>
          <h2 id="about-title" data-reveal-item className="display mt-6 text-[clamp(2.2rem,5vw,4rem)]">
            {about.title}
          </h2>
          <p data-reveal-item className="mt-3 text-lg font-medium text-ink-soft">
            {about.subtitle}
          </p>
          <div data-reveal-item className="mt-8 max-w-[38rem] space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h3 data-reveal-item className="eyebrow mt-14 text-ink">
            Formação
          </h3>
          <ol className="relative mt-6 border-l border-ink/10">
            {about.timeline.map((t) => (
              <li data-reveal-item key={`${t.title}-${t.where}`} className="relative pb-7 pl-8 last:pb-0">
                <span
                  className="absolute -left-[5px] top-1.5 size-[9px] rounded-full border-2 border-white bg-accent-ink ring-1 ring-accent-ink/30"
                  aria-hidden="true"
                />
                <p className="eyebrow text-[0.64rem] text-accent-ink">{t.when}</p>
                <p className="mt-1.5 font-display text-[1.05rem] font-semibold tracking-tight">{t.title}</p>
                <p className="text-sm text-ink-soft">{t.where}</p>
              </li>
            ))}
          </ol>

          <ul data-reveal-item className="mt-12 grid gap-3 sm:grid-cols-2">
            {about.memberships.map((m) => (
              <li key={m} className="frame bg-mist/60 p-5 text-sm leading-relaxed text-ink">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Faixa editorial */}
      <div className="relative overflow-hidden bg-navy-850 text-white">
        <div className="container-x grid items-center lg:grid-cols-12">
          <figure data-reveal className="relative z-10 py-20 lg:col-span-6 lg:py-28">
            <svg viewBox="0 0 40 30" className="h-8 w-10 text-accent" aria-hidden="true">
              <path
                d="M0 30V17C0 7 5 1.5 15 0l1.5 4C10.5 5.5 8 9 8 13h7v17H0Zm24 0V17c0-10 5-15.5 15-17l1 4c-6 1.5-8.5 5-8.5 9H39v17H24Z"
                fill="currentColor"
              />
            </svg>
            <blockquote data-reveal-item className="display mt-6 text-balance text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.15]">
              {about.quote}
            </blockquote>
            <figcaption data-reveal-item className="mt-6 text-sm text-on-dark">
              {site.name} · {site.crm}
            </figcaption>
          </figure>
          <div className="relative -mx-5 h-[26rem] md:-mx-8 lg:col-span-6 lg:mx-0 lg:h-full lg:min-h-[34rem]">
            <Image
              src="/images/dr-lucas-fraga-editorial.jpg"
              alt="Retrato editorial do Dr. Lucas Fraga"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-linear-to-b from-navy-850 via-transparent to-transparent lg:bg-linear-to-r" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
