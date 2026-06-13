"use client";

import Image from "next/image";
import { scrollToTarget, scrollToY } from "@/lib/lenis";
import { siteConfig } from "@/data/site";

// The site is a single scrolling page, so nav items drive smooth in-page
// scrolls rather than route changes. Map the existing data/site.ts hrefs
// (frozen) to scroll targets: Home -> page top, Tubs -> the CalSpa dealer
// section (where the CTA is), Contact -> the contact block.
const TARGETS: Record<string, string> = {
  "/": "top",
  "/tubs": "#tubs",
  "/contact": "#contact",
};

// CalSpa logo/heading/CTA are fully blurred in across roughly the middle of
// the pin (in by ~0.3, out from ~0.6). Land here so "Tubs" arrives on the
// visible CTA moment rather than the dark pin start.
const CALSPA_VISIBLE_PROGRESS = 0.45;

export function Nav() {
  // "Tubs": land inside the CalSpa pin where the content is on screen. The
  // pinned section lives in the pin-spacer right after the #tubs anchor; its
  // extra height is the scrubbed pin distance, so anchorTop + progress*extra
  // is the scroll position of the visible CTA. Falls back to the plain anchor
  // when there is no pin (reduced motion / pre-hydration), where the CalSpa
  // content is already static and visible.
  const goTubs = (e: React.MouseEvent) => {
    e.preventDefault();
    const anchor = document.querySelector("#tubs");
    const spacer = anchor?.nextElementSibling as HTMLElement | null;
    const section = spacer?.querySelector("section");
    if (!anchor || !spacer || !section || !spacer.className.includes("pin-spacer")) {
      scrollToTarget("#tubs");
      return;
    }
    const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
    const extra = spacer.getBoundingClientRect().height - section.getBoundingClientRect().height;
    scrollToY(spacerTop + extra * CALSPA_VISIBLE_PROGRESS);
  };

  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (target === "#tubs") return goTubs(e);
    scrollToTarget(target);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-muted bg-background/80 backdrop-blur">
      {/* GTA-style nav: full-width row so the logo sits ~24px (px-6) from
          the viewport's left edge, links on the right. Transparent PNG needs
          no clipping or blend tricks. */}
      <nav className="flex w-full items-center justify-between px-6 py-3">
        <a
          href="#top"
          onClick={go("top")}
          className="ml-8 flex items-center"
          aria-label={`${siteConfig.name} — scroll to top`}
        >
          <Image
            src="/assets/PINNACLE-TUBS-BETTER-LOGO.png"
            alt={`${siteConfig.name} — Luxury Hot Tubs, Made in the USA`}
            width={160}
            height={160}
            className="h-20 w-20 object-contain"
            priority
          />
        </a>
        {/* mirrored inset so the links sit as far from the right edge as the
            logo does from the left */}
        <ul className="mr-8 flex items-center gap-6 text-sm text-muted-foreground">
          {siteConfig.nav.map((item) => {
            const target = TARGETS[item.href] ?? "top";
            return (
              <li key={item.href}>
                <a
                  href={target === "top" ? "#top" : target}
                  onClick={go(target)}
                  className="cursor-pointer transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
