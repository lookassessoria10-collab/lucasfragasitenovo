import { elbow } from "@/content/home";
import { SectionTag, StoryStep } from "./StoryStep";

/** Cotovelo — a câmera desce pelo braço até a dor ao segurar objetos. */
export function ElbowStory() {
  return (
    <section id="cotovelo" aria-label="Dor no cotovelo">
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
  );
}
