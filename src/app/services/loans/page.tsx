import { PageHero } from "@/components/ui/PageHero";
import { LoansPageContent } from "@/components/pages/ServicePages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("loans", "/services/loans");

export default function Page() {
  return (
    <>
      <PageHero pageKey="loans" crumbs={[{ href: "/services", pageKey: "services" }]} />
      <LoansPageContent />
    </>
  );
}
