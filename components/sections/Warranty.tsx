"use client";

import { useRef } from "react";
import { StickySection } from "@/components/ui/StickySection";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { SectionIntro } from "./SectionIntro";

/** Pinned headline background; the promise copy rides up over it. */
export function Warranty() {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef);
  const copy = siteConfig.sections.warranty;

  return (
    <StickySection
      bgSlot={
        <div className="flex h-full items-center bg-background">
          <div className="mx-auto w-full max-w-4xl px-6">
            <SectionIntro eyebrow={copy.eyebrow} title={copy.title} statement={copy.statement} />
          </div>
        </div>
      }
    >
      <div ref={contentRef} className="mx-auto flex min-h-svh max-w-4xl items-center px-6">
        <p
          data-reveal
          className="p-8 text-lg leading-relaxed text-muted-foreground sm:p-12"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,12,0.92) 35%, rgba(10,10,12,0) 78%)",
          }}
        >
          {copy.body}
        </p>
      </div>
    </StickySection>
  );
}
