import { LANG_STORAGE_KEY } from "./types";

/**
 * Inline script that runs while the HTML is being parsed, before the first
 * paint. If a returning visitor chose English, it marks <html> so the CSS can
 * keep the page hidden for the few milliseconds until React has applied the
 * saved language. This prevents a visible flash of Amharic text.
 *
 * A timeout guarantees that the page can never stay hidden.
 */
export const languageInitScript = `(function(){try{var d=document.documentElement;var l=window.localStorage.getItem(${JSON.stringify(
  LANG_STORAGE_KEY,
)});if(l==="en"||l==="am"){d.lang=l;d.setAttribute("data-lang",l);}if(l==="en"){window.setTimeout(function(){d.setAttribute("data-ready","1");},2500);}}catch(e){}})();`;
