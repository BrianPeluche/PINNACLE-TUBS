"use client";

import { ScrollTrigger } from "@/lib/gsap";

/**
 * ScrollTrigger positions are computed when triggers are created, but pinned
 * triggers created later (the hero's pin mounts post-hydration) get their
 * spacer distance credited to downstream triggers in CREATION order — every
 * later trigger ends up viewports too early. One shared, ref-counted watcher
 * re-sorts triggers into document order and refreshes whenever the body
 * height settles at a new value (pin insertion, image loads).
 */
let watcherCount = 0;
let bodyObserver: ResizeObserver | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let lastBodyHeight = 0;

export function watchBodyHeightForRefresh(): () => void {
  watcherCount++;
  if (!bodyObserver) {
    lastBodyHeight = document.body.scrollHeight;
    bodyObserver = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastBodyHeight) < 2) return;
      lastBodyHeight = height;
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 150);
    });
    bodyObserver.observe(document.body);
  }
  return () => {
    watcherCount--;
    if (watcherCount === 0) {
      bodyObserver?.disconnect();
      bodyObserver = null;
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = null;
    }
  };
}
