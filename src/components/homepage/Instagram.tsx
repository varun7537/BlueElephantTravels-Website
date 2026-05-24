"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  Clock,
  Star,
  Car,
  Utensils,
  Hotel,
  Bike,
  Plane,
  Map,
} from "lucide-react";

/* ─── Types ────────────────────────────────────────────────────────────────── */

type Badge = "New" | "% Offer" | "Featured" | null;

type Package = {
  id: number;
  title: string;
  location: string;
  days: number;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: Badge;
  category: "Tour" | "Hotel" | "Restaurant" | "Rental" | "Activity" | "Car Rental";
};

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const PACKAGES: Package[] = [
  {
    id: 1,
    title: "Two Hour Walking Tour Of Manhattan",
    location: "Veins City, Italy",
    days: 7,
    price: 320,
    originalPrice: null,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Tour",
  },
  {
    id: 2,
    title: "When You Visit The Eternal Dubai City",
    location: "Dubai, Emirates",
    days: 2,
    price: 149,
    originalPrice: 299,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Tour",
  },
  {
    id: 3,
    title: "The Pulau Seribu, Jakarta Indonesia",
    location: "51 Dekar Land, Thailand",
    days: 5,
    price: 349,
    originalPrice: null,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Tour",
  },
  {
    id: 4,
    title: "American Parks Trail End Rapid City Express",
    location: "New York, USA",
    days: 3,
    price: 255,
    originalPrice: 289,
    rating: 4,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Tour",
  },
  {
    id: 5,
    title: "Southwestern Switzerland Akam City",
    location: "Switzerland City",
    days: 3,
    price: 255,
    originalPrice: 259,
    rating: 4,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Tour",
  },
  {
    id: 6,
    title: "Modern Stefano La Piazze Wergeland",
    location: "East Norway",
    days: 5,
    price: 255,
    originalPrice: 259,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Tour",
  },
  {
    id: 7,
    title: "Vatican Museums, Sistine Chapel Skip The Line",
    location: "Rome City",
    days: 7,
    price: 142,
    originalPrice: 289,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Tour",
  },
  {
    id: 8,
    title: "Win Cities On Opposite Sides Of The",
    location: "Sydney, Australia",
    days: 4,
    price: 110,
    originalPrice: 249,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Tour",
  },
  // Hotel
  {
    id: 9,
    title: "The Leela Palace — A Royal Experience",
    location: "New Delhi, India",
    days: 3,
    price: 480,
    originalPrice: 600,
    rating: 5,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Hotel",
  },
  {
    id: 10,
    title: "Cliff Side Retreat — Santorini Luxury Stay",
    location: "Santorini, Greece",
    days: 5,
    price: 720,
    originalPrice: 900,
    rating: 5,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Hotel",
  },
  {
    id: 11,
    title: "Desert Rose Riad, Marrakech",
    location: "Marrakech, Morocco",
    days: 4,
    price: 310,
    originalPrice: null,
    rating: 4,
    reviews: 6,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Hotel",
  },
  {
    id: 12,
    title: "Overwater Bungalow — Maldives Retreat",
    location: "North Malé, Maldives",
    days: 7,
    price: 1250,
    originalPrice: 1500,
    rating: 5,
    reviews: 20,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Hotel",
  },
  {
    id: 13,
    title: "Alpine Chalet — Zermatt Mountain Stay",
    location: "Zermatt, Switzerland",
    days: 6,
    price: 890,
    originalPrice: 1050,
    rating: 5,
    reviews: 9,
    image: "https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Hotel",
  },
  {
    id: 14,
    title: "Heritage Haveli — Jaipur Palace Hotel",
    location: "Jaipur, Rajasthan",
    days: 4,
    price: 275,
    originalPrice: null,
    rating: 4,
    reviews: 11,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Hotel",
  },
  {
    id: 15,
    title: "Bamboo Forest Lodge — Kyoto Escape",
    location: "Kyoto, Japan",
    days: 5,
    price: 640,
    originalPrice: 750,
    rating: 5,
    reviews: 14,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Hotel",
  },
  {
    id: 16,
    title: "Tuscan Villa — Florence Countryside",
    location: "Florence, Italy",
    days: 8,
    price: 980,
    originalPrice: 1200,
    rating: 5,
    reviews: 7,
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Hotel",
  },
  // Restaurant
  {
    id: 17,
    title: "Spice Route — Pan-Indian Fine Dining",
    location: "Mumbai, India",
    days: 1,
    price: 85,
    originalPrice: null,
    rating: 5,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Restaurant",
  },
  {
    id: 18,
    title: "Sakura Omakase — Tokyo Sushi Bar",
    location: "Shibuya, Tokyo",
    days: 1,
    price: 120,
    originalPrice: 150,
    rating: 5,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Restaurant",
  },
  {
    id: 19,
    title: "La Terrasse — Rooftop Dinner Paris",
    location: "Montmartre, Paris",
    days: 1,
    price: 95,
    originalPrice: null,
    rating: 5,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Restaurant",
  },
  {
    id: 20,
    title: "Kasbah Table — Moroccan Feast Night",
    location: "Fes, Morocco",
    days: 1,
    price: 55,
    originalPrice: 75,
    rating: 4,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Restaurant",
  },
  {
    id: 21,
    title: "Seafood Shack — Beachfront Goa Experience",
    location: "Anjuna, Goa",
    days: 1,
    price: 40,
    originalPrice: null,
    rating: 4,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Restaurant",
  },
  {
    id: 22,
    title: "El Celler de Can Roca — Girona Classic",
    location: "Girona, Spain",
    days: 1,
    price: 210,
    originalPrice: 260,
    rating: 5,
    reviews: 9,
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Restaurant",
  },
  {
    id: 23,
    title: "Balinese Garden Dinner — Ubud Table",
    location: "Ubud, Bali",
    days: 1,
    price: 60,
    originalPrice: null,
    rating: 5,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Restaurant",
  },
  {
    id: 24,
    title: "Harbour View Brunch — Sydney Sunday",
    location: "Darling Harbour, Sydney",
    days: 1,
    price: 75,
    originalPrice: 95,
    rating: 4,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Restaurant",
  },
  // Rental
  {
    id: 25,
    title: "Private Yacht Charter — Amalfi Coast",
    location: "Positano, Italy",
    days: 2,
    price: 950,
    originalPrice: 1200,
    rating: 5,
    reviews: 7,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Rental",
  },
  {
    id: 26,
    title: "Houseboat Rental — Kerala Backwaters",
    location: "Alleppey, Kerala",
    days: 3,
    price: 280,
    originalPrice: null,
    rating: 5,
    reviews: 22,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Rental",
  },
  {
    id: 27,
    title: "Vespa Day Rental — Rome Old City",
    location: "Rome, Italy",
    days: 1,
    price: 65,
    originalPrice: 85,
    rating: 4,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Rental",
  },
  {
    id: 28,
    title: "Campervan Rental — New Zealand Road Trip",
    location: "Auckland, New Zealand",
    days: 10,
    price: 740,
    originalPrice: 900,
    rating: 5,
    reviews: 13,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Rental",
  },
  {
    id: 29,
    title: "Luxury Villa Rental — Ibiza Hilltop",
    location: "Ibiza, Spain",
    days: 7,
    price: 3200,
    originalPrice: 4000,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Rental",
  },
  {
    id: 30,
    title: "Surfboard & Wetsuit — Bali Canggu",
    location: "Canggu, Bali",
    days: 1,
    price: 30,
    originalPrice: null,
    rating: 4,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Rental",
  },
  {
    id: 31,
    title: "Jeep Rental — Iceland Ring Road",
    location: "Reykjavik, Iceland",
    days: 8,
    price: 1100,
    originalPrice: 1350,
    rating: 5,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Rental",
  },
  {
    id: 32,
    title: "Gondola Ride & Private Tour — Venice",
    location: "Venice, Italy",
    days: 1,
    price: 180,
    originalPrice: 220,
    rating: 5,
    reviews: 16,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Rental",
  },
  // Activity
  {
    id: 33,
    title: "Hot Air Balloon — Cappadocia Sunrise",
    location: "Göreme, Turkey",
    days: 1,
    price: 195,
    originalPrice: 250,
    rating: 5,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Activity",
  },
  {
    id: 34,
    title: "Scuba Diving Package — Great Barrier Reef",
    location: "Cairns, Australia",
    days: 2,
    price: 320,
    originalPrice: null,
    rating: 5,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Activity",
  },
  {
    id: 35,
    title: "Northern Lights Chase — Tromsø Norway",
    location: "Tromsø, Norway",
    days: 3,
    price: 450,
    originalPrice: 550,
    rating: 5,
    reviews: 17,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Activity",
  },
  {
    id: 36,
    title: "Camel Safari — Thar Desert Jaisalmer",
    location: "Jaisalmer, Rajasthan",
    days: 2,
    price: 120,
    originalPrice: 160,
    rating: 4,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Activity",
  },
  {
    id: 37,
    title: "White Water Rafting — Rishikesh Rapids",
    location: "Rishikesh, India",
    days: 1,
    price: 55,
    originalPrice: null,
    rating: 5,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Activity",
  },
  {
    id: 38,
    title: "Paragliding Over Swiss Alps — Interlaken",
    location: "Interlaken, Switzerland",
    days: 1,
    price: 240,
    originalPrice: 295,
    rating: 5,
    reviews: 21,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Activity",
  },
  {
    id: 39,
    title: "Snorkeling & Island Hop — Phi Phi Islands",
    location: "Krabi, Thailand",
    days: 1,
    price: 75,
    originalPrice: 100,
    rating: 4,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Activity",
  },
  {
    id: 40,
    title: "Sahara Desert Camp — Stargazing Night",
    location: "Merzouga, Morocco",
    days: 2,
    price: 165,
    originalPrice: null,
    rating: 5,
    reviews: 33,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
    badge: null,
    category: "Activity",
  },
  // Car Rental
  {
    id: 41,
    title: "Luxury Sedan — Mumbai Airport Transfer",
    location: "Mumbai, India",
    days: 1,
    price: 45,
    originalPrice: 65,
    rating: 5,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Car Rental",
  },
  {
    id: 42,
    title: "Ferrari Day Drive — Monaco Grand Circuit",
    location: "Monaco",
    days: 1,
    price: 1200,
    originalPrice: null,
    rating: 5,
    reviews: 11,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Car Rental",
  },
  {
    id: 43,
    title: "Convertible Rental — California PCH",
    location: "Los Angeles, USA",
    days: 5,
    price: 380,
    originalPrice: 460,
    rating: 5,
    reviews: 26,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Car Rental",
  },
  {
    id: 44,
    title: "4x4 Safari Vehicle — Masai Mara",
    location: "Nairobi, Kenya",
    days: 4,
    price: 520,
    originalPrice: 650,
    rating: 5,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Car Rental",
  },
  {
    id: 45,
    title: "Electric Car Rental — Reykjavik Iceland",
    location: "Reykjavik, Iceland",
    days: 7,
    price: 490,
    originalPrice: null,
    rating: 4,
    reviews: 14,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Car Rental",
  },
  {
    id: 46,
    title: "Vintage VW Camper — Portugal Coast Road",
    location: "Lisbon, Portugal",
    days: 6,
    price: 420,
    originalPrice: 520,
    rating: 5,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    category: "Car Rental",
  },
  {
    id: 47,
    title: "Chauffeur Limousine — NYC City Tour",
    location: "New York, USA",
    days: 1,
    price: 280,
    originalPrice: 350,
    rating: 5,
    reviews: 37,
    image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?auto=format&fit=crop&w=800&q=80",
    badge: "% Offer",
    category: "Car Rental",
  },
  {
    id: 48,
    title: "Tuk-Tuk Rental — Bangkok Street Explorer",
    location: "Bangkok, Thailand",
    days: 1,
    price: 25,
    originalPrice: null,
    rating: 4,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    category: "Car Rental",
  },
];

