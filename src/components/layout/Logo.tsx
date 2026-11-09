"use client";

import Image from "next/image";
import Link from "next/link";
import { organization as org } from "@/config/organization";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

/**
 * Logo lock-up: the cooperative's emblem (extracted from the brochure) plus
 * live text, so the name stays crisp at every size.
 */
export function Logo({ variant = "header", className }: LogoProps) {
  const { t } = useLanguage();
  const footer = variant === "footer";

  return (
    <Link
      href="/"
      aria-label={t.common.homeLinkLabel}
      className={cn("flex shrink-0 items-center gap-2 rounded-full sm:gap-2.5", className)}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center",
          footer && "h-14 w-14 rounded-full bg-cream p-1.5 shadow-card",
        )}
      >
        <Image
          src="/images/emblem.png"
          alt=""
          width={640}
          height={601}
          priority={!footer}
          sizes={footer ? "56px" : "48px"}
          className={footer ? "h-full w-auto" : "h-10 w-auto max-[359px]:h-8 sm:h-11"}
        />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={cn(
            "block whitespace-nowrap text-[1.02rem] font-extrabold tracking-tight max-[359px]:text-[0.88rem] sm:text-[1.1rem]",
            footer ? "text-white" : "text-forest",
          )}
        >
          Lehulum{" "}
          <span className={footer ? "text-gold-bright" : "text-gold-deep"}>
            SACCOS
          </span>
        </span>
        <span
          className={cn(
            "mt-0.5 hidden whitespace-nowrap text-[0.64rem] font-semibold min-[440px]:block",
            footer ? "text-white/75" : "text-ink-soft",
          )}
        >
          {org.names.am}
        </span>
      </span>
    </Link>
  );
}
