"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import VibeCard from "./Vibecard";
import { VIBES } from "../../app/destinations/seasonentry/filters.data";

export default function TravelVibes() {
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
          Travel by Mood
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          What's Your Travel Vibe?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subtitle"
        >
          Not sure where to go? Start with how you want to feel — we'll find the destination.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {VIBES.map((vibe) => (
          <VibeCard key={vibe.label} vibe={vibe} />
        ))}
      </motion.div>
    </div>
  );
}