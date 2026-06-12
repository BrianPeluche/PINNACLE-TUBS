"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import type { ExpandableMediaItem } from "./ExpandableMediaGrid";

interface MediaModalProps {
  item: ExpandableMediaItem;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, video[controls], [tabindex]:not([tabindex="-1"])';

export function MediaModal({ item, onClose }: MediaModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[calc(100svh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-foreground/15 bg-background shadow-2xl sm:max-h-[calc(100svh-3rem)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3 sm:px-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {item.kicker}
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-extrabold uppercase leading-tight sm:text-2xl">
              {item.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close expanded media"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-foreground/20 bg-foreground text-background transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:p-5">
          <div className="relative min-h-[42svh] overflow-hidden rounded-lg bg-muted sm:min-h-[58svh]">
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                playsInline
                muted
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>

          <div className="flex flex-col justify-end gap-4 overflow-y-auto">
            <p className="text-base leading-relaxed text-muted-foreground">{item.description}</p>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/70">
              Pinnacle Tubs · Big Bear Lake
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
