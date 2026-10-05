import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "dark" | "outline-dark";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-navy-900 hover:bg-accent-soft shadow-[0_0_0_1px_rgb(0_229_211/0.4),0_10px_30px_-10px_rgb(0_229_211/0.6)]",
  ghost: "text-white border border-white/20 hover:border-white/50 hover:bg-white/5",
  dark: "bg-navy-900 text-white hover:bg-navy-700",
  "outline-dark": "text-ink border border-ink/20 hover:border-ink/50 hover:bg-ink/5",
};

type Props = {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children">;

/** Botão-link. Links externos (WhatsApp, telefone) abrem com segurança. */
export function Button({ href, variant = "primary", icon, children, className = "", external, ...rest }: Props) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold tracking-[-0.005em] transition-all duration-300 ease-out-expo ${styles[variant]} ${className}`;
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
