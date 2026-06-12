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
  /** Omit eyebrow/title/children for a pure cinematic bridge: footage only,
   * no text column, no legibility gradient (the GTA FirstVideo pattern). */
  eyebrow?: string;
  title?: string;
  statement?: string;
  video: { src: string; poster: string };
  /** "light" keeps the footage brighter (thinner wash + gradient) for
   * sections where the water should read clearly; "none" drops the flat
   * wash entirely for clean (watermark-free) footage while keeping the
   * dark entrance veil; default is "standard". */
  overlay?: "standard" | "light" | "none";
  children?: ReactNode;
}

/**
 * GTA "video bridge" section: full-bleed footage scrubbed by scroll while
 * the section pins for PIN_VIEWPORTS. Content (when present) fades up as the
 * pin starts and dims at the end — all segments of the same scrubbed
 * timeline as the footage, so everything reverses together. The video is
 * preload="none" and only starts loading when the section approaches the
 * viewport; reduced motion gets the static poster, no pin, content fully
 * visible.
 */
export function ScrubSection({
  eyebrow,
  title,
  statement,
  video,
  overlay = "standard",
  children,
}: ScrubSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const entranceVeilRef = useRef<HTMLDivElement>(null);
  const exitVeilRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  // true once the section approaches the viewport and the video may load
  const [armed, setArmed] = useState(false);
  const reducedMotion = useReducedMotion();
  const enabled = useHydrated() && !reducedMotion;
  const videoMounted = enabled && box.width > 0;

  // Unlock only once the video is allowed to load — a page-top gesture must
  // not trigger play() (and thus a download) on far-off preload="none" videos.
  useVideoUnlock(videoRef, armed);

  const entranceVeilOpacity = overlay === "none" ? 1 : 0.65;

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
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, ease: "none", duration: 0.15 },
        0,
      );
      tl.to(contentRef.current, { opacity: 0.35, y: -18, ease: "none", duration: 0.12 }, 0.88);
    }
    // Entrance veil (light/none overlays): the section slides up under the
    // previous pin BEFORE its own pin starts, so a thin wash would bleed
    // bright footage into that handoff. The veil keeps the entrance as dark
    // as the standard scrim and scrubs away over the first stretch of the
    // pin — gone well before the p=0.25 hold, re-darkening on scroll-up.
    // "none" follows the interstitial's full-black layer: its veil starts
    // fully opaque so the section's rising edge is black-on-black (no
    // visible strip of footage, no seam line) until the pin reveals it.
    if (entranceVeilRef.current) {
      tl.fromTo(
        entranceVeilRef.current,
        { opacity: entranceVeilOpacity },
        { opacity: 0, ease: "none", duration: 0.18, immediateRender: false },
        0,
      );
    }
    // Exit veil (light/none overlays): a full-height pinned section's bottom
    // edge sweeps up through the viewport as it unpins, exposing a moving
    // light-on-dark seam against the next (dark) section. Mirroring the
    // entrance, the exit veil darkens to solid over the pin tail so the
    // departing content is black — matching the section that follows, so the
    // boundary is dark-on-dark and invisible. Aligned with the dissolve tail
    // (pin 0.8→1.0) and scrub-linked, so it re-clears on scroll-up.
    if (exitVeilRef.current) {
      tl.fromTo(
        exitVeilRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 0.18, immediateRender: false },
        0.82,
      );
    }
  }, [entranceVeilOpacity]);

  // keyed on videoMounted, not `enabled`: the <video> mounts only after the
  // box is measured, and the pin/timeline must build after the element exists
  useScrollScrub({ sectionRef, videoRef, enabled: videoMounted, pinViewports: PIN_VIEWPORTS, build });

  const hasContent = Boolean(title || eyebrow || children);

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
    // Pinned sections stay in normal flow — they cannot be negative-margin
    // stacked; following flow sections overlap INTO their pin tail instead.
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
      {/* Text-legibility gradient (footage stays near-full color on the open
          side) plus a full-bleed brand wash that obscures the stock footage
          watermark — kept under the hold-phase test's 0.45 ceiling. Clean
          footage (overlay="none") skips the wash entirely. */}
      {overlay !== "none" && (
        <div
          className={`absolute inset-0 ${overlay === "light" ? "bg-background/10" : "bg-background/25"}`}
          aria-hidden="true"
        />
      )}
      {hasContent && (
        // directional gradient exists for text legibility — a pure bridge
        // keeps the footage open edge-to-edge
        <div
          className={`absolute inset-0 bg-linear-to-r ${
            overlay === "standard"
              ? "from-background/80 via-background/30 to-transparent"
              : "from-background/60 via-background/15 to-transparent"
          }`}
          aria-hidden="true"
        />
      )}
      {overlay !== "standard" && videoMounted && (
        // mounts with the scrub (never for SSR/reduced motion, which keep
        // the static bright poster); inline opacity holds until the
        // timeline's first tick takes over
        <div
          ref={entranceVeilRef}
          className="absolute inset-0 bg-background"
          style={{ opacity: entranceVeilOpacity }}
          aria-hidden="true"
        />
      )}
      {overlay !== "standard" && videoMounted && (
        // exit veil: darkens over the pin tail so the section departs black,
        // hiding the bottom-edge seam against the next section (see build())
        <div
          ref={exitVeilRef}
          className="absolute inset-0 bg-background"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
      )}
      {hasContent && (
        <div ref={contentRef} className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-xl">
              <SectionIntro eyebrow={eyebrow ?? ""} title={title ?? ""} statement={statement} />
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
