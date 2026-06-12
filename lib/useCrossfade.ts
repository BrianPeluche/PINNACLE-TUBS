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
      // The two windows cover the SAME physical scroll span: sections overlap
      // by 22svh, so the incoming's "top 75%..35%" interval is the outgoing's
      // "bottom ~96%..56%" interval. Linear tweens then cross at ~0.55/0.55 —
      // both sections genuinely partial at the midpoint, like a film dissolve.
      gsap.fromTo(
        el,
        { opacity: 0.1, y: 24, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 75%", end: "top 35%", scrub: true },
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
            scrollTrigger: { trigger: el, start: "bottom 96%", end: "bottom 56%", scrub: true },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, leave, sectionRef]);
}
