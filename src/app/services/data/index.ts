import {
  Globe,
  MapPin,
  Briefcase,
  Hotel,
  Plane,
  FileText,
  Camera,
  Utensils,
  Ship,
  TreePine,
  Heart,
  Users,
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  Luggage,
  ShieldCheck,
  Clock,
  Headphones,
  Award,
} from "lucide-react";
import type { Destination, Service, Step, Tab, TrustPillar, TrustStat } from "../types/index";

export const TABS: Tab[] = ["International", "Domestic", "Events"];

export const TAB_ICONS: Record<Tab, React.ElementType> = {
  International: Globe,
  Domestic: MapPin,
  Events: Briefcase,
};

export const SERVICES: Record<Tab, Service[]> = {
  International: [
    {
      icon: Hotel,
      title: "Hotels",
      description: "Luxurious stays worldwide with best-in-class amenities and handpicked properties.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Hotels*.",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      accent: "#0ea5e9",
    },
    {
      icon: Plane,
      title: "Flights",
      description: "Affordable and premium flights to every corner of the globe, curated for comfort.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Flights*.",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      accent: "#6366f1",
    },
    {
      icon: FileText,
      title: "Visa",
      description: "Hassle-free visa assistance for 190+ countries — we handle the paperwork, you pack.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Visa*.",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badge: "Fast Track",
      accent: "#10b981",
    },
    {
      icon: Camera,
      title: "Sightseeing",
      description: "Guided tours and immersive experiences that reveal the soul of every destination.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Sightseeing*.",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      accent: "#f59e0b",
    },
    {
      icon: Ship,
      title: "Cruises",
      description: "Curated cruise packages across the Mediterranean, Caribbean, and Southeast Asia.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Cruises*.",
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
      accent: "#06b6d4",
    },
    {
      icon: Utensils,
      title: "Food & Culture",
      description: "Culinary journeys and cultural deep-dives that go far beyond the tourist trail.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Food+%26+Culture*.",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      accent: "#f43f5e",
    },
  ],
  Domestic: [
    {
      icon: MapPin,
      title: "Heritage Tours",
      description: "Explore India's majestic forts, palaces, and centuries of living history.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Heritage+Tours*.",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      accent: "#f59e0b",
    },
    {
      icon: TreePine,
      title: "Wildlife Safaris",
      description: "Tiger sightings in Ranthambore, elephant encounters in Kabini — unforgettable wild moments.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Wildlife+Safaris*.",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badge: "Best Seller",
      accent: "#10b981",
    },
    {
      icon: Heart,
      title: "Honeymoon Packages",
      description: "Romantic getaways with candlelit dinners, spa retreats, and breathtaking scenery.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Honeymoon+Packages*.",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      accent: "#ec4899",
    },
    {
      icon: Users,
      title: "Family & Group",
      description: "Seamlessly coordinated family vacations and group tours for every age and pace.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Family+%26+Group+Tours*.",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accent: "#8b5cf6",
    },
    {
      icon: Hotel,
      title: "Hill Stations",
      description: "Serene escapes to Kashmir, Manali, Coorg and other breathtaking mountain retreats.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Hill+Stations*.",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      accent: "#0ea5e9",
    },
    {
      icon: Camera,
      title: "Spiritual Journeys",
      description: "Sacred circuits, Char Dham yatras, and meditative retreats across the subcontinent.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Spiritual+Journeys*.",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      accent: "#f97316",
    },
  ],
  Events: [
    {
      icon: Briefcase,
      title: "Corporate MICE",
      description: "End-to-end corporate travel, conferences, incentives, and team-building retreats.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Corporate+MICE*.",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      badge: "Enterprise",
      accent: "#6366f1",
    },
    {
      icon: Heart,
      title: "Destination Weddings",
      description: "Enchanting wedding celebrations at royal palaces, beach resorts, and jungle retreats.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Destination+Weddings*.",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      accent: "#f43f5e",
    },
    {
      icon: Users,
      title: "Group Retreats",
      description: "Wellness and adventure retreats tailored for cohorts, clubs, and close-knit communities.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Group+Retreats*.",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "#10b981",
    },
    {
      icon: Globe,
      title: "International Incentives",
      description: "Reward high-performers with world-class international incentive trips they'll never forget.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*International+Incentives*.",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accent: "#8b5cf6",
    },
    {
      icon: Camera,
      title: "Photography Tours",
      description: "Expert-led photography expeditions to India's most photogenic and remote locations.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Photography+Tours*.",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      accent: "#f59e0b",
    },
    {
      icon: Utensils,
      title: "Culinary Events",
      description: "Private dining, food festivals, and chef-led culinary experiences for food enthusiasts.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Culinary+Events*.",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      accent: "#f97316",
    },
  ],
};

