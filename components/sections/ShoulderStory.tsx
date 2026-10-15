import { shoulder } from "@/content/home";
import { SectionTag, StoryStep } from "./StoryStep";

/** Ombro — sintomas percebidos na rotina. */
export function ShoulderStory() {
  return (
    <section id="ombro" aria-label="Dor no ombro">
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
  );
}
