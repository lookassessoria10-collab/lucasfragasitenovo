import { whatsappHref } from "@/content/site";
import { WhatsApp } from "@/components/ui/icons";

/** Acesso ao WhatsApp em qualquer ponto da página e tamanho de tela. */
export function MobileCta() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-navy-900 shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-6"
    >
      <WhatsApp size={28} />
    </a>
  );
}
