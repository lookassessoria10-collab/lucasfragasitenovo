"use client";
/* eslint-disable react-hooks/immutability -- objetos three.js e uniforms são mutados no render loop (padrão R3F), fora do ciclo de render do React */

import { useEffect, useImperativeHandle, useMemo, useRef, type Ref } from "react";
import * as THREE from "three";
import type { SceneParams } from "@/content/scene-keyframes";
import { createLoftGeometry, writeLoft, type Quality } from "./anatomy/geometry";
import {
  JOINTS,
  buildSkeleton,
  hotspots,
  softTissues,
  type Frame,
  type HighlightKey,
} from "./anatomy/skeleton";
import { createHoloMaterial, palette } from "./materials";

export type ArmHandle = {
  /** Aplica a pose/estado atual ao modelo. */
  apply: (p: SceneParams) => void;
  /** Posição em coordenadas de mundo de um ponto de interesse (rótulos). */
  hotspotWorld: (key: string, out: THREE.Vector3) => THREE.Vector3 | null;
};

const DEG = Math.PI / 180;
const X = new THREE.Vector3(1, 0, 0);
const Y = new THREE.Vector3(0, 1, 0);
const Z = new THREE.Vector3(0, 0, 1);
const neg = (v: readonly number[]) => v.map((n) => -n) as [number, number, number];

type TissueRuntime = {
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  curve: THREE.CatmullRomCurve3;
  segments: number;
  radial: number;
  def: (typeof softTissues)[number];
};

