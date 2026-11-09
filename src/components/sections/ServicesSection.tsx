"use client";

import {
  ArrowRight,
  HeartHandshake,
  LifeBuoy,
  PiggyBank,
  Wallet,
  PieChart,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Dictionary } from "@/translations";

interface ServiceCard {
  key: keyof Dictionary["services"]["cards"];
  href: string;
  icon: LucideIcon;
}

const allCards: ServiceCard[] = [
  { key: "savings", href: "/services/savings", icon: PiggyBank },
  { key: "loans", href: "/services/loans", icon: Wallet },
  { key: "membership", href: "/members", icon: HeartHandshake },
  { key: "shares", href: "/services", icon: PieChart },
  { key: "support", href: "/contact", icon: LifeBuoy },
];

interface ServicesSectionProps {
  /** Hide the heading on the Services page, which already has a page banner. */
  withHeading?: boolean;
  className?: string;
}

export function ServicesSection({ withHeading = true, className }: ServicesSectionProps) {
  const { t } = useLanguage();
  // Share services are shown only when the cooperative confirms they exist.
  const cards = allCards.filter((card) => card.key !== "shares" || org.features.shareServices);

  return (
    <section
      id="services"
      aria-labelledby={withHeading ? "services-title" : undefined}
      aria-label={withHeading ? undefined : t.meta.pages.services.label}
      className={className ?? "section-y bg-cream"}
    >
      <div className="container-page">
        {withHeading ? (
          <Reveal>
            <div id="services-title">
              <SectionHeading
                label={t.home.services.label}
                title={t.home.services.title}
                text={t.home.services.subtitle}
              />
            </div>
          </Reveal>
        ) : null}

        <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${withHeading ? "mt-12" : ""}`}>
          {cards.map(({ key, href, icon: Icon }, index) => {
            const card = t.services.cards[key];
            return (
              <li key={key}>
                <Reveal delay={index * 80} className="h-full">
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-hover"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-white transition-colors group-hover:bg-gold group-hover:text-forest-900">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold text-forest-900">{card.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-ink-soft">{card.text}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.95rem] font-bold text-forest">
                      {card.link}
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
