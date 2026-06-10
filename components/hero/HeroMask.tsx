import Image from "next/image";
import { useMemo, type CSSProperties, type RefObject } from "react";
import {
  buildMaskDataUri,
  computeTitleGeometry,
  TITLE_FONT_STACK,
  TITLE_FONT_WEIGHT,
} from "./titleGeometry";

interface HeroMaskProps {
  /** Viewport width/height in px — also the mask's user-space coordinate system. */
  width: number;
  height: number;
  /** Two-line wordmark, e.g. ["PINNACLE", "TUBS"]. */
  title: readonly [string, string];
  videoSrc: string;
  poster: string;
  /** false (reduced motion / pre-hydration): static poster, no video element. */
  animated: boolean;
  /** The masked media layer — useHeroScroll zooms it via mask-size. */
  maskDivRef: RefObject<HTMLDivElement | null>;
  /** The white title overlay — useHeroScroll fades it out first. */
  overlayRef: RefObject<SVGSVGElement | null>;
  /** The video element — scrubbed (currentTime) by useHeroScroll. */
  videoRef: RefObject<HTMLVideoElement | null>;
}

/**
 * Two stacked layers: media (video/poster) masked to the "PINNACLE TUBS"
 * letterforms, and an inline SVG of the same title in solid foreground white
 * on top. At rest the white title covers the letterform holes exactly; the
 * scroll timeline fades the white away (revealing media through the letters),
 * then zooms the mask open. The bar between the lines is the zoom anchor —
 * once it scales past the viewport the media is fully revealed.
 */
export function HeroMask({
  width,
  height,
  title,
  videoSrc,
  poster,
  animated,
  maskDivRef,
  overlayRef,
  videoRef,
}: HeroMaskProps) {
  const geometry = useMemo(() => computeTitleGeometry(width, height), [width, height]);
  const maskStyle = useMemo<CSSProperties>(() => {
    const uri = buildMaskDataUri(width, height, title, geometry);
    return {
      maskImage: uri,
      WebkitMaskImage: uri,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      maskSize: "100% 100%",
      WebkitMaskSize: "100% 100%",
    };
  }, [width, height, title, geometry]);

  return (
    <>
      <div ref={maskDivRef} className="absolute inset-0 h-full w-full" style={maskStyle}>
        {/* Poster always sits behind the video: if a device ever refuses to
            paint video frames, the letters reveal footage instead of black. */}
        <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
        {animated && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
      </div>
      <svg
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <g
          fill="var(--color-foreground)"
          fontFamily={TITLE_FONT_STACK}
          fontWeight={TITLE_FONT_WEIGHT}
          fontSize={geometry.fontSize}
          letterSpacing={geometry.letterSpacing}
          textAnchor="middle"
        >
          <text x={geometry.cx} y={geometry.line1Y}>
            {title[0]}
          </text>
          <rect
            x={geometry.barX}
            y={geometry.barY}
            width={geometry.barWidth}
            height={geometry.barHeight}
          />
          <text x={geometry.cx} y={geometry.line2Y}>
            {title[1]}
          </text>
        </g>
      </svg>
    </>
  );
}
