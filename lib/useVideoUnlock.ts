"use client";

import { useEffect, type RefObject } from "react";

/**
 * Real iOS Safari refuses to paint frames for a muted, scrub-only video
 * until a user gesture "unlocks" the element. A silent play() immediately
 * followed by pause() inside the first gesture unlocks frame painting;
 * currentTime is restored so no playback is visible before the scrubbed
 * timeline takes control. Touch-capable devices only; fires at most once
 * per page load, then both listeners are removed.
 * (Mirror of the hero's components/hero/useVideoUnlock — the hero keeps its
 * own copy so it stays untouched; sections use this one.)
 */
export function useVideoUnlock(videoRef: RefObject<HTMLVideoElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (navigator.maxTouchPoints < 1 && !("ontouchstart" in window)) return;
    const video = videoRef.current;
    if (!video) return;

    let unlocked = false;
    const remove = () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      remove();
      const t = video.currentTime;
      video
        .play()
        .then(() => {
          video.pause();
          video.currentTime = t;
        })
        .catch(() => {
          // Stays locked until a later gesture satisfies the browser itself.
        });
    };
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true });
    return remove;
  }, [videoRef, enabled]);
}
