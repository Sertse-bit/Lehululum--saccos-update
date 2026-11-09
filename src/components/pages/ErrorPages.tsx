"use client";

import { Home, Phone, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LocalizedTitle } from "@/components/i18n/LocalizedTitle";
import { Button, ButtonLink } from "@/components/ui/Button";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { PageKey } from "@/lib/metadata";
import { am } from "@/translations/am";
import { en } from "@/translations/en";

const notFoundTitle = { am: am.errors.notFound.title, en: en.errors.notFound.title };

const suggestions: Array<{ key: PageKey; href: string }> = [
  { key: "services", href: "/services" },
  { key: "members", href: "/members" },
  { key: "contact", href: "/contact" },
  { key: "faq", href: "/faq" },
];

function Shell({
  code,
  title,
  text,
  children,
}: {
  code?: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Image
        src="/images/emblem.png"
        alt=""
        width={640}
        height={601}
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 h-[120%] w-auto -translate-y-1/2 opacity-[0.07]"
      />
      <div className="container-page relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        {code ? (
          <p className="text-[5.5rem] font-extrabold leading-none text-gold sm:text-[8rem]" aria-hidden="true">
            {code}
          </p>
        ) : null}
        <h1 className="mt-4 text-3xl font-extrabold text-forest-900 sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-xl text-ink-soft sm:text-lg">{text}</p>
        {children}
      </div>
    </section>
  );
}

export function NotFoundContent() {
  const { t } = useLanguage();
  const e = t.errors.notFound;

  return (
    <Shell code={e.code} title={e.title} text={e.text}>
      <LocalizedTitle custom={notFoundTitle} />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          <Home className="h-4 w-4" aria-hidden="true" />
          {t.common.buttons.backHome}
        </ButtonLink>
        {org.contact.phones.map((phone) => (
          <ButtonLink key={phone.intl} href={phone.href} variant="outline">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {phone.display}
          </ButtonLink>
        ))}
      </div>
      <div className="mt-10">
        <p className="text-sm font-bold text-ink-soft">{e.suggestions}</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2.5">
          {suggestions.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="inline-flex min-h-10 items-center rounded-full border border-gold/60 bg-white px-4 text-[0.92rem] font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
              >
                {t.meta.pages[key].label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

export function ErrorContent({ retry }: { retry: () => void }) {
  const { t } = useLanguage();
  const e = t.errors.failure;

  return (
    <Shell title={e.title} text={e.text}>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="primary" onClick={retry}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t.common.buttons.tryAgain}
        </Button>
        <ButtonLink href="/" variant="outline">
          <Home className="h-4 w-4" aria-hidden="true" />
          {t.common.buttons.backHome}
        </ButtonLink>
      </div>
    </Shell>
  );
}