export function ArmModel({ quality, ref }: { quality: Quality; ref?: Ref<ArmHandle> }) {
  const skeleton = useMemo(() => buildSkeleton(quality), [quality]);

  const materials = useMemo(
    () => ({
      bone: createHoloMaterial(palette.bone),
      context: createHoloMaterial({ ...palette.boneDim, base: 0.02 }),
      labrum: createHoloMaterial({ ...palette.tendon, power: 1.6 }),
      scan: createHoloMaterial({ color: palette.accent, core: palette.accent, base: 0.9, power: 1 }),
    }),
    [],
  );

  const tissues = useMemo<TissueRuntime[]>(
    () =>
      softTissues.map((def) => {
        const segments = Math.max(12, Math.round(def.segments * quality.segments));
        const radial = Math.max(6, Math.round(quality.radial * 0.6));
        return {
          def,
          segments,
          radial,
          geometry: createLoftGeometry(segments, radial),
          material: createHoloMaterial(def.highlight === "nerve" ? palette.nerve : palette.tendon),
          curve: new THREE.CatmullRomCurve3(
            def.points.map(() => new THREE.Vector3()),
            false,
            "centripetal",
          ),
        };
      }),
    [quality],
  );

  useEffect(
    () => () => {
      Object.values(skeleton).forEach((g) => g.dispose());
      tissues.forEach((t) => {
        t.geometry.dispose();
        t.material.dispose();
      });
    },
    [skeleton, tissues],
  );
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  const root = useRef<THREE.Group>(null);
  const girdle = useRef<THREE.Group>(null);
  const girdleInner = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const radiusPivot = useRef<THREE.Group>(null);
  const radiusInner = useRef<THREE.Group>(null);
  const scanRing = useRef<THREE.Mesh>(null);

  const scratch = useMemo(
    () => ({
      qa: new THREE.Quaternion(),
      qb: new THREE.Quaternion(),
      dir: new THREE.Vector3(),
      v: new THREE.Vector3(),
      pronAxis: new THREE.Vector3(...JOINTS.ulnarHead).sub(new THREE.Vector3(...JOINTS.radialHead)).normalize(),
      lastPose: "",
    }),
    [],
  );

  useImperativeHandle(ref, () => {
    // geometrias de partes moles novas (ex.: troca de qualidade) precisam ser escritas
    scratch.lastPose = "";
    const frames =(): Record<Frame, THREE.Object3D | null> => ({
      girdle: girdleInner.current,
      humerus: shoulder.current,
      forearm: elbow.current,
      radius: radiusInner.current,
    });

    const updateTissues = () => {
      const r = root.current;
      if (!r) return;
      const f = frames();
      r.updateMatrixWorld(true);
      for (const t of tissues) {
        t.def.points.forEach(([frame, at], i) => {
          const obj = f[frame];
          if (!obj) return;
          const p = t.curve.points[i].set(at[0], at[1], at[2]);
          obj.localToWorld(p);
          r.worldToLocal(p);
        });
        writeLoft(t.geometry, t.curve, { rx: t.def.rx, cap: 0.05 }, t.segments, t.radial);
      }
    };

    return {
      apply(p) {
        const sh = shoulder.current;
        const gi = girdle.current;
        const el = elbow.current;
        const rp = radiusPivot.current;
        if (!sh || !gi || !el || !rp) return;

        // Ombro: flexão (X) · abdução (Z) · rotação axial (Y)
        sh.quaternion.setFromAxisAngle(X, -p.flex * DEG);
        sh.quaternion.multiply(scratch.qa.setFromAxisAngle(Z, p.abd * DEG));
        sh.quaternion.multiply(scratch.qb.setFromAxisAngle(Y, p.rot * DEG));

        // Ritmo escapuloumeral: a cintura escapular acompanha elevações acima de ~30°
        scratch.dir.set(0, -1, 0).applyQuaternion(sh.quaternion);
        const elevation = Math.acos(THREE.MathUtils.clamp(-scratch.dir.y, -1, 1)) / DEG;
        gi.rotation.z = Math.max(0, elevation - 30) * 0.2 * DEG;

        el.rotation.x = -p.elbow * DEG;
        rp.quaternion.setFromAxisAngle(scratch.pronAxis, p.pron * DEG);

        const pose = `${p.abd.toFixed(2)}|${p.flex.toFixed(2)}|${p.rot.toFixed(2)}|${p.elbow.toFixed(2)}|${p.pron.toFixed(2)}`;
        if (pose !== scratch.lastPose) {
          scratch.lastPose = pose;
          updateTissues();
        }

        // Materiais
        const hl: Record<HighlightKey, number> = {
          cuff: p.cuff,
          labrum: p.labrum,
          biceps: p.biceps,
          lateral: p.lateral,
          medial: p.medial,
          nerve: p.nerve,
          olecranon: p.olecranon,
        };
        materials.bone.uniforms.uOpacity.value = p.opacity;
        materials.context.uniforms.uOpacity.value = p.opacity * p.context * 0.55;
        materials.labrum.uniforms.uOpacity.value = p.opacity * (0.2 + 0.8 * p.labrum);
        materials.labrum.uniforms.uHighlight.value = p.labrum;
        for (const t of tissues) {
          const h = hl[t.def.highlight];
          t.material.uniforms.uOpacity.value = p.opacity * (t.def.rest + (1 - t.def.rest) * h);
          t.material.uniforms.uHighlight.value = h;
        }

        // Anel de varredura percorrendo o úmero na transição ombro → cotovelo
        const ring = scanRing.current;
        if (ring) {
          const s = THREE.MathUtils.clamp(p.scan, 0, 1);
          const visible = Math.sin(Math.PI * s);
          ring.visible = visible > 0.01;
          ring.position.set(0.07 - 0.02 * s, -0.2 - 2.75 * s, 0);
          ring.scale.setScalar(0.85 + 0.25 * visible);
          materials.scan.uniforms.uOpacity.value = visible * p.opacity;
        }
      },

      hotspotWorld(key, out) {
        const h = hotspots.find((x) => x.key === key);
        if (!h) return null;
        const obj = frames()[h.frame];
        if (!obj) return null;
        return obj.localToWorld(out.set(...h.at));
      },
    };
  }, [materials, scratch, tissues]);

  return (
    <group ref={root}>
      <mesh geometry={skeleton.context} material={materials.context} frustumCulled={false} />
      <group ref={girdle} position={JOINTS.sc}>
        <group ref={girdleInner} position={neg(JOINTS.sc)}>
          <mesh geometry={skeleton.girdle} material={materials.bone} />
          <mesh geometry={skeleton.labrum} material={materials.labrum} />
          <group ref={shoulder}>
            <mesh geometry={skeleton.humerus} material={materials.bone} />
            <mesh ref={scanRing} geometry={skeleton.scanRing} material={materials.scan} visible={false} />
            <group ref={elbow} position={JOINTS.elbow}>
              <mesh geometry={skeleton.ulna} material={materials.bone} />
              <group ref={radiusPivot} position={JOINTS.radialHead}>
                <group ref={radiusInner} position={neg(JOINTS.radialHead)}>
                  <mesh geometry={skeleton.radius} material={materials.bone} />
                  <mesh geometry={skeleton.hand} material={materials.bone} position={JOINTS.wrist} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
      {tissues.map((t) => (
        <mesh key={t.def.id} geometry={t.geometry} material={t.material} frustumCulled={false} />
      ))}
    </group>
  );
}
