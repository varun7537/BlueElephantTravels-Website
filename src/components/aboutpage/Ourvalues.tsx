"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ValueCard from "./Valuecard";
import { VALUES } from "../../app/about/data/Values.data";

export default function OurValues() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-secondary px-6 py-14 sm:px-12 sm:py-16">
      {/* Orbs */}
      <span aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm"
        >
          <Sparkles size={11} className="text-accent" />
          What Drives Us
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Our <span className="text-accent">Core Values</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base"
        >
          These principles guide every decision we make — from planning your first call to waving
          you off at the airport.
        </motion.p>
      </div>

      {/* Values grid — 3 top, 2 bottom centered */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        className="relative z-10 mt-12"
      >
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VALUES.slice(0, 3).map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>

        {/* Row 2: 2 cards centered */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:mx-auto sm:max-w-[calc(66.666%+0.5rem)] sm:grid-cols-2">
          {VALUES.slice(3).map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}