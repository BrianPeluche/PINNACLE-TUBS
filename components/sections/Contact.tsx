"use client";

import { useRef } from "react";
import { ExpandableImageCard } from "@/components/ui/ExpandableImageCard";
import { useReveal } from "@/lib/useReveal";
import { siteConfig } from "@/data/site";
import { ScrubSection } from "./ScrubSection";

/**
 * Closing link in the cinematic chain: a shooting-water title card (blur in /
 * out like every other section) overlaps down into a calm editorial contact
 * block. The editorial rises into the card's pin tail (the GTA Jason overlap)
 * so the dark handoff has no seam and no dead frame, forward and backward.
 * Contact facts come from data/site.ts (single source of truth); the photo
 * picks live here because data/site.ts is frozen for this change.
 */
const VIDEO = {
  src: "/assets/shooting-water.mp4",
  poster: "/assets/shooting-water-poster.jpg",
};

const { address, phone, phoneHref, email } = siteConfig.contact;
const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

const PHOTOS = {
  storefront: { src: "/assets/dsc08332-web.jpg", alt: "The Pinnacle Tubs storefront on Big Bear Blvd" },
  sign: { src: "/assets/dsc08367-web.jpg", alt: "The Pinnacle Tubs roadside sign at 41529 Big Bear Blvd" },
  owner: { src: "/assets/dsc08664-web.jpg", alt: "A Pinnacle Tubs team member above Big Bear Lake" },
  lakefront: { src: "/assets/dsc08533-web.jpg", alt: "A Pinnacle Tubs swim spa being serviced at the lakefront" },
  service: { src: "/assets/15724f57-web.jpg", alt: "A Pinnacle Tubs technician servicing a tub above Big Bear Lake" },
  door: { src: "/assets/dsc08340-web.jpg", alt: "The open Pinnacle Tubs front door looking into the showroom" },
} as const;

const PILL =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.04] focus-visible:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Contact() {
  const editorialRef = useRef<HTMLElement>(null);
  useReveal(editorialRef);

  return (
    <>
      <ScrubSection
        video={VIDEO}
        overlay="none"
        centered
        gradualContent
        eyebrow="Get in touch"
        title="Come see us in Big Bear Lake"
      />
      <section
        id="contact"
        ref={editorialRef}
        className="relative z-10 mt-[-15vh] bg-background py-24 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="space-y-8">
            <p data-reveal className="text-base leading-relaxed text-muted-foreground">
              Stop by the shop on Big Bear Blvd, give us a call, or send an email. Whether you are
              shopping for a new tub or need service on one you already own, we are glad to help.
            </p>

            <div data-reveal className="flex flex-wrap gap-4">
              <a href={phoneHref} className={`${PILL} bg-accent text-accent-foreground`}>
                Call {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className={`${PILL} border border-foreground/25 text-foreground hover:border-foreground/60`}
              >
                Email us
              </a>
            </div>

            <div data-reveal className="space-y-1 text-base text-muted-foreground">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Visit</p>
              <p className="text-foreground">{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-accent underline-offset-4 hover:underline"
              >
                Get directions
              </a>
            </div>

            <div data-reveal className="space-y-1 text-base text-muted-foreground">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Reach us</p>
              <p>
                <a href={phoneHref} className="text-foreground hover:text-accent">
                  {phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${email}`} className="text-foreground hover:text-accent">
                  {email}
                </a>
              </p>
              <p>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent"
                >
                  @pinnacle.tubs on Instagram
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div data-reveal>
              <ExpandableImageCard src={PHOTOS.storefront.src} alt={PHOTOS.storefront.alt} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div data-reveal data-reveal-delay="0.1">
                <ExpandableImageCard src={PHOTOS.sign.src} alt={PHOTOS.sign.alt} aspectClassName="aspect-[2/3]" />
              </div>
              <div data-reveal data-reveal-delay="0.2">
                <ExpandableImageCard src={PHOTOS.owner.src} alt={PHOTOS.owner.alt} aspectClassName="aspect-[2/3]" />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div data-reveal data-reveal-delay="0.1">
                <ExpandableImageCard src={PHOTOS.lakefront.src} alt={PHOTOS.lakefront.alt} aspectClassName="aspect-[2/3]" />
              </div>
              <div data-reveal data-reveal-delay="0.2">
                <ExpandableImageCard src={PHOTOS.service.src} alt={PHOTOS.service.alt} aspectClassName="aspect-[2/3]" />
              </div>
            </div>
            <div data-reveal>
              <ExpandableImageCard src={PHOTOS.door.src} alt={PHOTOS.door.alt} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
