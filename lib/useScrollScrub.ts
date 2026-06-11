"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { watchBodyHeightForRefresh } from "@/lib/scrollRefresh";

export type ScrubTimeline = gsap.core.Timeline;

export interface ScrollScrubConfig {
  sectionRef: RefObject<HTMLElement | null>;
  /** Video whose currentTime is driven by the pinned timeline. */
  videoRef: RefObject<HTMLVideoElement | null>;
  /** false until hydration / under reduced motion — no pin, no timeline. */
  enabled: boolean;
  /** Pin distance in viewport heights. */
  pinViewports?: number;
  /** Adds the section's own tweens (content fades, card drift) to the same
   * scrubbed timeline so everything stays in lockstep with the footage. */
  build?: (tl: gsap.core.Timeline) => void;
}

/**
 * The hero's scrub architecture, shared: pin the section for a bounded
 * distance, scrub one timeline, and tween video.currentTime inside it with
 * ease "none" (added once loadedmetadata supplies the duration). The video
 * never plays on its own — scroll is the only thing advancing it; stopping
 * mid-scroll freezes the frame.
 */
export function useScrollScrub({
  sectionRef,
  videoRef,
  enabled,
  pinViewports = 1.5,
  build,
}: ScrollScrubConfig) {
  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const unwatch = watchBodyHeightForRefresh();
    let tl: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${Math.round(document.documentElement.clientHeight * pinViewports)}`,
          scrub: 1,
          pin: true,
        },
      });
      build?.(tl);
    }, sectionRef);

    // currentTime needs the real duration; ctx.add registers for cleanup.
    const addVideoScrub = () => {
      ctx.add(() => {
        tl.to(video, { currentTime: video.duration, ease: "none", duration: 1 }, 0);
      });
    };
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      addVideoScrub();
    } else {
      video.addEventListener("loadedmetadata", addVideoScrub, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", addVideoScrub);
      unwatch();
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [enabled, pinViewports, build, sectionRef, videoRef]);
}
