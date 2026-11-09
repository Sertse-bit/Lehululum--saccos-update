import { PageHero } from "@/components/ui/PageHero";
import { VacancyPageContent } from "@/components/pages/InfoPages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("vacancy", "/vacancy");

export default function Page() {
  return (
    <>
      <PageHero pageKey="vacancy" />
      <VacancyPageContent />
    </>
  );
}
