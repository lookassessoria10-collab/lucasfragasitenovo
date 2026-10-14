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
    // braço sobe e gira: o gesto que costuma doer
    id: "shoulder-raise",
    values: { camX: 5.0, camY: 2.6, camZ: 14.6, tgtX: 1.4, tgtY: 1.9, tgtZ: 0.6, shiftX: 0.18, focus: 8.5, context: 0.35, abd: 85, flex: 15, rot: 40, elbow: 80 },
    compact: { camX: 5.0, camY: 2.6, camZ: 18, tgtX: 1.5, tgtY: 1.8, shiftX: 0, shiftY: 0.22, opacity: 1 },
  },
  {
    // aproximação no ombro, tendões em destaque
    id: "anatomy-cuff",
    values: { camX: 3.1, camY: 1.0, camZ: 4.3, tgtX: -0.12, tgtY: 0.0, tgtZ: 0, shiftX: 0.22, focus: 3.4, context: 0.15, abd: 22, flex: 6, rot: 12, elbow: 70, cuff: 1, labelsShoulder: 1, scan: 0 },
    compact: { camX: 2.9, camY: 1.0, camZ: 4.7, tgtY: -0.05, shiftX: 0, shiftY: 0.2 },
  },
  {
    // a câmera desce pelo braço (anel de varredura) até o cotovelo, que flexiona
    id: "elbow-flex",
    values: { camX: -3.1, camY: -2.0, camZ: 3.9, tgtX: 0.2, tgtY: -2.85, tgtZ: 0.55, shiftX: 0.1, focus: 4.2, context: 0, abd: 10, flex: 4, rot: 0, elbow: 105, pron: -30, lateral: 1, labelsElbow: 1, scan: 1 },
    compact: { camX: -3.8, camY: -1.9, camZ: 5.2, shiftX: 0, shiftY: 0.2 },
    ease: "sine.inOut",
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
