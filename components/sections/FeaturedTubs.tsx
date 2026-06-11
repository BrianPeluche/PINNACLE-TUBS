"use client";

import Link from "next/link";
import { useRef } from "react";
import { tubs } from "@/data/tubs";
import { siteConfig } from "@/data/site";
import { useReveal } from "@/lib/useReveal";
import { SectionHeading } from "./SectionHeading";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Featured spa strip — all data from data/tubs.ts, typographic cards. */
export function FeaturedTubs() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const copy = siteConfig.sections.featured;

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tubs.map((tub, i) => (
            <li
              key={tub.id}
              data-reveal
              data-reveal-delay={i * 0.08}
              className="flex flex-col rounded-lg border border-foreground/10 bg-muted/40 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {tub.status === "in-stock" ? "In stock" : "Out of stock"}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold uppercase tracking-tight">{tub.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tub.description}
              </p>
              <p className="mt-4 text-xl font-bold text-accent">
                {tub.price !== null ? usd.format(tub.price) : "Call for availability"}
              </p>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-10">
          <Link
            href="/tubs"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline"
          >
            See all tubs →
          </Link>
        </p>
      </div>
    </section>
  );
}
