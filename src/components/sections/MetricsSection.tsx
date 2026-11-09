"use client";

import { Baby, Handshake, Headset, PiggyBank, Users, Wallet, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { organization as org } from "@/config/organization";
import { loanProducts, savingsProducts } from "@/config/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { channels } from "@/lib/channels";

interface Metric {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
}

/**
 * "At a glance" grid. It only shows facts that are on the brochure or that
 * the cooperative confirmed in `verifiedMetrics` – no invented numbers.
 */
export function MetricsSection() {
  const { t, l } = useLanguage();
  const m = t.home.metrics;

  const verified: Metric[] = org.verifiedMetrics.map((metric) => ({
    id: `verified-${metric.id}`,
    icon: Users,
    value: metric.value,
    label: l(metric.label),
  }));

  const facts: Metric[] = [
    { id: "savings", icon: PiggyBank, value: String(savingsProducts.length), label: m.cards.savingsOptions },
    { id: "loans", icon: Wallet, value: String(loanProducts.length), label: m.cards.loanOptions },
    { id: "ownership", icon: Handshake, value: m.cards.ownership.value, label: m.cards.ownership.label },
    { id: "gender", icon: Users, value: m.cards.womenAndMen.value, label: m.cards.womenAndMen.label },
    { id: "children", icon: Baby, value: m.cards.children.value, label: m.cards.children.label },
    { id: "channels", icon: Headset, value: String(channels.length), label: m.cards.channels },
  ];

  const items = [...verified, ...facts].slice(0, 9);

  return (
    <>
      <div className="bg-cream">
        <WaveDivider />
      </div>
      <section
        id="metrics"
        aria-labelledby="metrics-title"
        className="on-dark relative -mt-px bg-forest pb-16 pt-6 text-white sm:pb-24"
      >
        <div className="container-page">
          <Reveal>
            <div id="metrics-title">
              <SectionHeading label={m.label} title={m.title} text={m.subtitle} tone="dark" />
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ id, icon: Icon, value, label }, index) => (
              <li key={id}>
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <div className="flex h-full items-center gap-5 rounded-3xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-forest-900">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-2xl font-extrabold text-gold-bright sm:text-[1.7rem]">{value}</p>
                      <p className="mt-0.5 text-[0.92rem] text-white/85">{label}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
