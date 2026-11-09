import { PageHero } from "@/components/ui/PageHero";
import { ComplaintsPageContent } from "@/components/pages/InfoPages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("complaints", "/complaints");

export default function Page() {
  return (
    <>
      <PageHero pageKey="complaints" />
      <ComplaintsPageContent />
    </>
  );
}
