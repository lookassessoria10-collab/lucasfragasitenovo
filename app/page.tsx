import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { About } from "@/components/sections/About";
import { ArticlesTeaser } from "@/components/sections/ArticlesTeaser";
import { Care } from "@/components/sections/Care";
import { Contact } from "@/components/sections/Contact";
import { ElbowStory } from "@/components/sections/ElbowStory";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { ShoulderStory } from "@/components/sections/ShoulderStory";
import { Surgery } from "@/components/sections/Surgery";
import { Stage } from "@/components/three/Stage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Narrativa da home:
 *   [palco 3D visível]  Hero → Ombro → Por dentro do ombro → Transição → Cotovelo → Como posso ajudar
 *   [seções sólidas]    Vou precisar operar? → Sobre → Contato → Conteúdos
 *   [palco 3D visível]  Encerramento
 */
export default function Home() {
  return (
    <>
      <Stage />
      <RevealOnScroll />
      <main id="conteudo" className="relative z-10">
        <div data-stage>
          <Hero />
          <ShoulderStory />
          <ElbowStory />
          <Care />
        </div>
        <Surgery />
        <About />
        <Contact />
        <ArticlesTeaser />
        <div data-stage>
          <FinalCta />
        </div>
      </main>
    </>
  );
}
