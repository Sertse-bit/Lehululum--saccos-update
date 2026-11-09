"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Article } from "@/content/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article, delay }: { article: Article; delay?: number }) {
  const { t, l, lang } = useLanguage();
  const title = l(article.title);

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover">
        <div className="h-2 bg-gradient-to-r from-forest via-forest to-gold" aria-hidden="true" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-bold text-gold-deep">
              {t.news.categories[article.category]}
            </span>
            {article.date ? (
              <time dateTime={article.date} className="text-xs text-ink-soft">
                {formatDate(article.date, lang)}
              </time>
            ) : null}
          </div>
          <h3 className="mt-4 text-lg font-extrabold text-forest-900">
            <Link
              href={`/articles/${article.slug}`}
              className="after:absolute after:inset-0 after:content-[''] hover:underline"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-2 text-[0.95rem] text-ink-soft">{l(article.excerpt)}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.95rem] font-bold text-forest">
            {t.common.buttons.readMore}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Reveal>
  );
}
