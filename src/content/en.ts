import type { RowadContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: RowadContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Al Rowad Auto",
    shortName: "Al Rowad",
    tagline: "No waiting, just driving",
  },

  nav: [
    { label: "Origins", href: "#origins" },
    { label: "The board", href: "#board" },
    { label: "Branches", href: "#branches" },
    { label: "The showroom", href: "#room" },
  ],

  hero: {
    eyebrow: "Three branches · Cairo & Fayoum",
    headline: "No waiting, just driving",
    sloganA: "NO WAITING",
    sloganB: "JUST DRIVING",
    sub: "It is written on the wall of their own showroom, and it is the hashtag under every post they publish. Al Rowad Auto sell new cars from five origins across three branches, on immediate delivery.",
    primaryCta: "Call a branch",
    secondaryCta: "See the board",
    boardHint: "Move to steer.",
    heroAlt: "A KGM Actyon in Al Rowad Auto's showroom, in front of the wall reading NO WAITING JUST DRIVING.",
    statusNow: "Immediate delivery",
  },

  about: {
    heading: "Al Rowad Auto",
    body: [
      "Al Rowad Auto Group run three branches — two in Cairo, one in Fayoum — and publish the same block at the foot of every post: the addresses, a bank of numbers per branch, and the words تسليم فوري, immediate delivery.",
    ],
  },

  services: { heading: "The board", items: [] },
  gallery: { heading: "The board", items: [] },

  origins: {
    eyebrow: "What they carry",
    heading: "Five origins on one floor",
    intro:
      "Their bio does not sort cars by segment or by price. It sorts them by where they are made, and it names five. Everything below is grouped exactly that way, using their own five words.",
    quote: "We bring you every marque — Chinese, European, American, Korean and Spanish.",
    labels: {
      chinese: "Chinese",
      european: "European",
      american: "American",
      korean: "Korean",
      spanish: "Spanish",
    },
    countLabel: "marques",
  },

  board: {
    eyebrow: "On the board",
    heading: "Everything they named, and what it says",
    intro:
      "The cars from their recent posts, with the line they wrote for each — in the language they wrote it in — and the offer where they published one.",
    columns: { model: "Model", line: "Their line", status: "Status" },
    statusNow: "Immediate delivery",
    offerLabel: "Cashback",
    wroteAr: "Posted in Arabic",
    wroteEn: "Posted in English",
    viewPost: "See the post",
    noPhoto: "This one they announced as artwork, not a photograph, so none is shown here.",
  },

  branches: {
    eyebrow: "Where they are",
    heading: "Three branches, one phone block",
    intro:
      "Each branch publishes its own run of consecutive numbers — 280, 282, 283, 284 at the Autostrad, 281, 285, 286, 287 in Nasr City. It is a small detail that tells you the size of the operation.",
    names: {
      autostrad: "Autostrad branch",
      "nasr-city": "Nasr City branch",
      fayoum: "Fayoum branch",
    },
    addresses: {
      autostrad: "Maadi Autostrad Road — lower entrance of Al-Meraj City, inside the A1 station",
      "nasr-city": "Showroom S5–S6, Shahid Axis Road, Nasr City",
      fayoum: "Al-Hassan Tower — opposite the Fayoum Culture Palace",
    },
    cityLabels: { cairo: "Cairo", fayoum: "Fayoum" },
    phonesLabel: "Numbers",
    mapCta: "Open in Maps",
    whatsappLabel: "WhatsApp",
  },

  room: {
    eyebrow: "The showroom",
    heading: "The words are on the wall",
    body: [
      "Two frames in their recent feed are actual photographs of the place rather than designed artwork, and both show the same thing: a car under warm light in front of a black wall carrying the slogan and their red shield.",
      "Everything else they post is a made graphic — an offer card, a holiday greeting, a teaser. This page uses only the two photographs, and takes the rest of its material from what they wrote.",
    ],
    frameAlts: [
      "A KGM Actyon in the showroom, in front of the wall reading NO WAITING JUST DRIVING.",
      "A white Venucia 260T in the same showroom, under the same wall.",
    ],
    followersLabel: "Followers",
    postsLabel: "Posts",
    creativeNote: "Photographs only — none of their designed offer artwork is reproduced here.",
  },

  contact: {
    heading: "Talk to a branch",
    addressLabel: "Branches",
    address: "Autostrad · Nasr City · Fayoum",
    phoneLabel: "WhatsApp",
    phones: [PROFILE.whatsapp],
    mapsUrl: "https://maps.app.goo.gl/LY2V5J956qZ3Kwid9",
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call a branch",
  },

  footer: {
    disclaimer:
      "A concept design, built as a demonstration. Not an official Al Rowad Auto site, and not affiliated with them. All photography, marks and quoted copy belong to Al Rowad Auto.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
