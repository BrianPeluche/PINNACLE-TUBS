"use client";

import { ScrubSection } from "./ScrubSection";

/**
 * Premium selling moment in the cinematic chain: shooting-water footage
 * scrubs behind a centered Cal Spas wordmark, heading, and CTA that blur in
 * and out on the same scrubbed timeline as every other section. Assets live
 * here because data/site.ts is frozen for this change.
 */
const VIDEO = {
  src: "/assets/shooting-water.mp4",
  poster: "/assets/shooting-water-poster.jpg",
};

// native logo aspect (white script wordmark on transparent)
const LOGO_ASPECT = "1192 / 420";

export function CalSpaDealer() {
  return (
    <ScrubSection video={VIDEO} overlay="none" centered>
      <div className="flex flex-col items-center gap-7 sm:gap-9">
        {/* The white wordmark drives a CSS mask so the gradient fills its
            shape — a tasteful amber→dusk treatment in the site palette
            (premium, not literal GTA colors). Decorative, so role=img. */}
        <div
          role="img"
          aria-label="Cal Spas"
          className="w-[min(78vw,460px)] bg-gradient-to-r from-accent via-dusk to-accent drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          style={{
            aspectRatio: LOGO_ASPECT,
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
