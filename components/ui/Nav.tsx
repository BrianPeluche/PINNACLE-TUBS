import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted bg-background/80 backdrop-blur">
      {/* GTA-style nav: full-width row so the logo sits ~24px (px-6) from
          the viewport's left edge, links on the right. Transparent PNG needs
          no clipping or blend tricks. */}
      <nav className="flex w-full items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
          <Image
            src="/assets/PINNACLE-TUBS-BETTER-LOGO.png"
            alt={`${siteConfig.name} — Luxury Hot Tubs, Made in the USA`}
            width={160}
            height={160}
            className="h-20 w-20 object-contain"
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
