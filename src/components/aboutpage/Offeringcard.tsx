"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Offering } from "../../app/about/data/Offerings.data";

interface OfferingCardProps {
  offering: Offering;
}

export default function OfferingCard({ offering }: OfferingCardProps) {
  const Icon = offering.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      className="group relative overflow-hidden rounded-3xl shadow-card"
    >
      {/* Background image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={offering.image}
          alt={offering.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Icon badge */}
        <div
          className={`absolute right-4 top-4 inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${offering.accent} shadow-lg`}
        >
          <Icon size={18} className="text-white" strokeWidth={2} />
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-5">
          <h4 className="font-heading text-xl font-bold text-white drop-shadow-lg">
            {offering.title}
          </h4>
        </div>
      </div>

      {/* Text content */}
      <div className="bg-surface px-6 py-5">
        <p className="text-sm leading-relaxed text-text-secondary">{offering.description}</p>
        <a
          href="https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2.5"
        >
          Enquire Now
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover/link:translate-x-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}