import { Users, Star, MapPin, Globe, type LucideIcon } from "lucide-react";

export interface Offering {
  title: string;
  icon: LucideIcon;
  image: string;
  description: string;
  accent: string;
}

export const OFFERINGS: Offering[] = [
  {
    title: "Group Tours",
    icon: Users,
    image: "/images/about/group-tours.webp",
    description:
      "Traveling with friends, family, or colleagues? Our group tours blend comfort, fun, and discovery into one seamless experience. Each tour is carefully planned to balance sightseeing, relaxation, and adventure — from transport to accommodation, every detail handled.",
    accent: "from-violet-500 to-indigo-600",
  },
  {
    title: "Events",
    icon: Star,
    image: "/images/about/events.webp",
    description:
      "From corporate conferences to festive celebrations, we ensure every detail is perfect so you can focus on the occasion. Our event team handles logistics, planning, design, and entertainment — infused with creativity and precision.",
    accent: "from-rose-500 to-pink-600",
  },
  {
    title: "Domestic Travel",
    icon: MapPin,
    image: "/images/about/domestic-travel.webp",
    description:
      "Discover the beauty and diversity of our homeland through journeys that celebrate culture and tradition. Our domestic tours cover vibrant cities, serene landscapes, and hidden gems — each package balancing comfort and authenticity.",
    accent: "from-amber-500 to-orange-600",
  },
  {
    title: "International Journeys",
    icon: Globe,
    image: "/images/about/international-journeys.webp",
    description:
      "From bustling cities to tranquil escapes, our international tours provide a perfect mix of adventure and relaxation. We manage visas, flights, stays, and activities — giving you a hassle-free experience across Europe, Asia, Africa, and beyond.",
    accent: "from-sky-500 to-teal-600",
  },
];