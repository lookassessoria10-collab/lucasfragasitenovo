"use client";
/* eslint-disable react-hooks/immutability -- objetos three.js e uniforms são mutados no render loop (padrão R3F), fora do ciclo de render do React */

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import type { SceneParams } from "@/content/scene-keyframes";
import { isQA } from "@/lib/qa";
import { story } from "@/lib/scroll/story";
import { ArmModel, type ArmHandle } from "./ArmModel";
import { Atmosphere } from "./Atmosphere";
import { hotspots, type HighlightKey } from "./anatomy/skeleton";
import type { Quality } from "./anatomy/geometry";
import { sharedUniforms } from "./materials";

type Props = {
  quality: Quality;
  particles: number;
  reducedMotion: boolean;
  pointerParallax: boolean;
  labels: RefObject<Record<string, HTMLElement | null>>;
  onReady: () => void;
};

/**
 * Lê o estado-alvo produzido pelo scroll (story.target), amortece os valores
 * para um movimento contínuo e aplica em câmera, modelo e rótulos.
 */
export function StoryRig({ quality, particles, reducedMotion, pointerParallax, labels, onReady }: Props) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  const arm = useRef<ArmHandle>(null);
  const yaw = useRef<THREE.Group>(null);
  const current = useMemo<SceneParams>(() => ({ ...story.target }), []);
  const posed = useMemo<SceneParams>(() => ({ ...story.target }), []);
  const keys = useMemo(() => Object.keys(story.target) as (keyof SceneParams)[], []);
  const focus = useMemo(() => new THREE.Vector3(), []);
  const opacity = useRef(1);
  const pointer = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const frameCount = useRef(0);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const qa = useMemo(() => isQA(), []);
  const labelWidths = useMemo(() => new WeakMap<HTMLElement, number>(), []);

  useEffect(() => {
    if (!pointerParallax) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerParallax]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const lambda = reducedMotion ? 9 : 4;
    const target = story.target;
    // primeiro frame: posiciona direto, sem animar a partir do estado inicial
    const k = frameCount.current === 0 || qa ? 1 : 1 - Math.exp(-lambda * dt);
    for (const key of keys) current[key] += (target[key] - current[key]) * k;

    const t = state.clock.elapsedTime;
    sharedUniforms.uTime.value = t;

    // Respiração sutil: o modelo nunca fica completamente estático
    const life = reducedMotion || qa ? 0 : 1;
    Object.assign(posed, current);
    posed.abd = current.abd + Math.sin(t * 0.55) * 1.4 * life;
    posed.elbow = current.elbow + Math.sin(t * 0.42 + 1.2) * 2.6 * life;
    posed.pron = current.pron + Math.sin(t * 0.3) * 4 * life;
    arm.current?.apply(posed);
    if (yaw.current) yaw.current.rotation.y = Math.sin(t * 0.18) * 0.05 * life;

    // Câmera
    const p = pointer.current;
    p.sx += (p.x - p.sx) * 0.04;
    p.sy += (p.y - p.sy) * 0.04;
    const par = pointerParallax && !reducedMotion ? 1 : 0;
    camera.position.set(current.camX + p.sx * 0.35 * par, current.camY - p.sy * 0.22 * par, current.camZ);
    focus.set(current.tgtX, current.tgtY, current.tgtZ);
    camera.lookAt(focus);
    const cam = camera as THREE.PerspectiveCamera;
    cam.setViewOffset(size.width, size.height, -current.shiftX * size.width, current.shiftY * size.height, size.width, size.height);

    sharedUniforms.uFocus.value.copy(focus);
    sharedUniforms.uFocusRadius.value = current.focus;
    opacity.current = current.opacity;

    // Rótulos anatômicos (DOM sobreposto ao canvas)
    const els = labels.current;
    if (els && arm.current) {
      const hl: Record<HighlightKey, number> = {
        cuff: current.cuff,
        labrum: current.labrum,
        biceps: current.biceps,
        lateral: current.lateral,
        medial: current.medial,
        nerve: current.nerve,
        olecranon: current.olecranon,
      };
      for (const h of hotspots) {
        const el = els[h.key];
        if (!el) continue;
        const group = h.group === "shoulder" ? current.labelsShoulder : current.labelsElbow;
        const emphasis = h.highlight ? hl[h.highlight] : 0;
        // só o que está em destaque ganha rótulo — evita sobreposição
        const o = group * THREE.MathUtils.smoothstep(emphasis, 0.3, 0.7) * current.opacity;
        if (o < 0.02 || !arm.current.hotspotWorld(h.key, tmp)) {
          if (el.style.visibility !== "hidden") el.style.visibility = "hidden";
          continue;
        }
        tmp.project(camera);
        if (tmp.z > 1) {
          el.style.visibility = "hidden";
          continue;
        }
        const x = (tmp.x * 0.5 + 0.5) * size.width;
        const y = (-tmp.y * 0.5 + 0.5) * size.height;
        el.style.visibility = "visible";
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        // vira o rótulo para a esquerda quando não cabe à direita
        const w = labelWidths.get(el) ?? el.offsetWidth;
        labelWidths.set(el, w);
        el.dataset.flip = x + w > size.width - 12 ? "true" : "false";
        el.dataset.active = emphasis > 0.6 ? "true" : "false";
      }
    }

    frameCount.current++;
    if (frameCount.current === 3) onReady();
  });

  return (
    <>
      <group ref={yaw}>
        <ArmModel ref={arm} quality={quality} />
      </group>
      <Atmosphere count={particles} focus={focus} opacity={opacity} motion={!reducedMotion} />
    </>
  );
}
