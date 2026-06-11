import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Matches the hero wordmark, which is pre-generated Inter 800 path outlines.
const inter = Inter({ subsets: ["latin"] });
import { SmoothScrollProvider } from "@/lib/lenis";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col antialiased`}>
        <SmoothScrollProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
