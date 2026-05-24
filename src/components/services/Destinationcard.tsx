"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Destination } from "../../app/services/types";

interface DestinationCardProps {
  dest: Destination;
}

export function DestinationCard({ dest }: DestinationCardProps) {
  return (
    <motion.a
      href={dest.waLink}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
        },
      }}
      whileHover={{ y: -6 }}
      className="group relative block overflow-hidden rounded-2xl shadow-lg"
      style={{ aspectRatio: "4/5" }}
    >
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-md">
        {dest.flag}
      </div>

      <div className="absolute right-3 top-14 grid h-8 w-8 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight size={14} className="text-white" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">
          {dest.name}
        </p>
        <p className="mt-1 max-h-0 overflow-hidden text-xs text-white/80 transition-all duration-500 group-hover:max-h-12">
          {dest.tagline}
        </p>
        <div className="mt-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-xs font-semibold text-white/90">Enquire Now</span>
          <ChevronRight size={12} className="text-amber-400" />
        </div>
      </div>
    </motion.a>
  );
}