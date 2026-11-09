"use client";

import { ButtonLink } from "@/components/ui/Button";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/content/articles";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Home page "News & resources" teaser: the newest few articles. */
export function NewsSection() {
  const { t } = useLanguage();
  const teaser = t.home.newsTeaser;
  const latest = articles.slice(0, 3);

  return (
    <section id="news" aria-labelledby="news-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <div id="news-title">
            <SectionHeading label={teaser.label} title={teaser.title} text={teaser.subtitle} />
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article, index) => (
            <li key={article.slug}>
              <ArticleCard article={article} delay={index * 90} />
            </li>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/resources" variant="primary">
            {teaser.allResources}
          </ButtonLink>
          <ButtonLink href="/news" variant="outline">
            {teaser.allNews}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
