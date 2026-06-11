"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { VideoBackground } from "@/lib/VideoBackground";

/**
 * ScrollTrigger positions are computed when triggers are created, but the
 * hero's pinned trigger is created later (post-hydration) and ScrollTrigger
 * credits pin-spacer distance to downstream triggers in CREATION order —
 * so every section trigger ends up ~2 viewport-heights early (parallax
 * frozen at its end state, reveals firing early). One shared, ref-counted
 * watcher re-sorts triggers into document order and refreshes whenever the
 * body height settles at a new value (pin spacer insertion, image loads).
 */
let watcherCount = 0;
let bodyObserver: ResizeObserver | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let lastBodyHeight = 0;

function watchBodyHeightForRefresh(): () => void {
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

export interface CollageCard {
  image?: { src: string; alt: string };
  video?: { src: string; poster: string };
}

interface CollageProps {
  cards: readonly CollageCard[];
  /** Which side of the section the collage sits on — mirrors the layout. */
  side: "left" | "right";
}

/** Card slots: big landscape bleeding past the outer edge, a portrait crop
 * overlapping it, a smaller landscape tucked low. `outer` = the side away
 * from the text column. */
const SLOTS: Array<{
  outer?: string;
  inner?: string;
  top?: string;
  bottom?: string;
  width: string;
  aspectRatio: string;
  zIndex: number;
}> = [
  { outer: "-8%", top: "0%", width: "66%", aspectRatio: "16 / 9", zIndex: 10 },
  { inner: "0%", top: "16%", width: "47%", aspectRatio: "3 / 4", zIndex: 20 },
  { outer: "8%", bottom: "10%", width: "58%", aspectRatio: "16 / 9", zIndex: 30 },
];

/**
 * Overlapping media collage in the GTA character-page style: 2-3 rounded
 * cards, offset vertically, bleeding past the viewport edge, drifting at
 * slightly different rates as the section scrolls (scrub-linked, so the
 * parallax reverses; skipped entirely under reduced motion).
 */
export function Collage({ cards, side }: CollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;
    const unwatch = watchBodyHeightForRefresh();
    const ctx = gsap.context(() => {
      const els = container.querySelectorAll<HTMLElement>("[data-collage-card]");
      els.forEach((el, i) => {
        const drift = 24 + i * 22;
        gsap.fromTo(
          el,
          { y: drift },
          {
            y: -drift,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, container);
    return () => {
      unwatch();
      ctx.revert();
    };
  }, [reducedMotion, cards.length]);

  return (
    <div ref={containerRef} className="relative h-95 sm:h-120 lg:h-150">
      {cards.slice(0, SLOTS.length).map((card, i) => {
        const slot = SLOTS[i];
        const style: React.CSSProperties = {
          position: "absolute",
          width: slot.width,
          aspectRatio: slot.aspectRatio,
          zIndex: slot.zIndex,
          top: slot.top,
          bottom: slot.bottom,
          [side === "right" ? "right" : "left"]: slot.outer,
          [side === "right" ? "left" : "right"]: slot.inner,
        };
        return (
          <div
            key={i}
            data-collage-card
            style={style}
            className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-foreground/10"
          >
            {card.video ? (
              <VideoBackground src={card.video.src} poster={card.video.poster} />
            ) : card.image ? (
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 70vw"
                className="object-cover"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
