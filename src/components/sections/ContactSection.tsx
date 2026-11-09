"use client";

import { MapPin } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";
import { channels } from "@/lib/channels";

/** Contact channel cards. Every link comes from config/organization.ts. */
export function ChannelCards({ columns }: { columns: "home" | "page" }) {
  const { t, l } = useLanguage();
  const address = l(org.address).trim();
  const itemClass =
    columns === "home"
      ? "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
      : undefined;

  return (
    <ul
      className={
        columns === "home"
          ? "flex flex-wrap justify-center gap-4"
          : "grid gap-4 sm:grid-cols-2"
      }
    >
      {channels.map(({ id, href, display, actionKey, Icon, external }, index) => (
        <li key={id} className={itemClass}>
          <Reveal delay={(index % 3) * 80} className="h-full">
            <div className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-bold text-ink-soft">{t.common.contact[id]}</h3>
              </div>
              <p className="text-[1.05rem] font-extrabold text-forest-900 [overflow-wrap:anywhere]">
                {display}
              </p>
              <ButtonLink
                href={href}
                variant="outline"
                className="mt-auto min-h-10 w-full py-2"
                aria-label={`${t.common.contact[actionKey]}: ${display}${
                  external ? ` ${t.common.contact.opensNewTab}` : ""
                }`}
              >
                {t.common.contact[actionKey]}
              </ButtonLink>
            </div>
          </Reveal>
        </li>
      ))}
      {address ? (
        <li className={itemClass}>
          <div className="flex h-full items-center gap-3.5 rounded-3xl border border-line bg-white p-5 shadow-card">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-forest-900">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-ink-soft">{t.contact.addressTitle}</h3>
              <p className="font-extrabold text-forest-900">{address}</p>
            </div>
          </div>
        </li>
      ) : null}
    </ul>
  );
}

/** Home page contact section. */
export function ContactTeaser() {
  const { t } = useLanguage();
  const teaser = t.home.contactTeaser;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <div id="contact-title">
            <SectionHeading label={teaser.label} title={teaser.title} text={teaser.subtitle} />
          </div>
        </Reveal>
        <div className="mt-12">
          <ChannelCards columns="home" />
        </div>
        <Reveal className="mt-10 text-center">
          <ButtonLink href="/contact#contact-form" variant="primary">
            {t.contact.formTitle}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/** Contact page body: channels next to the inquiry form. */
export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <section className="section-y" aria-label={t.meta.pages.contact.heading}>
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6">
          <h2 className="text-2xl font-extrabold text-forest-900">{t.contact.channelsTitle}</h2>
          <p className="mt-3 text-ink-soft">{t.contact.channelsText}</p>
          <div className="mt-6">
            <ChannelCards columns="page" />
          </div>
        </div>
        <div className="min-w-0 lg:col-span-6">
          <h2 className="text-2xl font-extrabold text-forest-900">{t.contact.formTitle}</h2>
          <p className="mt-3 text-ink-soft">{t.contact.formText}</p>
          <InquiryForm kind="contact" id="contact-form" className="mt-6" />
        </div>
      </div>
    </section>
  );
}
