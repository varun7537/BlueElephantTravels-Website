"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  Luggage,
  ShieldCheck,
  Clock,
  Headphones,
  Star,
  Award,
} from "lucide-react";

/* ─────────── TYPES ───────────── */

type Tab = "International" | "Domestic" | "Events";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  waLink: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
};

type Destination = {
  name: string;
  tagline: string;
  image: string;
  waLink: string;
};

/* ─────────── DATA ────────────── */

const SERVICES: Record<Tab, Service[]> = {
  International: [
    {
      icon: Hotel,
      title: "Hotels",
      description: "Luxurious stays worldwide with best-in-class amenities and handpicked properties.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Hotels*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      icon: Plane,
      title: "Flights",
      description: "Affordable and premium flights to every corner of the globe, curated for comfort.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Flights*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      icon: FileText,
      title: "Visa",
      description: "Hassle-free visa assistance for 190+ countries — we handle the paperwork, you pack.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Visa*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badge: "Fast Track",
    },
    {
      icon: Camera,
      title: "Sightseeing",
      description: "Guided tours and immersive experiences that reveal the soul of every destination.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Sightseeing*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: Ship,
      title: "Cruises",
      description: "Curated cruise packages across the Mediterranean, Caribbean, and Southeast Asia.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Cruises*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      icon: Utensils,
      title: "Food & Culture",
      description: "Culinary journeys and cultural deep-dives that go far beyond the tourist trail.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Food+%26+Culture*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ],
  Domestic: [
    {
      icon: MapPin,
      title: "Heritage Tours",
      description: "Explore India's majestic forts, palaces, and centuries of living history.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Heritage+Tours*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: TreePine,
      title: "Wildlife Safaris",
      description: "Tiger sightings in Ranthambore, elephant encounters in Kabini — unforgettable wild moments.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Wildlife+Safaris*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badge: "Best Seller",
    },
    {
      icon: Heart,
      title: "Honeymoon Packages",
      description: "Romantic getaways with candlelit dinners, spa retreats, and breathtaking scenery.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Honeymoon+Packages*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      icon: Users,
      title: "Family & Group",
      description: "Seamlessly coordinated family vacations and group tours for every age and pace.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Family+%26+Group+Tours*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      icon: Hotel,
      title: "Hill Stations",
      description: "Serene escapes to Kashmir, Manali, Coorg and other breathtaking mountain retreats.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Hill+Stations*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      icon: Camera,
      title: "Spiritual Journeys",
      description: "Sacred circuits, Char Dham yatras, and meditative retreats across the subcontinent.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Spiritual+Journeys*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ],
  Events: [
    {
      icon: Briefcase,
      title: "Corporate MICE",
      description: "End-to-end corporate travel, conferences, incentives, and team-building retreats.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Corporate+MICE*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      badge: "Enterprise",
    },
    {
      icon: Heart,
      title: "Destination Weddings",
      description: "Enchanting wedding celebrations at royal palaces, beach resorts, and jungle retreats.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Destination+Weddings*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      icon: Users,
      title: "Group Retreats",
      description: "Wellness and adventure retreats tailored for cohorts, clubs, and close-knit communities.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Group+Retreats*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Globe,
      title: "International Incentives",
      description: "Reward high-performers with world-class international incentive trips they'll never forget.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*International+Incentives*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      icon: Camera,
      title: "Photography Tours",
      description: "Expert-led photography expeditions to India's most photogenic and remote locations.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Photography+Tours*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: Utensils,
      title: "Culinary Events",
      description: "Private dining, food festivals, and chef-led culinary experiences for food enthusiasts.",
      waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Culinary+Events*.%20Could%20you%20please%20share%20the%20details%3F",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ],
};

const DESTINATIONS: Destination[] = [
  {
    name: "Thailand",
    tagline: "Tropical paradise with vibrant culture and golden beaches.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Thailand*.%20Could%20you%20please%20share%20the%20details%3F",
  },
  {
    name: "Dubai",
    tagline: "The city where luxury meets futuristic adventure.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Dubai*.%20Could%20you%20please%20share%20the%20details%3F",
  },
  {
    name: "Bali",
    tagline: "A soulful escape wrapped in nature, temples, and surf.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Bali*.%20Could%20you%20please%20share%20the%20details%3F",
  },
  {
    name: "Maldives",
    tagline: "Romantic overwater bliss in turquoise serenity.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Maldives*.%20Could%20you%20please%20share%20the%20details%3F",
  },
  {
    name: "Singapore",
    tagline: "A smart city blending tradition, innovation, and fun.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    waLink: "https://wa.me/919870324003?text=Hello%2C%20I%27m%20interested%20in%20knowing%20more%20about%20*Singapore*.%20Could%20you%20please%20share%20the%20details%3F",
  },
];

const TABS: Tab[] = ["International", "Domestic", "Events"];

const TAB_ICONS: Record<Tab, React.ElementType> = {
  International: Globe,
  Domestic: MapPin,
  Events: Briefcase,
};

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Share Your Vision",
    description:
      "Tell us where you want to go, your travel dates, group size, and any special wishes. A quick chat or WhatsApp message is all it takes.",
    gradient: "from-sky-400 to-indigo-500",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "We Design Your Trip",
    description:
      "Our expert planners craft a bespoke itinerary — hotels, flights, activities, transfers — tailored precisely to your taste and budget.",
    gradient: "from-indigo-400 to-violet-500",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Review & Confirm",
    description:
      "You review every detail, request any tweaks, and confirm once you're fully satisfied. No pressure, no rush — it's your trip.",
    gradient: "from-violet-400 to-pink-500",
  },
  {
    number: "04",
    icon: Luggage,
    title: "Travel & Enjoy",
    description:
      "Just show up with your bags. We handle everything on-ground — from airport pickups to 24/7 support throughout your journey.",
    gradient: "from-pink-400 to-rose-500",
  },
];

function HowItWorks() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
        >
          <Sparkles size={11} className="text-accent" />
          Simple Process
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subtitle"
        >
          From dream to departure in four effortless steps — we do the heavy lifting so you can focus on the excitement.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
        className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-[10%] right-[10%] top-10 hidden border-t-2 border-dashed border-border lg:block"
        />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
              }}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-6">
                <div
                  className={`inline-grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${step.gradient} shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={30} className="text-white" strokeWidth={1.8} />
                </div>
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white ring-2 ring-white">
                  {step.number}
                </span>
              </div>

              <h5 className="mb-2 font-heading text-base font-bold text-text-primary">
                {step.title}
              </h5>
              <p className="text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>

              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="absolute -right-4 top-10 z-20 hidden -translate-y-1/2 lg:block"
                >
                  <ChevronRight size={18} className="text-border" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 flex justify-center"
      >
        <a
          href="https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20trip%20with%20Blue%20Elephant."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          <MessageSquare size={15} />
          Start Planning on WhatsApp
        </a>
      </motion.div>
    </div>
  );
}


const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Secure Booking",
    description:
      "Every booking is protected with full payment security and transparent pricing — no hidden fees, ever.",
  },
  {
    icon: Headphones,
    title: "24/7 On-Trip Support",
    description:
      "Our team is reachable around the clock throughout your journey — any country, any time zone.",
  },
  {
    icon: Award,
    title: "12+ Years of Excellence",
    description:
      "Over a decade crafting unforgettable journeys for thousands of travellers across the globe.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    description:
      "Precision logistics from airport transfers to hotel check-ins — we respect your time like our own.",
  },
];

const TRUST_STATS = [
  { value: "50,000+", label: "Happy Travellers" },
  { value: "190+", label: "Countries Covered" },
  { value: "4.9 / 5", label: "Average Rating", StarIcon: Star },
  { value: "98%", label: "Would Recommend Us" },
];

function WhyChooseUs() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-secondary px-6 py-14 sm:px-12 sm:py-16">
      <span aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm"
        >
          <Award size={11} className="text-accent" />
          Why Blue Elephant
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Travel with Confidence.{" "}
          <span className="text-accent">We've Got You.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base"
        >
          We're not just a travel agency — we're your personal journey architects, committed to making every trip seamless, memorable, and worth every rupee.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        className="relative z-10 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {TRUST_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
              }}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
            >
              <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-accent/15 transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} className="text-accent" strokeWidth={2} />
              </div>
              <h5 className="font-heading text-[0.95rem] font-bold text-white">
                {pillar.title}
              </h5>
              <p className="text-xs leading-relaxed text-white/60">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4"
      >
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center gap-1.5">
              {stat.StarIcon && <stat.StarIcon size={14} className="fill-amber-400 text-amber-400" />}
              <p className="font-heading text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </p>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/45">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────── SHARED — SERVICE CARD ──────────────────────────*/

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      className="feature-card group relative flex flex-col"
    >
      {service.badge && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
          <Sparkles size={9} />
          {service.badge}
        </span>
      )}

      <div className={`mb-5 inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl ${service.iconBg} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={service.iconColor} size={22} strokeWidth={2} />
      </div>

      <h5 className="mb-2 font-heading text-[1.05rem] font-bold text-text-primary">
        {service.title}
      </h5>
      <p className="flex-1 text-sm leading-relaxed text-text-secondary">
        {service.description}
      </p>

      <a
        href={service.waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2.5"
      >
        Learn More
        <ChevronRight size={15} className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
      </a>

      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[var(--radius-lg)] bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
    </motion.div>
  );
}

/* ───────────────────────────── SHARED — DESTINATION CARD ────────────────────────────────*/

function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <motion.a
      href={dest.waLink}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      whileHover={{ y: -5 }}
      className="group relative block overflow-hidden rounded-2xl shadow-card"
      style={{ aspectRatio: "4/5" }}
    >
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight size={14} className="text-white" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-heading text-2xl font-bold tracking-tight text-white drop-shadow-lg">
          {dest.name}
        </p>
        <p className="mt-1 max-h-0 overflow-hidden text-xs text-white/80 transition-all duration-500 group-hover:max-h-12">
          {dest.tagline}
        </p>
        <div className="mt-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-xs font-semibold text-white/90">Enquire Now</span>
          <ChevronRight size={12} className="text-accent" />
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────── SHARED — SECTION DIVIDER ────────────────────────────── */

function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="my-20 h-px bg-gradient-to-r from-transparent via-border to-transparent"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */

export default function Services() {
  const [activeTab, setActiveTab] = useState<Tab>("International");
  const services = SERVICES[activeTab];

  return (
    <section id="services" className="section bg-background">
      <div className="container-x">

        {/* ── 1. Section Header ── */}
        <header className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
          >
            <Sparkles size={11} className="text-accent" />
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="section-title mt-4"
          >
            Crafted for Every Kind of Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="section-subtitle"
          >
            From luxury international vacations and cultural domestic tours to corporate events
            and weddings — we craft every experience with care, precision, and a personal touch.
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {TABS.map((tab) => {
            const TabIcon = TAB_ICONS[tab];
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-secondary text-white shadow-md"
                    : "border border-border bg-surface text-text-secondary hover:border-secondary/40 hover:text-text-primary"
                }`}
              >
                <TabIcon size={14} />
                {tab}
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </motion.div>
        </AnimatePresence>

        <Divider />

        <HowItWorks />

        <Divider />

        <WhyChooseUs />

        <Divider />

        <header className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
          >
            <MapPin size={11} className="text-accent" />
            Popular Destinations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="section-title mt-4"
          >
            Where Will You Go Next?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="section-subtitle"
          >
            Handpicked destinations our travellers love the most — each one waiting to tell you its story.
          </motion.p>
        </header>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          <div className="flex flex-col gap-4 lg:col-span-4">
            {DESTINATIONS.slice(0, 3).map((dest) => (
              <motion.a
                key={dest.name}
                href={dest.waLink}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.55 } },
                }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-sm transition-all duration-300 hover:border-secondary/30 hover:shadow-md"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-base font-bold text-text-primary">{dest.name}</p>
                  <p className="mt-0.5 truncate text-xs text-text-secondary">{dest.tagline}</p>
                </div>
                <div className="shrink-0 text-text-muted transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5">
                  <ChevronRight size={16} />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-8">
            {DESTINATIONS.slice(3).map((dest) => (
              <DestinationCard key={dest.name} dest={dest} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-8 py-6 sm:flex-row"
        >
          <div>
            <p className="font-heading text-lg font-bold text-text-primary">
              Can't find what you're looking for?
            </p>
            <p className="mt-0.5 text-sm text-text-secondary">
              Tell us your dream trip — we'll craft a bespoke itinerary just for you.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20a%20custom%20travel%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Sparkles size={15} />
              Request Custom Package
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-secondary/40 hover:bg-surface"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}