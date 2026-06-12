"use client";

import Image from "next/image";
import { useRef } from "react";
import { StickySection } from "@/components/ui/StickySection";
import { useReveal } from "@/lib/useReveal";
import { VideoBackground } from "@/lib/VideoBackground";

interface QuoteBandProps {
  text: string;
  image: { src: string; alt: string };
}

/**
 * Previously-unused footage assigned to a band, keyed by the band's image
 * (data/ and app/ are frozen for this change, so the mapping lives here).
 * The clip carries a stock watermark; the quote headline + brand wash are
 * the full-bleed overlay that obscures it.
 */
const BAND_VIDEOS: Record<string, { src: string; poster: string }> = {
  "/assets/dsc01679-web.jpg": {
    src: "/assets/opening-tub.mp4",
    poster: "/assets/opening-tub-poster.jpg",
  },
};

/** Full-bleed media pinned as a sticky background; the quote line rides up
 * over it in normal flow. */
export function QuoteBand({ text, image }: QuoteBandProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef);
  const video = BAND_VIDEOS[image.src];

  return (
    <StickySection
      bgSlot={
        <>
          {video ? (
            <VideoBackground src={video.src} poster={video.poster} />
          ) : (
            <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
          )}
          <div
            className={`absolute inset-0 ${video ? "bg-background/40" : "bg-background/30"}`}
            aria-hidden="true"
          />
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
