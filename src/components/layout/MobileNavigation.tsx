"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  isChildCurrent,
  isItemActive,
  navItems,
  type NavLabelKey,
} from "@/config/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

/**
 * Hamburger button + navigation panel for screens narrower than 1280px.
 * Supports expandable submenus, closes after navigation, on Escape and on
 * outside tap. The panel scrolls internally, so the page never overflows.
 */
export function MobileNavigation() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const panelId = useId();

  // Remember the path the menu was opened on: any navigation closes it.
  const [state, setState] = useState<{ open: boolean; path: string }>({
    open: false,
    path: "",
  });
  const open = state.open && state.path === pathname;
  const [expanded, setExpanded] = useState<Partial<Record<NavLabelKey, boolean>>>({});

  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setState({ open: false, path: pathname });
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setState({ open: false, path: pathname });
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, pathname]);

  const closeMenu = () => setState({ open: false, path: pathname });

  return (
    <div ref={wrapRef} className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? t.common.nav.closeMenu : t.common.nav.openMenu}
        onClick={() => setState({ open: !open, path: pathname })}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white max-[359px]:h-9 max-[359px]:w-9 transition-colors hover:bg-forest-deep"
      >
        {open ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      {open ? (
        <nav
          id={panelId}
          aria-label={t.common.nav.mobileNavigation}
          className="absolute inset-x-0 top-full z-50 mt-2.5 max-h-[calc(100dvh-5.5rem)] animate-pop-in overflow-y-auto overscroll-contain rounded-3xl bg-white p-2.5 shadow-pop ring-1 ring-black/5"
        >
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const label = t.common.nav[item.key];
              const active = isItemActive(item, pathname);
              const itemClass = cn(
                "flex min-h-12 w-full items-center justify-between rounded-2xl px-4 py-2.5 text-left text-[0.95rem] font-semibold transition-colors",
                active
                  ? "bg-forest text-white"
                  : "text-ink hover:bg-forest-50 hover:text-forest",
              );

              if (!item.children) {
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                      className={itemClass}
                    >
                      {label}
                    </Link>
                  </li>
                );
              }

              const isExpanded = Boolean(expanded[item.key]);
              const subId = `${panelId}-${item.key}`;
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={subId}
                    aria-label={`${t.common.nav.toggleSubmenu} ${label}`}
                    onClick={() =>
                      setExpanded((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                    }
                    className={itemClass}
                  >
                    {label}
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={2.75}
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>
                  {isExpanded ? (
                    <ul
                      id={subId}
                      className="mb-1 ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-gold/50 pl-3"
                    >
                      {item.children.map((child) => {
                        const current = isChildCurrent(child, pathname);
                        return (
                          <li key={child.key}>
                            <Link
                              href={child.href}
                              aria-current={current ? "page" : undefined}
                              onClick={closeMenu}
                              className={cn(
                                "flex min-h-11 items-center rounded-xl px-3.5 py-2 text-[0.9rem] font-semibold transition-colors",
                                current
                                  ? "bg-forest-50 text-forest"
                                  : "text-ink hover:bg-cream hover:text-forest",
                              )}
                            >
                              {t.common.nav[child.key]}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
