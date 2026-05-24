"use client";

import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import { DESTINATIONS } from "../../app/services/data";
import { DestinationCard } from "./Destinationcard";

export function PopularDestinations() {
  return (
    <>
      <header className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow-sm backdrop-blur-sm"
        >
          <MapPin size={11} className="text-amber-500" />
          Popular Destinations
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
        >
          Where Will You Go Next?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-base leading-relaxed text-slate-500"
        >
          Handpicked destinations our travellers love the most — each one waiting to tell you
          its story.
        </motion.p>
      </header>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
        }}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
      >
        <div className="flex flex-col gap-4 lg:col-span-4">
          {DESTINATIONS.slice(0, 3).map((dest) => (
            <motion.a
              key={dest.name}
              href={dest.waLink}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0, transition: { duration: 0.55 } },
              }}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-md"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{dest.flag}</span>
                  <p className="font-bold text-slate-800">{dest.name}</p>
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-400">{dest.tagline}</p>
              </div>
              <div className="shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-amber-500">
                <ChevronRight size={16} />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-8">
          {DESTINATIONS.slice(3).map((dest) => (
            <DestinationCard key={dest.name} dest={dest} />
          ))}
        </div>
      </motion.div>
    </>
  );
}