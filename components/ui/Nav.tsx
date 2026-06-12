import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
          {/* The source JPEG is 1363x1280 with white margins around the round
              badge: a square cover-crop in a circular frame, zoomed slightly,
              keeps the white outside the visible circle. */}
          <span className="block size-11 overflow-hidden rounded-full">
            <Image
              src="/assets/PinnacleTubsLogo_outlined.jpeg"
              alt={`${siteConfig.name} — Luxury Hot Tubs, Made in the USA`}
              width={88}
              height={88}
              className="size-full scale-110 object-cover"
              priority
            />
          </span>
        </Link>
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
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
