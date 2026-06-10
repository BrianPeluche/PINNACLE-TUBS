import Image from "next/image";
import { useMemo, type CSSProperties, type RefObject } from "react";
import { buildMaskDataUri, computeTitleGeometry } from "./titleGeometry";

/** Aspect ratio of the hero footage and poster (1920x1080). Update together
 * with the asset if it is ever replaced. */
const MEDIA_ASPECT = 16 / 9;

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
 * Two stacked layers: media (video over poster fallback) masked to the
 * "PINNACLE TUBS" letterforms, and an inline SVG of the same title in solid
 * foreground white on top. At rest the white title covers the letterform
 * holes exactly; the scroll timeline fades the white away, then zooms the
 * mask open. The bar between the lines is the zoom anchor — once it scales
 * past the viewport the media is fully revealed.
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
  const geometry = useMemo(() => computeTitleGeometry(width, height, title), [width, height, title]);
  const maskStyle = useMemo<CSSProperties>(() => {
    const uri = buildMaskDataUri(width, height, geometry);
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
  }, [width, height, geometry]);

  // Explicit cover-crop frame shared by video and poster. iOS Safari does
  // not reliably honor object-fit: cover on <video> (it letterboxed at full
  // zoom), so the crop is computed here instead of left to the engine.
  const coverStyle = useMemo<CSSProperties>(() => {
    const coverWidth = Math.max(width, height * MEDIA_ASPECT);
    const coverHeight = Math.max(height, width / MEDIA_ASPECT);
    return {
      position: "absolute",
      width: coverWidth,
      height: coverHeight,
      left: (width - coverWidth) / 2,
      top: (height - coverHeight) / 2,
      // Tailwind preflight sets video { max-width: 100% }, which would clamp
      // the frame back to the viewport width and reintroduce letterboxing.
      maxWidth: "none",
      // The frame's aspect equals the media's, so cover only matters if
      // MEDIA_ASPECT ever drifts from the real file — then we crop, not bar.
      objectFit: "cover",
    };
  }, [width, height]);

  return (
    <>
      <div ref={maskDivRef} className="absolute inset-0 h-full w-full overflow-hidden" style={maskStyle}>
        {/* Poster always sits behind the video: if a device ever refuses to
            paint video frames, the letters reveal footage instead of black. */}
        <div style={coverStyle}>
          <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        {animated && (
          <video
            ref={videoRef}
            style={coverStyle}
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
        <g fill="var(--color-foreground)">
          <path transform={geometry.line1.transform} d={geometry.line1.d} />
          <rect
            x={geometry.barX}
            y={geometry.barY}
            width={geometry.barWidth}
            height={geometry.barHeight}
          />
          <path transform={geometry.line2.transform} d={geometry.line2.d} />
        </g>
      </svg>
    </>
  );
}
