import { elbow, transition } from "@/content/home";
import { SectionTag, StoryStep } from "./StoryStep";

/** Seções 4 e 5 — Transição ombro → cotovelo + Cotovelo em movimento. */
export function ElbowStory() {
  return (
    <>
      <section aria-label="Do ombro ao cotovelo">
        <StoryStep step={transition} heading="h2" size="lg" />
      </section>
      <section id="cotovelo" aria-label="Cotovelo em movimento">
        {elbow.steps.map((step, i) => (
          <StoryStep
            key={step.scene}
            step={step}
            heading={i === 0 ? "h2" : "h3"}
            size={i === 0 ? "lg" : "md"}
            header={i === 0 ? <SectionTag index={elbow.index} label={elbow.label} /> : undefined}
          />
        ))}
      </section>
    </>
  );
}
