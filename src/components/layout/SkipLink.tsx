"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** First focusable element: lets keyboard users jump past the navigation. */
export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-pop transition-transform focus:translate-y-0"
    >
      {t.common.skipToContent}
    </a>
  );
}
