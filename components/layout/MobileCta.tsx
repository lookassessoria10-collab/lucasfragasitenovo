"use client";

import { useEffect, useState } from "react";
import { site, whatsappHref } from "@/content/site";
import { Phone, WhatsApp } from "@/components/ui/icons";

/** Barra de agendamento fixa no celular — aparece depois da primeira dobra. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const footer = document.querySelector("footer");
    let pastHero = !hero;
    let atFooter = false;
    const sync = () => setShow(pastHero && !atFooter);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === footer) atFooter = e.isIntersecting;
      }
      sync();
    });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    sync();
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-out-expo sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!show}
    >
      <div className="glass flex gap-2 rounded-full border border-white/10 p-1.5">
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-[0.95rem] font-semibold text-navy-900"
        >
          <WhatsApp size={18} /> Agendar consulta
        </a>
        <a
          href={site.phone.href}
          tabIndex={show ? 0 : -1}
          aria-label={`Ligar para ${site.phone.display}`}
          className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white"
        >
          <Phone size={19} />
        </a>
      </div>
    </div>
  );
}
