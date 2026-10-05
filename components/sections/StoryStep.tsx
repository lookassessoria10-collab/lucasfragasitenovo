import type { ReactNode } from "react";
import type { StoryStep as Step } from "@/content/home";

/**
 * Um "passo" da narrativa guiada pelo scroll. Ocupa ~uma tela de altura e
 * ancora um keyframe do 3D (data-scene). No desktop, o texto fica à esquerda
 * e o modelo à direita; em telas compactas, o texto vira um cartão na base
 * da tela e o modelo ocupa a parte de cima.
 */
export function StoryStep({
  step,
  heading = "h3",
  header,
  size = "md",
}: {
  step: Step;
  heading?: "h2" | "h3";
  header?: ReactNode;
  size?: "md" | "lg";
}) {
  const Heading = heading;
  return (
    <div data-scene={step.scene} className="relative flex min-h-[100svh] items-end pb-24 pt-20 lg:min-h-[120vh] lg:items-center lg:py-24">
      <div className="container-x w-full">
        <div
          data-reveal
          className="max-w-[32rem] rounded-[1.6rem] border border-white/10 bg-navy-900/72 p-6 backdrop-blur-xl sm:p-8 lg:max-w-[33rem] lg:rounded-none lg:border-0 lg:border-l lg:border-white/12 lg:bg-transparent lg:py-2 lg:pl-10 lg:pr-0 lg:backdrop-blur-none"
        >
          {header}
          {step.kicker && (
            <p data-reveal-item className="eyebrow text-accent">
              {step.kicker}
            </p>
          )}
          <Heading
            data-reveal-item
            className={`display text-balance text-white ${step.kicker || header ? "mt-4" : ""} ${
              size === "lg" ? "text-[clamp(2rem,4.4vw,3.75rem)]" : "text-[clamp(1.75rem,3.4vw,2.9rem)]"
            }`}
          >
            {step.title}
          </Heading>
          {step.text && (
            <p data-reveal-item className="mt-5 text-[1.02rem] leading-relaxed text-on-dark text-pretty md:text-lg">
              {step.text}
            </p>
          )}
          {step.items && (
            <ul className="mt-6 divide-y divide-white/8 border-y border-white/8">
              {step.items.map((item) => (
                <li data-reveal-item key={item.title} className="flex gap-4 py-3 md:py-3.5">
                  <span className="mt-[0.6rem] h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-white">{item.title}</span>
                    {item.detail && <span className="mt-0.5 hidden text-sm text-on-dark sm:block">{item.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {step.chips && (
            <ul data-reveal-item className="mt-6 flex flex-wrap gap-2" aria-label="Condições avaliadas">
              {step.chips.map((c) => (
                <li key={c} className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/80">
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <p data-reveal-item className="eyebrow mb-6 flex items-center gap-3 text-white/60">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-white/25" aria-hidden="true" />
      {label}
    </p>
  );
}
