"use client";

import { useEffect, useState, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** How much the mask zooms (mask-size 100% -> 8000%) — the bar between the
 * title lines covers the viewport once height * 0.015 * scale >= height. */
const ZOOM_SCALE = 80;
/** Portion of the pin spent fading the white title before the zoom starts. */
const WHITE_FADE_PORTION = 0.2;

interface HeroScrollRefs {
  sectionRef: RefObject<HTMLElement | null>;
  maskDivRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<SVGSVGElement | null>;
  taglineRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
}

interface BoxSize {
  width: number;
  height: number;
}

/** SSR/first-render guess; corrected by the ResizeObserver after mount. */
const DEFAULT_SIZE: BoxSize = { width: 1920, height: 1080 };

/**
 * The single viewport source for the whole hero: the section's own rendered
 * box (h-svh). On real iOS, window.innerHeight diverges from the svh box
 * when the toolbar collapses mid-scroll — geometry computed from innerHeight
 * then disagrees with the box the overlay and mask actually render into,
 * which misaligned the two title copies on device. Measuring the section
 * itself makes that divergence impossible and stays stable through toolbar
 * collapse (no mid-pin rebuild churn).
 */
function useSectionSize(sectionRef: RefObject<HTMLElement | null>): BoxSize {
  const [size, setSize] = useState<BoxSize>(DEFAULT_SIZE);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      const next = { width: Math.round(r.width), height: Math.round(r.height) };
      setSize((prev) =>
        prev.width === next.width && prev.height === next.height ? prev : next,
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [sectionRef]);

  return size;
}

/**
 * Drives the hero's pinned, scrubbed timeline:
 *   0    -> 0.2  white title overlay fades out (video shows through letters)
 *   0.2  -> 1    mask zooms open (mask-size about center) until media fills
 *   0    -> 1    footage scrubbed via video.currentTime — the video never
 *                plays on its own; scroll is the only thing advancing it
 *   0    -> 0.25 tagline fades out
 * All segments share one timeline so they reverse together on scroll-up.
 *
 * The zoom tweens a proxy and writes mask-size/-webkit-mask-size manually:
 * GSAP can't be trusted to dual-write prefixed+unprefixed mask props across
 * engines, and WebKit needs both.
 *
 * `enabled` is false until hydration AND whenever the user prefers reduced
 * motion; the <video> only exists in the DOM once it flips true.
 */
export function useHeroScroll(
  { sectionRef, maskDivRef, overlayRef, taglineRef, videoRef }: HeroScrollRefs,
  enabled: boolean,
) {
  const { width, height } = useSectionSize(sectionRef);

  useEffect(() => {
    if (!enabled) return;
    const maskDiv = maskDivRef.current;
    const video = videoRef.current;
    if (!sectionRef.current || !maskDiv || !overlayRef.current || !taglineRef.current || !video)
      return;

    let tl: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${height * 2}`,
          scrub: 1,
          pin: true,
        },
      });

      tl.to(overlayRef.current, { opacity: 0, ease: "none", duration: WHITE_FADE_PORTION }, 0);

      const zoom = { scale: 1 };
      tl.to(
        zoom,
        {
          scale: ZOOM_SCALE,
          ease: "none",
          duration: 1 - WHITE_FADE_PORTION,
          onUpdate: () => {
            const size = `${zoom.scale * 100}% ${zoom.scale * 100}%`;
            maskDiv.style.maskSize = size;
            maskDiv.style.webkitMaskSize = size;
          },
        },
        WHITE_FADE_PORTION,
      );

      tl.to(taglineRef.current, { opacity: 0, ease: "none", duration: 0.25 }, 0);
    }, sectionRef);

    // The currentTime tween needs the real duration, so it can only be added
    // once metadata is in. ctx.add registers it for cleanup via ctx.revert.
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
      ctx.revert();
      // ctx.revert restores the proxy, not the styles written in onUpdate.
      maskDiv.style.maskSize = "100% 100%";
      maskDiv.style.webkitMaskSize = "100% 100%";
      ScrollTrigger.refresh();
    };
  }, [enabled, width, height, sectionRef, maskDivRef, overlayRef, taglineRef, videoRef]);

  return { width, height };
}
