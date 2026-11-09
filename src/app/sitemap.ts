import type { MetadataRoute } from "next";
import { organization as org } from "@/config/organization";
import { articles } from "@/content/articles";
import { staticRoutes } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = org.siteUrl.replace(/\/$/, "");
  const pages = staticRoutes.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.7,
  }));
  const posts = articles.map((article) => ({
    url: `${base}/articles/${article.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...pages, ...posts];
}
