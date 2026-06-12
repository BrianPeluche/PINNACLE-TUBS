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
 * GTA-style editorial photo card: the pale-yellow frame is barely-there at
 * rest and commits on hover/keyboard focus, while the photo scales slightly
 * down so the frame shows around it. Click opens a full-screen lightbox
 * (MediaModal).
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
          className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full bg-background/70 text-sm text-foreground opacity-80 transition-opacity group-hover:opacity-100"
        >
          ⤢
        </span>
      </button>
      {open && <MediaModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
