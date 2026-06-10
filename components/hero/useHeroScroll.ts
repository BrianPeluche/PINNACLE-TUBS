"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";
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

interface ViewportSize {
  width: number;
  height: number;
}

const DEFAULT_SIZE: ViewportSize = { width: 1920, height: 1080 };
let cachedSize: ViewportSize = DEFAULT_SIZE;

function getSnapshot(): ViewportSize {
  if (cachedSize.width !== window.innerWidth || cachedSize.height !== window.innerHeight) {
    cachedSize = { width: window.innerWidth, height: window.innerHeight };
  }
  return cachedSize;
}

function getServerSnapshot(): ViewportSize {
  return DEFAULT_SIZE;
}

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

/** Tracks viewport size (drives mask geometry) and updates on resize. */
function useViewportSize(): ViewportSize {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
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
  const { width, height } = useViewportSize();

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
