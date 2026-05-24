"use client";

import { motion } from "framer-motion";
import { Globe, Search } from "lucide-react";
import {
  REGIONS,
  REGION_ICONS,
} from "../../app/destinations/seasonentry/filters.data";

export default function DestinationsHero() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl shadow-lift">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=85"
        alt="World destinations"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/92 via-secondary/75 to-teal-900/65" />

      {/* Decorative orbs */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl sm:-left-20 sm:-top-20 sm:h-72 sm:w-72"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 right-0 h-48 w-48 rounded-full bg-primary/20 blur-3xl sm:h-64 sm:w-64"
      />

      <div className="relative z-10 px-5 py-14 sm:px-10 sm:py-24 md:px-16 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.span
            variants={{
              hidden: { opacity: 0, y: -12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm"
          >
            <Globe size={11} className="text-accent" />
            190+ Destinations
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl"
          >
            The World is Waiting.{" "}
            <span className="text-accent">Where to Next?</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.1,
                },
              },
            }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg"
          >
            From the beaches of Bali to the peaks of Switzerland — every
            destination tells a story. Let us help you find yours.
          </motion.p>

          {/* Search bar */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2,
                },
              },
            }}
            className="mx-auto mt-8 flex w-full max-w-md items-center gap-2 rounded-full bg-white/95 p-1.5 shadow-lift backdrop-blur sm:mt-10 sm:p-2"
          >
            <Search size={15} className="ml-3 shrink-0 text-text-muted" />

            <input
              type="text"
              placeholder="Search a destination..."
              className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            />

            <button className="shrink-0 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary sm:px-5 sm:py-2.5">
              Search
            </button>
          </motion.div>
        </motion.div>

        {/* Region pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:mt-14"
        >
          {REGIONS.filter((r) => r !== "All").map((region) => {
            const Icon = REGION_ICONS[region];

            return (
              <a
                key={region}
                href="#explore"
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white sm:px-4 sm:py-2 sm:text-xs"
              >
                <Icon size={11} className="sm:h-3 sm:w-3" />
                {region}
              </a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}