/**
 * Shared geometry for the hero title, used by both the white overlay SVG
 * (inline, fades out on scroll) and the mask image (data URI). The mask SVG
 * renders in its own document and cannot inherit page CSS, so the font stack
 * must be spelled out identically in both places or the letterforms won't
 * align when the overlay fades into the mask.
 */
export const TITLE_FONT_STACK =
  "ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";

export const TITLE_FONT_WEIGHT = 800;

export interface TitleGeometry {
  fontSize: number;
  letterSpacing: number;
  cx: number;
  line1Y: number;
  line2Y: number;
  barX: number;
  barY: number;
  barWidth: number;
  barHeight: number;
}

/** Same layout math at any viewport size; coordinates are viewport px. */
export function computeTitleGeometry(width: number, height: number): TitleGeometry {
  const fontSize = Math.min(Math.max(width / 8.5, 32), 320);
  const barWidth = width * 0.14;
  const barHeight = height * 0.015;
  const cx = width / 2;
  const cy = height / 2;
  return {
    fontSize,
    letterSpacing: fontSize * 0.05,
    cx,
    line1Y: cy - barHeight / 2 - fontSize * 0.55,
    line2Y: cy + barHeight / 2 + fontSize * 0.55 + fontSize * 0.8,
    barX: cx - barWidth / 2,
    barY: cy - barHeight / 2,
    barWidth,
    barHeight,
  };
}

/**
 * The mask as a standalone SVG image (white title + bar on transparent,
 * alpha-masked). A data URI is used instead of a CSS reference to an inline
 * <mask> element because WebKit ignores `mask-image: url(#id)` — that was
 * the iOS Safari blank-hero bug. The zoom animates mask-size about
 * mask-position: center, which equals scaling the old mask group about the
 * viewport center.
 */
export function buildMaskDataUri(
  width: number,
  height: number,
  title: readonly [string, string],
  g: TitleGeometry,
): string {
  const text = (line: string, y: number) =>
    `<text x="${g.cx}" y="${y}" text-anchor="middle" font-size="${g.fontSize}" ` +
    `font-weight="${TITLE_FONT_WEIGHT}" letter-spacing="${g.letterSpacing}" ` +
    `font-family="${TITLE_FONT_STACK}" fill="white">${line}</text>`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">` +
    text(title[0], g.line1Y) +
    `<rect x="${g.barX}" y="${g.barY}" width="${g.barWidth}" height="${g.barHeight}" fill="white"/>` +
    text(title[1], g.line2Y) +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
