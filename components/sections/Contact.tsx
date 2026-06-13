"use client";

import { useCallback, useRef, type CSSProperties } from "react";
import { ExpandableImageCard } from "@/components/ui/ExpandableImageCard";
import { useReveal } from "@/lib/useReveal";
import { siteConfig } from "@/data/site";
import type { ScrubTimeline } from "@/lib/useScrollScrub";
import { ScrubSection } from "./ScrubSection";

/**
 * Closing link in the cinematic chain: a get-in-touch title card (blur in /
 * out like every other section, with the GTA scroll-driven gradient on its
 * text) overlaps down into a calm editorial contact block. The left info
 * column stays sticky while the photos scroll past it (the Why-buy pattern),
 * so the call/email/address stay grounded. Contact facts come from
 * data/site.ts (single source of truth); photo picks live here because
 * data/site.ts is frozen for this change.
 */
const VIDEO = {
  src: "/assets/get-in-touch-scrub.mp4",
  poster: "/assets/get-in-touch-poster.jpg",
};

// Same tight warm GTA-VI sweep as the CalSpa logo, mirrored so the scroll-
// driven position shift travels and returns smoothly with no hard jump.
const TITLE_GRADIENT =
  "linear-gradient(90deg, #160f24, #351236, #6d1d45, #b73555, #e8684a, #f5b64f, #e8684a, #b73555, #6d1d45, #351236, #160f24)";

const gradientTextStyle: CSSProperties = {
  backgroundImage: TITLE_GRADIENT,
  backgroundSize: "200% 100%",
  backgroundPosition: "0% 50%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

const { address, phone, phoneHref, email } = siteConfig.contact;
const instagram = "https://www.instagram.com/pinnacle.tubs/";
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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Contact() {
  const editorialRef = useRef<HTMLElement>(null);
  useReveal(editorialRef);

  // Scroll-driven gradient travel across the pin (ease none => reverses
  // frame-for-frame), identical to the CalSpa logo. Runs on the same scrubbed
  // timeline as the content blur, so it is locked to scroll, not a loop.
  const contentBuild = useCallback((tl: ScrubTimeline, contentEl: HTMLDivElement) => {
    const els = Array.from(contentEl.querySelectorAll<HTMLElement>("[data-contact-gradient]"));
    if (!els.length) return;
    tl.fromTo(els, { backgroundPosition: "0% 50%" }, { backgroundPosition: "-200% 50%", ease: "none", duration: 1 }, 0);
  }, []);

  return (
    <>
      <ScrubSection video={VIDEO} overlay="none" centered gradualContent contentBuild={contentBuild}>
        <div className="flex flex-col items-center">
          <p
            data-contact-gradient
            style={gradientTextStyle}
            className="text-xs font-semibold uppercase tracking-[0.3em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
          >
            Get in touch
          </p>
          <h2
            data-contact-gradient
            style={gradientTextStyle}
            className="mt-4 text-balance text-5xl font-extrabold uppercase leading-[0.92] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] sm:text-6xl xl:text-7xl"
          >
            Come see us in Big Bear Lake
          </h2>
        </div>
      </ScrubSection>

      <section id="contact" ref={editorialRef} className="relative z-10 mt-[-15vh] bg-background py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="space-y-8 lg:sticky lg:top-28">
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

            <div data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Visit</p>
              <div className="mt-3 space-y-1 text-base leading-relaxed text-muted-foreground">
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
            </div>

            <div data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Reach us</p>
              <div className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
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
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinnacle Tubs on Instagram"
                  className="inline-flex items-center gap-2 text-foreground hover:text-accent"
                >
                  <InstagramIcon />
                  <span>@pinnacle.tubs on Instagram</span>
                </a>
              </div>
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
