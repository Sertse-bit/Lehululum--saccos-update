import type { Lang } from "@/i18n/types";
import { am } from "./am";
import { en, type Dictionary } from "./en";

export type { Dictionary };

export const dictionaries: Record<Lang, Dictionary> = { am, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
