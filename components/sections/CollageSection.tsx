"use client";

import { useRef, type ReactNode } from "react";
import { StickySection } from "@/components/ui/StickySection";
import { useReveal } from "@/lib/useReveal";
import { Collage, type CollageCard } from "./Collage";
import { SectionIntro } from "./SectionIntro";

interface CollageSectionProps {
  eyebrow: string;
  title: string;
  statement?: string;
  cards: readonly CollageCard[];
  /** Which side the collage leans toward; the text column rides opposite. */
  collageSide?: "left" | "right";
  /** Body copy / lists / CTAs, rendered in the text column. */
  children: ReactNode;
}

/**
 * GTA character-section layout on the sticky architecture: the collage is
 * the pinned background art; the text column scrolls up over it with a
 * radial dark backdrop for legibility (the reference sites' .jason-content
 * treatment). Collage parallax is off here — the foreground's motion over
 * the pinned art provides the depth.
 */
export function CollageSection({
  eyebrow,
  title,
  statement,
  cards,
  collageSide = "right",
  children,
}: CollageSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef);

  return (
    <StickySection
      bgSlot={
        <div className="flex h-full items-center overflow-x-clip px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className={`lg:w-2/3 ${collageSide === "left" ? "" : "lg:ml-auto"}`}>
              <Collage cards={cards} side={collageSide} parallax={false} />
            </div>
          </div>
        </div>
      }
    >
      <div ref={contentRef} className="mx-auto flex min-h-svh w-full max-w-7xl items-center px-6">
        <div
          className={`max-w-xl p-8 sm:p-12 ${collageSide === "left" ? "lg:ml-auto" : ""}`}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,12,0.92) 35%, rgba(10,10,12,0) 78%)",
          }}
        >
          <SectionIntro eyebrow={eyebrow} title={title} statement={statement} />
          <div data-reveal className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </StickySection>
  );
}
