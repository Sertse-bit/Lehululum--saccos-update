import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageContent } from "@/components/pages/NewsPages";
import { PageHero } from "@/components/ui/PageHero";
import { OG_IMAGE, type PageKey } from "@/lib/metadata";
import { articleListHref, articles, getArticle } from "@/content/articles";
import { organization as org } from "@/config/organization";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const path = `/articles/${article.slug}`;
  const description = `${article.excerpt.am} ${article.excerpt.en}`;
  const title = article.title.am;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${org.brandName}`,
      description,
      url: path,
      siteName: org.brandName,
      locale: "am_ET",
      alternateLocale: ["en_US"],
      type: "article",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${org.brandName}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const isResource = articleListHref(article.category) === "/resources";
  const crumbs: Array<{ href: string; pageKey: PageKey }> = [
    isResource
      ? { href: "/resources", pageKey: "resources" }
      : { href: "/news", pageKey: "news" },
  ];

  return (
    <>
      <PageHero
        pageKey={isResource ? "resources" : "news"}
        crumbs={crumbs}
        custom={{ title: article.title, intro: article.excerpt }}
      />
      <ArticlePageContent article={article} />
    </>
  );
}
