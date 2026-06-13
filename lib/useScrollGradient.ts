"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Drives the `background-position` of every `[data-gradient-ring]` inside the
 * scope from the scope's scroll progress, scrubbed — the same warm CalSpa
 * sweep used on the Cal Spas wordmark and the Get-in-Touch title, here feeding
 * the photo-card hover rings. The ring gradient is mostly vertical with a tall
 * (100% x 200%) background, so the position travels on the Y axis; scrub means
 * it reverses on scroll-up. Under reduced motion it does nothing and the ring
 * stays at its static default position (the hover ring still appears, just
 * without travel).
 */
export function useScrollGradient(scopeRef: RefObject<HTMLElement | null>) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const scope = scopeRef.current;
    if (!scope) return;
    const rings = scope.querySelectorAll<HTMLElement>("[data-gradient-ring]");
    if (!rings.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rings,
        { backgroundPosition: "50% 0%" },
        {
          backgroundPosition: "50% -200%",
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, reducedMotion]);
}
