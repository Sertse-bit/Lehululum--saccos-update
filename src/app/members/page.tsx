import { PageHero } from "@/components/ui/PageHero";
import { MembersPageContent } from "@/components/pages/MembersPageContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("members", "/members");

export default function Page() {
  return (
    <>
      <PageHero pageKey="members" />
      <MembersPageContent />
    </>
  );
}
