"use client";

import { Check } from "lucide-react";
import { ProductSection } from "@/components/sections/ProductSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Notice, Steps } from "@/components/sections/Steps";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ServicesPageContent() {
  const { t } = useLanguage();
  return (
    <>
      <ServicesSection withHeading={false} className="section-y" />
      <CtaBand title={t.services.overview.ctaTitle} text={t.services.overview.ctaText} className="pb-16 sm:pb-24" />
    </>
  );
}

export function SavingsPageContent() {
  const { t } = useLanguage();
  const s = t.services.savings;
  return (
    <>
      <section className="pt-12 sm:pt-16" aria-label={t.meta.pages.savings.heading}>
        <div className="container-page">
          <Reveal>
            <p className="max-w-3xl text-base text-ink-soft sm:text-lg">{s.intro}</p>
          </Reveal>
        </div>
      </section>

      <ProductSection kind="savings" variant="page" />

      <section className="bg-forest-50 section-y" aria-labelledby="benefits-title">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 id="benefits-title" className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {s.benefitsTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {s.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="self-center">
            <Notice title={s.noteTitle} text={s.note} />
          </div>
        </div>
      </section>

      <CtaBand
        title={t.home.cta.title}
        text={t.home.cta.text}
        primary={{ label: t.common.buttons.askAboutSavings, href: "/contact#contact-form" }}
        className="section-y"
      />
    </>
  );
}

export function LoansPageContent() {
  const { t } = useLanguage();
  const s = t.services.loans;
  return (
    <>
      <section className="pt-12 sm:pt-16" aria-label={t.meta.pages.loans.heading}>
        <div className="container-page">
          <Reveal>
            <p className="max-w-3xl text-base text-ink-soft sm:text-lg">{s.intro}</p>
          </Reveal>
        </div>
      </section>

      <ProductSection kind="loans" variant="page" />

      <section className="bg-cream section-y" aria-labelledby="process-title">
        <div className="container-page">
          <Reveal>
            <h2 id="process-title" className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {s.processTitle}
            </h2>
          </Reveal>
          <div className="mt-8">
            <Steps steps={s.steps} stepLabel={t.members.join.stepLabel} />
          </div>
          <div className="mt-8 max-w-3xl">
            <Notice title={s.noticeTitle} text={s.notice} />
          </div>
        </div>
      </section>

      <CtaBand
        title={t.home.cta.title}
        text={t.home.cta.text}
        primary={{ label: t.common.buttons.askAboutLoans, href: "/contact#contact-form" }}
        className="section-y"
      />
    </>
  );
}
