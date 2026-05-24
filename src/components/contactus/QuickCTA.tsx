// ─── modules/QuickCTA.tsx ──────────────────────────────────────────────────────
// Mirrors the BottomCTA strip from Services — consistent with the full page flow.

"use client";

import { motion } from "framer-motion";
import { MessageSquare, Phone } from "lucide-react";

export function QuickCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-8 py-6 sm:flex-row"
    >
      <div>
        <p className="font-heading text-lg font-bold text-text-primary">
          Prefer to talk it through?
        </p>
        <p className="mt-0.5 text-sm text-text-secondary">
          Our travel consultants are ready to help you plan the perfect trip — no robots, just real people.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <a
          href="https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20to%20speak%20with%20a%20consultant."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          <MessageSquare size={15} />
          Chat on WhatsApp
        </a>
        <a
          href="tel:+919870324003"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-secondary/40 hover:bg-surface"
        >
          <Phone size={14} />
          Call Us
        </a>
      </div>
    </motion.div>
  );
}