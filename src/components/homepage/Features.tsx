"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Building2,
  Compass,
  PawPrint,
  Heart,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  cardGradient: string;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
  glowColor: string;
  titleColor: string;
  descColor: string;
};

const FEATURES: Feature[] = [
  {
    icon: Plane,
    title: "Custom Itineraries",
    description:
      "We craft bespoke travel plans aligned with your interests, pace, and budget — no two trips are ever the same.",
    cardGradient: "from-sky-50 via-sky-100/60 to-indigo-50",
    iconBg: "bg-sky-500",
    iconColor: "text-white",
    borderAccent: "bg-gradient-to-r from-sky-400 to-indigo-500",
    glowColor: "rgba(14,165,233,0.22)",
    titleColor: "text-sky-900",
    descColor: "text-sky-800/75",
  },
  {
    icon: Building2,
    title: "Luxury Accommodations",
    description:
      "Handpicked heritage hotels, boutique retreats, and jungle lodges that elevate your stay to an experience in itself.",
    cardGradient: "from-rose-50 via-rose-100/60 to-pink-50",
    iconBg: "bg-rose-500",
    iconColor: "text-white",
    borderAccent: "bg-gradient-to-r from-rose-400 to-pink-500",
    glowColor: "rgba(244,63,94,0.20)",
    titleColor: "text-rose-900",
    descColor: "text-rose-800/75",
  },
  {
    icon: Compass,
    title: "Expert Local Guides",
    description:
      "Our knowledgeable guides bring history, culture and hidden stories to life — turning sightseeing into storytelling.",
    cardGradient: "from-emerald-50 via-emerald-100/60 to-teal-50",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    borderAccent: "bg-gradient-to-r from-emerald-400 to-teal-500",
    glowColor: "rgba(16,185,129,0.22)",
    titleColor: "text-emerald-900",
    descColor: "text-emerald-800/75",
  },
  {
    icon: PawPrint,
    title: "Wildlife Safaris",
    description:
      "From tiger sightings in Ranthambore to elephant encounters in Kabini — unforgettable wildlife experiences await.",
    cardGradient: "from-amber-50 via-amber-100/60 to-orange-50",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    borderAccent: "bg-gradient-to-r from-amber-400 to-orange-500",
    glowColor: "rgba(245,158,11,0.22)",
    titleColor: "text-amber-900",
    descColor: "text-amber-800/75",
  },
  {
    icon: Heart,
    title: "Honeymoon Packages",
    description:
      "Romantic getaways crafted with special touches — candlelit dinners, spa treatments, and breathtaking sunsets.",
    cardGradient: "from-pink-50 via-pink-100/60 to-fuchsia-50",
    iconBg: "bg-pink-500",
    iconColor: "text-white",
    borderAccent: "bg-gradient-to-r from-pink-400 to-fuchsia-500",
    glowColor: "rgba(236,72,153,0.20)",
    titleColor: "text-pink-900",
    descColor: "text-pink-800/75",
  },
  {
    icon: Users,
    title: "Group & Family Tours",
    description:
      "Seamlessly coordinated group tours and family vacations that create shared memories to last a lifetime.",
    cardGradient: "from-violet-50 via-violet-100/60 to-purple-50",
    iconBg: "bg-violet-500",
    iconColor: "text-white",
    borderAccent: "bg-gradient-to-r from-violet-400 to-purple-500",
    glowColor: "rgba(139,92,246,0.22)",
    titleColor: "text-violet-900",
    descColor: "text-violet-800/75",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 48px -8px ${feature.glowColor}, 0 4px 16px -4px ${feature.glowColor}`,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${feature.cardGradient} border border-white/80 shadow-sm transition-shadow duration-300`}
    >
      <div className={`h-1 w-full ${feature.borderAccent}`} />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -right-4 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.12]"
      >
        <Icon size={120} strokeWidth={1.2} />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-7">
        <div
          className={`mb-6 inline-grid h-13 w-13 place-items-center rounded-2xl ${feature.iconBg} shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          style={{ height: "3.25rem", width: "3.25rem" }}
        >
          <Icon className={feature.iconColor} size={22} strokeWidth={2.2} />
        </div>

        <h5 className={`mb-3 font-heading text-[1.05rem] font-bold leading-tight ${feature.titleColor}`}>
          {feature.title}
        </h5>

        <p className={`flex-1 text-sm leading-relaxed ${feature.descColor}`}>
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -right-24 top-10 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-20 left-20 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-16 right-10 h-72 w-72 rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)" }}
      />
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="section relative overflow-hidden bg-slate-50">
      <MeshBackground />

      <div className="container-x relative z-10">
        <header className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            What We Offer
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="section-title mt-4"
          >
            Travel Crafted with Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="section-subtitle"
          >
            Every journey we plan is tailored to your dreams — we handle every detail so you can
            focus on making memories.
          </motion.p>
        </header>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}