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
      statement: "Twenty minutes in warm water resets the whole day.",
      items: [
        {
          title: "Stress relief",
          body: "warm-water immersion eases tension and quiets the day down.",
        },
        {
          title: "Muscle recovery",
          body: "jets work sore backs, shoulders, and legs after the slopes or the trails.",
        },
        {
          title: "Better sleep",
          body: "a soak before bed, then the cool-down cues deeper, faster sleep.",
        },
        {
          title: "Built for Big Bear",
          body: "mountain winters are exactly what hot tubs are made for.",
        },
      ],
      collage: [
        { video: { src: "/assets/jacuzzi-water.mp4", poster: "/assets/jacuzzi-water-poster.jpg" } },
        { image: { src: "/assets/dsc08664-web.jpg", alt: "Hot tub on display at the Pinnacle Tubs showroom" } },
        { image: { src: "/assets/dsc08340-web.jpg", alt: "Spa showroom display" } },
      ],
    },
    models: {
      eyebrow: "Current models",
      title: "On the floor now",
      statement: "Inventory moves with the seasons.",
      body: "What's on the showroom floor changes throughout the year as new Cal Spas models arrive and others sell. Come walk the floor, or call and we'll tell you exactly what's in stock and what it costs.",
      callLabel: "Call the shop",
      browseLabel: "See the tubs page",
      collage: [
        { image: { src: "/assets/1d0564e1-web.jpg", alt: "New spa installed on a backyard patio in the pines" } },
        { image: { src: "/assets/dsc01673-web.jpg", alt: "Freshly delivered hot tub on a Big Bear deck" } },
        { image: { src: "/assets/e2a83254-web.jpg", alt: "Hot tub installation at dusk" } },
      ],
    },
    included: {
      eyebrow: "What's included",
      title: "Everything but the water",
      statement: "Delivered, placed, filled-ready, and walked through.",
      items: [
        "Local delivery and placement",
        "Insulated cover and lifter",
        "Spa steps",
        "Start-up water care kit",
        "Full orientation and walkthrough",
        "Ozone purification system",
      ],
      ozone:
        "Every spa ships with ozone purification: cleaner water with fewer chemicals, softer on skin, and less maintenance between soaks.",
      collage: [
        {
          video: {
            src: "/assets/underwater-bubbles.mp4",
            poster: "/assets/underwater-bubbles-poster.jpg",
          },
        },
        { image: { src: "/assets/dsc08376-web.jpg", alt: "Hot tub on display at the shop" } },
        { image: { src: "/assets/3070473c-web.jpg", alt: "Installed spa with cover lifter on a stone patio" } },
      ],
    },
    gallery: {
      eyebrow: "The shop",
      title: "Visit us in Big Bear Lake",
      statement: "41529 Big Bear Blvd, across from the lake.",
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
      statement: "Built in Southern California for over four decades.",
      body: "We carry Cal Spas — and every spa we sell is one we'd put in our own backyard. We stand behind each of them with local service, out of our own shop.",
      collage: [
        {
          image: {
            src: "/assets/15724F57-7274-4D86-9298-529EA2ADDE07.jpg",
            alt: "Pinnacle Tubs technician servicing a hot tub overlooking Big Bear Lake",
          },
        },
        { image: { src: "/assets/dsc08332-web.jpg", alt: "Pinnacle Tubs storefront on Big Bear Blvd" } },
        { image: { src: "/assets/9fe6fc39-web.jpg", alt: "Cal Spas hot tub installed on a wooden deck" } },
      ],
    },
    warranty: {
      eyebrow: "Peace of mind",
      title: "Sold here, serviced here",
      statement: "No call centers. No third parties.",
      body: "Every spa carries its full manufacturer warranty, and we're the ones who honor it — sales, service, and repairs out of one shop in Big Bear Lake. If your tub needs attention, the people who sold it to you are the ones who show up.",
    },
    quotes: [
      {
        text: "Snow falling. 102° water.",
        image: { src: "/assets/b97a85c5-web.jpg", alt: "Hot tub on a covered deck under a pink dusk sky" },
      },
      {
        text: "Sold here. Serviced here. Big Bear Lake.",
        image: { src: "/assets/dsc01679-web.jpg", alt: "Hot tub installed on a deck among the pines" },
      },
    ],
  },
} as const;
