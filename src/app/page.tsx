import { LocalizedTitle } from "@/components/i18n/LocalizedTitle";
import { AboutTeaser } from "@/components/sections/AboutSections";
import { ContactTeaser } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeTeasers } from "@/components/sections/HomeTeasers";
import { MembershipSection } from "@/components/sections/MembershipSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ProductSection } from "@/components/sections/ProductSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home", "/");

export default function HomePage() {
  return (
    <>
      <LocalizedTitle pageKey="home" />
      <HeroSection />
      <AboutTeaser />
      <ServicesSection />
      <MetricsSection />
      <ProductSection kind="savings" variant="home" />
      <ProductSection kind="loans" variant="home" />
      <MembershipSection />
      <WhyChooseSection />
      <NewsSection />
      <HomeTeasers />
      <FaqSection variant="home" />
      <ContactTeaser />
    </>
  );
}
