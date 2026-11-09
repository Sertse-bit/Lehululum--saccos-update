"use client";

import { CtaBand } from "@/components/ui/CtaBand";
import { useLanguage } from "@/i18n/LanguageProvider";

/** "Ready to start saving?" band that closes content pages. */
export function HomeCta() {
  const { t } = useLanguage();
  return (
    <CtaBand
      title={t.home.cta.title}
      text={t.home.cta.text}
      primary={{ label: t.common.buttons.becomeMember, href: "/members" }}
      className="section-y"
    />
  );
}
