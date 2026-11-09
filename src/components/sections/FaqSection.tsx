"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";

interface FaqSectionProps {
  /** Home page: heading + the first few questions + link to the full list. */
  variant: "home" | "page";
}

export function FaqSection({ variant }: FaqSectionProps) {
  const { t } = useLanguage();
  const items = variant === "home" ? t.faq.items.slice(0, 6) : t.faq.items;

  if (variant === "page") {
    return (
      <section aria-label={t.meta.pages.faq.heading} className="section-y">
        <div className="container-page max-w-4xl">
          <Reveal>
            <Accordion items={items} />
          </Reveal>
          <Reveal className="mt-10 rounded-3xl bg-cream p-6 text-center sm:p-8">
            <h2 className="text-xl font-extrabold text-forest-900">{t.faq.stillTitle}</h2>
            <p className="mt-2 text-ink-soft">{t.faq.stillText}</p>
            <ButtonLink href="/contact" className="mt-5">
              {t.common.buttons.contactUs}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y">
      <div className="container-page max-w-4xl">
        <Reveal>
          <div id="faq-title">
            <SectionHeading
              label={t.home.faqTeaser.label}
              title={t.home.faqTeaser.title}
              text={t.home.faqTeaser.subtitle}
            />
          </div>
        </Reveal>
        <Reveal className="mt-10">
          <Accordion items={items} />
        </Reveal>
        <Reveal className="mt-8 text-center">
          <ButtonLink href="/faq" variant="outline">
            {t.common.buttons.seeFaq}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
