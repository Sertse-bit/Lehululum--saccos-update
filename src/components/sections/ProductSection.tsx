"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  loanProducts,
  savingsProducts,
  type LoanId,
  type Product,
  type SavingsId,
} from "@/config/products";
import { useLanguage } from "@/i18n/LanguageProvider";

interface ProductSectionProps {
  kind: "savings" | "loans";
  /** "home" adds a heading and links to the full page; "page" is just the grid. */
  variant: "home" | "page";
  className?: string;
}

export function ProductSection({ kind, variant, className }: ProductSectionProps) {
  const { t, l } = useLanguage();
  const isSavings = kind === "savings";
  const copy = isSavings ? t.services.savings : t.services.loans;
  const pageKey = isSavings ? t.meta.pages.savings : t.meta.pages.loans;

  const products: Array<Product<string>> = isSavings ? savingsProducts : loanProducts;
  const describe = (id: string) =>
    isSavings
      ? t.services.savings.items[id as SavingsId]
      : t.services.loans.items[id as LoanId];

  const grid = (
    <ul className="flex flex-wrap justify-center gap-5">
      {products.map((product, index) => {
        const item = describe(product.id);
        return (
          <li key={product.id} className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)]">
            <ProductCard
              icon={product.icon}
              name={item.name}
              text={item.text}
              details={product.details ? l(product.details) : undefined}
              info={product.info ? l(product.info) : undefined}
              delay={(index % 3) * 90}
            />
          </li>
        );
      })}
    </ul>
  );

  if (variant === "page") {
    return (
      <section aria-labelledby={`${kind}-options`} className={className ?? "section-y"}>
        <div className="container-page">
          <Reveal>
            <h2 id={`${kind}-options`} className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {copy.optionsTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-ink-soft">{copy.optionsText}</p>
          </Reveal>
          <div className="mt-8">{grid}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={kind}
      aria-labelledby={`${kind}-title`}
      className={className ?? (isSavings ? "section-y" : "section-y bg-cream")}
    >
      <div className="container-page">
        <Reveal>
          <div id={`${kind}-title`}>
            <SectionHeading
              label={pageKey.label}
              title={pageKey.heading}
              text={copy.intro}
            />
          </div>
        </Reveal>
        <div className="mt-12">{grid}</div>
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/contact#contact-form" variant="primary">
            {isSavings ? t.common.buttons.askAboutSavings : t.common.buttons.askAboutLoans}
          </ButtonLink>
          <ButtonLink href={isSavings ? "/services/savings" : "/services/loans"} variant="outline">
            {t.common.buttons.learnMore}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
