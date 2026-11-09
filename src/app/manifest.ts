import type { MetadataRoute } from "next";
import { organization as org } from "@/config/organization";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: org.brandName,
    short_name: "Lehulum",
    description: org.tagline.en,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8e7",
    theme_color: "#0b4d2b",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
