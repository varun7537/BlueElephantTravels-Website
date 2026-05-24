import {
  Fingerprint,
  Heart,
  ShieldCheck,
  Compass,
  Star,
  type LucideIcon,
} from "lucide-react";

export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export const VALUES: Value[] = [
  {
    icon: Fingerprint,
    title: "Authenticity",
    description:
      "Travel should feel real and immersive, letting you connect deeply with people, traditions, and culture.",
    gradient: "from-sky-400 to-indigo-500",
  },
  {
    icon: Heart,
    title: "Personalization",
    description:
      "Every traveller is unique. We design journeys tailored to your pace, style, and aspirations.",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "Our transparent process and reliable team ensure you always know what to expect.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Compass,
    title: "Adventure",
    description:
      "Every itinerary includes opportunities for fun, exploration, and discovery.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Star,
    title: "Care",
    description:
      "From booking to returning home, we manage details so you can enjoy without stress.",
    gradient: "from-violet-400 to-purple-500",
  },
];