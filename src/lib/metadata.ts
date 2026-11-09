import type { Metadata } from "next";
import { organization as org } from "@/config/organization";
import { am } from "@/translations/am";
import { en, type Dictionary } from "@/translations/en";

export type PageKey = keyof Dictionary["meta"]["pages"];

export const OG_IMAGE = {
  url: "/images/og-image.png",
  width: 1200,
  height: 630,
  alt: `${org.brandName} – ${org.tagline.en}`,
};

/**
 * Static page metadata. Search engines and social previews read the HTML
 * that was rendered on the server, so titles use the default language
 * (Amharic) and descriptions carry both languages. The visible tab title is
 * then localized in the browser by <LocalizedTitle />.
 */
export function pageMetadata(key: PageKey, path: string): Metadata {
  const a = am.meta.pages[key];
  const e = en.meta.pages[key];
  const description = `${a.description} ${e.description}`;
  const title = key === "home" ? { absolute: a.title } : a.title;
  const fullTitle = key === "home" ? a.title : `${a.title} | ${org.brandName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: org.brandName,
      locale: "am_ET",
      alternateLocale: ["en_US"],
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
