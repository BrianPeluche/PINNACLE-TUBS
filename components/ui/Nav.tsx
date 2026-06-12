import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
          {/* circular crop hides the JPEG's white corners on the dark nav */}
          <Image
            src="/assets/PinnacleTubsLogo_outlined.jpeg"
            alt={`${siteConfig.name} — Luxury Hot Tubs, Made in the USA`}
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
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
