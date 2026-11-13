import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Exportação estática: gerado uma vez no build. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
