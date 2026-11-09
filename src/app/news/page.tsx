import { PageHero } from "@/components/ui/PageHero";
import { NewsPageContent } from "@/components/pages/NewsPages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("news", "/news");

export default function Page() {
  return (
    <>
      <PageHero pageKey="news" />
      <NewsPageContent />
    </>
  );
}
