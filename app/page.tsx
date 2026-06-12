import { Hero } from "@/components/hero/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Gallery } from "@/components/sections/Gallery";
import { Included } from "@/components/sections/Included";
import { Warranty } from "@/components/sections/Warranty";
import { WhyHotTubEditorial } from "@/components/sections/WhyHotTubEditorial";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <WhyHotTubEditorial />
      <Included />
      <Warranty />
      <Gallery />
      <FinalCTA />
    </>
  );
}
