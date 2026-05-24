"use client";

import { motion } from "framer-motion";
import { REGIONS, REGION_ICONS } from "../../app/destinations/seasonentry/filters.data";
import type { Region } from "../../app/destinations/components/types";

interface RegionTabsProps {
  active: Region;
  onChange: (region: Region) => void;
}

export default function RegionTabs({ active, onChange }: RegionTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {REGIONS.map((region) => {
        const Icon = REGION_ICONS[region];
        const isActive = region === active;
        return (
          <button
            key={region}
            onClick={() => onChange(region)}
            className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-secondary text-white shadow-md"
                : "border border-border bg-surface text-text-secondary hover:border-secondary/40 hover:text-text-primary"
            }`}
          >
            <Icon size={13} />
            {region}
            {isActive && (
              <motion.span
                layoutId="region-pill"
                className="absolute inset-0 -z-10 rounded-full bg-secondary"
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}