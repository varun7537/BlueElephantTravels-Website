"use client";

import { motion } from "framer-motion";
import { Gem, X, CheckCircle2 } from "lucide-react";

const GENERIC_ITEMS = [
  "Large, crowded tours with fixed itineraries",
  "Little flexibility or personal attention",
  "Volume over quality mindset",
  "Limited authentic cultural experiences",
  "One-size-fits-all packages",
];

const BLUE_ELEPHANT_ITEMS = [
  "Personalized journeys, curated for you",
  "Dedicated support at every step",
  "Focus on flexibility and comfort",
  "Meaningful cultural connections",
  "Memories that last a lifetime",
];

export default function WhyChooseUs() {
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
          <Gem size={11} className="text-accent" />
          The Difference
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subtitle"
        >
          See exactly how Blue Elephant Travels stands apart from generic tour operators.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {/* Generic column */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -24 },
            show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
          }}
          className="rounded-3xl border border-border bg-surface p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100">
              <X size={18} className="text-slate-400" />
            </div>
            <h4 className="font-heading text-lg font-bold text-text-primary opacity-60">
              Generic Tours
            </h4>
          </div>
          <ul className="space-y-3">
            {GENERIC_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50">
                  <X size={11} className="text-red-400" strokeWidth={3} />
                </div>
                <span className="text-sm text-text-secondary opacity-75">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Blue Elephant column */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 24 },
            show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
          }}
          className="relative isolate overflow-hidden rounded-3xl bg-secondary p-8"
        >
          <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-2xl" />
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20">
              <CheckCircle2 size={18} className="text-accent" />
            </div>
            <h4 className="relative font-heading text-lg font-bold text-white">
              Blue Elephant Travels
            </h4>
          </div>
          <ul className="relative space-y-3">
            {BLUE_ELEPHANT_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <CheckCircle2 size={11} className="text-accent" strokeWidth={3} />
                </div>
                <span className="text-sm text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}