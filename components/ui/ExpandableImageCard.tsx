"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaModal } from "./MediaModal";

interface ExpandableImageCardProps {
  src: string;
  alt: string;
  /** Aspect class for the framed area — landscape (default aspect-video)
   * or portrait (e.g. aspect-[2/3]) both work; the lightbox letterboxes
   * either orientation with object-contain. */
  aspectClassName?: string;
  /** Opt-in hover treatment: no border at rest (just the photo), then a very
   * thin solid #FFF8CC border appears on hover/focus while the photo insets.
   * Defaults to the original pale-cream border (used by Contact and What's
   * Included), which is left unchanged. */
  gradientHover?: boolean;
}

/**
 * GTA-style editorial photo card. Default variant: the pale-cream frame is
 * barely-there at rest and commits on hover/keyboard focus while the photo
 * scales down. gradientHover variant: borderless at rest, with a very thin
 * solid #FFF8CC border that appears as the photo insets on hover. Click opens
 * a full-screen lightbox (MediaModal).
 */
export function ExpandableImageCard({
  src,
  alt,
  aspectClassName = "aspect-video",
  gradientHover = false,
}: ExpandableImageCardProps) {
  const [open, setOpen] = useState(false);

  if (gradientHover) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Expand photo: ${alt}`}
          // 1px border, transparent at rest (no border, just the photo) and
          // #FFF8CC on hover/focus — a very thin premium frame. border-box +
          // always-present border = no layout shift when the color appears.
          className="group relative block w-full cursor-zoom-in border border-transparent bg-background outline-none transition-colors duration-300 hover:border-[#FFF8CC] focus-visible:border-[#FFF8CC]"
        >
          <span className={`relative block w-full overflow-hidden bg-background ${aspectClassName}`}>
            {/* photo insets on hover/focus, revealing a hair of dark inside the
                thin border (the GTA inset feel) */}
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[0.97] group-focus-visible:scale-[0.97]"
            />
          </span>
          {/* Expand affordance: turns #FFF8CC on card hover/focus to match the
              border (dark glyph stays legible on the light fill). */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-background/70 text-sm text-foreground opacity-80 transition-colors duration-300 group-hover:bg-[#FFF8CC] group-hover:text-background group-hover:opacity-100 group-focus-visible:bg-[#FFF8CC] group-focus-visible:text-background group-focus-visible:opacity-100"
          >
            ⤢
          </span>
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
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-background/70 text-sm text-foreground opacity-80 transition-opacity group-hover:opacity-100"
        >
          ⤢
        </span>
      </button>
      {open && <MediaModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
