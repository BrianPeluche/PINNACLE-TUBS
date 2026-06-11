"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { useCrossfade } from "@/lib/useCrossfade";
import { useReveal } from "@/lib/useReveal";
import { SectionIntro } from "./SectionIntro";

/** Warranty & local service promise — simple text band. */
export function Warranty() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  useCrossfade(sectionRef);
  const copy = siteConfig.sections.warranty;

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionIntro eyebrow={copy.eyebrow} title={copy.title} statement={copy.statement} />
        <p data-reveal className="mt-8 text-lg leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
      </div>
    </section>
  );
}
