import { PageHero } from "@/components/ui/PageHero";
import { AboutContent } from "@/components/sections/AboutSections";
import { HomeCta } from "@/components/sections/HomeCta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("about", "/about");

export default function AboutPage() {
  return (
    <>
      <PageHero pageKey="about" />
      <AboutContent />
      <HomeCta />
    </>
  );
}
