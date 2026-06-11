"use client";

import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { SectionHeading } from "./SectionHeading";

/** Photo grid of the shop and showroom, mixed landscape/portrait. */
export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const copy = siteConfig.sections.gallery;

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
        <ul className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:grid-cols-3 sm:gap-4">
          {copy.photos.map((photo, i) => (
            <li
              key={photo.src}
              data-reveal
              data-reveal-delay={(i % 3) * 0.08}
              className={`relative overflow-hidden rounded-lg ${photo.portrait ? "row-span-2" : ""}`}
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
    </section>
  );
}
