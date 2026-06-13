"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaModal } from "./MediaModal";

// Same tight warm GTA-VI sweep as the CalSpa logo / Get-in-Touch title,
// mirrored so the scroll-driven position shift travels and returns smoothly.
// Its background-position is animated by lib/useScrollGradient in the owning
// section (selects [data-gradient-ring]).
const RING_GRADIENT =
  "linear-gradient(90deg, #160f24, #351236, #6d1d45, #b73555, #e8684a, #f5b64f, #e8684a, #b73555, #6d1d45, #351236, #160f24)";

interface ExpandableImageCardProps {
  src: string;
  alt: string;
  /** Aspect class for the framed area — landscape (default aspect-video)
   * or portrait (e.g. aspect-[2/3]) both work; the lightbox letterboxes
   * either orientation with object-contain. */
  aspectClassName?: string;
  /** Opt-in GTA-style hover: no border at rest (just the photo), and on hover
   * the photo insets while the warm CalSpa scroll-gradient ring appears around
   * it. Defaults to the original pale-cream border (used by Contact and What's
   * Included), which is left unchanged. */
  gradientHover?: boolean;
}

/**
 * GTA-style editorial photo card. Default variant: the pale-cream frame is
 * barely-there at rest and commits on hover/keyboard focus while the photo
 * scales down. gradientHover variant: borderless at rest, with a scroll-driven
 * warm gradient ring that appears as the photo insets on hover. Click opens a
 * full-screen lightbox (MediaModal).
 */
export function ExpandableImageCard({
  src,
  alt,
  aspectClassName = "aspect-video",
  gradientHover = false,
}: ExpandableImageCardProps) {
  const [open, setOpen] = useState(false);

  const expandIcon = (
    <span
      aria-hidden="true"
      className="absolute bottom-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-background/70 text-sm text-foreground opacity-80 transition-opacity group-hover:opacity-100"
    >
      ⤢
    </span>
  );

  if (gradientHover) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Expand photo: ${alt}`}
          className="group relative block w-full cursor-zoom-in bg-background p-1.5 outline-none sm:p-2"
        >
          {/* Warm gradient ring: hidden at rest (so the card reads as just the
              photo on the dark page), fades in on hover/focus. The inset photo
              reveals it around its edges; background-position is scrubbed by
              scroll (see useScrollGradient), reversing on scroll-up. */}
          <span
            data-gradient-ring
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{
              backgroundImage: RING_GRADIENT,
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 50%",
            }}
          />
          {/* The photo scales down on hover/focus so the ring shows around it
              (the GTA inset feel); its own dark bg keeps the rest state clean. */}
          <span
            className={`relative block w-full overflow-hidden bg-background transition-transform duration-500 ease-out group-hover:scale-[0.97] group-focus-visible:scale-[0.97] ${aspectClassName}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </span>
          {expandIcon}
        </button>
        {open && <MediaModal src={src} alt={alt} onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand photo: ${alt}`}
        className="group relative block w-full cursor-zoom-in border-2 border-[#f3ecd0]/15 bg-background p-1.5 outline-none transition-colors duration-300 hover:border-[#f3ecd0] focus-visible:border-[#f3ecd0] sm:p-2"
      >
        <span className={`relative block w-full overflow-hidden ${aspectClassName}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[0.96] group-focus-visible:scale-[0.96]"
          />
        </span>
        {expandIcon}
      </button>
      {open && <MediaModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
