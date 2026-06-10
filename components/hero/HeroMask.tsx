import Image from "next/image";
import type { RefObject } from "react";

interface HeroMaskProps {
  /** Viewport width/height in px — also the mask's user-space coordinate system. */
  width: number;
  height: number;
  /** Two-line wordmark, e.g. ["PINNACLE", "TUBS"]. */
  title: readonly [string, string];
  videoSrc: string;
  poster: string;
  /** false (reduced motion): static poster image, mask not animated. */
  animated: boolean;
  /** The scaled group inside the mask — animated by useHeroScroll. */
  zoomGroupRef: RefObject<SVGGElement | null>;
  /** The video element — scrubbed (currentTime) by useHeroScroll. */
  videoRef: RefObject<HTMLVideoElement | null>;
}

/**
 * Renders the masked media layer ("PINNACLE TUBS" cut out of a black mask,
 * revealing video/poster underneath) plus the hidden SVG mask definition.
 * The small bar between the two title lines is the scroll "zoom anchor" —
 * a guaranteed-solid shape useHeroScroll scales until it fills the viewport.
 */
export function HeroMask({
  width,
  height,
  title,
  videoSrc,
  poster,
  animated,
  zoomGroupRef,
  videoRef,
}: HeroMaskProps) {
  const fontSize = Math.min(Math.max(width / 8.5, 32), 320);
  const barWidth = width * 0.14;
  const barHeight = height * 0.015;
  const cx = width / 2;
  const cy = height / 2;
  const line1Y = cy - barHeight / 2 - fontSize * 0.55;
  const line2Y = cy + barHeight / 2 + fontSize * 0.55 + fontSize * 0.8;

  return (
    <>
      <div
        className="absolute inset-0 h-full w-full"
        style={{ maskImage: "url(#hero-mask)", WebkitMaskImage: "url(#hero-mask)" }}
      >
        {animated ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
      </div>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
          <mask id="hero-mask" maskUnits="objectBoundingBox" maskContentUnits="userSpaceOnUse" x="0" y="0" width="1" height="1">
            <rect x="0" y="0" width={width} height={height} fill="black" />
            <g ref={zoomGroupRef}>
              <text x={cx} y={line1Y} textAnchor="middle" fontSize={fontSize} fontWeight={800} letterSpacing={fontSize * 0.05} fill="white">
                {title[0]}
              </text>
              <rect x={cx - barWidth / 2} y={cy - barHeight / 2} width={barWidth} height={barHeight} fill="white" />
              <text x={cx} y={line2Y} textAnchor="middle" fontSize={fontSize} fontWeight={800} letterSpacing={fontSize * 0.05} fill="white">
                {title[1]}
              </text>
            </g>
          </mask>
        </defs>
      </svg>
    </>
  );
}
