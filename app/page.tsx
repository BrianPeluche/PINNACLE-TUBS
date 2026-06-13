import { Hero } from "@/components/hero/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { CalSpaDealer } from "@/components/sections/CalSpaDealer";
import { CurrentModels } from "@/components/sections/CurrentModels";
import { Gallery } from "@/components/sections/Gallery";
import { IncludedWarranty } from "@/components/sections/IncludedWarranty";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { RelaxationInterstitial } from "@/components/sections/RelaxationInterstitial";
import { WhyHotTubEditorial } from "@/components/sections/WhyHotTubEditorial";
import { siteConfig } from "@/data/site";

export default function Home() {
  const [snowQuote, serviceQuote] = siteConfig.sections.quotes;
  return (
    <>
      <Hero />
      <RelaxationInterstitial />
      <Benefits />
      <WhyHotTubEditorial />
      <CalSpaDealer />
      <IncludedWarranty />
      <QuoteBand text={snowQuote.text} image={snowQuote.image} />
      <CurrentModels />
      <Gallery />
      <QuoteBand text={serviceQuote.text} image={serviceQuote.image} />
    </>
  );
}
