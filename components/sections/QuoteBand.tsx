"use client";

import Image from "next/image";
import { useRef } from "react";
import { useCrossfade } from "@/lib/useCrossfade";
import { useReveal } from "@/lib/useReveal";

interface QuoteBandProps {
  text: string;
  image: { src: string; alt: string };
}

/** Full-bleed image band with a large overlaid quote line. */
export function QuoteBand({ text, image }: QuoteBandProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  useCrossfade(sectionRef);

  return (
    <section
      ref={sectionRef}
      // taller than before: the next section's overlap consumes the bottom
      // ~22svh of the image, so the visible band stays ~50svh
      className="relative mt-[-22svh] h-[70svh] min-h-100 overflow-hidden"
    >
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-background/30" aria-hidden="true" />
      <div className="relative flex h-full items-center justify-center px-6">
        <p
          data-reveal
          className="max-w-4xl text-center text-4xl font-extrabold uppercase leading-[0.95] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] sm:text-6xl"
        >
          {text}
        </p>
      </div>
    </section>
  );
}
