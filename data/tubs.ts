export type TubStatus = "in-stock" | "out-of-stock";

export interface Tub {
  /** URL-safe identifier, also used for image filenames. */
  id: string;
  name: string;
  /** Price in whole USD. `null` when unavailable (e.g. out of stock). */
  price: number | null;
  status: TubStatus;
  description: string;
  /** Path under /public, e.g. "/assets/tubs/tarn-23.jpg" */
  image: string;
}

export const tubs: Tub[] = [
  {
    id: "tarn-23",
    name: "Tarn 23",
    price: 7000,
    status: "in-stock",
    description:
      "A compact, efficient spa that delivers full-size hydrotherapy in a space-saving footprint.",
    image: "/assets/tubs/tarn-23.jpg",
  },
  {
    id: "yosemite-31",
    name: "Yosemite 31",
    price: 9400,
    status: "in-stock",
    description:
      "A family-sized spa with multiple seating zones and a powerful jet layout for full-body relief.",
    image: "/assets/tubs/yosemite-31.jpg",
  },
  {
    id: "tahoe-31",
    name: "Tahoe 31",
    price: null,
    status: "out-of-stock",
    description:
      "Our most popular large-capacity spa, built for entertaining and deep-muscle therapy.",
    image: "/assets/tubs/tahoe-31.jpg",
  },
  {
    id: "zion-31",
    name: "Zion 31",
    price: 10000,
    status: "in-stock",
    description:
      "The flagship model: premium jet count, lounge seating, and our most advanced ozone system.",
    image: "/assets/tubs/zion-31.jpg",
  },
];
