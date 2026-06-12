"use client";

import Image from "next/image";
import { useRef } from "react";
import { StickySection } from "@/components/ui/StickySection";
import { useReveal } from "@/lib/useReveal";

interface QuoteBandProps {
  text: string;
  image: { src: string; alt: string };
}

/** Full-bleed image pinned as a sticky background; the quote line rides up
 * over it in normal flow. */
export function QuoteBand({ text, image }: QuoteBandProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef);

  return (
    <StickySection
      background={
        <>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-background/30" aria-hidden="true" />
        </>
      }
    >
      <div ref={contentRef} className="flex min-h-svh items-center justify-center px-6">
        <p
          data-reveal
          className="max-w-4xl text-center text-4xl font-extrabold uppercase leading-[0.95] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] sm:text-6xl"
        >
          {text}
        </p>
      </div>
    </StickySection>
  );
}
