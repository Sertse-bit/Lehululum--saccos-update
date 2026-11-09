import type { Vacancy } from "./types";

/**
 * Add real, approved job announcements here. While this list is empty the
 * Vacancy page shows an honest "no announcements" message and the
 * employment-inquiry contact options. Example entry:
 *
 * {
 *   id: "accountant-2026",
 *   title: { am: "…", en: "Accountant" },
 *   type: { am: "ሙሉ ጊዜ", en: "Full time" },
 *   location: { am: "…", en: "…" },
 *   deadline: "2026-12-31",
 *   description: { am: "…", en: "…" },
 *   howToApply: { am: "…", en: "…" },
 * }
 */
export const vacancies: Vacancy[] = [];
