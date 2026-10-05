/**
 * Modo de inspeção visual (`?qa=1`): desliga amortecimento, "respiração" do
 * modelo e animações de entrada, para que capturas de tela mostrem
 * exatamente o estado de cada keyframe. Não afeta visitantes.
 */
export function isQA() {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qa") === "1";
}
