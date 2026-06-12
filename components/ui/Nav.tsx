import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted bg-background/80 backdrop-blur">
      {/* 3-column grid centers the logo exactly on sm+; below sm the nav
          stacks (logo centered above centered links) so nothing collides. */}
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-3 sm:grid sm:grid-cols-3">
        <span className="hidden sm:block" aria-hidden="true" />
        <Link
          href="/"
          className="flex items-center sm:justify-self-center"
          aria-label={siteConfig.name}
        >
          {/* The source JPEG is 1363x1280 with white margins around the round
              badge: a square cover-crop in a circular frame, zoomed slightly,
              keeps the white outside the visible circle. */}
          <span className="block size-14 overflow-hidden rounded-full">
            <Image
              src="/assets/PinnacleTubsLogo_outlined.jpeg"
              alt={`${siteConfig.name} — Luxury Hot Tubs, Made in the USA`}
              width={112}
              height={112}
              className="size-full scale-110 object-cover"
              priority
            />
          </span>
        </Link>
        <ul className="flex items-center gap-6 text-sm text-muted-foreground sm:justify-self-end">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
