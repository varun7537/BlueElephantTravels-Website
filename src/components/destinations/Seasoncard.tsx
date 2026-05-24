"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SeasonEntry } from "../../app/destinations/components/types";
import {
  getDestinationsBySeasonKey,
} from "../../app/destinations/seasonentry/destination.data";

interface SeasonCardProps {
  entry: SeasonEntry;
}

export default function SeasonCard({ entry }: SeasonCardProps) {
  const Icon = entry.icon;
  const [open, setOpen] = useState(false);

  const seasonDestinations = getDestinationsBySeasonKey(entry.seasonKey);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
        },
      }}
      className={`group flex flex-col rounded-2xl border transition-all duration-300 ${
        open
          ? "border-white/30 bg-white/10"
          : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
      } backdrop-blur-sm`}
    >
      {/* ── Header button ── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-4 p-6 text-left sm:p-7"
        aria-expanded={open}
      >
        <div
          className={`inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${entry.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={22} className="text-white" strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-heading text-lg font-bold text-white">
            {entry.season}
          </h4>
          <p className="text-xs text-white/50">{entry.months}</p>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-white/50" />
        </motion.div>
      </button>

      {/* ── Expandable panel ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 border-t border-white/10 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
              {/* Tip */}
              <p className="text-sm leading-relaxed text-white/65">
                {entry.tip}
              </p>

              {/* Destination cards */}
              <div>
                <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                  <MapPin size={10} />
                  Recommended Destinations
                </p>

                <div className="flex flex-col gap-2">
                  {seasonDestinations.map((dest, i) => (
                    <motion.div
                      key={dest.slug}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                    >
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="group/card flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:border-white/25 hover:bg-white/10"
                      >
                        {/* Thumbnail */}
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {dest.name}
                          </p>
                          <p className="flex items-center gap-1 text-[11px] text-white/50">
                            <MapPin size={9} />
                            {dest.country} &nbsp;·&nbsp; {dest.budget}
                          </p>
                        </div>

                        {/* Arrow */}
                        <ArrowRight
                          size={14}
                          className="shrink-0 text-white/30 transition-all duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-accent"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}