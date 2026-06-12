"use client";

import { ScrubSection } from "./ScrubSection";

/**
 * Cinematic bridge between the hero and the editorial section (the GTA
 * FirstVideo pattern): scroll-scrubbed close-up jet footage with no text —
 * the "why buy" copy lives in WhyHotTubEditorial, which follows it.
 *
 * Footage is the JACUZZI-WATER-Better source re-encoded for scrubbing.
 * It's watermark-free, so the bridge runs overlay="none" (no wash, veil
 * only). Lives here instead of data/site.ts because data is frozen for
 * this change — move into data/ when it unfreezes.
 */
const BRIDGE_VIDEO = {
  src: "/assets/jacuzzi-water-better-scrub.mp4",
  poster: "/assets/jacuzzi-water-better-poster.jpg",
} as const;

export function Benefits() {
  return <ScrubSection video={BRIDGE_VIDEO} overlay="none" />;
}
