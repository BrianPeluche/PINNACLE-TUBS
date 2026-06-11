import { Hero } from "@/components/hero/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { CalSpas } from "@/components/sections/CalSpas";
import { FeaturedTubs } from "@/components/sections/FeaturedTubs";
import { Gallery } from "@/components/sections/Gallery";
import { Included } from "@/components/sections/Included";
import { Warranty } from "@/components/sections/Warranty";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedTubs />
      <Included />
      <Gallery />
      <CalSpas />
      <Warranty />
    </>
  );
}
