import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { baseParams, sceneKeyframes, type SceneKeyframe, type SceneParams } from "@/content/scene-keyframes";

/**
 * Ponte entre a rolagem (GSAP + ScrollTrigger) e a cena 3D (React Three Fiber).
 *
 *   scroll → ScrollTrigger → posição na timeline GSAP → story.target
 *   story.target → (amortecimento no render loop) → câmera / articulações / destaques
 *
 * O objeto é mutável de propósito: a cena lê os valores a cada frame
 * sem provocar re-render do React.
 */
export const story = {
  target: { ...baseParams } as SceneParams,
  compact: false,
  reducedMotion: false,
};

export const COMPACT_QUERY = "(max-width: 1023px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Chaves que herdam do keyframe anterior quando omitidas. Destaques e rótulos voltam a zero. */
const INHERITED: (keyof SceneParams)[] = [
  "camX", "camY", "camZ", "tgtX", "tgtY", "tgtZ", "shiftX", "shiftY", "focus", "opacity", "context",
  "abd", "flex", "rot", "elbow", "pron", "scan",
];
const JOINTS: (keyof SceneParams)[] = ["abd", "flex", "rot", "elbow", "pron"];
/** Fração da altura da tela em que o modelo "segura" a pose em torno de cada âncora (tempo de leitura). */
const HOLD = 0.16;
/** Com movimento reduzido, as amplitudes articulares são atenuadas. */
const REDUCED_AMPLITUDE = 0.55;

function resolveFrames(frames: SceneKeyframe[], compact: boolean, reduced: boolean): SceneParams[] {
  const out: SceneParams[] = [];
  let prev = { ...baseParams };
  for (const k of frames) {
    const next = { ...baseParams } as SceneParams;
    for (const key of INHERITED) next[key] = prev[key];
    Object.assign(next, k.values, compact ? k.compact : undefined);
    if (reduced) {
      for (const key of JOINTS) next[key] = baseParams[key] + (next[key] - baseParams[key]) * REDUCED_AMPLITUDE;
    }
    out.push(next);
    prev = next;
  }
  return out;
}

export function initStory() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const compactMq = window.matchMedia(COMPACT_QUERY);
  const reducedMq = window.matchMedia(REDUCED_MOTION_QUERY);

  let timeline: gsap.core.Timeline | null = null;
  let signature = "";
  let ranges: { start: number; end: number }[] = [];

  const build = (active: SceneKeyframe[]) => {
    story.compact = compactMq.matches;
    story.reducedMotion = reducedMq.matches;
    const sig = `${active.map((k) => k.id).join("|")}:${story.compact}:${story.reducedMotion}`;
    if (sig === signature && timeline) return;
    signature = sig;

    timeline?.kill();
    const frames = resolveFrames(active, story.compact, story.reducedMotion);
    Object.assign(story.target, frames[0] ?? baseParams);
    timeline = gsap.timeline({ paused: true });
    for (let i = 1; i < frames.length; i++) {
      timeline.fromTo(
        story.target,
        { ...frames[i - 1] },
        { ...frames[i], duration: 1, ease: active[i].ease ?? "power1.inOut", immediateRender: false },
        i - 1,
      );
    }
  };

  const measure = () => {
    const vh = window.innerHeight;
    const centers: number[] = [];
    const active: SceneKeyframe[] = [];
    for (const k of sceneKeyframes) {
      const el = document.querySelector<HTMLElement>(`[data-scene="${k.id}"]`);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      active.push(k);
      centers.push(Math.max(0, r.top + window.scrollY + r.height / 2 - vh / 2));
    }
    ranges = centers.map((c, i) => {
      const before = i > 0 ? (c - centers[i - 1]) / 2 : Infinity;
      const after = i < centers.length - 1 ? (centers[i + 1] - c) / 2 : Infinity;
      const h = Math.min(HOLD * vh, before * 0.7, after * 0.7);
      return { start: c - h, end: c + h };
    });
    build(active);
  };

  const timeFor = (y: number) => {
    if (!ranges.length || y <= ranges[0].end) return 0;
    for (let i = 0; i < ranges.length - 1; i++) {
      const { end } = ranges[i];
      const nextStart = ranges[i + 1].start;
      if (y <= end) return i;
      if (y < nextStart) return i + (y - end) / Math.max(1, nextStart - end);
    }
    return ranges.length - 1;
  };

  const update = (y: number) => {
    timeline?.seek(timeFor(y), false);
  };

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => update(self.scroll()),
    onRefresh: (self) => {
      measure();
      update(self.scroll());
    },
  });

  // Mudanças de layout que não disparam resize da janela (fontes, imagens, conteúdo).
  let raf = 0;
  const scheduleRefresh = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  const resizeObserver = new ResizeObserver(scheduleRefresh);
  resizeObserver.observe(document.body);
  document.fonts?.ready.then(scheduleRefresh);
  compactMq.addEventListener("change", scheduleRefresh);
  reducedMq.addEventListener("change", scheduleRefresh);

  measure();
  update(window.scrollY);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    compactMq.removeEventListener("change", scheduleRefresh);
    reducedMq.removeEventListener("change", scheduleRefresh);
    trigger.kill();
    timeline?.kill();
    signature = "";
  };
}
