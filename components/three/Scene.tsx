"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";
import { COMPACT_QUERY, REDUCED_MOTION_QUERY } from "@/lib/scroll/story";
import { QUALITY_HIGH, QUALITY_LOW } from "./anatomy/geometry";
import { hotspots } from "./anatomy/skeleton";
import { StoryRig } from "./StoryRig";

type Props = {
  /** Quando falso, o loop de render pausa (seções sólidas cobrem o palco). */
  active: boolean;
  onReady: () => void;
  onError: () => void;
};

/** Canvas WebGL. Carregado sob demanda (next/dynamic, ssr: false). */
export default function Scene({ active, onReady, onError }: Props) {
  const compact = useMediaQuery(COMPACT_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const coarse = useMediaQuery("(pointer: coarse)");
  const maxDpr = compact ? 1.5 : 1.75;
  const [dpr, setDpr] = useState(maxDpr);
  const labels = useRef<Record<string, HTMLElement | null>>({});

  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, Math.min(dpr, maxDpr)]}
        gl={{ antialias: !compact, alpha: true, depth: false, stencil: false, powerPreference: "high-performance" }}
        camera={{ fov: 32, near: 0.1, far: 80, position: [6.5, -0.8, 11.5] }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onError();
          });
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <PerformanceMonitor
          flipflops={3}
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(maxDpr)}
          onFallback={() => setDpr(1)}
        />
        <StoryRig
          quality={compact ? QUALITY_LOW : QUALITY_HIGH}
          particles={compact ? 90 : 220}
          reducedMotion={reducedMotion}
          pointerParallax={!coarse}
          labels={labels}
          onReady={onReady}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hotspots.map((h) => (
          <div
            key={h.key}
            ref={(el) => {
              labels.current[h.key] = el;
            }}
            className="hotspot"
            style={{ visibility: "hidden" }}
          >
            <span className="hotspot-dot" />
            <span className="hotspot-line" />
            <span className="hotspot-text">{h.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
