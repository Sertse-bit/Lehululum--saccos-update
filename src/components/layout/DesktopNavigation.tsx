"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  isChildCurrent,
  isItemActive,
  navItems,
  type NavLabelKey,
} from "@/config/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const linkBase =
  "flex min-h-9 items-center whitespace-nowrap rounded-full px-3 py-1.5 text-[0.8rem] font-semibold transition-colors 2xl:px-4 2xl:text-[0.85rem]";

function linkClass(active: boolean) {
  return cn(
    linkBase,
    active
      ? "bg-forest text-white shadow-sm"
      : "text-ink hover:bg-forest-50 hover:text-forest",
  );
}

/**
 * Desktop navigation (≥ 1280px): one horizontal row, a green pill for the
 * active item and disclosure dropdowns for Services and News/Resources.
 * Dropdowns open on mouse hover, on click/tap, and with the keyboard.
 */
export function DesktopNavigation() {
  const { t } = useLanguage();
  const pathname = usePathname();

  // The open menu is remembered together with the path it was opened on, so
  // it closes automatically after any navigation without needing an effect.
  const [openState, setOpenState] = useState<{
    key: NavLabelKey | null;
    path: string;
  }>({ key: null, path: "" });
  const openKey = openState.path === pathname ? openState.key : null;

  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Partial<Record<NavLabelKey, HTMLButtonElement | null>>>({});
  const closeTimer = useRef<number | undefined>(undefined);
  /**
   * True while the open menu was opened by mouse hover. The click that
   * usually follows a hover must keep the menu open instead of toggling it
   * shut, otherwise the button looks dead to mouse users.
   */
  const openedByHover = useRef(false);

  const open = useCallback(
    (key: NavLabelKey, byHover = false) => {
      window.clearTimeout(closeTimer.current);
      openedByHover.current = byHover;
      setOpenState({ key, path: pathname });
    },
    [pathname],
  );
  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    openedByHover.current = false;
    setOpenState({ key: null, path: pathname });
  }, [pathname]);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(close, 160);
  }, [close]);

  useEffect(() => {
    if (!openKey) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        triggerRefs.current[openKey]?.focus();
        close();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey, close]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <nav
      ref={navRef}
      aria-label={t.common.nav.mainNavigation}
      className="hidden min-w-0 flex-1 justify-center xl:flex"
    >
      <ul className="flex items-center gap-0.5 2xl:gap-1.5">
        {navItems.map((item) => {
          const label = t.common.nav[item.key];
          const active = isItemActive(item, pathname);

          if (!item.children) {
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {label}
                </Link>
              </li>
            );
          }

          const isOpen = openKey === item.key;
          const panelId = `desktop-submenu-${item.key}`;
          return (
            <li
              key={item.key}
              className="relative"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" && !isOpen) open(item.key, true);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") scheduleClose();
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  close();
                }
              }}
            >
              <button
                ref={(node) => {
                  triggerRefs.current[item.key] = node;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => {
                  if (isOpen && openedByHover.current) {
                    // Hover already opened it: keep it open; the next click closes it.
                    openedByHover.current = false;
                  } else if (isOpen) {
                    close();
                  } else {
                    open(item.key);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" && !isOpen) {
                    event.preventDefault();
                    open(item.key);
                  }
                }}
                className={cn(linkClass(active), "gap-1")}
              >
                {label}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2.75}
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen ? (
                <div
                  id={panelId}
                  className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 animate-pop-in pt-3"
                >
                  <ul className="rounded-2xl bg-white p-2 shadow-pop ring-1 ring-black/5">
                    {item.children.map((child) => {
                      const current = isChildCurrent(child, pathname);
                      return (
                        <li key={child.key}>
                          <Link
                            href={child.href}
                            aria-current={current ? "page" : undefined}
                            onClick={close}
                            className={cn(
                              "flex min-h-10 items-center rounded-xl px-3.5 py-2 text-[0.85rem] font-semibold transition-colors",
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
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
