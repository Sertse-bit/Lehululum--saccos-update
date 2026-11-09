export const LANGS = ["am", "en"] as const;
export type Lang = (typeof LANGS)[number];

/** Amharic is the default for first-time visitors. */
export const DEFAULT_LANG: Lang = "am";

/** localStorage key used to remember the visitor's language choice. */
export const LANG_STORAGE_KEY = "lehulum-lang";

/** A value that exists in both supported languages. */
export type L10n<T = string> = Record<Lang, T>;

/** Language names are always shown in their own language. */
export const LANG_NAMES: L10n = { am: "አማርኛ", en: "English" };

/** Short label shown inside the header language pill. */
export const LANG_SHORT: L10n = { am: "አማ", en: "EN" };

export function isLang(value: unknown): value is Lang {
  return value === "am" || value === "en";
}
