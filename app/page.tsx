import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Pinnacle Tubs — site under construction
        </p>
      </div>
    </>
  );
}
