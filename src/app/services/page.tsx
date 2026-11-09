import { PageHero } from "@/components/ui/PageHero";
import { ServicesPageContent } from "@/components/pages/ServicePages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("services", "/services");

export default function Page() {
  return (
    <>
      <PageHero pageKey="services" />
      <ServicesPageContent />
    </>
  );
}
