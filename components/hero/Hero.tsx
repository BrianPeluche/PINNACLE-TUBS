"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HeroMask } from "./HeroMask";
import { useHeroScroll } from "./useHeroScroll";

/**
 * GTA VI–style scroll hero: "PINNACLE TUBS" is cut out of a mask over the
 * hot tub video. Scrolling pins the section and zooms the mask open until
 * the video fills the screen, then the page unpins and content reveals.
 * Degrades to a static masked poster with no pin/zoom for reduced motion.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const zoomGroupRef = useRef<SVGGElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  const { width, height } = useHeroScroll({ sectionRef, zoomGroupRef, taglineRef }, reducedMotion);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background">
      <HeroMask
        width={width}
        height={height}
        title={siteConfig.hero.title}
        videoSrc={siteConfig.hero.videoSrc}
        poster={siteConfig.hero.poster}
        animated={!reducedMotion}
        zoomGroupRef={zoomGroupRef}
      />
      <p className="hero-tagline pointer-events-none absolute inset-x-0 bottom-16 px-6 text-center sm:bottom-24">
        <span
          ref={taglineRef}
          className="text-xs uppercase tracking-[0.2em] text-foreground sm:text-base sm:tracking-[0.4em]"
        >
          {siteConfig.tagline}
        </span>
      </p>
    </section>
  );
}
