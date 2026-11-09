import { PageHero } from "@/components/ui/PageHero";
import { CsrPageContent } from "@/components/pages/InfoPages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("csr", "/csr");

export default function Page() {
  return (
    <>
      <PageHero pageKey="csr" />
      <CsrPageContent />
    </>
  );
}
