"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const STATS = [
  { value: "12+", label: "Years of Experience" },
  { value: "50k+", label: "Happy Travellers" },
  { value: "190+", label: "Destinations" },
  { value: "98%", label: "Satisfaction Rate" },
];

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=85",
    alt: "Scenic travel landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85",
    alt: "Mountain adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=85",
    alt: "Ocean waves",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=85",
    alt: "Forest trail",
  },
  {
    src: "https://images.unsplash.com/photo-1682686581854-5e71f58e7491?auto=format&fit=crop&w=1600&q=85",
    alt: "Desert dunes",
  },
];

export default function AboutHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative isolate overflow-hidden rounded-3xl shadow-lift">
      {/* ── Animated image carousel ── */}
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={IMAGES[current].src}
          alt={IMAGES[current].alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/65 via-secondary/40 to-teal-900/35" />

      {/* Decorative orbs */}
      <span aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-10 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-6 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: -12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm"
          >
            <Sparkles size={11} className="text-accent" />
            Making Travel Easier
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Journeys That Inspire,{" "}
            <span className="text-accent">Connect</span>{" "}
            &amp; Last a Lifetime.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
            }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Blue Elephant Travels is on a mission to create journeys that inspire,
            connect, and leave lasting memories. Whether local or international, every
            trip is crafted with care.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-secondary shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              Plan My Trip
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm"
            >
              <span className="font-heading text-lg font-bold text-white">{stat.value}</span>
              <span className="text-xs text-white/60">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}