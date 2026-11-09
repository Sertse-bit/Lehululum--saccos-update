import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  text: string;
  children?: ReactNode;
  className?: string;
}

/** Friendly placeholder used where the cooperative has not published content yet. */
export function EmptyState({
  icon: Icon,
  title,
  text,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl rounded-3xl border border-dashed border-gold/60 bg-cream px-6 py-10 text-center sm:px-10",
        className,
      )}
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-forest shadow-card">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-forest-900">{title}</h3>
      <p className="mt-3 text-ink-soft">{text}</p>
      {children ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}
