import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main id="conteudo" className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy-900 pb-20 pt-40">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative">
        <p className="eyebrow tick text-accent">Erro 404</p>
        <h1 className="display mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4rem)]">Esta página saiu do lugar.</h1>
        <p className="mt-5 max-w-xl text-lg text-on-dark">O endereço pode ter mudado com o novo site. Volte ao início ou veja os conteúdos.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" icon={<ArrowRight size={18} />}>
            Voltar ao início
          </Button>
          <Button href="/conteudos" variant="ghost">
            Ver conteúdos
          </Button>
        </div>
      </div>
    </main>
  );
}
