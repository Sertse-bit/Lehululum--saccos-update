"use client";

import { ArrowLeft, BookOpen, Megaphone } from "lucide-react";
import Link from "next/link";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { articleListHref, articles, getArticlesByCategory } from "@/content/articles";
import type { Article, ArticleBlock } from "@/content/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { channels } from "@/lib/channels";
import { formatDate } from "@/lib/format";

/** /news – announcements, events and service updates (never invented). */
export function NewsPageContent() {
  const { t } = useLanguage();
  const n = t.news;
  const published = articles.filter((a) => a.category !== "education");
  const social = channels.filter((c) => c.id === "telegram" || c.id === "tiktok");

  return (
    <>
      <section className="section-y" aria-label={t.meta.pages.news.heading}>
        <div className="container-page">
          {published.length === 0 ? (
            <EmptyState icon={Megaphone} title={n.news.emptyTitle} text={n.news.emptyText}>
              {social.map(({ id, href, Icon }) => (
                <ButtonLink key={id} href={href} variant="outline">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {t.common.contact[id]}
                </ButtonLink>
              ))}
            </EmptyState>
          ) : (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {published.map((article, index) => (
                <li key={article.slug}>
                  <ArticleCard article={article} delay={(index % 3) * 90} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-cream section-y" aria-labelledby="edu-promo-title">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-gold-bright">
              <BookOpen className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 id="edu-promo-title" className="mt-5 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {n.news.educationTitle}
            </h2>
            <p className="mt-3 text-ink-soft">{n.news.educationText}</p>
            <ButtonLink href="/resources" className="mt-6">
              {n.news.educationLink}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** /resources – member education articles. */
export function ResourcesPageContent() {
  const { t } = useLanguage();
  const list = getArticlesByCategory("education");

  return (
    <>
      <section className="section-y" aria-label={t.meta.pages.resources.heading}>
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((article, index) => (
              <li key={article.slug}>
                <ArticleCard article={article} delay={(index % 3) * 90} />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-ink-soft">
            {t.news.resources.disclaimer}
          </p>
        </div>
      </section>
      <CtaBand
        title={t.news.resources.moreTitle}
        text={t.news.resources.moreText}
        primary={{ label: t.news.resources.moreLink, href: "/faq" }}
        className="pb-16 sm:pb-24"
      />
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-extrabold text-forest-900">{block.text}</h2>;
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-gold">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-4">{block.text}</p>;
  }
}

/** /articles/[slug] – one article with related reading. */
export function ArticlePageContent({ article }: { article: Article }) {
  const { t, l, lang } = useLanguage();
  const listHref = articleListHref(article.category);
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="section-y">
        <div className="container-page max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-bold text-gold-deep">
              {t.news.categories[article.category]}
            </span>
            {article.date ? (
              <time dateTime={article.date} className="text-sm text-ink-soft">
                {t.news.article.updated}: {formatDate(article.date, lang)}
              </time>
            ) : null}
          </div>
          <div className="mt-6 text-[1.05rem] text-ink [&>p:first-child]:mt-0 [&>p:first-child]:text-lg [&>p:first-child]:text-ink-soft">
            {l(article.body).map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
          <p className="mt-10 rounded-2xl bg-cream p-4 text-sm text-ink-soft">
            {t.news.article.generalNote}
          </p>
          <Link
            href={listHref}
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-forest underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {article.category === "education"
              ? t.news.article.backToResources
              : t.news.article.backToNews}
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-cream section-y" aria-labelledby="related-title">
          <div className="container-page">
            <h2 id="related-title" className="text-2xl font-extrabold text-forest-900">
              {t.news.article.relatedTitle}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a, index) => (
                <li key={a.slug}>
                  <ArticleCard article={a} delay={index * 90} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
