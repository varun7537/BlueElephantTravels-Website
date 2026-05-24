// ─── modules/MapEmbed.tsx ──────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

export function MapEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-border shadow-sm"
      style={{ height: 380 }}
    >
      {/* Google Maps iframe */}
      <iframe
        title="Blue Elephant Mumbai Office"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d72.8343!3d19.1871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63c2ffffffffffffff%3A0x0!2sInfinity+IT+Park%2C+Malad+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Overlay info card — bottom left */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/95 px-5 py-4 backdrop-blur-md sm:right-auto sm:max-w-xs">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 inline-grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50">
            <MapPin size={15} className="text-rose-500" strokeWidth={2} />
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-text-primary">
              Mumbai HQ
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">
              Infinity IT Park, Malad West
            </p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Infinity+IT+Park+Malad+West+Mumbai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-semibold text-white transition-opacity hover:opacity-80"
        >
          <Navigation size={10} />
          Directions
        </a>
      </div>
    </motion.div>
  );
}