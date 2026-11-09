import type { Lang } from "@/i18n/types";

/** Formats an ISO date (YYYY-MM-DD) for display. Falls back to the raw value. */
export function formatDate(iso: string, lang: Lang): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat(lang === "am" ? "am-ET" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return iso;
  }
}
