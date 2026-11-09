# Lehulum SACCOS website

Bilingual (Amharic default, English) website for **Lehulum SACCOS**
(ለሁሉም ቁጠባና ብድር ህ/ሥ/ማህበር). Built with Next.js (App Router), TypeScript,
Tailwind CSS and Lucide icons.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Checks:

```bash
npm run typecheck
npm run lint
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, sitemap and social cards. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Optional. A form service URL. Without it, forms *prepare* an email / WhatsApp message and say honestly that the site does not store messages. |

## Where to change things

| What | File |
| --- | --- |
| Name spelling, phone, email, Telegram, TikTok, WhatsApp, **address**, verified metrics, share-services switch | `src/config/organization.ts` |
| Savings and loan options (and their optional verified details) | `src/config/products.ts` |
| Menu items and order | `src/config/navigation.ts` |
| All interface text, English | `src/translations/en/*.ts` |
| All interface text, Amharic | `src/translations/am/*.ts` (must match the English keys – a missing key is a compile error) |
| News, events, education articles | `src/content/articles.ts` |
| Job announcements | `src/content/vacancies.ts` |
| Partners | `src/content/partners.ts` |
| Colours, fonts, spacing | `src/app/globals.css` (`@theme`) |

### Publishing confirmed information

Nothing is invented. These areas stay empty or hidden until you add real data:

- **Address** – fill `address` in `organization.ts`; the address block appears automatically (footer and contact page).
- **Numbers (members, assets …)** – add entries to `verifiedMetrics`; they appear first in the "At a glance" grid.
- **Savings / loan conditions** – add a `details` list (per language) to a product in `products.ts`; it appears on the product card.
- **Vacancies / partners / news** – add entries to the content files; the "none published" messages disappear.

## Language

Amharic is the default for first-time visitors. The header selector switches
the whole interface and the choice is saved in `localStorage` (a visitor whose
browser blocks storage can still switch for the session).

## Forms

`InquiryForm` is used on Contact, Members and Complaints. Validation messages
are translated. A hidden honeypot field silently discards bot submissions.
With `NEXT_PUBLIC_FORM_ENDPOINT` set, the form POSTs JSON
(`kind, name, phone, email, topic, subject, message, language, source`) and shows
a success or failure message; on failure it offers email / WhatsApp as a fallback.

## Not included

No online accounts, payments, loan applications or member login – the site is
informational and says so. No backend or database.

## Opening the site from a phone or another computer

`npm run dev` only serves its scripts to `localhost` by default. If you open
`http://192.168.x.x:3000` from another device and the menus or the language
button do nothing, that is the cause. `next.config.ts` already allows the
usual private network ranges (`192.168.*.*`, `10.*.*.*`, `172.*.*.*`). Start
the server so the network can reach it, then restart it after any config change:

```bash
npm run dev -- -H 0.0.0.0
```

Production (`npm run build && npm start`) has no such restriction.
