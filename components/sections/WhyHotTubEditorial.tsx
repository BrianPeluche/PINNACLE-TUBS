"use client";

import { CollageSection } from "./CollageSection";

const BENEFIT_CARDS = [
  {
    image: {
      src: "/assets/b97a85c5-web.jpg",
      alt: "Hot tub on a Big Bear deck under a pink dusk sky",
    },
    label: "Evening reset",
  },
  {
    image: {
      src: "/assets/dsc01673-web.jpg",
      alt: "Filled hot tub on a deck in the pines",
    },
    label: "Recovery water",
  },
  {
    image: {
      src: "/assets/dsc01682-web.jpg",
      alt: "Hot tub installed on a mountain property",
    },
    label: "Winter-ready comfort",
  },
] as const;

/** Jason-style editorial section: text-left, layered media-right. */
export function WhyHotTubEditorial() {
  return (
    <CollageSection
      eyebrow="Why buy a hot tub"
      title="A better end to the day"
      statement="Warm water changes how the whole evening feels."
      cards={BENEFIT_CARDS}
      collageSide="right"
    >
      <p>
        A hot tub is not just backyard furniture. It is a daily recovery ritual for sore
        shoulders, long workdays, ski legs, cold mountain nights, and the kind of quiet
        sleep that comes after your body finally lets go.
      </p>
      <dl className="grid gap-4 pt-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
            Stress relief
          </dt>
          <dd className="mt-2 text-sm">
            Heat, buoyancy, and moving water take the edge off without needing a whole
            weekend away.
          </dd>
        </div>
        <div>
          <dt className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
            Muscle recovery
          </dt>
          <dd className="mt-2 text-sm">
            Jets work into backs, calves, and shoulders after the slopes, trails, or a
            long day on your feet.
          </dd>
        </div>
        <div>
          <dt className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
            Better sleep
          </dt>
          <dd className="mt-2 text-sm">
            A soak before bed raises body temperature, then the cool-down helps signal
            that it is time to rest.
          </dd>
        </div>
        <div>
          <dt className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
            Big Bear winters
          </dt>
          <dd className="mt-2 text-sm">
            Cold air, pine trees, steam, and 102-degree water are exactly why the tub
            belongs here.
          </dd>
        </div>
      </dl>
    </CollageSection>
  );
}
