"use client";
/* eslint-disable react-hooks/immutability -- objetos three.js e uniforms são mutados no render loop (padrão R3F), fora do ciclo de render do React */

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createHaloMaterial, createParticleMaterial } from "./materials";

/** Halo atrás do ponto de foco + partículas flutuantes. Puramente atmosférico. */
export function Atmosphere({
  count,
  focus,
  opacity,
  motion,
}: {
  count: number;
  focus: THREE.Vector3;
  opacity: { current: number };
  motion: boolean;
}) {
  const camera = useThree((s) => s.camera);
  const dpr = useThree((s) => s.viewport.dpr);
  const halo = useRef<THREE.Mesh>(null);

  const haloMaterial = useMemo(() => createHaloMaterial(), []);
  const particleMaterial = useMemo(() => createParticleMaterial(dpr), [dpr]);

  const particles = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    // distribuição determinística (sem Math.random para manter o resultado estável)
    let s = 7;
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = -4 + rand() * 9;
      pos[i * 3 + 1] = -7.5 + rand() * 10;
      pos[i * 3 + 2] = -4 + rand() * 7;
      seed[i] = rand();
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return geo;
  }, [count]);

  useEffect(
    () => () => {
      particles.dispose();
      haloMaterial.dispose();
      particleMaterial.dispose();
    },
    [particles, haloMaterial, particleMaterial],
  );

  useFrame(() => {
    const h = halo.current;
    if (h) {
      h.position.copy(focus);
      h.quaternion.copy(camera.quaternion);
      const dist = camera.position.distanceTo(focus);
      h.scale.setScalar(dist * 0.55);
      haloMaterial.uniforms.uOpacity.value = 0.38 * opacity.current;
    }
    particleMaterial.uniforms.uOpacity.value = opacity.current;
    particleMaterial.uniforms.uMotion.value = motion ? 1 : 0;
  });

  return (
    <>
      <mesh ref={halo} material={haloMaterial} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <points geometry={particles} material={particleMaterial} frustumCulled={false} />
    </>
  );
}
