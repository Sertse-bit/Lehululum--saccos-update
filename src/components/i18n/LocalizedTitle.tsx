"use client";

import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { L10n } from "@/i18n/types";
import type { PageKey } from "@/lib/metadata";

interface LocalizedTitleProps {
  pageKey?: PageKey;
  /** Use for pages whose title is not in the dictionary (for example articles). */
  custom?: L10n;
}

/**
 * Keeps the browser tab title in the visitor's language. The static HTML
 * title (used by search engines and social previews) is set through Next.js
 * metadata in the default language; this replaces it in the browser.
 *
 * Next.js re-applies its own metadata title shortly after hydration, so the
 * localized title is re-asserted whenever the <head> changes it back.
 */
export function LocalizedTitle({ pageKey, custom }: LocalizedTitleProps) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    let desired: string | null = null;
    if (custom) {
      desired = `${custom[lang]} | ${t.meta.siteName}`;
    } else if (pageKey) {
      desired =
        pageKey === "home"
          ? t.meta.pages.home.title
          : `${t.meta.pages[pageKey].title} | ${t.meta.siteName}`;
    }
    if (!desired) return;

    const apply = () => {
      if (desired && document.title !== desired) document.title = desired;
    };
    apply();

    const observer = new MutationObserver(apply);
    observer.observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [lang, t, pageKey, custom]);

  return null;
}
