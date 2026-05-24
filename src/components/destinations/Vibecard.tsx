"use client";

import { motion } from "framer-motion";
import type { Vibe } from "../../app/destinations/components/types";

const WA_LINK =
  "https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20help%20planning%20a%20trip.";

interface VibeCardProps {
  vibe: Vibe;
}

export default function VibeCard({ vibe }: VibeCardProps) {
  const Icon = vibe.icon;

  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      whileHover={{ y: -5 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card"
    >
      <img
        src={vibe.image}
        alt={vibe.label}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover icon */}
      <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <Icon size={14} className="text-white" />
      </div>

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-heading text-sm font-bold leading-tight text-white">{vibe.label}</p>
        <p className="mt-0.5 text-[10px] text-white/55">{vibe.count}</p>
      </div>
    </motion.a>
  );
}