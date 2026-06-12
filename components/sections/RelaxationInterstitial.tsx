"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { watchBodyHeightForRefresh } from "@/lib/scrollRefresh";
import { useHydrated } from "@/lib/useHydrated";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Brief pin: in / hold / out fits inside one extra viewport of scroll. */
const PIN_VIEWPORTS = 1;

const LINE = "Experience the art of pure relaxation.";

/**
 * GTA-style interstitial between the hero and the first video bridge: the
 * hero's dissolve tail lands on this solid-dark screen, the statement line
 * blurs in, holds, and blurs back out — all on the same scrubbed pin, so
 * scrolling up replays it in reverse. The screen is dark again before the
 * unpin, handing off to the bridge's own entrance veil. Reduced motion gets
 * a static dark band with the line fully visible, no pin.
 */
export function RelaxationInterstitial() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const animated = useHydrated() && !reducedMotion;

  useEffect(() => {
    if (!animated) return;
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const unwatch = watchBodyHeightForRefresh();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${Math.round(document.documentElement.clientHeight * PIN_VIEWPORTS)}`,
          scrub: 1,
          pin: true,
        },
      });
      // ease "none" throughout: scrub position IS the animation clock, so
      // reversals retrace the exact same frames (the hero/bridge invariant)
      tl.fromTo(
        text,
        { opacity: 0, y: 30, scale: 0.98, filter: "blur(14px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "none", duration: 0.3 },
        0.08,
      );
      tl.to(
        text,
        { opacity: 0, y: -30, scale: 1.02, filter: "blur(14px)", ease: "none", duration: 0.3 },
        0.62,
      );
    }, sectionRef);

    return () => {
      unwatch();
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [animated]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh items-center justify-center overflow-hidden bg-background px-6"
    >
      <p
        ref={textRef}
        className="max-w-4xl text-balance text-center text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl xl:text-6xl"
        style={animated ? { opacity: 0 } : undefined}
      >
        {LINE}
      </p>
    </section>
  );
}
