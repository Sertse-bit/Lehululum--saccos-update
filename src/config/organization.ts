import type { L10n } from "@/i18n/types";

/**
 * Central, editable organization configuration.
 *
 * Everything that is a verified fact about the cooperative lives here so it
 * can be updated in one place. Values come from the cooperative's brochure.
 *
 * IMPORTANT – spelling: the brochure and the live Telegram channel spell the
 * name "Lehulum" (ለሁሉም). The handles below were confirmed by the cooperative.
 * If the cooperative prefers a different Latin spelling, change `brandName`
 * and the handles here – nothing else needs to be touched.
 */

const PHONE_LOCAL = "0978201055";
const PHONE_INTL = "+251978201055";
const PHONE2_INTL = "+251903797525";
const EMAIL = "lehulumsaccos@gmail.com";
const TELEGRAM_HANDLE = "EHULUMSACCOS";
const TIKTOK_HANDLE = "LEHULUM_SACCOS";

export const organization = {
  /** Latin brand name used in the logo, titles and copyright. */
  brandName: "Lehulum SACCOS",

  names: {
    /** Primary Amharic name. */
    am: "ለሁሉም ቁጠባና ብድር ህ/ሥ/ማህበር",
    /** Amharic name exactly as it is printed on the brochure. */
    amFull: "ለሁሉም የገንዘብ ቁጠባ እና ብድር ኃ/የተ/የሕ/ስራ ማህበር",
    /** Oromo wording exactly as it is printed on the brochure. */
    om: "QUSANNOO FI LIQII LAHUULLUM I/G/K/MURTAA'EE",
    /** English long form (matches the cooperative's Telegram channel). */
    enFull: "Lehulum Savings and Credit Limited Liability Cooperative Society",
  },

  tagline: {
    am: "ከቁጠባ ወደ ስኬት",
    en: "From saving to success",
  } satisfies L10n,

  contact: {
    phoneDisplay: "0978 201 055",
    phoneLocal: PHONE_LOCAL,
    phoneIntl: PHONE_INTL,
    email: EMAIL,
    whatsappNumber: "251978201055",
    /** Both official phone numbers, in the order they are shown. */
    phones: [
      { display: "0978 201 055", intl: PHONE_INTL, href: `tel:${PHONE_INTL}` },
      { display: "0903 797 525", intl: PHONE2_INTL, href: `tel:${PHONE2_INTL}` },
    ],
    /** Both numbers as one line of text, e.g. for FAQ answers. */
    phonesText: "0978 201 055 / 0903 797 525",
  },

  handles: {
    telegram: `@${TELEGRAM_HANDLE}`,
    tiktok: `@${TIKTOK_HANDLE}`,
  },

  links: {
    phone: `tel:${PHONE_INTL}`,
    email: `mailto:${EMAIL}`,
    tiktok: `https://www.tiktok.com/@${TIKTOK_HANDLE}`,
    telegram: `https://t.me/${TELEGRAM_HANDLE}`,
    whatsapp: "https://wa.me/251978201055",
  },

  /**
   * Physical office address, as supplied by the cooperative. The address block
   * is hidden automatically if both values are emptied.
   */
  address: {
    am: "አዳማ ናሽናል አካባቢ, እግዚአብሔር አብ ህንፃ 1ኛ ፎቅ, ቢሮ ቁ. 35",
    en: "Adama, National area, Egziabher Ab Building, 1st floor, Office No. 35",
  } satisfies L10n,

  /**
   * Verified organizational metrics (members, assets, loans disbursed, …).
   * Keep this EMPTY until the cooperative approves figures for publication.
   * Each entry is shown first in the metrics grid.
   * Example: { id: "members", value: "1,250", label: { am: "...", en: "..." } }
   */
  verifiedMetrics: [] as Array<{ id: string; value: string; label: L10n }>,

  features: {
    /** Set to true only if the cooperative offers share (አክሲዮን) services. */
    shareServices: false,
  },

  /** Public site URL – used for canonical links, sitemap and social cards. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * Official website address, shown in the footer and contact cards ONLY when
   * NEXT_PUBLIC_SITE_URL is set to the real domain (not localhost). No domain
   * is invented here; set the variable at deploy time.
   */
  website: (() => {
    const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "";
    if (!raw || /localhost|127\.0\.0\.1|^http:\/\/192\.168\./.test(raw)) {
      return { href: "", display: "" };
    }
    return { href: raw, display: raw.replace(/^https?:\/\//, "").replace(/\/$/, "") };
  })(),

  /**
   * Optional form delivery endpoint (for example a Formspree or Web3Forms URL).
   * When empty, forms prepare an email / WhatsApp message instead of sending.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
} as const;

export type Organization = typeof organization;
