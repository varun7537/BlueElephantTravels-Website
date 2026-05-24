import {
  Globe,
  Sun,
  Snowflake,
  Star,
  Leaf,
  MapPin,
  Camera,
  Heart,
  Plane,
} from "lucide-react";
import type { Region, SeasonEntry, Vibe } from "../components/types";

export const REGIONS: Region[] = [
  "All",
  "Asia",
  "Europe",
  "Middle East",
  "Indian Ocean",
  "India",
];

export const REGION_ICONS: Record<Region, React.ElementType> = {
  All: Globe,
  Asia: Sun,
  Europe: Snowflake,
  "Middle East": Star,
  "Indian Ocean": Leaf,
  India: MapPin,
};

export const SEASON_TABS = ["All Year", "Summer", "Monsoon", "Winter"] as const;

export const SEASON_DATA: SeasonEntry[] = [
  {
    season: "Summer",
    seasonKey: "summer",
    months: "Apr – Jun",
    icon: Sun,
    gradient: "from-amber-400 to-orange-500",
    destinations: ["Europe", "Kashmir", "Ladakh", "Himachal", "Scandinavia"],
    tip: "Perfect for European adventures, high-altitude India, and long days in Ladakh.",
  },
  {
    season: "Monsoon",
    seasonKey: "monsoon",
    months: "Jul – Sep",
    icon: Leaf,
    gradient: "from-emerald-400 to-teal-500",
    destinations: ["Kerala", "Bali", "Sri Lanka", "Northeast India", "Coorg"],
    tip: "Lush greenery, waterfalls in full flow, and great deals on domestic and Southeast Asian trips.",
  },
  {
    season: "Winter",
    seasonKey: "winter",
    months: "Oct – Mar",
    icon: Snowflake,
    gradient: "from-sky-400 to-indigo-500",
    destinations: ["Goa", "Rajasthan", "Dubai", "Maldives", "Thailand", "Singapore"],
    tip: "The golden season — clear skies, beach getaways, and the best conditions for most international trips.",
  },
];

export const VIBES: Vibe[] = [
  {
    label: "Beach Escapes",
    icon: Sun,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    count: "12 destinations",
  },
  {
    label: "Mountain Retreats",
    icon: Snowflake,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
    count: "9 destinations",
  },
  {
    label: "Heritage & Culture",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    count: "15 destinations",
  },
  {
    label: "Romantic Getaways",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
    count: "10 destinations",
  },
  {
    label: "Adventure Trips",
    icon: Plane,
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80",
    count: "8 destinations",
  },
  {
    label: "Wildlife Safaris",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    count: "6 destinations",
  },
];