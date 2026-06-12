"use client";

import Image from "next/image";
import { useRef } from "react";
import { StickySection } from "@/components/ui/StickySection";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { SectionIntro } from "./SectionIntro";

/** The section heading pins as the sticky background; the photo grid rides
 * up over it. */
export function Gallery() {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef);
  const copy = siteConfig.sections.gallery;

  return (
    <StickySection
      background={
        <div className="flex h-full items-center bg-background">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-xl">
              <SectionIntro eyebrow={copy.eyebrow} title={copy.title} statement={copy.statement} />
            </div>
          </div>
        </div>
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
