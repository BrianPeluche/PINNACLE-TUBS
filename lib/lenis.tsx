"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Shared handle so non-provider components (the Nav) can drive smooth scroll
// through the same Lenis instance that's synced to ScrollTrigger. Null when
// reduced motion is on (no Lenis), in which case callers fall back to native.
let lenisInstance: Lenis | null = null;

/**
 * Smooth-scroll to a section target, accounting for the fixed nav height so
 * the destination is not hidden under it. `target` is "top" for the page top
 * or a CSS selector (e.g. "#contact"). Uses Lenis when available; otherwise
 * native smooth scroll (reduced motion / SSR-less environments).
 */
export function scrollToTarget(target: string) {
  if (typeof document === "undefined") return;
  const header = document.querySelector("header");
  const navHeight = header ? header.getBoundingClientRect().height : 0;

  if (target === "top") {
    if (lenisInstance) lenisInstance.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.querySelector(target);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: -navHeight });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

/**
 * Wraps the app in a Lenis smooth-scroll instance synced to GSAP's ticker
 * so ScrollTrigger stays in sync with smoothed scroll positions.
 * Skips smooth scrolling entirely when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({ autoRaf: false });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
