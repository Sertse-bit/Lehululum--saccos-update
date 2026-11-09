import { PageHero } from "@/components/ui/PageHero";
import { SavingsPageContent } from "@/components/pages/ServicePages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("savings", "/services/savings");

export default function Page() {
  return (
    <>
      <PageHero pageKey="savings" crumbs={[{ href: "/services", pageKey: "services" }]} />
      <SavingsPageContent />
    </>
  );
}
