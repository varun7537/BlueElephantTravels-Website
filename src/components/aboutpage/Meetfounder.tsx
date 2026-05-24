"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock, CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  "Bespoke itinerary design",
  "190+ countries covered",
  "Multilingual support",
  "End-to-end trip management",
];

export default function MeetFounder() {
  return (
    <div>
      {/* Section header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
        >
          <Star size={11} className="text-accent" />
          The Visionary
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          Meet the Founder
        </motion.h2>
      </div>

      {/* Split card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-12 overflow-hidden rounded-3xl shadow-lift md:grid md:grid-cols-2"
      >
        {/* Left: photo panel */}
        <div className="relative min-h-[420px] sm:min-h-[480px] md:min-h-[560px]">
          <img
            src="/images/about/founder.webp"
            alt="Mayank Chopra — Founder"
            className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
          />

          {/* Subtle side gradient for md+ — only on right edge, doesn't touch face */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-transparent via-transparent to-secondary/50" />

          {/* Bottom gradient for mobile name badge readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:hidden" />

          {/* Name badge */}
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto">
            <div className="inline-flex flex-col rounded-2xl border border-white/20 bg-black/30 px-4 py-3 backdrop-blur-md">
              <p className="font-heading text-base font-bold text-white sm:text-lg">
                Mayank Chopra
              </p>
              <p className="text-xs text-white/70">Founder &amp; Lead Planner</p>
            </div>
          </div>

          {/* Experience badge */}
          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-2 backdrop-blur-md">
            <Clock size={13} className="text-accent" />
            <span className="text-xs font-semibold text-white">12+ Years</span>
          </div>
        </div>

        {/* Right: story panel */}
        <div className="flex flex-col justify-center bg-secondary px-6 py-10 sm:px-10 sm:py-12 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
              <MapPin size={10} />
              Delhi, India
            </span>

            <h3 className="mt-5 font-heading text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
              "Travel is more than sightseeing — it's about building connections."
            </h3>

            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Blue Elephant Travels was founded by Mayank Chopra, a passionate
              explorer who believes travel is more than sightseeing — it's about
              building connections, discovering cultures, and creating lifelong
              memories. With years of experience, Mayank ensures every journey
              is personal, authentic, and stress-free.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              His vision is to make meaningful travel accessible to everyone —
              from first-time travellers to seasoned adventurers — with the same
              dedication, care, and personal touch in every booking.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="shrink-0 text-accent"
                    strokeWidth={2.5}
                  />
                  <span className="text-xs text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}