"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import RegionTabs from "./Regiontabs";
import DestinationCard from "./Destinationcard";
import { DESTINATIONS } from "../../app/destinations/seasonentry/destination.data";
import type { Region } from "../../app/destinations/components/types";
import {
  filterDestinations,
  formatTripSearchSummary,
  hasActiveTripSearch,
  tripSearchFromUrl,
} from "@/lib/destination-search";

function ExploreDestinationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripSearch = useMemo(
    () => tripSearchFromUrl(searchParams),
    [searchParams]
  );

  const [activeRegion, setActiveRegion] = useState<Region>("All");

  useEffect(() => {
    if (hasActiveTripSearch(tripSearch)) {
      const timer = window.setTimeout(() => {
        document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [tripSearch]);

  const regionFiltered =
    activeRegion === "All"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.region === activeRegion);

  const filtered = filterDestinations(regionFiltered, tripSearch);
  const searchActive = hasActiveTripSearch(tripSearch);
  const searchSummary = formatTripSearchSummary(tripSearch);

  const clearSearch = () => {
    router.push("/destinations#explore");
  };

  return (
    <div id="explore">
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
        >
          <Filter size={11} className="text-accent" />
          Explore All
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          Browse by Region
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subtitle"
        >
          Filter by region to find your perfect destination — from serene Indian
          getaways to grand international adventures.
        </motion.p>
      </div>

      {searchActive && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-8 flex max-w-3xl flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-surface px-5 py-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-3 text-left">
            <Search size={18} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {filtered.length > 0
                  ? `${filtered.length} destination${filtered.length === 1 ? "" : "s"} found`
                  : "No destinations matched your search"}
              </p>
              {searchSummary && (
                <p className="mt-0.5 text-sm text-text-secondary">
                  {searchSummary}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={clearSearch}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-text-secondary transition hover:border-primary hover:text-primary"
          >
            <X size={14} />
            Clear search
          </button>
        </motion.div>
      )}

      <RegionTabs active={activeRegion} onChange={setActiveRegion} />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeRegion}-${searchSummary}`}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          variants={{
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.length > 0 ? (
            filtered.map((dest) => (
              <DestinationCard key={dest.slug} dest={dest} />
            ))
          ) : (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              className="col-span-full rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center"
            >
              <p className="text-base font-semibold text-text-primary">
                We couldn&apos;t find a match in this region.
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Try another destination name, switch regions, or tell us your
                dream trip — we plan custom itineraries worldwide.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={clearSearch}
                  className="btn-secondary"
                >
                  Clear filters
                </button>
                <Link href="/contact" className="btn-primary">
                  Plan a custom trip
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ExploreDestinations() {
  return (
    <Suspense
      fallback={
        <div
          id="explore"
          className="py-16 text-center text-sm text-text-secondary"
        >
          Loading destinations…
        </div>
      }
    >
      <ExploreDestinationsContent />
    </Suspense>
  );
}