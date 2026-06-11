"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { SectionHeading } from "./SectionHeading";

/** Warranty & local service promise — simple text band. */
export function Warranty() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const copy = siteConfig.sections.warranty;

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
        <p data-reveal className="mt-8 text-lg leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
      </div>
    </section>
  );
}
