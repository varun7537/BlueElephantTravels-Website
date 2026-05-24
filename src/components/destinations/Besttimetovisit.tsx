"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import SeasonCard from "./Seasoncard";
import { SEASON_DATA } from "../../app/destinations/seasonentry/filters.data";

export default function BestTimeToVisit() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-secondary px-6 py-14 sm:px-12 sm:py-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm"
        >
          <Clock size={11} className="text-accent" />
          Travel Calendar
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Best Time to <span className="text-accent">Visit</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base"
        >
          Every season opens a new set of doors. Click a season to explore
          where to go.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
        className="relative z-10 mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {SEASON_DATA.map((entry) => (
          <SeasonCard key={entry.season} entry={entry} />
        ))}
      </motion.div>
    </div>
  );
}