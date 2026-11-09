import type { Partner } from "./types";

/**
 * Add confirmed partner organizations here once the cooperative approves
 * them for publication. Never add a partner, logo or affiliation that has
 * not been confirmed. Example entry:
 *
 * {
 *   id: "example-partner",
 *   name: { am: "…", en: "Example Partner" },
 *   description: { am: "…", en: "…" },
 *   logo: "/images/partners/example.png",
 *   website: "https://example.org",
 * }
 */
export const partners: Partner[] = [];
