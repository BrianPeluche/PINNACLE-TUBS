export type TubStatus = "in-stock" | "coming-soon" | "out-of-stock";

export interface Tub {
  /** URL-safe identifier, also used for image filenames. */
  id: string;
  name: string;
  /** Price in whole USD. `null` renders as "Call for details". */
  price: number | null;
  status: TubStatus;
  description: string;
  /** Path under /public, e.g. "/assets/dsc01673-web.jpg". `null` renders a placeholder card. */
  image: string | null;
}

/*
 * TO ADD A REAL MODEL: copy the template below into the `tubs` array and
 * fill it in. Nothing else anywhere in the site needs to change — the Tubs
 * page renders whatever is in this array, and entries with status
 * "coming-soon" / price null show a "Call for details" CTA instead of a
 * price.
 *
 * {
 *   id: "model-name-size",            // unique, url-safe
 *   name: "Model Name",
 *   price: 8500,                      // or null for "Call for details"
 *   status: "in-stock",               // "in-stock" | "coming-soon" | "out-of-stock"
 *   description: "One or two sentences about the spa.",
 *   image: "/assets/your-photo-web.jpg",  // or null for a placeholder card
 * },
 */
export const tubs: Tub[] = [
  {
    id: "coming-soon-1",
    name: "Coming soon",
    price: null,
    status: "coming-soon",
    description: "Inventory changes seasonally — call for current models and pricing.",
    image: null,
  },
  {
    id: "coming-soon-2",
    name: "Coming soon",
    price: null,
    status: "coming-soon",
    description: "Inventory changes seasonally — call for current models and pricing.",
    image: null,
  },
  {
    id: "coming-soon-3",
    name: "Coming soon",
    price: null,
    status: "coming-soon",
    description: "Inventory changes seasonally — call for current models and pricing.",
    image: null,
  },
];
