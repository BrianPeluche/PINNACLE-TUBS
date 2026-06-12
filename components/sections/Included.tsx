"use client";

import { siteConfig } from "@/data/site";
import { ScrubSection } from "./ScrubSection";

/** "What's included" checklist over scroll-scrubbed underwater footage. */
export function Included() {
  const copy = siteConfig.sections.included;

  return (
    <ScrubSection
      eyebrow={copy.eyebrow}
      title={copy.title}
      statement={copy.statement}
      video={copy.video}
      overlap
    >
      <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
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
    </ScrubSection>
  );
}
