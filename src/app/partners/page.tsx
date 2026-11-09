import { PageHero } from "@/components/ui/PageHero";
import { PartnersPageContent } from "@/components/pages/InfoPages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("partners", "/partners");

export default function Page() {
  return (
    <>
      <PageHero pageKey="partners" />
      <PartnersPageContent />
    </>
  );
}
