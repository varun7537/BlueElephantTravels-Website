"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function BottomCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mt-16 overflow-hidden rounded-2xl px-8 py-8 sm:flex sm:items-center sm:justify-between"
      style={{
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 left-20 h-40 w-40 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <p className="text-lg font-bold text-white">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <p className="mt-0.5 text-sm text-white/55">
          Tell us your dream trip — we&apos;ll craft a bespoke itinerary just for you.
        </p>
      </div>

      <div className="relative z-10 mt-5 flex shrink-0 items-center gap-3 sm:mt-0">
        <a
          href="https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20a%20custom%20travel%20package."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Sparkles size={15} className="text-indigo-600" />
          Request Custom Package
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:text-white"
        >
          Contact Us
        </Link>
      </div>
    </motion.div>
  );
}