"use client";

import { Check, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS, LANG_NAMES, LANG_SHORT, type Lang } from "@/i18n/types";
import { cn } from "@/lib/cn";

/**
 * Compact language pill with a listbox dropdown (አማርኛ / English).
 * Keyboard: Enter/Space/ArrowDown opens; ArrowUp/Down, Home/End move;
 * Enter/Space selects; Escape closes and returns focus to the pill.
 */
export function LanguageSelector({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const listId = useId();

  const closeAndFocus = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Move focus to the selected option whenever the list opens.
  useEffect(() => {
    if (!open) return;
    optionRefs.current[LANGS.indexOf(lang)]?.focus();
  }, [open, lang]);

  // Close when clicking or tapping outside.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const choose = (next: Lang) => {
    setLang(next);
    closeAndFocus();
  };

  const focusOption = (index: number) => {
    const count = LANGS.length;
    optionRefs.current[(index + count) % count]?.focus();
  };

  const onOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number,
    value: Lang,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusOption(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusOption(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusOption(0);
        break;
      case "End":
        event.preventDefault();
        focusOption(LANGS.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(value);
        break;
      case "Escape":
        event.preventDefault();
        closeAndFocus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${t.common.language.select}: ${LANG_NAMES[lang]}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="inline-flex h-10 min-w-[4.25rem] items-center justify-center gap-1.5 rounded-full bg-gold px-3.5 max-[359px]:h-9 max-[359px]:min-w-[3.4rem] max-[359px]:px-2.5 text-sm font-extrabold text-forest-900 shadow-sm transition-colors hover:bg-gold-bright"
      >
        <span aria-hidden="true">{LANG_SHORT[lang]}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={3}
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 pt-3">
          <ul
            id={listId}
            role="listbox"
            aria-label={t.common.language.select}
            className="relative w-44 animate-pop-in rounded-2xl bg-white p-1.5 shadow-pop ring-1 ring-black/5 before:absolute before:-top-1.5 before:right-6 before:h-3 before:w-3 before:rotate-45 before:rounded-[3px] before:bg-white before:ring-1 before:ring-black/5 before:[clip-path:polygon(0_0,100%_0,0_100%)]"
          >
            {LANGS.map((code, index) => {
              const selected = code === lang;
              return (
                <li
                  key={code}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  role="option"
                  lang={code}
                  aria-selected={selected}
                  tabIndex={-1}
                  onClick={() => choose(code)}
                  onKeyDown={(event) => onOptionKeyDown(event, index, code)}
                  className={cn(
                    "relative flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-offset-0 transition-colors",
                    selected
                      ? "bg-forest text-white"
                      : "text-ink hover:bg-forest-50 focus-visible:bg-forest-50",
                  )}
                >
                  {LANG_NAMES[code]}
                  {selected ? (
                    <Check aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
