import { TITLE_PATHS, type TitlePath } from "./titlePaths";

/**
 * Shared geometry for the hero title, used by both the white overlay SVG
 * (inline, fades out on scroll) and the mask image (data URI). Letterforms
 * are pre-generated path outlines — never <text> — because an SVG-as-image
 * resolves fonts independently of the page (and can't load web fonts), which
 * produced misaligned overlay/mask letterforms on iOS. Identical path data +
 * identical transforms = pixel-identical layers on every engine.
 */
export interface TitleLine {
  d: string;
  /** Positions the path (baseline y=0, 100 units/em) into viewport space. */
  transform: string;
}

export interface TitleGeometry {
  line1: TitleLine;
  line2: TitleLine;
  barX: number;
  barY: number;
  barWidth: number;
  barHeight: number;
}

function placeLine(path: TitlePath, fontSize: number, cx: number, baselineY: number): TitleLine {
  const s = fontSize / 100;
  return {
    d: path.d,
    transform: `translate(${cx - (path.width * s) / 2} ${baselineY}) scale(${s})`,
  };
}

/** Same layout math at any viewport size; coordinates are viewport px. */
export function computeTitleGeometry(
  width: number,
  height: number,
  title: readonly [string, string],
): TitleGeometry {
  const line1Path = TITLE_PATHS[title[0]];
  const line2Path = TITLE_PATHS[title[1]];
  if (!line1Path || !line2Path) {
    throw new Error(
      `No pre-generated path outline for hero title "${title[0]} ${title[1]}" — regenerate titlePaths.ts`,
    );
  }
  const fontSize = Math.min(Math.max(width / 8.5, 32), 320);
  const barWidth = width * 0.14;
  const barHeight = height * 0.015;
  const cx = width / 2;
  const cy = height / 2;
  const line1Y = cy - barHeight / 2 - fontSize * 0.55;
  const line2Y = cy + barHeight / 2 + fontSize * 0.55 + fontSize * 0.8;
  return {
    line1: placeLine(line1Path, fontSize, cx, line1Y),
    line2: placeLine(line2Path, fontSize, cx, line2Y),
    barX: cx - barWidth / 2,
    barY: cy - barHeight / 2,
    barWidth,
    barHeight,
  };
}

/**
 * The mask as a standalone SVG image (white title + bar on transparent,
 * alpha-masked). A data URI is used instead of a CSS reference to an inline
 * <mask> element because WebKit ignores `mask-image: url(#id)`. The zoom
 * animates mask-size about mask-position: center.
 */
export function buildMaskDataUri(width: number, height: number, g: TitleGeometry): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">` +
    `<path transform="${g.line1.transform}" d="${g.line1.d}" fill="white"/>` +
    `<rect x="${g.barX}" y="${g.barY}" width="${g.barWidth}" height="${g.barHeight}" fill="white"/>` +
    `<path transform="${g.line2.transform}" d="${g.line2.d}" fill="white"/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
