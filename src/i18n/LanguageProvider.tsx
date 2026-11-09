"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getDictionary, type Dictionary } from "@/translations";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  isLang,
  type L10n,
  type Lang,
} from "./types";

/**
 * Language state lives in a tiny external store so that:
 *  - the server and the first client render both use the default (Amharic),
 *    which avoids hydration mismatches;
 *  - the visitor's saved choice is applied immediately after hydration;
 *  - the choice is saved to localStorage and synced between browser tabs;
 *  - private-mode browsers that block storage still switch languages
 *    (the choice is then kept in memory for the session).
 */
let memoryLang: Lang | null = null;
const listeners = new Set<() => void>();

function readLang(): Lang {
  if (memoryLang) return memoryLang;
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* storage unavailable – fall through to the default */
  }
  return DEFAULT_LANG;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === LANG_STORAGE_KEY || event.key === null) {
      memoryLang = null;
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = (): Lang => DEFAULT_LANG;

function writeLang(next: Lang): void {
  memoryLang = next;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  } catch {
    /* storage unavailable – the in-memory value is used instead */
  }
  listeners.forEach((listener) => listener());
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** The full dictionary for the current language. */
  t: Dictionary;
  /** Pick the current-language value from a `{ am, en }` pair. */
  l: <T>(value: L10n<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, getServerSnapshot);

  const setLang = useCallback((next: Lang) => writeLang(next), []);

  // Keep <html lang> in sync and tell the CSS that the language is applied.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.setAttribute("data-lang", lang);
    root.setAttribute("data-ready", "1");
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: getDictionary(lang),
      l: <T,>(v: L10n<T>) => v[lang],
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
