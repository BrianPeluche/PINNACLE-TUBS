"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/site";
import { useHydrated } from "@/lib/useHydrated";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BUILD_ID, HeroDebug } from "./HeroDebug";
import { HeroMask } from "./HeroMask";
import { useHeroScroll } from "./useHeroScroll";
import { useVideoUnlock } from "./useVideoUnlock";

/**
 * GTA VI–style scroll hero: "PINNACLE TUBS" starts as a solid white title;
 * scrolling pins the section, fades the white fill to reveal the hot tub
 * video through the letterforms, then zooms the mask open until the video
 * fills the screen and the page unpins. Footage is scrubbed by scroll.
 * Degrades to the static white-title poster with no pin for reduced motion.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskDivRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const animated = hydrated && !reducedMotion;

  const { width, height } = useHeroScroll(
    { sectionRef, maskDivRef, overlayRef, taglineRef, videoRef },
    animated,
  );
  useVideoUnlock(videoRef, animated);

  // Build stamp on every load so device tests can confirm which deployment
  // they are judging (kills stale-cache ambiguity).
  useEffect(() => {
    console.info(`[pinnacle-tubs] hero build ${BUILD_ID}`);
  }, []);

  const debug = hydrated && /[?&]debug=hero(&|$)/.test(window.location.search);

  return (
    <section ref={sectionRef} className="relative h-svh w-full overflow-hidden bg-background">
      <HeroMask
        width={width}
        height={height}
        title={siteConfig.hero.title}
        videoSrc={siteConfig.hero.videoSrc}
        poster={siteConfig.hero.poster}
        animated={animated}
        maskDivRef={maskDivRef}
        overlayRef={overlayRef}
        videoRef={videoRef}
      />
      <p className="hero-tagline pointer-events-none absolute inset-x-0 bottom-16 px-6 text-center sm:bottom-24">
        <span
          ref={taglineRef}
          className="text-xs uppercase tracking-[0.2em] text-foreground sm:text-base sm:tracking-[0.4em]"
        >
          {siteConfig.tagline}
        </span>
      </p>
      {debug && (
        <HeroDebug
          sectionRef={sectionRef}
          overlayRef={overlayRef}
          maskDivRef={maskDivRef}
          geometryWidth={width}
          geometryHeight={height}
        />
      )}
    </section>
  );
}
