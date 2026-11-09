import type { L10n } from "@/i18n/types";

export type ArticleCategory = "announcement" | "event" | "update" | "education";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  category: ArticleCategory;
  /** ISO date (YYYY-MM-DD). Omit for evergreen educational articles. */
  date?: string;
  title: L10n;
  excerpt: L10n;
  body: L10n<ArticleBlock[]>;
}

export interface Vacancy {
  id: string;
  title: L10n;
  type?: L10n;
  location?: L10n;
  /** ISO date (YYYY-MM-DD). */
  deadline?: string;
  description: L10n;
  howToApply?: L10n;
}

export interface Partner {
  id: string;
  name: L10n;
  description?: L10n;
  /** Path of a logo in /public, for example "/images/partners/example.png". */
  logo?: string;
  website?: string;
}
