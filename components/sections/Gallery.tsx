"use client";

import { useRef } from "react";
import { ExpandableMediaGrid, type ExpandableMediaItem } from "@/components/ui/ExpandableMediaGrid";
import { useReveal } from "@/lib/useReveal";
import { SectionIntro } from "./SectionIntro";

const MEDIA_ITEMS: readonly ExpandableMediaItem[] = [
  {
    type: "video",
    src: "/assets/shooting-water.mp4",
    poster: "/assets/shooting-water-poster.jpg",
    title: "Jets on",
    kicker: "Water detail",
    description:
      "A close look at moving water and jet action, treated with a dark brand wash so the footage reads as Pinnacle ambience.",
    shape: "wide",
  },
  {
    type: "image",
    src: "/assets/dsc08332-web.jpg",
    alt: "Pinnacle Tubs storefront on Big Bear Blvd",
    title: "The Big Bear shop",
    kicker: "Visit us",
    description: "Our showroom sits on Big Bear Blvd, across from the lake.",
    shape: "wide",
  },
  {
    type: "image",
    src: "/assets/dsc08367-web.jpg",
    alt: "Pinnacle Tubs roadside sign at 41529 Big Bear Blvd",
    title: "Easy to find",
    kicker: "41529 Big Bear Blvd",
    description: "Sales, service, and repairs from one local address.",
    shape: "tall",
  },
  {
    type: "image",
    src: "/assets/dsc08340-web.jpg",
    alt: "Spa showroom display",
    title: "Walk the floor",
    kicker: "Showroom",
    description: "See current Cal Spas models in person before choosing the right fit.",
  },
  {
    type: "image",
    src: "/assets/dsc08376-web.jpg",
    alt: "Hot tub on display at the shop",
    title: "Built to compare",
    kicker: "On display",
    description: "Compare seating, jets, shell finishes, and cover systems in person.",
  },
  {
    type: "image",
    src: "/assets/dsc08342-web.jpg",
    alt: "Spa models lined up outside the showroom",
    title: "Current tubs",
    kicker: "Inventory",
    description: "Inventory changes with the season, so the best next step is to call or visit.",
    shape: "wide",
  },
  {
    type: "image",
    src: "/assets/dsc08664-web.jpg",
    alt: "Hot tub detail at the Pinnacle Tubs shop",
    title: "Finish details",
    kicker: "Close-up",
    description: "The small details are easier to judge when you can see the spa up close.",
  },
];

export function Gallery() {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef);

  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 sm:py-32">
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/30 to-transparent"
        aria-hidden="true"
      />
      <div ref={contentRef} className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end">
          <SectionIntro
            eyebrow="Media"
            title="See the shop up close"
            statement="Open a card for the full photo or video."
          />
          <p data-reveal className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:ml-auto">
            A polished look at the showroom, details, and water moments that make the
            post-intro story feel tactile instead of just informational.
          </p>
        </div>
        <div data-reveal>
          <ExpandableMediaGrid items={MEDIA_ITEMS} />
        </div>
      </div>
    </section>
  );
}
