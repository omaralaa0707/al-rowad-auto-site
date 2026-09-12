/**
 * Al Rowad Auto are a three-branch new-car group, and almost everything they
 * post is designed ad creative rather than photography — offer cards, holiday
 * greetings, teasers, all with type baked into the artwork. Reproducing those
 * as if they were photographs would be dishonest, so this page uses only the
 * two frames in their recent feed that are actually photographs of their own
 * showroom. Both happen to contain the thing the whole site is about: a black
 * wall reading NO WAITING JUST DRIVING, with their red shield beside it.
 *
 * The rest of the page is built from what they publish in words: the slogan,
 * the five origins their bio names, the marques in their highlights, and the
 * three branches with their addresses and phone blocks. Time-bound campaign
 * details — cashback rates, deposit terms, sale dates — are left out: they
 * date fast and this page is meant to stay current without upkeep.
 */

/** Their hashtag, on every post. */
export const SLOGAN = { a: "NO WAITING", b: "JUST DRIVING" } as const;

/** Their bio names five origins, in this order, in their own words. */
export const ORIGINS = ["chinese", "european", "american", "korean", "spanish"] as const;
export type Origin = (typeof ORIGINS)[number];

/**
 * The marques: their story highlights plus the names their bio lists. `origin`
 * follows their own five-way split.
 */
export const MARQUES: { name: string; origin: Origin }[] = [
  { name: "BYD", origin: "chinese" },
  { name: "ROX", origin: "chinese" },
  { name: "Geely", origin: "chinese" },
  { name: "Chery", origin: "chinese" },
  { name: "Venucia", origin: "chinese" },
  { name: "Škoda", origin: "european" },
  { name: "Volkswagen", origin: "european" },
  { name: "Renault", origin: "european" },
  { name: "Fiat", origin: "european" },
  { name: "Mercedes-Benz", origin: "european" },
  { name: "Range Rover", origin: "european" },
  { name: "Jeep", origin: "american" },
  { name: "KGM", origin: "korean" },
  { name: "Nissan", origin: "korean" },
  { name: "Subaru", origin: "korean" },
  { name: "SEAT", origin: "spanish" },
  { name: "Cupra", origin: "spanish" },
];

/** Cars named in their recent posts, with the line they wrote for each. */
export type Listing = {
  id: string;
  marque: string;
  model: string;
  year?: string;
  line: string;
  /** Which language they wrote that line in. */
  wrote: "ar" | "en";
  postUrl: string;
  photo?: string;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;

export const LISTINGS: Listing[] = [
  {
    id: "kgm-actyon",
    marque: "KGM",
    model: "Actyon",
    year: "2026",
    line: "A perfect balance of style, comfort, and practicality",
    wrote: "en",
    postUrl: post("Dcla3ggD2Ap"),
    photo: "/media/showroom-actyon.jpg",
  },
  {
    id: "venucia-260t",
    marque: "Venucia",
    model: "260T",
    year: "2027",
    line: "Ready to become your next favorite.",
    wrote: "en",
    postUrl: post("DcgRPlrjIGc"),
    photo: "/media/showroom-venucia.jpg",
  },
  {
    id: "chery-arrizo-5",
    marque: "Chery",
    model: "Arrizo 5",
    line: "شكل مميز، مساحة مريحة، ومواصفات تناسب احتياجاتك.",
    wrote: "ar",
    postUrl: post("DctW9UbiSmt"),
  },
  {
    id: "nissan-magnite",
    marque: "Nissan",
    model: "Magnite",
    line: "كل التسهيلات عندنا .",
    wrote: "ar",
    postUrl: post("DcbcEB6ETtA"),
  },
];

/** The three branches, transcribed from the block at the foot of every post. */
export type Branch = {
  id: string;
  city: "cairo" | "fayoum";
  phones: string[];
  mapUrl: string;
};

export const BRANCHES: Branch[] = [
  {
    id: "autostrad",
    city: "cairo",
    phones: ["01121111280", "01121111282", "01121111283", "01121111284"],
    mapUrl: "https://bit.ly/3hmbzzG",
  },
  {
    id: "nasr-city",
    city: "cairo",
    phones: ["01121111281", "01121111285", "01121111286", "01121111287"],
    mapUrl: "https://maps.app.goo.gl/LY2V5J956qZ3Kwid9",
  },
  {
    id: "fayoum",
    city: "fayoum",
    phones: ["01159000096"],
    mapUrl: "https://bit.ly/3IvOsyG",
  },
];

export const SHOWROOM_FRAMES = ["/media/showroom-actyon.jpg", "/media/showroom-venucia.jpg"];
export const HERO_FRAME = "/media/showroom-actyon.jpg";

export const PROFILE = {
  instagram: "https://www.instagram.com/alrowadauto/",
  facebook: "https://www.facebook.com/alrowadauto/",
  tiktok: "https://www.tiktok.com/@alrowad.auto",
  whatsapp: "01140000174",
  whatsappHref: "https://wa.me/201140000174",
  phoneHref: "tel:+201121111280",
  followers: "13K",
  posts: "721",
} as const;
