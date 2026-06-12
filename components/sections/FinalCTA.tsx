import Link from "next/link";
import { siteConfig } from "@/data/site";

export function FinalCTA() {
  const { address, phone, phoneHref } = siteConfig.contact;
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;

  return (
    <section className="relative min-h-svh overflow-hidden bg-foreground px-6 py-24 text-background sm:py-32">
      <div className="absolute inset-0 bg-linear-to-br from-foreground via-[#d8e6ea] to-accent/80" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background/20 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-between gap-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.6fr)] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-background/70">
              Pinnacle Tubs · Big Bear Lake
            </p>
            <h2 className="mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.9] sm:text-8xl lg:text-9xl">
              Visit us in Big Bear Lake
            </h2>
          </div>
          <div className="space-y-5 text-lg font-semibold leading-relaxed text-background/80">
            <p>
              See current tubs, talk through delivery, and work with the people who will
              service the spa after it lands at your home.
            </p>
            <address className="not-italic">
              {fullAddress}
              <br />
              {phone}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={phoneHref}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-background px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-background"
          >
            Call the shop
          </a>
          <Link
            href="/tubs"
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-background px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-background transition-colors hover:bg-background hover:text-foreground focus:outline-none focus:ring-2 focus:ring-background"
          >
            See current tubs
          </Link>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-background/40 px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-background transition-colors hover:border-background focus:outline-none focus:ring-2 focus:ring-background"
          >
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
