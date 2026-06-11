"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

interface QuoteBandProps {
  text: string;
  image: { src: string; alt: string };
}

/** Full-bleed image band with a large overlaid quote line. */
export function QuoteBand({ text, image }: QuoteBandProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative h-[55vh] min-h-[400px] overflow-hidden">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-background/50" aria-hidden="true" />
      <div className="relative flex h-full items-center justify-center px-6">
        <p
          data-reveal
          className="max-w-4xl text-center text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl"
        >
          {text}
        </p>
      </div>
    </section>
  );
}
