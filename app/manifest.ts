import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Exportação estática: gerado uma vez no build. */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Ombro e Cotovelo`,
    short_name: site.name,
    description: "Ortopedia e cirurgia do ombro e cotovelo em Salvador e região.",
    start_url: "/",
    display: "standalone",
    background_color: "#061429",
    theme_color: "#061429",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
