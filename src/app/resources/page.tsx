import { PageHero } from "@/components/ui/PageHero";
import { ResourcesPageContent } from "@/components/pages/NewsPages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("resources", "/resources");

export default function Page() {
  return (
    <>
      <PageHero pageKey="resources" />
      <ResourcesPageContent />
    </>
  );
}
