"use client";

import { useRef } from "react";
import { ExpandableImageCard } from "@/components/ui/ExpandableImageCard";
import { useReveal } from "@/lib/useReveal";
import { ScrubSection } from "./ScrubSection";

/**
 * Second new link in the cinematic chain: an underwater-bubbles title card
 * (blur in/out like the relaxation line) overlapping down into a calm
 * editorial block that carries the What's Included / ozone / warranty copy.
 * The editorial rises into the card's pin tail (the GTA Jason overlap) so
 * the dark handoff has no dead frame and no seam. Copy/assets live here
 * because data/site.ts is frozen for this change. Plain wording, no dashes.
 */
const VIDEO = {
  src: "/assets/underwater-bubbles-scrub.mp4",
  poster: "/assets/underwater-bubbles-poster.jpg",
};

const BLOCKS = [
  {
    heading: "What's Included",
    body: ["Every Pinnacle tub comes with what you need to get started. Each one includes an ASTM approved cover, steps, a cover lifter bar, and an ozone generator."],
  },
  {
    heading: "Why ozone matters",
    body: [
      "Ozone works alongside your regular sanitizer, like chlorine or bromine, to kill bacteria, germs, and viruses. Because it does some of the work for you, you need less sanitizer. That saves money over time and makes the water gentler for anyone sensitive to chemicals.",
      "Ozone also breaks down the things you do not want in the water, and it helps tiny particles group together so your filter can catch them. The result is cleaner, clearer water that feels soft on your skin.",
    ],
  },
  {
    heading: "Warranty information",
    body: [
      "We stand behind how every tub is built. The acrylic, shell, frame, and cabinet are covered for 10 years against damage from faulty workmanship during production.",
      "The equipment is covered for 5 years. That includes the control box, heater, pumps, and the digital topside panel.",
      "Damage from chemicals or acid is not covered, because that is not a defect in the part.",
    ],
  },
] as const;

const PHOTOS = [
  { src: "/assets/img3521-web.jpg", alt: "Cal Spas shells in production on the factory floor" },
  { src: "/assets/dsc08342-web.jpg", alt: "A showroom tub with steps and a cover lifter ready to go" },
  { src: "/assets/dsc01682-web.jpg", alt: "Close-up of a running Cal Spas tub with the brand badge" },
  { src: "/assets/img2689-web.jpg", alt: "A truckload of new Pinnacle tubs ready for delivery" },
] as const;

export function IncludedWarranty() {
  const editorialRef = useRef<HTMLElement>(null);
  useReveal(editorialRef);

  return (
    <>
      <ScrubSection
        video={VIDEO}
        overlay="none"
        centered
        eyebrow="What's included"
        title="Everything you need, built in"
      />
      <section
        ref={editorialRef}
        className="relative z-10 mt-[-15vh] bg-background py-24 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="space-y-10">
            {BLOCKS.map((block) => (
              <div key={block.heading} data-reveal>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight text-foreground sm:text-3xl">
                  {block.heading}
                </h3>
                {block.body.map((p) => (
                  <p key={p} className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div data-reveal>
              <ExpandableImageCard src={PHOTOS[0].src} alt={PHOTOS[0].alt} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div data-reveal data-reveal-delay="0.1">
                <ExpandableImageCard
                  src={PHOTOS[1].src}
                  alt={PHOTOS[1].alt}
                  aspectClassName="aspect-[4/3]"
                />
              </div>
              <div data-reveal data-reveal-delay="0.2">
                <ExpandableImageCard
                  src={PHOTOS[2].src}
                  alt={PHOTOS[2].alt}
                  aspectClassName="aspect-[4/3]"
                />
              </div>
            </div>
            <div data-reveal>
              <ExpandableImageCard src={PHOTOS[3].src} alt={PHOTOS[3].alt} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
