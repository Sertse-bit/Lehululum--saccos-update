"use client";

import {
  ArrowRight,
  BadgeCheck,
  Check,
  Compass,
  Equal,
  Eye,
  Handshake,
  HandHeart,
  HeartHandshake,
  Scale,
  Sparkles,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";

/** One icon per value, in the same order as the bylaws list (7.1). */
const valueIcons: LucideIcon[] = [HandHeart, BadgeCheck, Vote, Equal, Scale, Users];
/** One icon per ethical value, in the same order as the bylaws list (7.2). */
const ethicsIcons: LucideIcon[] = [
  Handshake,
  Eye,
  HeartHandshake,
  Users,
  HandHeart,
  Sparkles,
];

/** Numbered list card used for the objectives and main activities. */
function NumberedCard({
  title,
  items,
  delay,
}: {
  title: string;
  items: ReadonlyArray<string>;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7">
        <h3 className="text-lg font-extrabold text-forest-900 sm:text-xl">{title}</h3>
        <ol className="mt-5 space-y-3.5">
          {items.map((item, index) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-[0.8rem] font-extrabold text-gold-bright"
              >
                {index + 1}
              </span>
              <span className="min-w-0 text-[0.97rem] text-ink-soft">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/** Compact value tiles: icon and a one-line title. */
function ValueGrid({
  items,
  icons,
  tone,
}: {
  items: ReadonlyArray<string>;
  icons: LucideIcon[];
  tone: "forest" | "gold";
}) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = icons[index] ?? Check;
        return (
          <li key={item}>
            <Reveal delay={(index % 3) * 80} className="h-full">
              <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-card-hover sm:p-5">
                <span
                  className={
                    tone === "forest"
                      ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest"
                      : "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-deep"
                  }
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 font-bold text-forest-900">{item}</span>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

function MissionVisionCards() {
  const { t } = useLanguage();
  const cards = [
    { icon: Eye, ...t.about.vision },
    { icon: Compass, ...t.about.mission },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {cards.map(({ icon: Icon, title, text }, index) => (
        <Reveal key={title} delay={index * 100} className="h-full">
          <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-card">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-deep">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-forest-900">{title}</h3>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Home page "About" teaser: who we are, mission, vision and values. */
export function AboutTeaser() {
  const { t } = useLanguage();
  const teaser = t.home.aboutTeaser;

  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              label={teaser.label}
              title={teaser.title}
              text={t.about.who.text}
              align="left"
            />
            <ButtonLink href="/about" variant="outline" className="mt-7">
              {teaser.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
          <div className="lg:col-span-7">
            <MissionVisionCards />
          </div>
        </div>

        <Reveal className="mt-12">
          <h3 className="text-center text-xl font-extrabold text-forest-900">
            {t.about.values.title}
          </h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-3">
            {t.about.values.items.map((value, index) => {
              const Icon = valueIcons[index] ?? Check;
              return (
                <li
                  key={value}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold-50 px-4 py-2 text-[0.92rem] font-semibold text-forest-900"
                >
                  <Icon className="h-4 w-4 text-forest" aria-hidden="true" />
                  {value}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Full "About us" page content. */
export function AboutContent() {
  const { t } = useLanguage();
  const about = t.about;

  return (
    <>
      <section className="section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold text-forest-900 sm:text-3xl">
              {about.who.title}
            </h2>
            <p className="mt-4 text-base text-ink-soft sm:text-lg">{about.who.text}</p>
            <h3 className="mt-8 text-xl font-extrabold text-forest-900">
              {about.development.title}
            </h3>
            <p className="mt-3 text-ink-soft">{about.development.text}</p>
          </Reveal>
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto flex max-w-xs items-center justify-center rounded-[2.5rem] bg-cream p-10 ring-1 ring-gold/40">
              <Image
                src="/images/emblem.png"
                alt={t.common.logoAlt}
                width={640}
                height={601}
                className="h-auto w-48"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream section-y" aria-labelledby="chapter5-title">
        <div className="container-page">
          <Reveal>
            <div id="chapter5-title">
              <SectionHeading
                label={about.bylaws.source}
                title={about.bylaws.chapter5Title}
              />
            </div>
          </Reveal>
          <div className="mt-10 sm:mt-12">
            <MissionVisionCards />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-5">
            <div className="min-w-0 lg:col-span-2">
              <NumberedCard
                title={about.objectives.title}
                items={about.objectives.items}
              />
            </div>
            <div className="min-w-0 lg:col-span-3">
              <NumberedCard
                title={about.duties.title}
                items={about.duties.items}
                delay={100}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="chapter7-title">
        <div className="container-page">
          <Reveal>
            <div id="chapter7-title">
              <SectionHeading
                label={about.bylaws.source}
                title={about.bylaws.chapter7Title}
              />
            </div>
          </Reveal>

          <Reveal className="mt-10 sm:mt-12">
            <h3 className="text-xl font-extrabold text-forest-900 sm:text-2xl">
                {about.values.title}
              </h3>
            <p className="mt-2 max-w-3xl text-ink-soft">{about.values.intro}</p>
          </Reveal>
          <ValueGrid items={about.values.items} icons={valueIcons} tone="forest" />

          <Reveal className="mt-12">
            <h3 className="text-xl font-extrabold text-forest-900 sm:text-2xl">
                {about.ethics.title}
              </h3>
            <p className="mt-2 max-w-3xl text-ink-soft">{about.ethics.intro}</p>
          </Reveal>
          <ValueGrid items={about.ethics.items} icons={ethicsIcons} tone="gold" />
        </div>
      </section>

      <section className="bg-forest-50 section-y" aria-labelledby="commitment-title">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2
              id="commitment-title"
              className="text-2xl font-extrabold text-forest-900 sm:text-3xl"
            >
              {about.commitment.title}
            </h2>
            <p className="mt-4 text-ink-soft">{about.commitment.text}</p>
            <ul className="mt-5 space-y-3">
              {about.commitment.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-ink">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold text-forest-900">{about.names.title}</h2>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-gold-deep">
                    {about.names.amharic}
                  </dt>
                  <dd className="mt-1 font-semibold text-forest-900" lang="am">
                    {about.names.amharicValue}
                  </dd>
                  <dd className="mt-1 text-[0.92rem] text-ink-soft" lang="am">
                    {about.names.amharicFormalValue}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-gold-deep">
                    {about.names.oromo}
                  </dt>
                  <dd className="mt-1 break-words font-semibold text-forest-900" lang="om">
                    {about.names.oromoValue}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-gold-deep">
                    {about.names.english}
                  </dt>
                  <dd className="mt-1 font-semibold text-forest-900" lang="en">
                    {about.names.englishValue}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
