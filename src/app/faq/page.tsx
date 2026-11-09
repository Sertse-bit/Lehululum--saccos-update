import { PageHero } from "@/components/ui/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("faq", "/faq");

export default function Page() {
  return (
    <>
      <PageHero pageKey="faq" />
      <FaqSection variant="page" />
    </>
  );
}
