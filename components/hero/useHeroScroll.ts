"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** How much the mask's zoom anchor scales up — see HeroMask for the math. */
const ZOOM_SCALE = 80;

interface HeroScrollRefs {
  sectionRef: RefObject<HTMLElement | null>;
  zoomGroupRef: RefObject<SVGGElement | null>;
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
 * Drives the GTA-style scroll-mask hero: pins the section while the mask's
 * zoom anchor scales up to fill the viewport (revealing the full video),
 * the footage is scrubbed (video.currentTime) in lockstep with the same
 * timeline, and the tagline fades out early. The video never plays on its
 * own — scroll position is the only thing that advances it.
 *
 * `enabled` is false until hydration AND whenever the user prefers reduced
 * motion; the <video> only exists in the DOM once it flips true.
 */
export function useHeroScroll(
  { sectionRef, zoomGroupRef, taglineRef, videoRef }: HeroScrollRefs,
  enabled: boolean,
) {
  const { width, height } = useViewportSize();

  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!sectionRef.current || !zoomGroupRef.current || !taglineRef.current || !video) return;

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

      tl.to(
        zoomGroupRef.current,
        { scale: ZOOM_SCALE, svgOrigin: `${width / 2} ${height / 2}`, ease: "none", duration: 1 },
        0,
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
      ScrollTrigger.refresh();
    };
  }, [enabled, width, height, sectionRef, zoomGroupRef, taglineRef, videoRef]);

  return { width, height };
}
