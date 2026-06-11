"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { CollageSection } from "./CollageSection";

/** Current models: seasonal-inventory copy + install-photo collage.
 * Deliberately no model names or prices — call or visit for what's current. */
export function CurrentModels() {
  const copy = siteConfig.sections.models;

  return (
    <CollageSection
      eyebrow={copy.eyebrow}
      title={copy.title}
      statement={copy.statement}
      cards={copy.collage}
      collageSide="left"
    >
      <p>{copy.body}</p>
      <p className="flex flex-wrap gap-4 pt-2">
        <a
          href={siteConfig.contact.phoneHref}
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent/85"
        >
          {copy.callLabel}
        </a>
        <Link
          href="/tubs"
          className="rounded-full border border-foreground/25 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-foreground transition-colors hover:border-foreground/60"
        >
          {copy.browseLabel}
        </Link>
      </p>
    </CollageSection>
  );
}
