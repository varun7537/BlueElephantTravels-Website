import type { ElementType } from "react";

export type Region = "All" | "Asia" | "Europe" | "Middle East" | "Indian Ocean" | "India";
export type SeasonKey = "summer" | "monsoon" | "winter";
export type Vibe = {
  label: string;
  icon: ElementType;
  image: string;
  count: string;
};

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: Region;
  season: SeasonKey[];
  tag: string;
  tagColor: string;
  image: string;
  heroImage?: string;
  description: string;
  highlights: string[];
  duration: string;
  budget: string;
  bestFor: string;
  waLink: string;
  featured?: boolean;
}

export interface SeasonEntry {
  season: string;
  seasonKey: SeasonKey;
  months: string;
  icon: ElementType;
  gradient: string;
  destinations: string[];
  tip: string;
}