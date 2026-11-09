import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "light"
  | "outlineLight"
  | "ghost";

const base =
  "inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[0.95rem] font-semibold leading-snug transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-white shadow-[0_10px_22px_-10px_rgb(11_77_43/0.75)] hover:-translate-y-0.5 hover:bg-forest-deep",
  secondary:
    "bg-gold text-forest-900 shadow-[0_10px_22px_-12px_rgb(166_117_15/0.9)] hover:-translate-y-0.5 hover:bg-gold-bright",
  outline:
    "border-2 border-forest text-forest hover:bg-forest hover:text-white",
  light: "bg-white text-forest hover:-translate-y-0.5 hover:bg-cream",
  outlineLight:
    "border-2 border-white/70 text-white hover:bg-white hover:text-forest",
  ghost: "text-forest hover:bg-forest-50",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

/**
 * Link styled as a button. Internal paths use next/link; tel:, mailto: and
 * https: links render a plain anchor (https links open in a new tab).
 */
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const isWeb = /^https?:/i.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
