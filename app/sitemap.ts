import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = articles.reduce((d, a) => (a.date > d ? a.date : d), "2025-01-01");
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/conteudos`, lastModified: new Date(latest), changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((a) => ({
      url: `${site.url}/conteudos/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
