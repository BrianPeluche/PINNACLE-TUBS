"use client";

import { siteConfig } from "@/data/site";
import { ScrubSection } from "./ScrubSection";

/** "Why buy a hot tub": health benefits over scroll-scrubbed jet footage. */
export function Benefits() {
  const copy = siteConfig.sections.benefits;

  return (
    <ScrubSection
      eyebrow={copy.eyebrow}
      title={copy.title}
      statement={copy.statement}
      video={copy.video}
    >
      <ul className="space-y-3">
        {copy.items.map((item) => (
          <li key={item.title}>
            <strong className="font-semibold text-foreground">{item.title}</strong> — {item.body}
          </li>
        ))}
      </ul>
    </ScrubSection>
  );
}
