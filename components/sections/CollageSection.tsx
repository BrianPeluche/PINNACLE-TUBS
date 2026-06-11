"use client";

import { useRef, type ReactNode } from "react";
import { useCrossfade } from "@/lib/useCrossfade";
import { useReveal } from "@/lib/useReveal";
import { Collage, type CollageCard } from "./Collage";
import { SectionIntro } from "./SectionIntro";

interface CollageSectionProps {
  eyebrow: string;
  title: string;
  statement?: string;
  cards: readonly CollageCard[];
  /** Which side the collage sits on. Alternate per section. */
  collageSide?: "left" | "right";
  /** Body copy / lists / CTAs, rendered in the text column. */
  children: ReactNode;
}

/**
 * GTA character-page section layout: narrow text column (~1/3) with
 * eyebrow + display headline + statement + body, opposite an overlapping
 * media collage. On mobile the text stacks first, collage clusters below.
 * overflow-x-clip contains the collage's edge bleed.
 */
export function CollageSection({
  eyebrow,
  title,
  statement,
  cards,
  collageSide = "right",
  children,
}: CollageSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  useCrossfade(sectionRef);

  return (
    <section ref={sectionRef} className="overflow-x-clip bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
        <div className={collageSide === "left" ? "lg:order-2 lg:col-span-4" : "lg:col-span-4"}>
          <SectionIntro eyebrow={eyebrow} title={title} statement={statement} />
          <div data-reveal className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
        <div className={collageSide === "left" ? "lg:order-1 lg:col-span-8" : "lg:col-span-8"}>
          <Collage cards={cards} side={collageSide} />
        </div>
      </div>
    </section>
  );
}
