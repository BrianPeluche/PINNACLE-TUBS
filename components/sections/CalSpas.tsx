"use client";

import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { SectionHeading } from "./SectionHeading";

/** Cal Spas dealer story: photo + copy split layout. */
export function CalSpas() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const copy = siteConfig.sections.calspas;

  return (
    <section ref={sectionRef} className="bg-muted/30 py-24 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
          <p data-reveal className="mt-8 max-w-prose text-base leading-relaxed text-muted-foreground">
            {copy.body}
          </p>
        </div>
        <div data-reveal className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <Image
            src={copy.image.src}
            alt={copy.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
