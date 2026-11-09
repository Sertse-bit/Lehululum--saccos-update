/** Dictionary keys under `common.nav` that are used as menu labels. */
export type NavLabelKey =
  | "home"
  | "about"
  | "services"
  | "news"
  | "members"
  | "vacancy"
  | "partners"
  | "csr"
  | "contact"
  | "complaints"
  | "allServices"
  | "savings"
  | "loans"
  | "membership"
  | "newsAnnouncements"
  | "memberEducation"
  | "faq";

export interface NavChild {
  key: NavLabelKey;
  href: string;
}

export interface NavItem {
  key: NavLabelKey;
  href: string;
  /** Path prefixes that mark this item as the active section. */
  match: string[];
  children?: NavChild[];
}

/** Order follows the brief: Home, About, Services, News/Resources, Members, … */
export const navItems: NavItem[] = [
  { key: "home", href: "/", match: ["/"] },
  { key: "about", href: "/about", match: ["/about"] },
  {
    key: "services",
    href: "/services",
    match: ["/services"],
    children: [
      { key: "allServices", href: "/services" },
      { key: "savings", href: "/services/savings" },
      { key: "loans", href: "/services/loans" },
      { key: "membership", href: "/members" },
    ],
  },
  {
    key: "news",
    href: "/news",
    match: ["/news", "/resources", "/faq", "/articles"],
    children: [
      { key: "newsAnnouncements", href: "/news" },
      { key: "memberEducation", href: "/resources" },
      { key: "faq", href: "/faq" },
    ],
  },
  { key: "members", href: "/members", match: ["/members"] },
  { key: "vacancy", href: "/vacancy", match: ["/vacancy"] },
  { key: "partners", href: "/partners", match: ["/partners"] },
  { key: "csr", href: "/csr", match: ["/csr"] },
  { key: "contact", href: "/contact", match: ["/contact"] },
  { key: "complaints", href: "/complaints", match: ["/complaints"] },
];

export function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/") return pathname === "/";
  return item.match.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isChildCurrent(child: NavChild, pathname: string): boolean {
  return pathname === child.href;
}

/** Routes used by the sitemap and by link checks. */
export const staticRoutes: string[] = [
  "/",
  "/about",
  "/services",
  "/services/savings",
  "/services/loans",
  "/members",
  "/news",
  "/resources",
  "/faq",
  "/vacancy",
  "/partners",
  "/csr",
  "/contact",
  "/complaints",
];
