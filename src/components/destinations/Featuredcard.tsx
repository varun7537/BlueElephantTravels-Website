"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Wallet, Users, ArrowRight } from "lucide-react";
import type { Destination } from "../../app/destinations/components/types";

interface FeaturedCardLargeProps {
  dest: Destination;
}

export function FeaturedCardLarge({ dest }: FeaturedCardLargeProps) {
  return (
    <motion.a
      href={dest.waLink}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, x: -24 },
        show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      whileHover={{ y: -4 }}
      className="group relative block overflow-hidden rounded-3xl shadow-lift"
      style={{ minHeight: "520px" }}
    >
      <img
        src={dest.heroImage || dest.image}
        alt={dest.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Tag */}
      <div className="absolute left-5 top-5">
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${dest.tagColor}`}>
          {dest.tag}
        </span>
      </div>

      {/* Region badge */}
      <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
        <MapPin size={11} className="text-accent" />
        <span className="text-[11px] font-semibold text-white">{dest.region}</span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{dest.country}</p>
        <h3 className="mt-1 font-heading text-4xl font-bold text-white">{dest.name}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{dest.description}</p>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <Clock size={12} /> {dest.duration}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <Wallet size={12} /> from {dest.budget}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <Users size={12} /> {dest.bestFor}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-secondary shadow transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg">
            Enquire Now <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

interface FeaturedCardSmallProps {
  dest: Destination;
}

export function FeaturedCardSmall({ dest }: FeaturedCardSmallProps) {
  return (
    <motion.a
      href={dest.waLink}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, x: 24 },
        show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      whileHover={{ y: -4 }}
      className="group relative flex-1 overflow-hidden rounded-3xl shadow-card"
      style={{ minHeight: "245px" }}
    >
      <img
        src={dest.heroImage || dest.image}
        alt={dest.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute left-4 top-4">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${dest.tagColor}`}>
          {dest.tag}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">{dest.country}</p>
        <h3 className="mt-0.5 font-heading text-2xl font-bold text-white">{dest.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] text-white/60">
            <Clock size={10} /> {dest.duration}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-white/60">
            <Wallet size={10} /> from {dest.budget}
          </span>
        </div>
      </div>
    </motion.a>
  );
}