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
}

/**
 * The single editorial photo card, shared by Why-buy, What's Included /
 * Warranty, and Contact so all three stay identical and can't drift:
 * no visible border at rest (just the photo), then a thin solid #FFF8CC border
 * on hover/keyboard focus while the photo insets slightly. The expand button
 * warms to #FFF8CC to match. Click opens a full-screen lightbox (MediaModal).
 */
export function ExpandableImageCard({
  src,
  alt,
  aspectClassName = "aspect-video",
}: ExpandableImageCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand photo: ${alt}`}
        // 1.5px border (~40% thicker than the prior 1px; 1.4px device-rounds
        // back to 1px on 2x displays, so 1.5px is the closest clean value that
        // reliably renders thicker). Transparent at rest (no visible border,
        // just the photo) and #FFF8CC on hover/focus — a thin premium frame.
        // border-box + an always-present border = no layout shift on hover.
        className="group relative block w-full cursor-zoom-in border-[1.5px] border-transparent bg-background outline-none transition-colors duration-300 hover:border-[#FFF8CC] focus-visible:border-[#FFF8CC]"
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
