"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { watchBodyHeightForRefresh } from "@/lib/scrollRefresh";
import { useHydrated } from "@/lib/useHydrated";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINE = "Experience the art of pure relaxation.";

/**
 * GTA-style interstitial between the hero and the first video bridge,
 * built the way the reference avoids seams (jsm_gta_vi FirstVideo): the
 * transition is a full-viewport LAYER crossfade, never a section edge
 * crossing the screen. The flow section is an unpinned dark spacer; the
 * visual is a fixed overlay scrubbed across the section's whole traversal —
 * the screen fades to black while the hero is still scrolling out, the
 * statement line blurs in and out on the black, and the black lifts only
 * once the bridge has slid underneath behind its own full entrance veil.
 * Everything is on one scrubbed timeline, so scrolling up replays it in
 * reverse. Reduced motion gets a static dark band with the line visible.
 */
export function RelaxationInterstitial() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const animated = useHydrated() && !reducedMotion;

  useEffect(() => {
    if (!animated) return;
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!section || !overlay || !text) return;

    const unwatch = watchBodyHeightForRefresh();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      // ease "none" throughout: scrub position IS the animation clock, so
      // reversals retrace the exact same frames (the hero/bridge invariant).
      // autoAlpha keeps the fixed layer visibility:hidden whenever it is
      // fully transparent, so it can never sit over later sections.
      tl.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "none", duration: 0.16 },
        0,
      );
      tl.fromTo(
        text,
        { opacity: 0, y: 30, scale: 0.98, filter: "blur(14px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "none", duration: 0.2 },
        0.26,
      );
      tl.to(
        text,
        { opacity: 0, y: -30, scale: 1.02, filter: "blur(14px)", ease: "none", duration: 0.2 },
        0.56,
      );
      // The bridge's top edge crosses the viewport during this fade, but it
      // enters behind its own opacity-1 entrance veil — black over black, so
      // no strip of footage and no boundary line is ever visible.
      tl.to(overlay, { autoAlpha: 0, ease: "none", duration: 0.18 }, 0.82);
    }, sectionRef);

    return () => {
      unwatch();
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [animated]);

  return (
    <section ref={sectionRef} className="relative h-svh bg-background">
      {animated ? (
        // z-40 keeps the layer above all sections but under the z-50 nav,
        // matching the reference (the site chrome stays visible throughout).
        <div
          ref={overlayRef}
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-background px-6"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <p
            ref={textRef}
            className="max-w-4xl text-balance text-center text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl xl:text-6xl"
            style={{ opacity: 0 }}
          >
            {LINE}
          </p>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center px-6">
          <p className="max-w-4xl text-balance text-center text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl xl:text-6xl">
            {LINE}
          </p>
        </div>
      )}
    </section>
  );
}
