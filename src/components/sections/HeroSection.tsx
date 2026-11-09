"use client";

import { CircleCheck, Phone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";

export function HeroSection() {
  const { t } = useLanguage();
  const hero = t.home.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-white"
    >
      {/* Decorative shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
      <Image
        src="/images/emblem.png"
        alt=""
        width={640}
        height={601}
        loading="eager"
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-10 hidden h-[34rem] w-auto opacity-[0.07] lg:block"
      />

      <div className="container-page relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-7">
          <p className="label-caps inline-flex items-center rounded-full border border-gold/50 bg-white px-5 py-2 text-forest shadow-card">
            {hero.badge}
          </p>
          <h1 className="mt-6 max-w-2xl text-balance text-[2.15rem] font-extrabold text-forest-900 sm:text-5xl lg:text-[3.3rem]">
            <span id="hero-title">{hero.title}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft sm:text-lg">{hero.text}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/members" variant="primary" className="min-h-12 px-7">
              {t.common.buttons.becomeMember}
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" className="min-h-12 px-7">
              {t.common.buttons.viewServices}
            </ButtonLink>
          </div>

          <ul className="mt-8 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-x-6">
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.95rem] font-semibold text-forest-900">
                <CircleCheck className="h-5 w-5 text-forest" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-none">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-2.5 -right-2.5 h-full w-full rounded-t-[10rem] rounded-b-[2.5rem] bg-gold"
              />
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-t-[10rem] rounded-b-[2.5rem] bg-forest-50 shadow-pop lg:aspect-[668/884]">
                <Image
                  src="/images/hero-portrait.jpg"
                  alt={hero.portraitAlt}
                  width={668}
                  height={884}
                  priority
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 352px, 304px"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            {/*
              Below `lg` the two info cards sit under the photo, so they can
              never cover the face. On large screens they float over the lower
              half of the photo, well below the face.
            */}
            <div className="mt-6 grid gap-3 lg:mt-0 lg:block">
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-forest/10 lg:absolute lg:-left-8 lg:bottom-8 lg:shadow-pop">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-xs font-semibold text-ink-soft">{hero.callCard}</span>
                  {org.contact.phones.map((phone) => (
                    <a
                      key={phone.intl}
                      href={phone.href}
                      className="block py-0.5 text-[0.95rem] font-extrabold text-forest-900 hover:underline"
                    >
                      {phone.display}
                    </a>
                  ))}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-forest/10 lg:absolute lg:-right-3 lg:bottom-28 lg:max-w-[13rem] lg:shadow-pop">
                <Image
                  src="/images/emblem.png"
                  alt=""
                  width={640}
                  height={601}
                  className="h-9 w-auto shrink-0"
                />
                <span className="min-w-0 text-[0.8rem] font-bold leading-snug text-forest-900">
                  {hero.emblemCard}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
