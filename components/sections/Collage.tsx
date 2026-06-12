"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { watchBodyHeightForRefresh } from "@/lib/scrollRefresh";
import { VideoBackground } from "@/lib/VideoBackground";

export interface CollageCard {
  image?: { src: string; alt: string };
  video?: { src: string; poster: string };
  label?: string;
  description?: string;
}

interface CollageProps {
  cards: readonly CollageCard[];
  /** Which side of the section the collage sits on — mirrors the layout. */
  side: "left" | "right";
  /** Scroll-drift on the cards. Disable inside sticky backgrounds, where
   * trigger geometry is unreliable and the foreground provides the motion. */
  parallax?: boolean;
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
export function Collage({ cards, side, parallax = true }: CollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !parallax) return;
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
  }, [reducedMotion, parallax, cards.length]);

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
            className="group overflow-hidden rounded-lg bg-muted shadow-2xl ring-1 ring-foreground/10"
          >
            {card.video ? (
              <>
                <VideoBackground
                  src={card.video.src}
                  poster={card.video.poster}
                  sizes="(min-width: 1024px) 40vw, 80vw"
                />
                <div className="absolute inset-0 bg-background/35" aria-hidden="true" />
                <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/20 to-transparent" />
              </>
            ) : card.image ? (
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 70vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : null}
            {(card.label || card.description) && (
              <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-background/90 to-transparent p-4">
                {card.label && (
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                    {card.label}
                  </p>
                )}
                {card.description && (
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {card.description}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
