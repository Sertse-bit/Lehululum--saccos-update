"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";

interface CtaBandProps {
  title: string;
  text: string;
  /** Primary action. Defaults to the contact page. */
  primary?: { label: string; href: string };
  /** Adds extra bottom padding when the band ends the page. */
  className?: string;
}

/** Green call-to-action card used at the end of pages. */
export function CtaBand({ title, text, primary, className }: CtaBandProps) {
  const { t } = useLanguage();
  const action = primary ?? { label: t.common.buttons.contactUs, href: "/contact" };

  return (
    <section className={className ?? "section-y pt-0"}>
      <div className="container-page">
        <Reveal>
          <div className="on-dark relative overflow-hidden rounded-[2rem] bg-forest px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <Image
              src="/images/emblem.png"
              alt=""
              width={640}
              height={601}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-auto opacity-[0.08]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-[1.7rem] font-extrabold sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-white/85 sm:text-lg">{text}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href={action.href} variant="secondary">
                  {action.label}
                </ButtonLink>
                {org.contact.phones.map((phone) => (
                  <ButtonLink key={phone.intl} href={phone.href} variant="outlineLight">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {phone.display}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
