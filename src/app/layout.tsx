import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/noto-sans-ethiopic";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { organization as org } from "@/config/organization";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { languageInitScript } from "@/i18n/initScript";
import { OG_IMAGE } from "@/lib/metadata";
import { am } from "@/translations/am";
import { en } from "@/translations/en";

const description = `${am.meta.siteDescription} ${en.meta.siteDescription}`;

export const metadata: Metadata = {
  metadataBase: new URL(org.siteUrl),
  title: {
    default: am.meta.pages.home.title,
    template: `%s | ${org.brandName}`,
  },
  description,
  applicationName: org.brandName,
  keywords: [
    org.brandName,
    org.names.am,
    "SACCOS",
    "ቁጠባ",
    "ብድር",
    "ህብረት ሥራ ማህበር",
    "savings and credit cooperative",
    "Ethiopia",
  ],
  // The site has its own Amharic/English switch; stop browsers from machine-
  // translating it (which mangles the text and the language button).
  other: { google: "notranslate" },
  alternates: { canonical: "/" },
  openGraph: {
    title: am.meta.pages.home.title,
    description,
    url: "/",
    siteName: org.brandName,
    locale: "am_ET",
    alternateLocale: ["en_US"],
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: am.meta.pages.home.title,
    description,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b4d2b",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: org.brandName,
  alternateName: [org.names.am, org.names.enFull, org.names.om],
  url: org.siteUrl,
  logo: `${org.siteUrl}/images/icon-512.png`,
  telephone: org.contact.phones.map((p) => p.intl),
  email: org.contact.email,
  slogan: org.tagline.en,
  sameAs: [org.links.telegram, org.links.tiktok],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="am" translate="no" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col" id="top">
        <LanguageProvider>
          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
