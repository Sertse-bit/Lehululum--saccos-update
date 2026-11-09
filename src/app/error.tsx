"use client";

import { ErrorContent } from "@/components/pages/ErrorPages";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorContent retry={retry} />;
}
