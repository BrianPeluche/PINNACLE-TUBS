"use client";

import { siteConfig } from "@/data/site";
import { CollageSection } from "./CollageSection";

/** "Why buy a hot tub": health benefits, jet-water video in the collage. */
export function Benefits() {
  const copy = siteConfig.sections.benefits;

  return (
    <CollageSection
      eyebrow={copy.eyebrow}
      title={copy.title}
      statement={copy.statement}
      cards={copy.collage}
      collageSide="right"
    >
      <ul className="space-y-3">
        {copy.items.map((item) => (
          <li key={item.title}>
            <strong className="font-semibold text-foreground">{item.title}</strong> — {item.body}
          </li>
        ))}
      </ul>
    </CollageSection>
  );
}
