"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useHydrated } from "@/lib/useHydrated";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrollScrub, type ScrubTimeline } from "@/lib/useScrollScrub";
import { useVideoUnlock } from "@/lib/useVideoUnlock";
import { SectionIntro } from "./SectionIntro";

const MEDIA_ASPECT = 16 / 9;
const PIN_VIEWPORTS = 1.5;

interface ScrubSectionProps {
  eyebrow: string;
  title: string;
  statement?: string;
  video: { src: string; poster: string };
  children: ReactNode;
}

/**
 * GTA "video bridge" section: full-bleed footage scrubbed by scroll while
 * the section pins for PIN_VIEWPORTS. Content fades up as the pin starts and
 * dims at the end — all segments of the same scrubbed timeline as the
 * footage, so everything reverses together. The video is preload="none" and
 * only starts loading when the section approaches the viewport; reduced
 * motion gets the static poster, no pin, content fully visible.
 */
export function ScrubSection({ eyebrow, title, statement, video, children }: ScrubSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  // true once the section approaches the viewport and the video may load
  const [armed, setArmed] = useState(false);
  const reducedMotion = useReducedMotion();
  const enabled = useHydrated() && !reducedMotion;
  const videoMounted = enabled && box.width > 0;

  // Unlock only once the video is allowed to load — a page-top gesture must
  // not trigger play() (and thus a download) on far-off preload="none" videos.
  useVideoUnlock(videoRef, armed);

  // single geometry source: the section's own rendered box
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      const next = { width: Math.round(r.width), height: Math.round(r.height) };
      setBox((p) => (p.width === next.width && p.height === next.height ? p : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // lazy buffer: off-screen scrub videos must never download
  useEffect(() => {
    if (!videoMounted) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoMounted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!armed || !v) return;
    v.preload = "auto";
    v.load();
  }, [armed]);

  const build = useCallback((tl: ScrubTimeline) => {
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, ease: "none", duration: 0.15 },
      0,
    );
    tl.to(contentRef.current, { opacity: 0.25, y: -18, ease: "none", duration: 0.12 }, 0.88);
  }, []);

  // keyed on videoMounted, not `enabled`: the <video> mounts only after the
  // box is measured, and the pin/timeline must build after the element exists
  useScrollScrub({ sectionRef, videoRef, enabled: videoMounted, pinViewports: PIN_VIEWPORTS, build });

  const coverStyle: CSSProperties | undefined =
    box.width > 0
      ? (() => {
          const w = Math.max(box.width, box.height * MEDIA_ASPECT);
          const h = Math.max(box.height, box.width / MEDIA_ASPECT);
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
    <section ref={sectionRef} className="relative h-svh overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image src={video.poster} alt="" fill sizes="100vw" className="object-cover" />
        {videoMounted && coverStyle && (
          <video
            ref={videoRef}
            style={coverStyle}
            src={video.src}
            poster={video.poster}
            muted
            playsInline
            preload="none"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-background/65" aria-hidden="true" />
      <div ref={contentRef} className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-xl">
            <SectionIntro eyebrow={eyebrow} title={title} statement={statement} />
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
