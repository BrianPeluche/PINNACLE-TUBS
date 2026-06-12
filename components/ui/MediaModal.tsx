"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface MediaModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/** Full-screen lightbox: Escape closes, backdrop click closes, image fits
 * the viewport without cropping. */
export function MediaModal({ src, alt, onClose }: MediaModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Portal to <body>: ancestors carry reveal-animation transforms, which
  // would otherwise become the containing block for position:fixed and trap
  // the lightbox inside the card.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-60 flex items-center justify-center bg-background/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-foreground/10 text-2xl leading-none text-foreground transition-colors hover:bg-foreground/25"
      >
        ×
      </button>
      <div className="relative size-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
      </div>
    </div>,
    document.body,
  );
}
