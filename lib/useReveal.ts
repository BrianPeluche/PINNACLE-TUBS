"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Scroll-in reveal for every `[data-reveal]` descendant of the scope:
 * rises + fades in when it enters the viewport, reverses when it leaves
 * upward. Optional `data-reveal-delay="0.15"` staggers an element.
 * Implemented with gsap.from so content is fully visible without JS and
 * under reduced motion (the effect simply never runs).
 */
export function useReveal(scopeRef: RefObject<HTMLElement | null>) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      for (const el of scope.querySelectorAll<HTMLElement>("[data-reveal]")) {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay) || 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, reducedMotion]);
}
