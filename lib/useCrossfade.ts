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
      gsap.fromTo(
        el,
        { opacity: 0, y: 28, scale: 0.988 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 45%", scrub: true },
        },
      );
      gsap.to(el, {
        opacity: 0.18,
        scale: 0.988,
        y: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "bottom 50%", end: "bottom 8%", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, sectionRef]);
}