const TABS = [
  { label: "Tour", icon: Map },
  { label: "Hotel", icon: Hotel },
  { label: "Restaurant", icon: Utensils },
  { label: "Rental", icon: Bike },
  { label: "Activity", icon: Plane },
  { label: "Car Rental", icon: Car },
] as const;

type TabLabel = (typeof TABS)[number]["label"];

/* ─── Badge component ──────────────────────────────────────────────────────── */

function BadgeChip({ badge }: { badge: Badge }) {
  if (!badge) return null;

  const styles: Record<NonNullable<Badge>, string> = {
    "New": "bg-emerald-500",
    "% Offer": "bg-orange-500",
    "Featured": "bg-amber-500",
  };

  return (
    <span
      className={`absolute left-3 top-3 z-10 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow ${styles[badge]}`}
    >
      {badge}
    </span>
  );
}

/* ─── Star rating ──────────────────────────────────────────────────────────── */

function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={i < count ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

/* ─── Package Card ──────────────────────────────────────────────────────────── */

function PackageCard({ pkg }: { pkg: Package }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 26 } },
      }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <BadgeChip badge={pkg.badge} />
        <button
          aria-label="Wishlist"
          onClick={() => setWished((w) => !w)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110 active:scale-95"
        >
          <Heart
            size={15}
            className={wished ? "fill-rose-500 text-rose-500" : "text-gray-400"}
            strokeWidth={wished ? 0 : 1.8}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900">
          {pkg.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin size={12} className="shrink-0 text-gray-400" />
          <span className="truncate">{pkg.location}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={12} className="shrink-0 text-gray-400" />
          <span>{pkg.days} {pkg.days === 1 ? "Day" : "Days"}</span>
        </div>

        <div className="mt-auto border-t border-gray-100 pt-2.5">
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              {pkg.originalPrice && (
                <span className="text-[11px] text-gray-400 line-through">
                  ${pkg.originalPrice}/Person
                </span>
              )}
              <span className="rounded-md bg-primary px-2.5 py-1 text-sm font-bold text-white">
                ${pkg.price}
                <span className="text-[11px] font-medium opacity-80"> /Person</span>
              </span>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              <Stars count={pkg.rating} />
              <span className="text-[11px] text-gray-400">({pkg.reviews} Reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default function TourPackages() {
  const [active, setActive] = useState<TabLabel>("Tour");

  const visible = PACKAGES.filter((p) => p.category === active);

  return (
    <section id="packages" className="section bg-surface">
      <div className="container-x">
        <header className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Most Popular Tour Packages
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mt-2"
          >
            Something Amazing Waiting For You
          </motion.h2>

          <div className="mt-8 flex items-center justify-start gap-1 overflow-x-auto pb-1 sm:justify-center sm:overflow-visible">
            {TABS.map(({ label, icon: Icon }) => {
              const isActive = label === active;
              return (
                <button
                  key={label}
                  onClick={() => setActive(label)}
                  className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                  }`}
                >
                  <Icon size={13} strokeWidth={1.8} />
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="pkg-tab-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visible.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}