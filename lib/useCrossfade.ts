"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * GTA-style section handoff for non-pinned sections: the section fades/rises
 * up as it enters the viewport and dims back down as it leaves, scrub-linked
 * so it reverses cleanly. Opacity + tiny scale/y only — no layout properties,
 * no horizontal motion. Skipped under reduced motion (content stays fully
 * visible; gsap.fromTo never runs, so no-JS renders normally too).
 */
export function useCrossfade(sectionRef: RefObject<HTMLElement | null>) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Floors above 0 and a fade-in that completes deeper in the viewport:
      // the rise must be visible while the section is on screen, and nothing
      // should sit near-black while the user can still read it.
      gsap.fromTo(
        el,
        { opacity: 0.25, y: 32, scale: 0.988 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 50%", scrub: true },
        },
      );
      gsap.to(el, {
        opacity: 0.3,
        scale: 0.988,
        y: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "bottom 40%", end: "bottom 5%", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, sectionRef]);
}
