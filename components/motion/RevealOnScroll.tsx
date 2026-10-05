"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isQA } from "@/lib/qa";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Entrada suave de conteúdo: qualquer elemento com `data-reveal`
 * aparece quando chega à tela. Filhos com `data-reveal-item` entram em sequência.
 *
 * O conteúdo é renderizado visível no HTML (SEO / sem JS); o estado inicial
 * oculto só é aplicado aqui, no cliente. Com movimento reduzido, apenas fade.
 */
export function RevealOnScroll() {
  useGSAP(() => {
    if (isQA()) return;
    const mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const reduce = Boolean(ctx.conditions?.reduce);
        const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        for (const block of blocks) {
          const items = block.querySelectorAll<HTMLElement>("[data-reveal-item]");
          const targets = items.length ? Array.from(items) : [block];
          // já visível na carga (ex.: hero) → sem animação de entrada
          if (block.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
          gsap.set(targets, { autoAlpha: 0, y: reduce ? 0 : 28 });
          ScrollTrigger.create({
            trigger: block,
            start: "top 82%",
            once: true,
            onEnter: () =>
              gsap.to(targets, {
                autoAlpha: 1,
                y: 0,
                duration: reduce ? 0.4 : 1.1,
                ease: "expo.out",
                stagger: reduce ? 0 : 0.08,
                clearProps: "transform",
              }),
          });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
