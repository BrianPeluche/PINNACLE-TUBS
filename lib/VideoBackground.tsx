"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useHydrated } from "@/lib/useHydrated";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Full-bleed looping background video for content sections, carrying the
 * hero's hard-won iOS lessons in one shared place:
 * - cover-crop frame computed from this component's own measured box
 *   (object-fit on <video> is unreliable on iOS Safari; Tailwind preflight
 *   clamps video widths), single geometry source per instance;
 * - plays only while in the viewport (IntersectionObserver) and ships with
 *   preload="none", so off-screen videos never download or decode;
 * - if autoplay is refused (iOS pre-gesture), retries once on the first
 *   touch/scroll;
 * - reduced motion / pre-hydration renders only the poster image.
 */
interface VideoBackgroundProps {
  src: string;
  poster: string;
  /** Intrinsic media aspect (width/height) of the video file. */
  aspect?: number;
}

interface BoxSize {
  width: number;
  height: number;
}

export function VideoBackground({ src, poster, aspect = 16 / 9 }: VideoBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [box, setBox] = useState<BoxSize>({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();
  // The video mounts only once the box is measured (the cover frame needs
  // it), so the play/pause effect must key on the same combined condition —
  // keying on showVideo alone would run before the <video> exists and never
  // re-run.
  const showVideo = useHydrated() && !reducedMotion;
  const videoMounted = showVideo && box.width > 0;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      const next = { width: Math.round(r.width), height: Math.round(r.height) };
      setBox((prev) =>
        prev.width === next.width && prev.height === next.height ? prev : next,
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!videoMounted) return;
    const el = wrapperRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    let inView = false;
    let removeGestureRetry: (() => void) | null = null;
    const tryPlay = () => {
      video.play().catch(() => {
        if (removeGestureRetry) return;
        const retry = () => {
          remove();
          if (inView) video.play().catch(() => {});
        };
        const remove = () => {
          window.removeEventListener("touchstart", retry);
          window.removeEventListener("scroll", retry);
          removeGestureRetry = null;
        };
        window.addEventListener("touchstart", retry, { passive: true });
        window.addEventListener("scroll", retry, { passive: true });
        removeGestureRetry = remove;
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) tryPlay();
        else video.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      removeGestureRetry?.();
      video.pause();
    };
  }, [videoMounted, src]);

  // Explicit cover frame for the video only; <img> object-cover is reliable.
  const coverStyle: CSSProperties | undefined =
    box.width > 0
      ? (() => {
          const w = Math.max(box.width, box.height * aspect);
          const h = Math.max(box.height, box.width / aspect);
          return {
            position: "absolute",
            width: w,
            height: h,
            left: (box.width - w) / 2,
            top: (box.height - h) / 2,
            maxWidth: "none",
            objectFit: "cover",
          };
        })()
      : undefined;

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
      {videoMounted && coverStyle && (
        <video
          ref={videoRef}
          style={coverStyle}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          preload="none"
        />
      )}
    </div>
  );
}
