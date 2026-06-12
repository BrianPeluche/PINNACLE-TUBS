"use client";

import Image from "next/image";
import { useRef } from "react";
import { StickySection } from "@/components/ui/StickySection";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { VideoBackground } from "@/lib/VideoBackground";
import { SectionIntro } from "./SectionIntro";

/**
 * Previously-unused jet footage as the anchored background (data/ is frozen
 * for this change, so the assignment lives here). The clip carries a stock
 * watermark; the pinned heading + brand wash form the full-bleed overlay
 * that obscures it. The photo grid rides up over the anchored footage.
 */
const GALLERY_VIDEO = {
  src: "/assets/shooting-water.mp4",
  poster: "/assets/shooting-water-poster.jpg",
};

export function Gallery() {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef);
  const copy = siteConfig.sections.gallery;

  return (
    <StickySection
      bgSlot={
        <>
          <VideoBackground src={GALLERY_VIDEO.src} poster={GALLERY_VIDEO.poster} />
          <div className="absolute inset-0 bg-background/45" aria-hidden="true" />
          <div className="relative flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="max-w-xl">
                <SectionIntro eyebrow={copy.eyebrow} title={copy.title} statement={copy.statement} />
              </div>
            </div>
          </div>
        </>
      }
    >
      <div ref={contentRef} className="mx-auto max-w-7xl px-6 pb-24">
        <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:grid-cols-3 sm:gap-4">
          {copy.photos.map((photo, i) => (
            <li
              key={photo.src}
              data-reveal
              data-reveal-delay={(i % 3) * 0.08}
              className={`relative overflow-hidden rounded-xl ${photo.portrait ? "row-span-2" : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </StickySection>
  );
}
