/**
 * Gold-and-green swoosh that echoes the wave on the brochure.
 * Place it directly above a forest-green section so the green wave
 * merges into that section's background.
 */
export function WaveDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={className ?? "block h-12 w-full sm:h-20 lg:h-24"}
    >
      <path
        d="M0 58C220 112 470 8 740 50s520 70 700 8v62H0Z"
        fill="var(--color-gold)"
      />
      <path
        d="M0 82C240 124 520 34 800 72s470 40 640-6v54H0Z"
        fill="var(--color-forest)"
      />
    </svg>
  );
}
