import type { NextConfig } from "next";

/**
 * Exportação estática (pasta `out/`) para hospedagem comum (Hostinger, Apache/LiteSpeed).
 * - `trailingSlash`: gera `pasta/index.html`, que qualquer servidor serve sem configuração.
 * - `images.unoptimized`: sem servidor Node não há otimização de imagem sob demanda.
 * - Redirecionamentos do site anterior (WordPress) ficam em `public/.htaccess`,
 *   pois `redirects()` não funciona em exportação estática.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
