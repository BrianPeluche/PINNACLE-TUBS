export const siteConfig = {
  name: "Pinnacle Tubs",
  legalName: "Pinnacle Tubs Inc",
  tagline: "Luxury Hot Tubs · Big Bear Lake",
  description:
    "Hot tub sales, service, and repair in Big Bear Lake, CA.",
  contact: {
    address: {
      street: "41529 Big Bear Blvd",
      city: "Big Bear Lake",
      state: "CA",
      zip: "92315",
    },
    phone: "909-936-6206",
    phoneHref: "tel:+19099366206",
    email: "pinnacle.tubs@gmail.com",
  },
  social: {
    instagram: "https://instagram.com/pinnacle.tubs",
  },
  hero: {
    videoSrc: "/assets/hero-scrub.mp4",
    poster: "/assets/hero-poster.jpg",
    title: ["PINNACLE", "TUBS"],
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Tubs", href: "/tubs" },
    { label: "Contact", href: "/contact" },
  ],
  sections: {
    benefits: {
      eyebrow: "Why buy a hot tub",
      title: "Feel better, every day",
      video: { src: "/assets/jacuzzi-water.mp4", poster: "/assets/jacuzzi-water-poster.jpg" },
      items: [
        {
          title: "Stress relief",
          body: "Warm-water immersion eases tension and lowers stress — twenty minutes in the evening resets the whole day.",
        },
        {
          title: "Muscle recovery",
          body: "Jets target sore backs, shoulders, and legs after a day on the slopes or the trails.",
        },
        {
          title: "Better sleep",
          body: "A soak before bed raises body temperature, then the cool-down cues deeper, faster sleep.",
        },
        {
          title: "Built for Big Bear",
          body: "Snow falling while you sit in 102° water — mountain winters are what hot tubs are made for.",
        },
      ],
    },
    included: {
      eyebrow: "What's included",
      title: "Everything but the water",
      video: {
        src: "/assets/underwater-bubbles.mp4",
        poster: "/assets/underwater-bubbles-poster.jpg",
      },
      items: [
        "Local delivery and placement",
        "Insulated cover and lifter",
        "Spa steps",
        "Start-up water care kit",
        "Full orientation and walkthrough",
        "Ozone purification system",
      ],
      ozone: {
        title: "Ozone water care",
        body: "Our spas ship with ozone purification: cleaner water with fewer chemicals, softer on skin, and less maintenance between soaks.",
      },
    },
    featured: {
      eyebrow: "Featured spas",
      title: "On the floor right now",
    },
    gallery: {
      eyebrow: "The shop",
      title: "Visit us in Big Bear Lake",
      photos: [
        { src: "/assets/dsc08332-web.jpg", alt: "Pinnacle Tubs storefront on Big Bear Blvd", portrait: false },
        { src: "/assets/dsc08367-web.jpg", alt: "Pinnacle Tubs roadside sign at 41529 Big Bear Blvd", portrait: true },
        { src: "/assets/dsc08340-web.jpg", alt: "Spa showroom display", portrait: false },
        { src: "/assets/dsc08376-web.jpg", alt: "Hot tub on display at the shop", portrait: true },
        { src: "/assets/dsc08342-web.jpg", alt: "Spa models lined up outside the showroom", portrait: false },
        { src: "/assets/dsc08664-web.jpg", alt: "Hot tub detail at the Pinnacle Tubs shop", portrait: true },
      ],
    },
    calspas: {
      eyebrow: "Authorized dealer",
      title: "Cal Spas, made in the USA",
      body: "We carry Cal Spas — hot tubs engineered and built in Southern California for over four decades. Every spa we sell is one we'd put in our own backyard, and we stand behind each of them with local service.",
      image: {
        src: "/assets/15724F57-7274-4D86-9298-529EA2ADDE07.jpg",
        alt: "Pinnacle Tubs technician servicing a hot tub overlooking Big Bear Lake",
      },
    },
    warranty: {
      eyebrow: "Peace of mind",
      title: "Sold here, serviced here",
      body: "Every spa carries its full manufacturer warranty, and we're the ones who honor it — sales, service, and repairs out of one shop in Big Bear Lake. No call centers, no third parties: if your tub needs attention, the people who sold it to you are the ones who show up.",
    },
  },
} as const;
