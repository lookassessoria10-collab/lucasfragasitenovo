import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { articles, formatDate, getArticle, legacyArticleSlugs, sortedArticles } from "@/content/articles";
import { site, whatsappHref } from "@/content/site";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/icons";
import { articleJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conteudos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/conteudos/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [site.name],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/conteudos/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    // endereços de artigos do site anterior ainda não migrados
    if (legacyArticleSlugs.includes(slug)) permanentRedirect("/conteudos");
    notFound();
  }

  const related = sortedArticles()
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.topic === article.topic) - Number(a.topic === article.topic))
    .slice(0, 3);

  return (
    <main id="conteudo" className="surface-light bg-white text-ink">
      <article>
        <header className="relative overflow-hidden bg-navy-900 pb-16 pt-36 text-white md:pb-20 md:pt-44">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="container-x relative max-w-4xl">
            <nav aria-label="Trilha" className="text-sm text-on-dark">
              <Link href="/conteudos" className="hover:text-white">
                Conteúdos
              </Link>
              <span className="mx-2 text-white/30">/</span>
              <span>{article.topic}</span>
            </nav>
            <h1 className="display mt-6 text-balance text-[clamp(2.1rem,5vw,3.8rem)]">{article.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-on-dark">{article.excerpt}</p>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-on-dark">
              <span className="font-semibold text-white">{site.name}</span>
              <span className="text-white/30">·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="text-white/30">·</span>
              {article.readingMinutes} min de leitura
            </p>
          </div>
        </header>

        <div className="container-x max-w-4xl">
          <ArticleCover topic={article.topic} seed={article.slug} className="-mt-px aspect-[21/9] w-full rounded-b-[1.75rem]" />
        </div>

        <div className="container-x grid max-w-4xl gap-12 py-14 md:py-20">
          <div className="prose-article mx-auto w-full max-w-[42rem]">
            {article.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
            <p className="!mt-10 rounded-2xl bg-mist p-5 !text-sm !leading-relaxed">
              Este conteúdo tem caráter educativo e não substitui a avaliação médica. Em caso de dor persistente, procure
              um ortopedista.
            </p>
          </div>

          <aside className="relative mx-auto w-full max-w-[42rem] overflow-hidden rounded-[1.75rem] bg-navy-900 p-8 text-white md:p-10">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow text-accent">Avaliação especializada</p>
              <p className="display mt-4 text-2xl md:text-3xl">Ficou com dúvidas sobre o seu caso?</p>
              <p className="mt-3 text-on-dark">
                Agende uma consulta em Salvador, Feira de Santana, Camaçari ou Candeias.
              </p>
              <div className="mt-7">
                <Button href={whatsappHref()} icon={<WhatsApp size={18} />}>
                  Agendar pelo WhatsApp
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="related-title" className="bg-mist">
        <div className="container-x py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-title" className="display text-3xl">
              Continue lendo
            </h2>
            <Link href="/conteudos" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-ink hover:underline">
              Todos os conteúdos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd(article))} />
    </main>
  );
}
