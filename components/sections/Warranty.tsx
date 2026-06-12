"use client";

import { siteConfig } from "@/data/site";
import { CollageSection } from "./CollageSection";

const SERVICE_CARDS = [
  {
    video: {
      src: "/assets/opening-tub.mp4",
      poster: "/assets/opening-tub-poster.jpg",
    },
    label: "Delivered here",
    description: "Local setup, placement, and walkthrough from the same shop that sells the spa.",
  },
  {
    image: {
      src: "/assets/15724F57-7274-4D86-9298-529EA2ADDE07.jpg",
      alt: "Pinnacle Tubs technician servicing a hot tub overlooking Big Bear Lake",
    },
    label: "Serviced here",
  },
  {
    image: {
      src: "/assets/dsc08332-web.jpg",
      alt: "Pinnacle Tubs storefront on Big Bear Blvd",
    },
    label: "Big Bear shop",
  },
] as const;

/** Lucia-style editorial section: media-left, text-right, local service promise. */
export function Warranty() {
  const copy = siteConfig.sections.warranty;

  return (
    <CollageSection
      eyebrow={copy.eyebrow}
      title={copy.title}
      statement={copy.statement}
      cards={SERVICE_CARDS}
      collageSide="left"
    >
      <p>{copy.body}</p>
      <div className="grid gap-3 pt-4 text-sm sm:grid-cols-2">
        {[
          "Delivery and placement by local crews",
          "Setup guidance before the first soak",
          "Manufacturer warranty handled through our shop",
          "Service and repairs without third-party call centers",
        ].map((item) => (
          <p key={item} className="border-l border-accent/50 pl-4 text-muted-foreground">
            {item}
          </p>
        ))}
      </div>
    </CollageSection>
  );
}
