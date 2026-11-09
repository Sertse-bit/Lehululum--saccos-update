"use client";

import { ArrowUp, MapPin } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";
import { channels } from "@/lib/channels";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { Logo } from "./Logo";

const BUILD_YEAR = new Date().getFullYear();
const subscribeNoop = () => () => {};

function useCurrentYear(): number {
  // Server + hydration use the build year; the browser then shows the real one.
  return useSyncExternalStore(
    subscribeNoop,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
}

const quickLinks = [
  { key: "about", href: "/about" },
  { key: "members", href: "/members" },
  { key: "news", href: "/news" },
  { key: "vacancy", href: "/vacancy" },
  { key: "partners", href: "/partners" },
  { key: "csr", href: "/csr" },
  { key: "contact", href: "/contact" },
  { key: "complaints", href: "/complaints" },
] as const;

const serviceLinks = [
  { key: "savings", href: "/services/savings" },
  { key: "loans", href: "/services/loans" },
  { key: "membership", href: "/members" },
  { key: "memberEducation", href: "/resources" },
  { key: "faq", href: "/faq" },
] as const;

const footerLink =
  "inline-flex min-h-8 items-center text-[0.92rem] text-white/80 transition-colors hover:text-gold-bright";

export function Footer() {
  const { t, l } = useLanguage();
  const year = useCurrentYear();
  const address = l(org.address).trim();

  return (
    <footer className="no-print on-dark mt-auto">
      <div className="bg-white">
        <WaveDivider />
      </div>
      <div className="bg-forest text-white">
        <div className="container-page grid gap-12 pb-10 pt-6 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Logo variant="footer" />
            <p className="mt-5 text-[0.95rem] font-semibold leading-relaxed text-white">
              {t.common.orgNameFull}
            </p>
            <p
              lang="om"
              className="mt-2 text-xs font-semibold uppercase leading-relaxed tracking-wide text-gold-bright"
            >
              {org.names.om}
            </p>
            <p className="mt-4 max-w-sm text-[0.92rem] text-white/75">
              {t.footer.description}
            </p>
            <ul
              aria-label={t.footer.socialLabel}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {channels.map(({ id, href, Icon, external }) => (
                <li key={id}>
                  <a
                    href={href}
                    aria-label={`${t.common.contact[id]}${external ? ` ${t.common.contact.opensNewTab}` : ""}`}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-forest-900"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav
            aria-label={t.common.labels.quickLinks}
            className="sm:col-span-1 lg:col-span-2"
          >
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gold-bright">
              {t.common.labels.quickLinks}
            </h2>
            <ul className="mt-4 space-y-0.5">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={footerLink}>
                    {t.common.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav
            aria-label={t.common.labels.ourServices}
            className="lg:col-span-2"
          >
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gold-bright">
              {t.common.labels.ourServices}
            </h2>
            <ul className="mt-4 space-y-0.5">
              {serviceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={footerLink}>
                    {t.common.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gold-bright">
              {t.common.labels.contactDetails}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {channels.map(({ id, href, display, Icon, external }) => (
                <li key={id}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-3 text-[0.92rem] text-white/85 transition-colors hover:text-gold-bright"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-gold group-hover:text-forest-900">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-white/55">
                        {t.common.contact[id]}
                      </span>
                      <span className="block break-words">{display}</span>
                    </span>
                  </a>
                </li>
              ))}
              {address ? (
                <li className="flex items-start gap-3 text-[0.92rem] text-white/85">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-white/55">
                      {t.common.contact.address}
                    </span>
                    <span className="block">{address}</span>
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="container-page flex flex-col gap-3 py-6 text-[0.82rem] text-white/70 md:flex-row md:items-center md:justify-between">
            <div>
              <p>
                © {year} {org.brandName}. {t.footer.rights}
              </p>
              <p className="mt-1 max-w-2xl text-white/60">{t.footer.disclaimer}</p>
            </div>
            <a
              href="#top"
              className="inline-flex min-h-10 items-center gap-2 self-start rounded-full border border-white/25 px-4 font-semibold text-white transition-colors hover:border-gold-bright hover:text-gold-bright md:self-auto"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
