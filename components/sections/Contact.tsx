import { contact } from "@/content/home";
import { mapsSearchHref, serviceCities } from "@/content/locations";
import { site, whatsappHref } from "@/content/site";
import { ArrowUpRight, Instagram, Mail, Phone, Pin, Smartphone, WhatsApp } from "@/components/ui/icons";
import { ServiceMap } from "./ServiceMap";

/** Seção 9 — Locais de atendimento e contato. Conversão em primeiro plano. */
export function Contact() {
  return (
    <section id="contato" aria-labelledby="contact-title" className="relative z-10 overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(0_229_211/0.10),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="container-x relative grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div data-reveal>
            <p data-reveal-item className="eyebrow tick text-accent">
              {contact.eyebrow}
            </p>
            <h2 id="contact-title" data-reveal-item className="display mt-6 text-balance text-[clamp(2rem,4.6vw,3.7rem)]">
              {contact.title}
            </h2>
            <p data-reveal-item className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark text-pretty">
              {contact.lead}
            </p>
          </div>

          <ul data-reveal className="mt-12 border-t border-white/10">
            {serviceCities.map((c) => (
              <li data-reveal-item key={c.city} className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-[13rem_1fr] md:gap-8">
                <div>
                  <h3 className="display text-2xl md:text-[1.7rem]">{c.city}</h3>
                  <a
                    href={whatsappHref(`Olá! Gostaria de agendar uma consulta com o Dr. Lucas Fraga em ${c.city}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-soft"
                  >
                    Agendar em {c.city} <ArrowUpRight size={15} />
                  </a>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {c.clinics.map((clinic) => (
                    <li key={clinic.name} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <p className="font-semibold text-white">{clinic.name}</p>
                      {clinic.detail && <p className="mt-0.5 text-sm text-on-dark">{clinic.detail}</p>}
                      {clinic.address && <p className="mt-2 text-sm text-on-dark">{clinic.address}</p>}
                      <a
                        href={mapsSearchHref(clinic, c)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
                      >
                        <Pin size={14} /> Ver no mapa
                        <span className="sr-only"> — {clinic.name}, {c.city} (abre em nova aba)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <aside data-reveal className="space-y-5 lg:col-span-5 lg:pt-2" aria-label="Contato">
          <div data-reveal-item>
            <ServiceMap />
          </div>

          <div data-reveal-item className="frame bg-navy-850/70 p-6 sm:p-8">
            <p className="eyebrow text-white/55">Fale com a equipe</p>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-accent px-6 font-semibold text-navy-900 transition-colors hover:bg-accent-soft"
            >
              <WhatsApp size={19} /> Agendar pelo WhatsApp
            </a>
            <ul className="mt-6 divide-y divide-white/8 text-[0.95rem]">
              <li>
                <a href={site.phone.href} className="flex items-center gap-3 py-3.5 hover:text-accent">
                  <Phone size={18} className="text-accent" /> {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all py-3.5 hover:text-accent">
                  <Mail size={18} className="shrink-0 text-accent" /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3.5 hover:text-accent">
                  <Instagram size={18} className="text-accent" /> {site.instagram.handle}
                </a>
              </li>
              {(site.app.android || site.app.ios) && (
                <li className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3.5">
                  <Smartphone size={18} className="text-accent" />
                  <span>Aplicativo do consultório:</span>
                  {site.app.android && (
                    <a href={site.app.android} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline">
                      Android
                    </a>
                  )}
                  {site.app.ios && (
                    <a href={site.app.ios} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline">
                      iOS
                    </a>
                  )}
                </li>
              )}
            </ul>
          </div>

          <div data-reveal-item className="frame p-6 sm:p-8">
            <p className="eyebrow text-white/55">Convênios</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {site.insurance.map((i) => (
                <li key={i} className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/85">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-on-dark">
              A cobertura pode variar conforme o local de atendimento. Confirme com a equipe ao agendar.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
