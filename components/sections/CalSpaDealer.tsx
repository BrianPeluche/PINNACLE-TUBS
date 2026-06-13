"use client";

import { useCallback } from "react";
import { ScrubSection } from "./ScrubSection";
import type { ScrubTimeline } from "@/lib/useScrollScrub";

/**
 * Premium selling moment in the cinematic chain: the dedicated CalSpa
 * footage scrubs behind a centered Cal Spas wordmark, heading, and CTA that
 * blur in and out on the same scrubbed timeline as every other section. The
 * wordmark is filled by a tight warm gradient (dark purple → plum → burgundy
 * → pink/red → orange → yellow-orange) whose position is driven by scroll, so
 * the colors travel through the mark as you move — the GTA VI sweep, locked to
 * the pin so it reverses on scroll-up. Assets live here because data/site.ts
 * is frozen for this change.
 */
const VIDEO = {
  src: "/assets/calspa-sec-vid-scrub.mp4",
  poster: "/assets/calspa-sec-vid-poster.jpg",
};

// native logo aspect (white script wordmark on transparent)
const LOGO_ASPECT = "1192 / 420";

// Tight warm GTA-VI range only (dark purple → plum → burgundy → pink/red →
// orange → yellow-orange brightest). Mirrored back to the dark end so the
// scroll-driven position shift travels and returns smoothly with no hard
// color jump at the wrap, while the mark stays readable throughout.
const LOGO_GRADIENT =
  "linear-gradient(90deg, #160f24, #351236, #6d1d45, #b73555, #e8684a, #f5b64f, #e8684a, #b73555, #6d1d45, #351236, #160f24)";

export function CalSpaDealer() {
  const contentBuild = useCallback((tl: ScrubTimeline, contentEl: HTMLDivElement) => {
    const logo = contentEl.querySelector<HTMLElement>("[data-calspa-logo]");
    if (!logo) return;
    // Scroll-driven color travel across the whole pin (ease none => reverses
    // frame-for-frame). background-size is 200%, so a full 200% position shift
    // walks the sweep cleanly through the wordmark.
    tl.fromTo(
      logo,
      { backgroundPosition: "0% 50%" },
      { backgroundPosition: "-200% 50%", ease: "none", duration: 1 },
      0,
    );
  }, []);

  return (
    <ScrubSection
      video={VIDEO}
      overlay="none"
      centered
      gradualContent
      contentBuild={contentBuild}
    >
      <div className="flex flex-col items-center gap-7 sm:gap-9">
        {/* The white wordmark drives a CSS mask so the gradient fills its
            shape; the gradient itself travels with scroll (see contentBuild).
            Decorative, so role=img. */}
        <div
          data-calspa-logo
          role="img"
          aria-label="Cal Spas"
          className="w-[min(78vw,460px)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          style={{
            aspectRatio: LOGO_ASPECT,
            backgroundImage: LOGO_GRADIENT,
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 50%",
            WebkitMaskImage: "url(/assets/CALSPA-logo.png)",
            maskImage: "url(/assets/CALSPA-logo.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <h2 className="max-w-3xl text-balance text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] sm:text-5xl">
          CalSpa Authorized Hot Tub Dealer
        </h2>
        <a
          href="https://calspas.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-transform duration-300 hover:scale-[1.04] focus-visible:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Click Here To See Our New Models
        </a>
      </div>
    </ScrubSection>
  );
}
