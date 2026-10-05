import { shoulder, shoulderAnatomy } from "@/content/home";
import { SectionTag, StoryStep } from "./StoryStep";

/** Seções 2 e 3 — Ombro em movimento + Entendendo o ombro. */
export function ShoulderStory() {
  return (
    <>
      <section id="ombro" aria-label="Ombro em movimento">
        {shoulder.steps.map((step, i) => (
          <StoryStep
            key={step.scene}
            step={step}
            heading={i === 0 ? "h2" : "h3"}
            size={i === 0 ? "lg" : "md"}
            header={i === 0 ? <SectionTag index={shoulder.index} label={shoulder.label} /> : undefined}
          />
        ))}
      </section>
      <section aria-label={shoulderAnatomy.label}>
        {shoulderAnatomy.steps.map((step, i) => (
          <StoryStep
            key={step.scene}
            step={step}
            heading={i === 0 ? "h2" : "h3"}
            header={i === 0 ? <SectionTag index={shoulder.index} label={shoulderAnatomy.label} /> : undefined}
          />
        ))}
      </section>
    </>
  );
}
