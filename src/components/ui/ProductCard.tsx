"use client";

import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { ProductInfo } from "@/config/products";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ProductCardProps {
  icon: LucideIcon;
  name: string;
  text: string;
  /** Verified conditions, shown only when the cooperative has provided them. */
  details?: string[];
  /** Official description from the cooperative; replaces the note and link. */
  info?: ProductInfo;
  delay?: number;
}

export function ProductCard({ icon: Icon, name, text, details, info, delay }: ProductCardProps) {
  const { t } = useLanguage();
  const hasDetails = Boolean(details && details.length > 0);

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50 text-forest transition-colors group-hover:bg-forest group-hover:text-white">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-lg font-extrabold text-forest-900">{name}</h3>

        {info ? (
          <div className="mt-4 flex flex-1 flex-col gap-3">
            <div className="rounded-2xl border-l-4 border-gold bg-forest-50 px-4 py-4 text-[1rem] font-semibold leading-relaxed text-forest-900">
              <p>{info.lead}</p>
              {info.more?.map((paragraph) => (
                <p key={paragraph} className="mt-2">
                  {paragraph}
                </p>
              ))}
            </div>
            {info.facts?.length ? (
              <ul className="space-y-2 text-[0.95rem] text-ink-soft">
                {info.facts.map((fact) => (
                  <li key={fact.label} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      <span className="font-bold text-forest-900">{fact.label}: </span>
                      {fact.value}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {info.benefits ? (
              <div>
                <p className="flex items-center gap-2 text-sm font-extrabold text-gold-deep">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  {info.benefits.title}
                </p>
                <p className="mt-1.5 text-[0.95rem] text-ink-soft">{info.benefits.text}</p>
              </div>
            ) : null}
            {info.limit ? (
              <p className="mt-auto rounded-xl bg-forest px-4 py-2.5 text-[0.92rem] font-bold leading-snug text-white">
                {info.limit}
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{text}</p>

            {hasDetails ? (
              <div className="mt-4">
                <p className="text-sm font-bold text-forest-900">
                  {t.services.product.detailsTitle}
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.92rem] text-ink-soft">
                  {details!.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-gold-50 px-3 py-2 text-[0.85rem] font-medium text-gold-deep">
                {t.services.product.contactForDetails}
              </p>
            )}

            <Link
              href="/contact#contact-form"
              className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-[0.95rem] font-bold text-forest underline-offset-4 hover:underline"
            >
              <span>
                {t.services.product.askAbout}
                <span className="sr-only"> – {name}</span>
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </>
        )}
      </article>
    </Reveal>
  );
}
