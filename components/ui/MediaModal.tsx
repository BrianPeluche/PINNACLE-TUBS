"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MediaModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const EXIT_MS = 300;

/** Full-screen lightbox: Escape closes, backdrop click closes, image fits
 * the viewport without cropping. Fades + scales in on open and out on close
 * (CSS transitions only) so the expand doesn't pop in abruptly. */
export function MediaModal({ src, alt, onClose }: MediaModalProps) {
  // false until the first frame after mount (enter), and back to false during
  // the exit; the element unmounts (via onClose) only after the exit plays.
  const [show, setShow] = useState(false);

  const requestClose = useCallback(() => {
    setShow(false);
    window.setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  // enter after the initial (opacity-0 / scaled) state has painted — a double
  // rAF guarantees the browser commits that frame first, so the transition
  // actually runs instead of snapping straight to the open state.
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setShow(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  // escape to close + lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [requestClose]);

  // Portal to <body>: ancestors carry reveal-animation transforms, which
  // would otherwise become the containing block for position:fixed and trap
  // the lightbox inside the card.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className={`fixed inset-0 z-60 flex items-center justify-center bg-background/95 p-4 transition-opacity duration-300 ease-out sm:p-10 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={requestClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={requestClose}
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-foreground/10 text-2xl leading-none text-foreground transition-colors hover:bg-foreground/25"
      >
        ×
      </button>
      <div
        className={`relative size-full max-w-6xl transition-all duration-300 ease-out ${
          show ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
      </div>
    </div>,
    document.body,
  );
}
