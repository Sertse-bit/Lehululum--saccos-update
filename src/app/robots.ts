import type { MetadataRoute } from "next";
import { organization as org } from "@/config/organization";

export default function robots(): MetadataRoute.Robots {
  const base = org.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
