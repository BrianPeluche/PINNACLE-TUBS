import { Hero } from "@/components/hero/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { CalSpaDealer } from "@/components/sections/CalSpaDealer";
import { Contact } from "@/components/sections/Contact";
import { IncludedWarranty } from "@/components/sections/IncludedWarranty";
import { RelaxationInterstitial } from "@/components/sections/RelaxationInterstitial";
import { WhyHotTubEditorial } from "@/components/sections/WhyHotTubEditorial";

export default function Home() {
  return (
    <>
      <Hero />
      <RelaxationInterstitial />
      <Benefits />
      <WhyHotTubEditorial />
      <CalSpaDealer />
      <IncludedWarranty />
      <Contact />
    </>
  );
}