export const DESTINATIONS: Destination[] = [
  {
    name: "Thailand",
    tagline: "Tropical paradise with vibrant culture and golden beaches.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Thailand*.",
    flag: "🇹🇭",
  },
  {
    name: "Dubai",
    tagline: "The city where luxury meets futuristic adventure.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Dubai*.",
    flag: "🇦🇪",
  },
  {
    name: "Bali",
    tagline: "A soulful escape wrapped in nature, temples, and surf.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Bali*.",
    flag: "🇮🇩",
  },
  {
    name: "Maldives",
    tagline: "Romantic overwater bliss in turquoise serenity.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Maldives*.",
    flag: "🇲🇻",
  },
  {
    name: "Singapore",
    tagline: "A smart city blending tradition, innovation, and fun.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Singapore*.",
    flag: "🇸🇬",
  },
];

export const STEPS: Step[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Share Your Vision",
    description:
      "Tell us your dream destination, travel dates, group size, and any special wishes. A quick WhatsApp message is all it takes.",
    gradient: "from-sky-400 to-indigo-500",
    glow: "rgba(99,102,241,0.35)",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "We Design Your Trip",
    description:
      "Our expert planners craft a bespoke itinerary — hotels, flights, activities, transfers — tailored precisely to your taste and budget.",
    gradient: "from-indigo-400 to-violet-500",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Review & Confirm",
    description:
      "You review every detail, request any tweaks, and confirm once you're fully satisfied. No pressure, no rush — it's your trip.",
    gradient: "from-violet-400 to-pink-500",
    glow: "rgba(236,72,153,0.35)",
  },
  {
    number: "04",
    icon: Luggage,
    title: "Travel & Enjoy",
    description:
      "Just show up with your bags. We handle everything — from airport pickups to 24/7 support throughout your journey.",
    gradient: "from-pink-400 to-rose-500",
    glow: "rgba(244,63,94,0.35)",
  },
];

export const TRUST_PILLARS: TrustPillar[] = [
  {
    icon: ShieldCheck,
    title: "100% Secure Booking",
    description:
      "Every booking is protected with full payment security and transparent pricing — no hidden fees, ever.",
    color: "#10b981",
  },
  {
    icon: Headphones,
    title: "24/7 On-Trip Support",
    description:
      "Our team is reachable around the clock throughout your journey — any country, any time zone.",
    color: "#6366f1",
  },
  {
    icon: Award,
    title: "12+ Years of Excellence",
    description:
      "Over a decade crafting unforgettable journeys for thousands of travellers across the globe.",
    color: "#f59e0b",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    description:
      "Precision logistics from airport transfers to hotel check-ins — we respect your time like our own.",
    color: "#06b6d4",
  },
];

export const TRUST_STATS: TrustStat[] = [
  { value: "50,000+", label: "Happy Travellers" },
  { value: "190+", label: "Countries Covered" },
  { value: "4.9 / 5", label: "Average Rating", hasstar: true },
  { value: "98%", label: "Would Recommend Us" },
];