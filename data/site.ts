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
} as const;
