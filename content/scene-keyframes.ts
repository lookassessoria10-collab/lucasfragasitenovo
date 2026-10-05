/**
 * Timeline do modelo 3D.
 *
 * Cada keyframe está ancorado a um elemento da página com `data-scene="<id>"`.
 * Quando esse elemento está centralizado na tela, o modelo atinge exatamente
 * os valores abaixo; entre dois elementos, o GSAP interpola os valores
 * de acordo com a rolagem (ida e volta).
 *
 * Unidades: 1 unidade ≈ 10 cm. O centro do ombro (glenoumeral) está em (0, 0, 0),
 * o cotovelo em ≈ (0, -3, 0). Ângulos em graus.
 */

export type SceneParams = {
  /** Posição da câmera */
  camX: number;
  camY: number;
  camZ: number;
  /** Ponto para onde a câmera olha */
  tgtX: number;
  tgtY: number;
  tgtZ: number;
  /** Deslocamento do enquadramento em fração da tela (x > 0 = modelo para a direita; y > 0 = para cima) */
  shiftX: number;
  shiftY: number;
  /** Raio de foco: partes mais distantes do alvo desvanecem */
  focus: number;
  /** Opacidade geral do modelo (0–1) */
  opacity: number;
  /** Opacidade do contexto (costelas / coluna) */
  context: number;
  /** Ombro: abdução, flexão e rotação */
  abd: number;
  flex: number;
  rot: number;
  /** Cotovelo: flexão e prono-supinação */
  elbow: number;
  pron: number;
  /** Destaques (0–1) */
  cuff: number;
  labrum: number;
  biceps: number;
  lateral: number;
  medial: number;
  nerve: number;
  olecranon: number;
  /** Rótulos anatômicos visíveis (0–1) */
  labelsShoulder: number;
  labelsElbow: number;
  /** Anel de varredura que percorre o úmero (0 = ombro, 1 = cotovelo) */
  scan: number;
};

export const baseParams: SceneParams = {
  camX: 8.4,
  camY: 0.2,
  camZ: 15.2,
  tgtX: -0.5,
  tgtY: -2.9,
  tgtZ: 0,
  shiftX: 0.2,
  shiftY: 0,
  focus: 16,
  opacity: 1,
  context: 0.5,
  abd: 16,
  flex: 12,
  rot: 10,
  elbow: 34,
  pron: 0,
  cuff: 0,
  labrum: 0,
  biceps: 0,
  lateral: 0,
  medial: 0,
  nerve: 0,
  olecranon: 0,
  labelsShoulder: 0,
  labelsElbow: 0,
  scan: 0,
};

export type SceneKeyframe = {
  id: string;
  values: Partial<SceneParams>;
  /** Ajustes para telas compactas (< 1024px): enquadramento diferente, mesma pose. */
  compact?: Partial<SceneParams>;
  /** Easing GSAP do trecho que CHEGA neste keyframe. */
  ease?: string;
};

