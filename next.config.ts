import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /** Endereços do site anterior (WordPress) → novas seções. Preserva links e SEO. */
  async redirects() {
    return [
      { source: "/sobre-mim", destination: "/#sobre", permanent: true },
      { source: "/dor-no-ombro-e-cotovelo", destination: "/#ombro", permanent: true },
      { source: "/locais-de-atendimento", destination: "/#contato", permanent: true },
      { source: "/fale-conosco", destination: "/#contato", permanent: true },
      { source: "/blog", destination: "/conteudos", permanent: true },
      { source: "/blog/page/:n", destination: "/conteudos", permanent: true },
      { source: "/conteudos/author/:name", destination: "/conteudos", permanent: true },
      { source: "/feed", destination: "/conteudos", permanent: false },
    ];
  },
};

export default nextConfig;
