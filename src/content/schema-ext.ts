import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";
import type { Origin } from "./media";

/**
 * Al Rowad's proposition is availability: their hashtag on every post is
 * "No waiting, just driving", and the block at the foot of each one lists
 * three branches. The shared schema has no vocabulary for a slogan, a
 * five-way origin split or a branch network, so this extension carries them.
 */
export type RowadContent = SiteContent & {
  hero: SiteContent["hero"] & {
    sloganA: string;
    sloganB: string;
    boardHint: string;
    heroAlt: string;
    statusNow: string;
  };
  origins: {
    eyebrow: string;
    heading: string;
    intro: string;
    quote: string;
    labels: Record<Origin, string>;
    countLabel: string;
  };
  board: {
    eyebrow: string;
    heading: string;
    intro: string;
    columns: { model: string; line: string; status: string };
    statusNow: string;
    wroteAr: string;
    wroteEn: string;
    viewPost: string;
    noPhoto: string;
  };
  branches: {
    eyebrow: string;
    heading: string;
    intro: string;
    names: Record<string, string>;
    addresses: Record<string, string>;
    cityLabels: Record<"cairo" | "fayoum", string>;
    phonesLabel: string;
    mapCta: string;
    whatsappLabel: string;
  };
  room: {
    eyebrow: string;
    heading: string;
    body: string[];
    frameAlts: string[];
    followersLabel: string;
    postsLabel: string;
    creativeNote: string;
  };
};

export function useRowad() {
  return useContent() as RowadContent;
}
