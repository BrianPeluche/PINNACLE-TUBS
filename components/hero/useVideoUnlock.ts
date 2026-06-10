"use client";

import { useEffect, type RefObject } from "react";

/**
 * Real iOS Safari refuses to paint video frames — even for a muted,
 * scrub-only video — until a user gesture "unlocks" the element, so the
 * letterforms revealed black on device while desktop was fine. A silent
 * play() immediately followed by pause() inside the first gesture unlocks
 * frame painting; currentTime is restored so no playback is visible before
 * the scrub timeline takes control.
 *
 * Attached only on touch-capable devices (the lock is a touch-Safari
 * behavior); fires at most once per page load, then both listeners are
 * removed. touchstart is the primary trigger, scroll the fallback.
 * `enabled` is false for reduced motion, where no video exists at all.
 */
export function useVideoUnlock(videoRef: RefObject<HTMLVideoElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    // Touch-capable devices only — desktop needs no unlock and gets no
    // listeners. Checks both signals: some WebKit builds report
    // maxTouchPoints 0 while still exposing ontouchstart.
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
          // Autoplay rejection just means the device stays locked until a
          // later gesture reaches the browser's own heuristics; nothing to do.
        });
    };
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true });
    return remove;
  }, [videoRef, enabled]);
}
