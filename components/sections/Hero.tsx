import Image from "next/image";
import { hero } from "@/content/home";
import { site, whatsappHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ArrowDown, WhatsApp } from "@/components/ui/icons";

export function Hero() {
  return (
    <section
      id="inicio"
      data-scene={hero.scene}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-end pb-24 pt-32 lg:items-center lg:pb-20"
    >
      <div className="container-x relative">
        <div className="max-w-[46rem]">
          <h1 id="hero-title">
            <span className="eyebrow tick block text-accent">{hero.eyebrow}</span>
            <span className="display mt-6 block text-[clamp(2.9rem,6.6vw,6.4rem)] text-white">
              {hero.title.lead}
              <br />
              <span className="bg-linear-to-r from-accent to-brand-blue bg-clip-text text-transparent">
                {hero.title.accent}
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-[33rem] text-[1.075rem] leading-relaxed text-on-dark text-pretty md:text-lg">
            {hero.lead}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={whatsappHref()} icon={<WhatsApp size={18} />}>
              {hero.primaryCta}
            </Button>
            <Button href="#ombro" variant="ghost" icon={<ArrowDown size={18} />}>
              {hero.secondaryCta}
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <Image
              src="/images/dr-lucas-fraga-avatar.jpg"
              alt=""
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-full border border-white/15 object-cover"
            />
            <div className="text-sm leading-snug">
              <p className="font-semibold text-white">{site.name}</p>
              <p className="text-on-dark">
                {site.role} · {site.crm}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden lg:block">
        <div className="container-x flex items-end justify-between">
          <p className="eyebrow flex items-center gap-4 text-white/45">
            {hero.keywords.map((k, i) => (
              <span key={k} className="flex items-center gap-4">
                {i > 0 && <span className="size-1 rounded-full bg-accent" />}
                {k}
              </span>
            ))}
          </p>
          <p className="eyebrow flex items-center gap-3 text-white/45">
            {hero.scrollHint}
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-4 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-accent motion-reduce:animate-none" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
