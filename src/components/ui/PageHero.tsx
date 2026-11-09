"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LocalizedTitle } from "@/components/i18n/LocalizedTitle";
import { Separator } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { L10n } from "@/i18n/types";
import type { PageKey } from "@/lib/metadata";

interface PageHeroProps {
  pageKey: PageKey;
  /** Parent pages shown in the breadcrumb, outermost first. */
  crumbs?: Array<{ href: string; pageKey: PageKey }>;
  /** For pages whose title is not in the dictionary (articles). */
  custom?: { title: L10n; intro?: L10n };
}

/** Top-of-page banner with breadcrumb, the page's only <h1>, and intro text. */
export function PageHero({ pageKey, crumbs = [], custom }: PageHeroProps) {
  const { t, l } = useLanguage();
  const page = t.meta.pages[pageKey];
  const heading = custom ? l(custom.title) : page.heading;
  const intro = custom ? (custom.intro ? l(custom.intro) : "") : page.intro;

  return (
    <section className="relative overflow-hidden border-b border-gold/30 bg-cream">
      <LocalizedTitle pageKey={custom ? undefined : pageKey} custom={custom?.title} />
      <Image
        src="/images/emblem.png"
        alt=""
        width={640}
        height={601}
        loading="eager"
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-[130%] w-auto -translate-y-1/2 opacity-[0.08] sm:block"
      />
      <div className="container-page relative py-10 sm:py-14 lg:py-16">
        <nav aria-label={t.common.nav.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.85rem] text-ink-soft">
            <li>
              <Link
                href="/"
                className="font-semibold text-forest underline-offset-4 hover:underline"
              >
                {t.common.nav.home}
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <Link
                  href={crumb.href}
                  className="font-semibold text-forest underline-offset-4 hover:underline"
                >
                  {t.meta.pages[crumb.pageKey].label}
                </Link>
              </li>
            ))}
            {pageKey !== "home" ? (
              <li className="flex min-w-0 items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span aria-current="page" className="truncate">
                  {custom ? heading : page.label}
                </span>
              </li>
            ) : null}
          </ol>
        </nav>
        <h1 className="mt-5 max-w-4xl text-balance text-[2rem] font-extrabold text-forest-900 sm:text-4xl lg:text-5xl">
          {heading}
        </h1>
        <Separator className="mt-5" />
        {intro ? (
          <p className="mt-5 max-w-3xl text-base text-ink-soft sm:text-lg">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}
