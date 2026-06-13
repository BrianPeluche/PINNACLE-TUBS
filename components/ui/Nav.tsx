"use client";

import Image from "next/image";
import { scrollToTarget } from "@/lib/lenis";
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

export function Nav() {
  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
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
