"use client";

import { Coins, Handshake, Landmark, PiggyBank, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";

const icons: LucideIcon[] = [PiggyBank, Users, Handshake, Landmark, Coins];

export function WhyChooseSection() {
  const { t } = useLanguage();
  const why = t.home.why;

  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="section-y bg-forest-50"
    >
      <div className="container-page">
        <Reveal>
          <div id="why-title">
            <SectionHeading label={why.label} title={why.title} text={why.subtitle} />
          </div>
        </Reveal>
        <ul className="mt-12 flex flex-wrap justify-center gap-5">
          {why.items.map((item, index) => {
            const Icon = icons[index] ?? Handshake;
            return (
              <li key={item.title} className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)]">
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <div className="flex h-full gap-4 rounded-3xl border border-line bg-white p-6 shadow-card">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-gold-bright">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold text-forest-900">{item.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] text-ink-soft">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
