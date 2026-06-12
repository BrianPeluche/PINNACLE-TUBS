import { Hero } from "@/components/hero/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { CalSpas } from "@/components/sections/CalSpas";
import { CurrentModels } from "@/components/sections/CurrentModels";
import { Gallery } from "@/components/sections/Gallery";
import { Included } from "@/components/sections/Included";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Warranty } from "@/components/sections/Warranty";
import { WhyHotTubEditorial } from "@/components/sections/WhyHotTubEditorial";
import { siteConfig } from "@/data/site";

export default function Home() {
  const [snowQuote, serviceQuote] = siteConfig.sections.quotes;
  return (
    <>
      <Hero />
      <Benefits />
      <WhyHotTubEditorial />
      <QuoteBand text={snowQuote.text} image={snowQuote.image} />
      <CurrentModels />
      <Included />
      <Gallery />
      <QuoteBand text={serviceQuote.text} image={serviceQuote.image} />
      <CalSpas />
      <Warranty />
    </>
  );
}
