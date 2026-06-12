import type { ReactNode } from "react";

interface StickySectionProps {
  /** Full-viewport layer pinned to the top while the wrapper scrolls. */
  bgSlot: ReactNode;
  /** Normal-flow content that rides upward over the pinned background. */
  children: ReactNode;
  className?: string;
}

/**
 * GTA VI scroll architecture: the background layer is position:sticky,
 * pinned to the viewport top for the wrapper's scroll distance, while the
 * foreground content sits in normal flow (after the bg in DOM order,
 * z-index above it) and scrolls continuously over it. When the next
 * section's wrapper arrives, its sticky background bleeds in from below.
 * No whole-section opacity fades — the background stays anchored.
 */
export function StickySection({ bgSlot, children, className }: StickySectionProps) {
  return (
    <section className={`relative min-h-[200svh] ${className ?? ""}`}>
      <div className="sticky top-0 z-0 h-svh w-full overflow-hidden">{bgSlot}</div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
