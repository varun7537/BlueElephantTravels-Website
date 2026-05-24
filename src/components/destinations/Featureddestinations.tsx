"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { FeaturedCardLarge, FeaturedCardSmall } from "./Featuredcard";
import { DESTINATIONS } from "../../app/destinations/seasonentry/destination.data";

export default function FeaturedDestinations() {
  const featured = DESTINATIONS.filter((d) => d.featured);

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
          <Star size={11} className="text-accent" />
          Editor's Picks
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          Featured Destinations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subtitle"
        >
          Our most-loved destinations — handpicked by our travel experts for their exceptional experiences.
        </motion.p>
      </div>

      {/* Asymmetric grid: large left + 2 stacked right */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
        className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr,1fr]"
      >
        {featured[0] && <FeaturedCardLarge dest={featured[0]} />}

        <div className="flex flex-col gap-5">
          {featured.slice(1, 3).map((dest) => (
            <FeaturedCardSmall key={dest.name} dest={dest} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}