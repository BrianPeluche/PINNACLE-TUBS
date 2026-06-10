"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** How much the mask's zoom anchor scales up — see HeroMask for the math. */
const ZOOM_SCALE = 80;

interface HeroScrollRefs {
  sectionRef: RefObject<HTMLElement | null>;
  zoomGroupRef: RefObject<SVGGElement | null>;
  taglineRef: RefObject<HTMLElement | null>;
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
 * zoom anchor scales up to fill the viewport (revealing the full video) and
 * the tagline fades out early. Skipped entirely when reducedMotion is true.
 */
export function useHeroScroll({ sectionRef, zoomGroupRef, taglineRef }: HeroScrollRefs, reducedMotion: boolean) {
  const { width, height } = useViewportSize();

  useEffect(() => {
    if (reducedMotion) return;
    if (!sectionRef.current || !zoomGroupRef.current || !taglineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
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

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reducedMotion, width, height, sectionRef, zoomGroupRef, taglineRef]);

  return { width, height };
}
