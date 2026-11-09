import { PageHero } from "@/components/ui/PageHero";
import { ContactPageContent } from "@/components/sections/ContactSection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("contact", "/contact");

export default function Page() {
  return (
    <>
      <PageHero pageKey="contact" />
      <ContactPageContent />
    </>
  );
}
