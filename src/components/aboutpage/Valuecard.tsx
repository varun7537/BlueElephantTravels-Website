"use client";

import { motion } from "framer-motion";
import type { Value } from "../../app/about/data/Values.data";

interface ValueCardProps {
  value: Value;
}

export default function ValueCard({ value }: ValueCardProps) {
  const Icon = value.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
    >
      <div
        className={`inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${value.gradient} shadow-md transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon size={22} className="text-white" strokeWidth={2} />
      </div>
      <div>
        <h5 className="font-heading text-base font-bold text-white">{value.title}</h5>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{value.description}</p>
      </div>
    </motion.div>
  );
}