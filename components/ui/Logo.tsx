import Image from "next/image";

/**
 * Logotipo oficial (arquivos em /public/brand).
 * - "wordmark": somente a linha principal, para o header
 * - "full": com descritor e CREMEB, para rodapé e páginas internas
 */
export function Logo({
  variant = "wordmark",
  tone = "white",
  className = "",
  priority = false,
}: {
  variant?: "wordmark" | "full";
  tone?: "white" | "color";
  className?: string;
  priority?: boolean;
}) {
  const src = `/brand/logo-${variant}-${tone}.png`;
  const dims = variant === "wordmark" ? { width: 824, height: 122 } : { width: 829, height: 198 };
  return (
    <Image
      src={src}
      alt="Dr. Lucas Fraga — Traumatologia, Ortopedia, Cirurgia de Ombro e Cotovelo"
      {...dims}
      priority={priority}
      className={`h-auto ${className}`}
      sizes="(max-width: 768px) 180px, 240px"
    />
  );
}
