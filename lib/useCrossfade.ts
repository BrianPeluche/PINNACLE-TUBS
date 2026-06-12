"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface CrossfadeOptions {
  /** Disable the leave tween (pinned scrub sections fade out via their own
   * timeline tail instead). */
  leave?: boolean;
}

/**
 * GTA-style overlapping dissolve. Sections after the hero are pulled up over
 * the previous section's tail (negative top margin set by the section
 * components), so during a handoff BOTH sections occupy the same screen
 * space: the outgoing fades toward near-black while the incoming rises from
 * near-black on top of it, passing through a shared dark midpoint. Both
 * tweens are scrub-linked, so the dissolve reverses exactly. Opacity + tiny
 * scale/y only; no horizontal motion. Skipped under reduced motion (content
 * fully visible at all times — gsap never runs).
 */
export function useCrossfade(
  sectionRef: RefObject<HTMLElement | null>,
  { leave = true }: CrossfadeOptions = {},
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // The two windows cover the SAME physical scroll span: flow sections
      // overlap by 45svh (real DOM overlap via negative margins, GTA-style),
      // so the incoming's "top 80%..35%" interval IS the outgoing's
      // "bottom 125%..80%" interval (bottom = top + 45svh) — equivalent to
      // anchoring the outgoing fade on the incoming section, as the GTA
      // reference implementations do. Linear tweens cross at ~0.55/0.55:
      // both sections genuinely co-visible at partial opacity mid-dissolve.
      gsap.fromTo(
        el,
        { opacity: 0.1, y: 24, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "top 35%", scrub: true },
        },
      );
      if (leave) {
        // fromTo with immediateRender:false — a plain .to() would capture its
        // start value at creation time, when the enter tween has already set
        // the section to 0.1, freezing the leave as a constant 0.1 -> 0.1.
        gsap.fromTo(
          el,
          { opacity: 1, y: 0, scale: 1 },
          {
            opacity: 0.1,
            scale: 0.99,
            y: -16,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "bottom 125%", end: "bottom 80%", scrub: true },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, leave, sectionRef]);
}
