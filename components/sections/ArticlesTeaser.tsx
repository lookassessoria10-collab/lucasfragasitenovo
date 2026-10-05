import Link from "next/link";
import { articlesTeaser } from "@/content/home";
import { sortedArticles } from "@/content/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArrowRight } from "@/components/ui/icons";

/** Seção 10 — Conteúdos. Um destaque + lista enxuta. */
export function ArticlesTeaser() {
  const [featured, ...rest] = sortedArticles();
  return (
    <section id="conteudos" aria-labelledby="articles-title" className="surface-light relative z-10 bg-mist text-ink">
      <div className="container-x py-24 md:py-32">
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p data-reveal-item className="eyebrow tick text-accent-ink">
              {articlesTeaser.eyebrow}
            </p>
            <h2 id="articles-title" data-reveal-item className="display mt-6 text-balance text-[clamp(2rem,4.4vw,3.5rem)]">
              {articlesTeaser.title}
            </h2>
            <p data-reveal-item className="mt-5 text-lg text-ink-soft">
              {articlesTeaser.lead}
            </p>
          </div>
          <Link
            data-reveal-item
            href="/conteudos"
            className="inline-flex min-h-12 items-center gap-2 self-start rounded-full border border-ink/15 px-5 text-sm font-semibold transition-colors hover:border-ink/40 md:self-auto"
          >
            Ver todos os conteúdos <ArrowRight size={16} />
          </Link>
        </div>

        <div data-reveal className="mt-14 grid gap-8 lg:grid-cols-12">
          <div data-reveal-item className="lg:col-span-7">
            <ArticleCard article={featured} variant="featured" />
          </div>
          <div data-reveal-item className="divide-y divide-ink/8 lg:col-span-5 lg:-mt-5">
            {rest.slice(0, 4).map((a) => (
              <ArticleCard key={a.slug} article={a} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