export const sceneKeyframes: SceneKeyframe[] = [
  {
    id: "hero",
    values: {},
    compact: { camX: 7.2, camY: 0.2, camZ: 18, tgtX: -0.5, tgtY: -3.0, shiftX: 0.24, shiftY: 0.12, opacity: 0.7 },
  },
  {
    id: "shoulder-intro",
    values: { camX: 4.4, camY: 0.8, camZ: 6.6, tgtX: -0.4, tgtY: -0.7, tgtZ: 0, shiftX: 0.2, focus: 6.5, context: 0.4, abd: 8, flex: 0, rot: 5, elbow: 14 },
    compact: { camX: 4.4, camY: 0.9, camZ: 9.2, tgtX: -0.4, tgtY: -0.9, shiftX: 0, shiftY: 0.2, opacity: 1 },
  },
  {
    id: "shoulder-raise",
    values: { camX: 5.0, camY: 2.6, camZ: 14.6, tgtX: 1.4, tgtY: 1.9, tgtZ: 0.6, shiftX: 0.18, focus: 8.5, context: 0.35, abd: 85, flex: 15, rot: 40, elbow: 80 },
    compact: { camX: 5.0, camY: 2.6, camZ: 18, tgtX: 1.5, tgtY: 1.8, shiftX: 0, shiftY: 0.22 },
  },
  {
    id: "shoulder-reach",
    values: { camX: 6.5, camY: 2.6, camZ: 14.5, tgtX: 1.6, tgtY: 1.6, tgtZ: 1.0, shiftX: 0.13, focus: 10, context: 0.35, abd: 100, flex: 45, rot: 25, elbow: 30 },
    compact: { camX: 6.5, camY: 2.6, camZ: 21, tgtX: 2.2, tgtY: 1.8, shiftX: 0, shiftY: 0.24 },
  },
  {
    id: "anatomy-cuff",
    values: { camX: 3.1, camY: 1.0, camZ: 4.3, tgtX: -0.12, tgtY: 0.0, tgtZ: 0, shiftX: 0.22, focus: 3.4, context: 0.15, abd: 22, flex: 6, rot: 12, elbow: 70, cuff: 1, labelsShoulder: 1 },
    compact: { camX: 2.9, camY: 1.0, camZ: 4.7, tgtY: -0.05, shiftX: 0, shiftY: 0.2 },
  },
  {
    id: "anatomy-stability",
    values: { camX: 3.9, camY: 0.6, camZ: 3.0, tgtX: -0.2, tgtY: 0.05, tgtZ: 0, shiftX: 0.22, focus: 3.2, context: 0.12, abd: 48, flex: 10, rot: -35, elbow: 80, cuff: 0.25, labrum: 1, biceps: 0.9, labelsShoulder: 1 },
    compact: { camX: 3.6, camY: 0.6, camZ: 3.4, shiftX: 0, shiftY: 0.2 },
  },
  {
    id: "transition",
    values: { camX: 3.8, camY: -1.2, camZ: 5.6, tgtX: 0.05, tgtY: -1.7, tgtZ: 0.1, shiftX: 0.2, focus: 6, context: 0, abd: 14, flex: 12, rot: 0, elbow: 40, scan: 0.55 },
    compact: { camX: 4.0, camY: -1.0, camZ: 8.2, tgtY: -1.9, shiftX: 0, shiftY: 0.2 },
    ease: "sine.inOut",
  },
  {
    id: "elbow-intro",
    values: { camX: 2.8, camY: -2.3, camZ: 3.6, tgtX: 0.05, tgtY: -3.1, tgtZ: 0.15, shiftX: 0.2, focus: 3.4, context: 0, abd: 10, flex: 4, rot: 0, elbow: 18, pron: 0, scan: 1 },
    compact: { camX: 3.0, camY: -2.2, camZ: 5.2, shiftX: 0, shiftY: 0.2 },
  },
  {
    id: "elbow-flex",
    values: { camX: -3.1, camY: -2.0, camZ: 3.9, tgtX: 0.2, tgtY: -2.85, tgtZ: 0.55, shiftX: 0.1, focus: 4.2, abd: 10, flex: 4, rot: 0, elbow: 105, pron: -30, lateral: 1, labelsElbow: 1, scan: 1 },
    compact: { camX: -3.8, camY: -1.9, camZ: 5.2, shiftX: 0, shiftY: 0.2 },
  },
  {
    id: "elbow-detail",
    values: { camX: -3.4, camY: -1.8, camZ: -3.6, tgtX: 0.0, tgtY: -2.75, tgtZ: 0.35, shiftX: 0.2, focus: 4.2, abd: 12, flex: 6, rot: 10, elbow: 92, pron: 30, medial: 0.7, nerve: 1, olecranon: 1, labelsElbow: 1, scan: 1 },
    compact: { camX: -3.2, camY: -1.7, camZ: -3.4, shiftX: 0, shiftY: 0.2 },
  },
  {
    id: "care",
    values: { camX: 5.0, camY: -0.6, camZ: 12.5, tgtX: -0.3, tgtY: -2.3, tgtZ: 0, shiftX: 0.27, focus: 14, opacity: 0.6, context: 0.5, abd: 14, flex: 24, rot: 0, elbow: 82, pron: 0, scan: 1 },
    compact: { camX: 5.0, camY: -0.6, camZ: 16, shiftX: 0, shiftY: 0.18, opacity: 0.32 },
  },
  {
    id: "final",
    values: { camX: 6.8, camY: 2.2, camZ: 16, tgtX: 1.6, tgtY: 1.4, tgtZ: 1.0, shiftX: 0.14, focus: 15, opacity: 0.95, context: 0.45, abd: 105, flex: 35, rot: 20, elbow: 25, pron: 0, scan: 1 },
    compact: { camX: 8.6, camY: 2.2, camZ: 19, shiftX: 0, shiftY: 0.22, opacity: 0.55 },
  },
];
