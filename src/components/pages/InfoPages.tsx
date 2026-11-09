"use client";

import { Briefcase, Handshake, HeartHandshake, Mail, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Steps } from "@/components/sections/Steps";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { organization as org } from "@/config/organization";
import { partners } from "@/content/partners";
import { vacancies } from "@/content/vacancies";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatDate } from "@/lib/format";

export function VacancyPageContent() {
  const { t, l, lang } = useLanguage();
  const v = t.vacancy;
  const mailto = `${org.links.email}?subject=${encodeURIComponent(v.mailSubject)}`;

  return (
    <section className="section-y" aria-label={t.meta.pages.vacancy.heading}>
      <div className="container-page">
        {vacancies.length === 0 ? (
          <EmptyState icon={Briefcase} title={v.emptyTitle} text={v.emptyText} />
        ) : (
          <ul className="grid gap-5 lg:grid-cols-2">
            {vacancies.map((vacancy) => (
              <li key={vacancy.id}>
                <article className="h-full rounded-3xl border border-line bg-white p-6 shadow-card">
                  <h2 className="text-xl font-extrabold text-forest-900">{l(vacancy.title)}</h2>
                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft">
                    {vacancy.type ? (
                      <div className="flex gap-1.5">
                        <dt className="font-bold">{v.type}:</dt>
                        <dd>{l(vacancy.type)}</dd>
                      </div>
                    ) : null}
                    {vacancy.location ? (
                      <div className="flex gap-1.5">
                        <dt className="font-bold">{v.location}:</dt>
                        <dd>{l(vacancy.location)}</dd>
                      </div>
                    ) : null}
                    {vacancy.deadline ? (
                      <div className="flex gap-1.5">
                        <dt className="font-bold">{v.deadline}:</dt>
                        <dd>
                          <time dateTime={vacancy.deadline}>{formatDate(vacancy.deadline, lang)}</time>
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                  <p className="mt-4 text-ink-soft">{l(vacancy.description)}</p>
                  {vacancy.howToApply ? (
                    <>
                      <h3 className="mt-4 font-extrabold text-forest-900">{v.apply}</h3>
                      <p className="mt-1 text-ink-soft">{l(vacancy.howToApply)}</p>
                    </>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}

        <Reveal className="mx-auto mt-12 max-w-3xl rounded-3xl bg-cream p-6 text-center sm:p-8">
          <h2 className="text-xl font-extrabold text-forest-900">{v.inquiryTitle}</h2>
          <p className="mt-2 text-ink-soft">{v.inquiryText}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <ButtonLink href={mailto} variant="primary">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {org.contact.email}
            </ButtonLink>
            {org.contact.phones.map((phone) => (
              <ButtonLink key={phone.intl} href={phone.href} variant="outline">
                {phone.display}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PartnersPageContent() {
  const { t, l } = useLanguage();
  const p = t.partners;

  return (
    <>
      <section className="section-y" aria-label={t.meta.pages.partners.heading}>
        <div className="container-page">
          <Reveal>
            <p className="mb-10 max-w-3xl text-base text-ink-soft sm:text-lg">{p.intro}</p>
          </Reveal>
          {partners.length === 0 ? (
            <EmptyState icon={Handshake} title={p.emptyTitle} text={p.emptyText} />
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <div className="flex h-full flex-col items-center rounded-3xl border border-line bg-white p-6 text-center shadow-card">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt=""
                        width={160}
                        height={96}
                        className="h-24 w-auto object-contain"
                      />
                    ) : null}
                    <h2 className="mt-4 text-lg font-extrabold text-forest-900">{l(partner.name)}</h2>
                    {partner.description ? (
                      <p className="mt-2 text-[0.95rem] text-ink-soft">{l(partner.description)}</p>
                    ) : null}
                    {partner.website ? (
                      <ButtonLink href={partner.website} variant="outline" className="mt-4">
                        {p.website}
                      </ButtonLink>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaBand title={p.ctaTitle} text={p.ctaText} className="pb-16 sm:pb-24" />
    </>
  );
}

export function CsrPageContent() {
  const { t } = useLanguage();
  const c = t.csr;

  return (
    <>
      <section className="section-y" aria-labelledby="principles-title">
        <div className="container-page">
          <Reveal>
            <h2 id="principles-title" className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {c.principlesTitle}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {c.principles.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 90} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-card">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest">
                      <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold text-forest-900">{item.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-ink-soft">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream section-y" aria-labelledby="projects-title">
        <div className="container-page">
          <h2 id="projects-title" className="mb-8 text-2xl font-extrabold text-forest-900 sm:text-3xl">
            {c.projectsTitle}
          </h2>
          <EmptyState icon={HeartHandshake} title={c.emptyTitle} text={c.emptyText} />
        </div>
      </section>

      <CtaBand title={c.ctaTitle} text={c.ctaText} className="section-y" />
    </>
  );
}

export function ComplaintsPageContent() {
  const { t } = useLanguage();
  const c = t.complaints;

  return (
    <section className="section-y" aria-label={t.meta.pages.complaints.heading}>
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <p className="text-base text-ink-soft sm:text-lg">{c.intro}</p>
            <h2 className="mt-8 text-xl font-extrabold text-forest-900">{c.stepsTitle}</h2>
          </Reveal>
          <div className="mt-5">
            <Steps steps={c.steps} stepLabel={t.members.join.stepLabel} />
          </div>
          <Reveal className="mt-6">
            <aside className="flex gap-4 rounded-3xl border border-gold/60 bg-gold-50 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-forest-900">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-extrabold text-forest-900">{c.privacyTitle}</p>
                <p className="mt-1 text-[0.95rem] text-ink-soft">{c.privacy}</p>
              </div>
            </aside>
          </Reveal>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <h2 className="mb-5 text-2xl font-extrabold text-forest-900">{c.formTitle}</h2>
          <InquiryForm kind="complaint" id="complaint-form" />
        </div>
      </div>
    </section>
  );
}
