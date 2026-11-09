import type { Metadata } from "next";
import { NotFoundContent } from "@/components/pages/ErrorPages";
import { am } from "@/translations/am";

export const metadata: Metadata = {
  title: am.errors.notFound.title,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
