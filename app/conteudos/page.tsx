import type { Metadata } from "next";
import Link from "next/link";
import { sortedArticles, type ArticleTopic } from "@/content/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";

export const metadata: Metadata = {
  title: "Conteúdos sobre ombro e cotovelo",
  description:
    "Orientações do Dr. Lucas Fraga sobre dor no ombro, manguito rotador, ombro congelado, instabilidade, epicondilite e outras condições do ombro e do cotovelo.",
  alternates: { canonical: "/conteudos" },
};

const topics: { topic: ArticleTopic; id: string; text: string }[] = [
  { topic: "Ombro", id: "ombro", text: "Tendões, estabilidade, rigidez e dor no ombro." },
  { topic: "Cotovelo", id: "cotovelo", text: "Sobrecarga, nervos e inflamações do cotovelo." },
  { topic: "Orientações", id: "orientacoes", text: "Recuperação, prevenção e dúvidas frequentes." },
];

export default function ArticlesPage() {
  const all = sortedArticles();
  return (
    <main id="conteudo" className="surface-light min-h-screen bg-mist text-ink">
      <header className="relative overflow-hidden bg-navy-900 pb-20 pt-40 text-white md:pb-24 md:pt-48">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-x relative">
          <p className="eyebrow tick text-accent">Conteúdos</p>
          <h1 className="display mt-6 max-w-3xl text-balance text-[clamp(2.4rem,5.5vw,4.5rem)]">
            Informação clara sobre ombro e cotovelo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark">
            Textos educativos para ajudar a entender sintomas e tratamentos. Eles não substituem uma consulta — cada caso
            precisa de avaliação individual.
          </p>
          <nav aria-label="Temas" className="mt-10 flex flex-wrap gap-2">
            {topics.map((t) => (
              <Link
                key={t.id}
                href={`#${t.id}`}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-accent hover:text-white"
              >
                {t.topic}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="container-x space-y-20 py-20 md:py-24">
        {topics.map((t) => {
          const list = all.filter((a) => a.topic === t.topic);
          if (!list.length) return null;
          return (
            <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="scroll-mt-28">
              <div className="flex flex-col justify-between gap-2 border-b border-ink/10 pb-6 md:flex-row md:items-end">
                <h2 id={`${t.id}-title`} className="display text-3xl md:text-4xl">
                  {t.topic}
                </h2>
                <p className="text-ink-soft">{t.text}</p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
