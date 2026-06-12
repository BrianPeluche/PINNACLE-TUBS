"use client";

import { siteConfig } from "@/data/site";
import { ScrubSection } from "./ScrubSection";

/**
 * Cinematic bridge between the hero and the editorial section (the GTA
 * FirstVideo pattern): scroll-scrubbed close-up jet footage with no text —
 * the "why buy" copy lives in WhyHotTubEditorial, which follows it.
 */
export function Benefits() {
  const copy = siteConfig.sections.benefits;

  return <ScrubSection video={copy.video} overlay="light" />;
}
