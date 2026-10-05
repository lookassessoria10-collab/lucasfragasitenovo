"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site, whatsappHref } from "@/content/site";
import { Close, Menu, Phone, WhatsApp } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("inicio");
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seção ativa (somente na home)
  useEffect(() => {
    if (pathname !== "/") return;
    const targets = navigation
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const inView = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target.id);
          else inView.delete(e.target.id);
        }
        // a última seção (na ordem do menu) que cruza o centro da tela
        const current = [...navigation].reverse().find((n) => inView.has(n.id));
        setActive(current?.id ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  // Menu mobile: trava o scroll, foca o primeiro link, fecha com Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3 md:pt-4">
        <div
          className={`flex h-14 items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-all duration-500 ease-out-expo md:h-16 md:pl-6 ${
            scrolled || !isHome || open ? "glass border-white/10 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)]" : "border-transparent"
          }`}
        >
          <Link href="/" className="shrink-0" aria-label="Dr. Lucas Fraga — página inicial" onClick={() => setOpen(false)}>
            <Logo priority className="w-[150px] sm:w-[178px] lg:w-[196px]" />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.slice(1).map((item) => {
                const current = isHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={current ? "location" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-[0.84rem] font-medium transition-colors ${
                        current ? "text-white" : "text-white/65 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-accent transition-transform duration-500 ease-out-expo ${
                          current ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-navy-900 transition-colors hover:bg-accent-soft sm:inline-flex"
            >
              <WhatsApp size={17} />
              Agendar consulta
            </a>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 -z-10 overflow-y-auto bg-navy-900/97 backdrop-blur-xl lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col pb-10 pt-28">
          <nav aria-label="Menu">
            <ul className="space-y-1">
              {navigation.map((item, i) => (
                <li key={item.id}>
                  <Link
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/8 py-4 font-display text-[1.65rem] font-semibold tracking-tight text-white"
                  >
                    <span className="w-6 text-xs font-medium tracking-[0.2em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-accent px-6 font-semibold text-navy-900"
            >
              <WhatsApp size={19} /> Agendar pelo WhatsApp
            </a>
            <a
              href={site.phone.href}
              className="flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-white/20 px-6 font-semibold text-white"
            >
              <Phone size={18} /> {site.phone.display}
            </a>
            <p className="pt-4 text-center text-xs tracking-wide text-on-dark">
              {site.name} · {site.crm}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
