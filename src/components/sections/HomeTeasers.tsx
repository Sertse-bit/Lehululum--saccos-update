"use client";

import { ArrowRight, Briefcase, Handshake, HeartHandshake, MessageSquareWarning, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { vacancies } from "@/content/vacancies";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { PageKey } from "@/lib/metadata";

const items: Array<{ key: PageKey; href: string; icon: LucideIcon }> = [
  { key: "vacancy", href: "/vacancy", icon: Briefcase },
  { key: "partners", href: "/partners", icon: Handshake },
  { key: "csr", href: "/csr", icon: HeartHandshake },
  { key: "complaints", href: "/complaints", icon: MessageSquareWarning },
];

/** Compact home-page entry points: Vacancy, Partners, CSR and Complaints. */
export function HomeTeasers() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="more-title" className="section-y bg-cream">
      <div className="container-page">
        <h2 id="more-title" className="sr-only">
          {t.common.labels.quickLinks}
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, href, icon: Icon }, index) => {
            const page = t.meta.pages[key];
            const openCount = key === "vacancy" ? vacancies.length : 0;
            return (
              <li key={key}>
                <Reveal delay={index * 80} className="h-full">
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-forest-900">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold text-forest-900">{page.heading}</h3>
                    <p className="mt-2 text-[0.95rem] text-ink-soft">
                      {key === "vacancy" && openCount === 0 ? t.vacancy.emptyTitle : page.intro}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.95rem] font-bold text-forest">
                      {t.common.buttons.learnMore}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
