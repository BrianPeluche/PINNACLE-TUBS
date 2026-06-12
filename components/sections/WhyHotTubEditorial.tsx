"use client";

import Image from "next/image";
import { useRef } from "react";
import { ExpandableImageCard } from "@/components/ui/ExpandableImageCard";
import { useReveal } from "@/lib/useReveal";
import { SectionIntro } from "./SectionIntro";

/**
 * Phase-1 editorial section (the Pinnacle take on the GTA Jason layout):
 * the Benefits scrub fades out via its timeline tail and this section
 * arrives — narrow text column with a big display heading and accent
 * statement, opposite large editorial photo cards. Landscape cards carry
 * the pale-yellow border + lightbox; the portrait shot stays static.
 * Copy and photo picks live here because data/site.ts is frozen for this
 * change (move into data/ when it unfreezes).
 */
const COPY = {
  eyebrow: "Why buy a hot tub",
  title: "Feel better, every day",
  statement:
    "Warm water, big results: less stress, faster recovery, deeper sleep — all winter long in Big Bear.",
  body: "There's a reason every good day on the mountain ends in hot water. Twenty minutes at 102° loosens what the slopes tightened, quiets what the day stirred up, and sets you up to sleep like the lake at midnight.",
  points: [
    "After the slopes — jets work backs, shoulders, and legs",
    "Before bed — the warm-up and cool-down cue deeper sleep",
    "All season — snow on the deck, steam off the water",
  ],
} as const;

const LANDSCAPE_PHOTOS = [
  { src: "/assets/b97a85c5-web.jpg", alt: "Hot tub on a covered deck under a pink dusk sky" },
  { src: "/assets/1d0564e1-web.jpg", alt: "New spa installed on a backyard patio in the pines" },
  { src: "/assets/img3826-web.jpg", alt: "Close-up of jets churning warm water at dusk" },
  { src: "/assets/img1978-web.jpg", alt: "Overhead close-up of a running spa on a cabin deck" },
  { src: "/assets/3070473c-web.jpg", alt: "Installed spa with cover lifter on a stone patio" },
] as const;

const PORTRAIT_PHOTOS = [
  { src: "/assets/dsc01673-web.jpg", alt: "Freshly delivered hot tub on a Big Bear deck" },
  { src: "/assets/dsc08488-web.jpg", alt: "Close-up of water-care treatment poured tub-side" },
] as const;

export function WhyHotTubEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionIntro eyebrow={COPY.eyebrow} title={COPY.title} statement={COPY.statement} />
          <p data-reveal className="mt-8 text-base leading-relaxed text-muted-foreground">
            {COPY.body}
          </p>
          <ul data-reveal className="mt-6 space-y-3 text-base text-muted-foreground">
            {COPY.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 text-xs text-accent">
                  ◆
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div data-reveal>
            <ExpandableImageCard src={LANDSCAPE_PHOTOS[0].src} alt={LANDSCAPE_PHOTOS[0].alt} />
          </div>
          <div className="grid gap-6 sm:grid-cols-[3fr_2fr] sm:gap-8">
            <div data-reveal data-reveal-delay="0.1">
              <ExpandableImageCard
                src={LANDSCAPE_PHOTOS[1].src}
                alt={LANDSCAPE_PHOTOS[1].alt}
                aspectClassName="aspect-[4/3]"
              />
            </div>
            {/* portraits: static, no border, no lightbox */}
            <div data-reveal data-reveal-delay="0.2" className="relative hidden overflow-hidden sm:block">
              <Image
                src={PORTRAIT_PHOTOS[0].src}
                alt={PORTRAIT_PHOTOS[0].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div data-reveal>
            <ExpandableImageCard src={LANDSCAPE_PHOTOS[2].src} alt={LANDSCAPE_PHOTOS[2].alt} />
          </div>
          {/* close-up row mirrors row two (portrait leads) so the stack
              alternates instead of reading as a grid */}
          <div className="grid gap-6 sm:grid-cols-[2fr_3fr] sm:gap-8">
            <div data-reveal className="relative hidden overflow-hidden sm:block">
              <Image
                src={PORTRAIT_PHOTOS[1].src}
                alt={PORTRAIT_PHOTOS[1].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
            <div data-reveal data-reveal-delay="0.1">
              <ExpandableImageCard
                src={LANDSCAPE_PHOTOS[3].src}
                alt={LANDSCAPE_PHOTOS[3].alt}
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
          <div data-reveal>
            <ExpandableImageCard src={LANDSCAPE_PHOTOS[4].src} alt={LANDSCAPE_PHOTOS[4].alt} />
          </div>
        </div>
      </div>
    </section>
  );
}
