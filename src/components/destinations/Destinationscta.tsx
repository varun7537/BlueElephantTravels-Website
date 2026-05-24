"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function DestinationsCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-surface px-8 py-7 sm:flex-row"
    >
      <div>
        <p className="font-heading text-lg font-bold text-text-primary">
          Don't see your dream destination?
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          We cover 190+ countries — just tell us where you want to go and we'll make it happen.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <a
          href="https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20custom%20trip."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Sparkles size={14} />
          Plan a Custom Trip
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-secondary/40 hover:bg-background"
        >
          Contact Us
        </Link>
      </div>
    </motion.div>
  );
}