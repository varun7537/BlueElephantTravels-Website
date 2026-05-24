"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import type { Destination } from "../../app/destinations/components/types";

interface DestinationCardProps {
  dest: Destination;
}

export default function DestinationCard({ dest }: DestinationCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
        },
      }}
    >
      <Link
        href={`/destinations/${dest.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden sm:h-56">
          <img
            src={dest.image}
            alt={dest.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Tag */}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${dest.tagColor}`}
          >
            {dest.tag}
          </span>
          {/* Season badges */}
          <div className="absolute right-3 top-3 flex gap-1">
            {dest.season.map((s) => (
              <span
                key={s}
                className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold capitalize text-white backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 px-5 py-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-base font-bold text-text-primary transition-colors group-hover:text-accent">
                {dest.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
                <MapPin size={11} />
                {dest.country}
              </p>
            </div>
            <div className="shrink-0 rounded-full border border-border p-1.5 transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowRight size={13} />
            </div>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">
            {dest.description}
          </p>

          {/* Footer meta */}
          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock size={11} />
              {dest.duration}
            </span>
            <span className="text-xs font-semibold text-accent">
              from {dest.budget}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}