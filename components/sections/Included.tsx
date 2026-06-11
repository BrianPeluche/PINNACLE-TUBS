"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { VideoBackground } from "@/lib/VideoBackground";
import { SectionHeading } from "./SectionHeading";

/** "What's included" checklist + ozone callout over underwater footage. */
export function Included() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const copy = siteConfig.sections.included;

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-36">
      <VideoBackground src={copy.video.src} poster={copy.video.poster} />
      <div className="absolute inset-0 bg-background/75" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {copy.items.map((item, i) => (
              <li
                key={item}
                data-reveal
                data-reveal-delay={(i % 2) * 0.12}
                className="flex items-start gap-3 text-base"
              >
                <span aria-hidden="true" className="mt-1 text-accent">
                  ◆
                </span>
                {item}
              </li>
            ))}
          </ul>
          <aside
            data-reveal
            className="rounded-lg border border-accent/30 bg-background/60 p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-accent">{copy.ozone.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.ozone.body}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
