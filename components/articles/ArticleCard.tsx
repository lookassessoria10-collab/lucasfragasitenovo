import Link from "next/link";
import { formatDate, type Article } from "@/content/articles";
import { ArrowUpRight } from "@/components/ui/icons";
import { ArticleCover } from "./ArticleCover";

export function ArticleCard({ article, variant = "default" }: { article: Article; variant?: "default" | "featured" | "compact" }) {
  const href = `/conteudos/${article.slug}`;

  if (variant === "compact") {
    return (
      <Link href={href} className="group grid grid-cols-[6.5rem_1fr] items-center gap-5 py-5 sm:grid-cols-[8rem_1fr]">
        <ArticleCover topic={article.topic} seed={article.slug} className="aspect-[4/3] w-full rounded-xl" />
        <div>
          <p className="eyebrow text-[0.62rem] text-accent-ink">{article.topic}</p>
          <h3 className="mt-2 font-display text-[1.02rem] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-ink">
            {article.title}
          </h3>
          <p className="mt-1.5 text-xs text-ink-soft">{article.readingMinutes} min de leitura</p>
        </div>
      </Link>
    );
  }

  const featured = variant === "featured";
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(10_22_40/0.35)]"
    >
      <div className="relative overflow-hidden">
        <ArticleCover
          topic={article.topic}
          seed={article.slug}
          className={`w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}
        />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink">
          {article.topic}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className={`font-display font-semibold tracking-tight text-ink ${featured ? "text-2xl md:text-[1.9rem] md:leading-tight" : "text-xl"}`}>
          {article.title}
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="text-ink-soft">
            <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readingMinutes} min
          </span>
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors group-hover:border-accent-ink group-hover:bg-accent-ink group-hover:text-white">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </Link>
  );
}
