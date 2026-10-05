import { finalCta } from "@/content/home";
import { site, whatsappHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Phone, WhatsApp } from "@/components/ui/icons";

/** Seção 11 — Encerramento. O modelo 3D volta com um gesto de alcance. */
export function FinalCta() {
  return (
    <section
      data-scene={finalCta.scene}
      aria-labelledby="final-title"
      className="relative flex min-h-[100svh] items-end pb-28 pt-32 lg:items-center lg:pb-24"
    >
      <div className="container-x">
        <div data-reveal className="max-w-[40rem]">
          <p data-reveal-item className="eyebrow tick text-accent">
            {finalCta.eyebrow}
          </p>
          <h2 id="final-title" data-reveal-item className="display mt-6 text-balance text-[clamp(2.2rem,4.4vw,3.9rem)]">
            {finalCta.title}
          </h2>
          <p data-reveal-item className="mt-6 max-w-[32rem] text-lg leading-relaxed text-on-dark">
            {finalCta.lead}
          </p>
          <div data-reveal-item className="mt-9 flex flex-wrap gap-3">
            <Button href={whatsappHref()} icon={<WhatsApp size={18} />}>
              Agendar pelo WhatsApp
            </Button>
            <Button href={site.phone.href} variant="ghost" icon={<Phone size={18} />}>
              {site.phone.display}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
