import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  label: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Heading level. Use "h1" only once per page. */
  as?: "h1" | "h2";
  className?: string;
}

/** Small green/gold bar group that echoes the reference site's separator. */
export function Separator({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-1.5", className)}
    >
      <span className="h-1 w-5 rounded-full bg-gold/45" />
      <span
        className={cn(
          "h-1 w-24 rounded-full",
          tone === "dark" ? "bg-gold" : "bg-forest",
        )}
      />
      <span className="h-1 w-5 rounded-full bg-gold/45" />
    </div>
  );
}

export function SectionHeading({
  label,
  title,
  text,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <span
        className={cn(
          "label-caps inline-flex items-center rounded-full border px-5 py-2",
          dark
            ? "border-white/20 bg-white/10 text-gold-100"
            : "border-gold/40 bg-gold-50 text-forest",
        )}
      >
        {label}
      </span>
      <Heading
        className={cn(
          "mt-5 text-balance text-[1.9rem] font-extrabold sm:text-4xl lg:text-[2.6rem]",
          dark ? "text-white" : "text-forest-900",
        )}
      >
        {title}
      </Heading>
      <Separator
        tone={tone}
        className={cn("mt-5", center ? "justify-center" : "justify-start")}
      />
      {text ? (
        <p
          className={cn(
            "mt-5 text-base sm:text-lg",
            dark ? "text-white/80" : "text-ink-soft",
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
