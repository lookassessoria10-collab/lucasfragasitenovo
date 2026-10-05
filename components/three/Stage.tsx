"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { initStory } from "@/lib/scroll/story";
import { canRun3D } from "@/lib/webgl";
import { ArmIllustration } from "./ArmIllustration";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type Mode = "poster" | "3d" | "fallback";

/**
 * Palco fixo atrás do conteúdo. As seções "transparentes" (data-stage)
 * deixam o modelo aparecer; as sólidas o cobrem — e então o render pausa.
 */
export function Stage() {
  const [mode, setMode] = useState<Mode>("poster");
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Timeline do scroll + decisão de carregar o 3D fora do caminho crítico
  useEffect(() => {
    const dispose = initStory();
    const start = () => setMode(canRun3D() ? "3d" : "fallback");
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1800 })
      : window.setTimeout(start, 700);
    return () => {
      dispose();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  // Pausa o render quando nenhuma seção transparente está na tela
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-stage]"));
    if (!sections.length) return;
    const onScreen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onScreen.add(e.target);
          else onScreen.delete(e.target);
        }
        setVisible(onScreen.size > 0);
      },
      { rootMargin: "15% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const showPoster = mode !== "3d" || !ready;

  return (
    <div
      aria-hidden="true"
      className="stage pointer-events-none fixed inset-0 z-0"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className="stage-glow absolute inset-0" />
      <div
        className={`stage-poster absolute transition-opacity duration-1000 ${showPoster ? "opacity-100" : "opacity-0"}`}
      >
        <ArmIllustration className="h-full w-full" />
      </div>
      {mode === "3d" && (
        <SceneBoundary onError={() => setMode("fallback")}>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            <Scene active={visible} onReady={() => setReady(true)} onError={() => setMode("fallback")} />
          </div>
        </SceneBoundary>
      )}
      <div className="stage-vignette absolute inset-0" />
    </div>
  );
}
