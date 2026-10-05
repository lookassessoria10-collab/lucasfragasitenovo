import Link from "next/link";
import { navigation, site, whatsappHref } from "@/content/site";
import { serviceCities } from "@/content/locations";
import { Instagram, Mail, Phone, WhatsApp } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/8 bg-navy-950 text-on-dark">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo variant="full" className="w-[260px]" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Ortopedia e Traumatologia com atuação em cirurgia do ombro e cotovelo. Atendimento em{" "}
            {serviceCities.map((c) => c.city).join(", ").replace(/, ([^,]*)$/, " e $1")}.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="eyebrow text-white/50">Navegação</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
            {navigation.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/conteudos" className="transition-colors hover:text-white">
                Todos os conteúdos
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow text-white/50">Contato</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                <WhatsApp size={17} className="text-accent" /> WhatsApp {site.phone.display}
              </a>
            </li>
            <li>
              <a href={site.phone.href} className="inline-flex items-center gap-3 hover:text-white">
                <Phone size={17} className="text-accent" /> {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 break-all hover:text-white">
                <Mail size={17} className="text-accent" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                <Instagram size={17} className="text-accent" /> {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-x flex flex-col gap-3 py-7 text-xs leading-relaxed text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            {site.name} · {site.role} · {site.crm}
            {site.rqe ? ` · ${site.rqe}` : ""} · CNPJ {site.cnpj}
          </p>
          <p>Conteúdo informativo. Não substitui consulta médica. © {year}</p>
        </div>
      </div>
    </footer>
  );
}
