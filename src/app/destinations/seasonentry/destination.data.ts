import type { Destination } from "../components/types";

export function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    season: ["winter"],
    tag: "Popular",
    tagColor: "bg-amber-100 text-amber-700",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85",
    description:
      "Where luxury meets futuristic adventure. Iconic skylines, golden deserts, and world-class experiences await.",
    highlights: [
      "Burj Khalifa",
      "Desert Safari",
      "Palm Jumeirah",
      "Dubai Mall",
    ],
    duration: "4–7 nights",
    budget: "₹80,000+",
    bestFor: "Luxury & Shopping",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Dubai*.%20Could%20you%20share%20details%3F",
    featured: true,
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    season: ["monsoon"],
    tag: "Trending",
    tagColor: "bg-emerald-100 text-emerald-700",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=1600&q=85",
    description:
      "A soulful escape wrapped in ancient temples, terraced rice fields, and the rhythm of the ocean.",
    highlights: [
      "Ubud Rice Terraces",
      "Tanah Lot Temple",
      "Seminyak Beach",
      "Mount Batur",
    ],
    duration: "5–8 nights",
    budget: "₹55,000+",
    bestFor: "Honeymoon & Culture",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Bali*.%20Could%20you%20share%20details%3F",
    featured: true,
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Indian Ocean",
    season: ["winter"],
    tag: "Exotic",
    tagColor: "bg-sky-100 text-sky-700",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=85",
    description:
      "Turquoise lagoons, overwater villas, and silence so pure it feels like another world.",
    highlights: [
      "Overwater Bungalows",
      "Coral Reef Diving",
      "Sunset Cruises",
      "Private Beach",
    ],
    duration: "5–7 nights",
    budget: "₹1,20,000+",
    bestFor: "Luxury Honeymoon",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Maldives*.%20Could%20you%20share%20details%3F",
    featured: true,
  },
  {
    slug: "thailand",
    name: "Thailand",
    country: "Thailand",
    region: "Asia",
    season: ["winter"],
    tag: "Popular",
    tagColor: "bg-amber-100 text-amber-700",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    description:
      "Vibrant street markets, golden temples, tropical islands, and cuisine that changes everything.",
    highlights: [
      "Bangkok Temples",
      "Phi Phi Islands",
      "Chiang Mai",
      "Floating Markets",
    ],
    duration: "6–10 nights",
    budget: "₹45,000+",
    bestFor: "Family & Adventure",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Thailand*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    season: ["winter"],
    tag: "City Break",
    tagColor: "bg-violet-100 text-violet-700",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    description:
      "A gleaming city-state where colonial charm, futuristic gardens, and incredible food collide.",
    highlights: [
      "Marina Bay Sands",
      "Gardens by the Bay",
      "Sentosa Island",
      "Hawker Centres",
    ],
    duration: "3–5 nights",
    budget: "₹60,000+",
    bestFor: "City & Food",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Singapore*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    country: "India",
    region: "India",
    season: ["summer"],
    tag: "Scenic",
    tagColor: "bg-teal-100 text-teal-700",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1593417376544-4c4201061e22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Heaven on earth — shimmering Dal Lake, snow-capped peaks, and houseboat stays that feel timeless.",
    highlights: [
      "Dal Lake Houseboat",
      "Gulmarg Snow",
      "Pahalgam Valley",
      "Mughal Gardens",
    ],
    duration: "5–7 nights",
    budget: "₹30,000+",
    bestFor: "Nature & Romance",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Kashmir*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    country: "India",
    region: "India",
    season: ["winter"],
    tag: "Heritage",
    tagColor: "bg-rose-100 text-rose-700",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    description:
      "The Pink City — a living museum of Rajput grandeur, with palaces, bazaars, and desert sunsets.",
    highlights: [
      "Amber Fort",
      "City Palace",
      "Hawa Mahal",
      "Elephant Ride",
    ],
    duration: "3–5 nights",
    budget: "₹20,000+",
    bestFor: "Heritage & Culture",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Jaipur*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "kerala",
    name: "Kerala",
    country: "India",
    region: "India",
    season: ["monsoon"],
    tag: "Serene",
    tagColor: "bg-emerald-100 text-emerald-700",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    description:
      "God's Own Country — backwaters, spice gardens, Ayurveda, and lush monsoon greenery.",
    highlights: [
      "Alleppey Backwaters",
      "Munnar Tea Gardens",
      "Kovalam Beach",
      "Ayurvedic Spa",
    ],
    duration: "5–8 nights",
    budget: "₹25,000+",
    bestFor: "Wellness & Nature",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Kerala*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "goa",
    name: "Goa",
    country: "India",
    region: "India",
    season: ["winter"],
    tag: "Popular",
    tagColor: "bg-amber-100 text-amber-700",
    image:
      "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&w=800&q=80",
    description:
      "Sun, sea, and soul — Portuguese forts, beach shacks, and the most legendary sunsets in India.",
    highlights: [
      "Baga & Anjuna Beach",
      "Old Goa Churches",
      "Spice Plantation",
      "Night Markets",
    ],
    duration: "4–6 nights",
    budget: "₹18,000+",
    bestFor: "Beach & Nightlife",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Goa*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    season: ["summer"],
    tag: "Special Offer",
    tagColor: "bg-pink-100 text-pink-700",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    description:
      "Whitewashed villages tumbling into caldera cliffs, with wine-dark seas and incomparable sunsets.",
    highlights: [
      "Oia Sunset",
      "Caldera Cruise",
      "Fira Old Town",
      "Black Sand Beaches",
    ],
    duration: "5–7 nights",
    budget: "₹1,50,000+",
    bestFor: "Honeymoon & Photography",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Santorini*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    season: ["summer"],
    tag: "Classic",
    tagColor: "bg-indigo-100 text-indigo-700",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    description:
      "The City of Light never dims — art, architecture, cuisine, and romance in every arrondissement.",
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Montmartre",
      "Seine River Cruise",
    ],
    duration: "5–8 nights",
    budget: "₹1,30,000+",
    bestFor: "Culture & Romance",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Paris*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    region: "Europe",
    season: ["summer"],
    tag: "Scenic",
    tagColor: "bg-teal-100 text-teal-700",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    description:
      "Alpine perfection — snow-crested peaks, mirror lakes, chocolate-box villages, and pristine air.",
    highlights: [
      "Jungfraujoch",
      "Interlaken",
      "Lake Geneva",
      "Zermatt & Matterhorn",
    ],
    duration: "7–10 nights",
    budget: "₹1,80,000+",
    bestFor: "Scenic & Family",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Switzerland*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    country: "India",
    region: "India",
    season: ["summer"],
    tag: "Adventure",
    tagColor: "bg-orange-100 text-orange-700",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    description:
      "A high-altitude wonderland of stark landscapes, ancient monasteries, and magnetic skies.",
    highlights: [
      "Pangong Lake",
      "Nubra Valley",
      "Magnetic Hill",
      "Thiksey Monastery",
    ],
    duration: "6–9 nights",
    budget: "₹35,000+",
    bestFor: "Adventure & Spiritual",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Ladakh*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    country: "Sri Lanka",
    region: "Asia",
    season: ["monsoon"],
    tag: "Hidden Gem",
    tagColor: "bg-lime-100 text-lime-700",
    image:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
    description:
      "The pearl of the Indian Ocean — tea hills, ancient ruins, leopard safaris, and pristine beaches.",
    highlights: [
      "Sigiriya Rock",
      "Yala Safari",
      "Ella Train Ride",
      "Temple of the Tooth",
    ],
    duration: "7–10 nights",
    budget: "₹40,000+",
    bestFor: "Culture & Wildlife",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Sri%20Lanka*.%20Could%20you%20share%20details%3F",
  },
  {
    slug: "coorg",
    name: "Coorg",
    country: "India",
    region: "India",
    season: ["monsoon"],
    tag: "Serene",
    tagColor: "bg-emerald-100 text-emerald-700",
    image:
      "https://images.unsplash.com/photo-1660559028700-5f2cff62a31b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vbnNvb258ZW58MHx8MHx8fDA%3D",
    description:
      "Scotland of India — misty coffee estates, roaring waterfalls, and a lush monsoon embrace.",
    highlights: [
      "Abbey Falls",
      "Raja's Seat",
      "Coffee Estate Walk",
      "Nagarhole Safari",
    ],
    duration: "3–5 nights",
    budget: "₹15,000+",
    bestFor: "Nature & Couples",
    waLink:
      "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20*Coorg*.%20Could%20you%20share%20details%3F",
  },
];

export type SeasonKey = "summer" | "monsoon" | "winter";

export function getDestinationsBySeasonKey(season: SeasonKey): Destination[] {
  return DESTINATIONS.filter((d) => d.season.includes(season));
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function getRelatedDestinations(
  current: Destination,
  limit = 3
): Destination[] {
  return DESTINATIONS.filter(
    (d) =>
      d.slug !== current.slug &&
      (d.region === current.region ||
        d.season.some((s) => current.season.includes(s)))
  ).slice(0, limit);
}