type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * Decide se vale a pena rodar a cena 3D neste dispositivo.
 * Sem WebGL, com economia de dados ativa ou em aparelhos muito modestos,
 * o site usa a ilustração vetorial — conteúdo e conversão continuam intactos.
 * Para testar o fallback: adicione `?3d=0` à URL.
 */
export function canRun3D() {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).get("3d") === "0") return false;

  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 2) return false;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
