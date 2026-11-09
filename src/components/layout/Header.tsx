import { DesktopNavigation } from "./DesktopNavigation";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

/**
 * Floating, sticky, pill-shaped header modelled on the reference screenshot:
 * logo on the left, one row of links with a filled pill for the active page,
 * dropdown arrows on menus, and the language pill on the right.
 */
export function Header() {
  return (
    <header className="no-print sticky top-0 z-50 px-3 pt-2.5 max-[359px]:px-2 sm:px-4">
      <div className="relative mx-auto flex h-14 w-full max-w-[1600px] items-center gap-2 rounded-full bg-white px-3 shadow-header max-[359px]:gap-1.5 max-[359px]:px-2.5 ring-1 ring-forest/5 sm:h-[3.75rem] sm:px-4 xl:gap-3">
        <Logo />
        <DesktopNavigation />
        <div className="ml-auto flex items-center gap-2 max-[359px]:gap-1.5 xl:ml-0">
          <LanguageSelector />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
