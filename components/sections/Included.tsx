"use client";

import { siteConfig } from "@/data/site";
import { CollageSection } from "./CollageSection";

/** "What's included" checklist + ozone note, underwater video in the collage. */
export function Included() {
  const copy = siteConfig.sections.included;

  return (
    <CollageSection
      eyebrow={copy.eyebrow}
      title={copy.title}
      statement={copy.statement}
      cards={copy.collage}
      collageSide="right"
    >
      <ul className="space-y-2">
        {copy.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-1 text-xs text-accent">
              ◆
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="border-l-2 border-accent/50 pl-4 text-sm">{copy.ozone}</p>
    </CollageSection>
  );
}
