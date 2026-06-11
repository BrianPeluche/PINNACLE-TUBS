"use client";

import { siteConfig } from "@/data/site";
import { CollageSection } from "./CollageSection";

/** Cal Spas dealer story with service-photo collage. */
export function CalSpas() {
  const copy = siteConfig.sections.calspas;

  return (
    <CollageSection
      eyebrow={copy.eyebrow}
      title={copy.title}
      statement={copy.statement}
      cards={copy.collage}
      collageSide="left"
    >
      <p>{copy.body}</p>
    </CollageSection>
  );
}
