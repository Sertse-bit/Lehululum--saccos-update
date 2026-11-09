"use client";

import { Check, Info } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Notice, Steps } from "@/components/sections/Steps";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Lettered list (ሀ, ለ, ሐ … or a, b, c …) used for the bylaws articles. */
function LetteredList({
  items,
  letters,
}: {
  items: ReadonlyArray<string>;
  letters: ReadonlyArray<string>;
}) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full bg-forest px-1 text-[0.85rem] font-extrabold text-gold-bright"
          >
            {letters[index]}
          </span>
          <span className="min-w-0 text-[0.97rem] text-ink-soft">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function MembersPageContent() {
  const { t } = useLanguage();
  const m = t.members;

  return (
    <>
      <section className="section-y" aria-labelledby="join-title">
        <div className="container-page">
          <Reveal>
            <h2 id="join-title" className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {m.join.title}
            </h2>
            <p className="mt-3 max-w-3xl text-ink-soft sm:text-lg">{m.join.text}</p>
          </Reveal>
          <div className="mt-8">
            <Steps steps={m.join.steps} stepLabel={m.join.stepLabel} />
          </div>
          <div className="mt-8 max-w-3xl">
            <Notice title={m.join.noticeTitle} text={m.join.notice} />
          </div>
        </div>
      </section>

      <section className="bg-cream section-y" aria-labelledby="criteria-title">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8">
                <h2 id="criteria-title" className="text-2xl font-extrabold text-forest-900">
                    {m.bylaws.criteria.title}
                  </h2>
                <p className="mt-3 text-ink-soft">{m.bylaws.criteria.intro}</p>
                <div className="mt-6">
                  <LetteredList items={m.bylaws.criteria.items} letters={m.bylaws.letters} />
                </div>
              </div>
            </Reveal>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <Reveal delay={100}>
              <div className="rounded-3xl border border-gold/50 bg-white p-5 shadow-card sm:p-8">
                <h2 className="text-2xl font-extrabold text-forest-900">
                    {m.bylaws.application.title}
                  </h2>
                <div className="mt-6">
                  <LetteredList items={m.bylaws.application.items} letters={m.bylaws.letters} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-forest-50 section-y" aria-labelledby="benefits-title">
        <div className="container-page">
          <Reveal>
            <h2 id="benefits-title" className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {m.benefits.title}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {m.benefits.items.map((item, index) => (
              <li key={item}>
                <Reveal delay={(index % 2) * 90} className="h-full">
                  <div className="flex h-full items-start gap-3.5 rounded-2xl border border-line bg-white p-5 shadow-card">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-forest-900">{item}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="inquiry-title">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <h2 id="inquiry-title" className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
                {m.form.title}
              </h2>
              <p className="mt-3 text-ink-soft">{m.form.text}</p>
              <div className="mt-8 rounded-3xl border border-line bg-cream p-6">
                <p className="flex items-center gap-2 font-extrabold text-forest-900">
                  <Info className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                  {m.existing.title}
                </p>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{m.existing.text}</p>
              </div>
            </Reveal>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <InquiryForm kind="membership" id="membership-form" />
          </div>
        </div>
      </section>
    </>
  );
}
