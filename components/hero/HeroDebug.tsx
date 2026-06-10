"use client";

import { useEffect, useState, type RefObject } from "react";

/** Stamped into the client bundle by Vercel at build time. */
export const BUILD_ID =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

interface HeroDebugProps {
  sectionRef: RefObject<HTMLElement | null>;
  overlayRef: RefObject<SVGSVGElement | null>;
  maskDivRef: RefObject<HTMLDivElement | null>;
  /** The width/height the hero geometry is currently computed from. */
  geometryWidth: number;
  geometryHeight: number;
}

/**
 * On-screen readout for real-device debugging (?debug=hero). Surfaces every
 * viewport-ish number that can disagree on iOS (innerHeight vs
 * visualViewport vs svh) next to what the hero actually consumed, so a
 * device screenshot is enough to localize a mismatch.
 */
export function HeroDebug({
  sectionRef,
  overlayRef,
  maskDivRef,
  geometryWidth,
  geometryHeight,
}: HeroDebugProps) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:100svh;pointer-events:none;visibility:hidden";
    document.body.appendChild(probe);

    const rect = (r: DOMRect | undefined) =>
      r ? `${Math.round(r.width)}x${Math.round(r.height)} @ ${Math.round(r.left)},${Math.round(r.top)}` : "-";

    const read = () => {
      const section = sectionRef.current?.getBoundingClientRect();
      const overlay = overlayRef.current?.getBoundingClientRect();
      const maskDiv = maskDivRef.current;
      const computed = maskDiv ? getComputedStyle(maskDiv) : null;
      const vv = window.visualViewport;
      setLines([
        `build ${BUILD_ID}`,
        `inner ${window.innerWidth}x${window.innerHeight}`,
        `visualViewport ${vv ? `${Math.round(vv.width)}x${Math.round(vv.height)}` : "n/a"}`,
        `100svh ${Math.round(probe.getBoundingClientRect().height)}px`,
        `geometry source ${geometryWidth}x${geometryHeight}`,
        `section ${rect(section)}`,
        `overlay ${rect(overlay)}`,
        `mask-size inline ${maskDiv?.style.webkitMaskSize || maskDiv?.style.maskSize || "-"}`,
        `mask-size computed ${computed?.webkitMaskSize || computed?.maskSize || "-"}`,
        `mask-pos ${computed?.webkitMaskPosition || computed?.maskPosition || "-"}`,
        `scrollY ${Math.round(window.scrollY)}`,
      ]);
    };

    const id = window.setInterval(read, 250);
    return () => {
      window.clearInterval(id);
      probe.remove();
    };
  }, [sectionRef, overlayRef, maskDivRef, geometryWidth, geometryHeight]);

  return (
    <div className="pointer-events-none fixed left-2 top-2 z-50 rounded bg-black/80 p-2 font-mono text-[11px] leading-snug text-green-400">
      {lines.map((l) => (
        <div key={l}>{l}</div>
      ))}
    </div>
  );
}
