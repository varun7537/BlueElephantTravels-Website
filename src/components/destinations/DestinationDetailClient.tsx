"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Wallet,
  Heart,
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
  Compass,
  Star,
  Calendar,
} from "lucide-react";
import type { Destination } from "../../app/destinations/components/types";
import { getRelatedDestinations } from "../../app/destinations/seasonentry/destination.data";

interface Props {
  destination: Destination;
}

const SEASON_COLORS: Record<string, string> = {
  summer: "bg-amber-100 text-amber-700 border-amber-200",
  monsoon: "bg-emerald-100 text-emerald-700 border-emerald-200",
  winter: "bg-sky-100 text-sky-700 border-sky-200",
};

const SEASON_ICONS: Record<string, string> = {
  summer: "☀️",
  monsoon: "🌿",
  winter: "❄️",
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function DestinationDetailClient({ destination }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const related = getRelatedDestinations(destination);

  return (
    <main className="min-h-screen bg-background">
      {/* ── Parallax Hero ── */}
      <div
        ref={heroRef}
        className="relative isolate h-[65vh] min-h-[420px] w-full overflow-hidden sm:h-[75vh]"
      >
        <motion.img
          src={destination.heroImage ?? destination.image}
          alt={destination.name}
          style={{ y: imgY, opacity: imgOpacity }}
          className="absolute inset-0 h-[115%] w-full object-cover object-center"
        />

        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Top bar */}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/55"
            >
              <ArrowLeft size={13} />
              All Destinations
            </Link>
          </motion.div>

          {/* Season badges — top right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2"
          >
            {destination.season.map((s) => (
              <span
                key={s}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-md ${SEASON_COLORS[s]}`}
              >
                <span>{SEASON_ICONS[s]}</span>
                <span className="capitalize">{s}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-10 sm:pb-12 md:px-16 md:pb-14">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.span
              variants={fadeUp}
              className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${destination.tagColor}`}
            >
              {destination.tag}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-3 font-heading text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {destination.name}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/65"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                {destination.country}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1.5">
                <Compass size={13} />
                {destination.region}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {destination.duration}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Floating info strip ── */}
      <div className="relative z-10 -mt-6 px-5 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
        >
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Duration */}
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10">
                <Clock size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Duration
                </p>
                <p className="mt-0.5 text-sm font-bold text-text-primary">
                  {destination.duration}
                </p>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10">
                <Wallet size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Starting Budget
                </p>
                <p className="mt-0.5 text-sm font-bold text-text-primary">
                  {destination.budget}
                </p>
              </div>
            </div>

            {/* Best For */}
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10">
                <Heart size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Best For
                </p>
                <p className="mt-0.5 text-sm font-bold text-text-primary">
                  {destination.bestFor}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16 md:px-10">
        <div className="grid gap-10 lg:grid-cols-5">

          {/* Left: main content — 3/5 */}
          <div className="flex flex-col gap-10 lg:col-span-3">

            {/* About */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  About
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                Why {destination.name}?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                {destination.description}
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  Highlights
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                What to Experience
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {destination.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 transition-all duration-200 hover:border-accent/30 hover:bg-accent/5"
                  >
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/15">
                      <CheckCircle2
                        size={14}
                        className="text-accent"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {h}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: sticky sidebar — 2/5 */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 flex flex-col gap-4">

              {/* Book CTA card */}
              <motion.div
                custom={2}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                {/* Mini hero thumbnail */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-[11px] font-semibold text-white">
                      5.0 Curated
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-5">
                  <div>
                    <p className="font-heading text-base font-bold text-text-primary">
                      Plan Your Trip to {destination.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                      Get a personalised itinerary crafted just for you. Speak
                      to our expert — it&apos;s free.
                    </p>
                  </div>

                  <a
                    href={destination.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98]"
                  >
                    <MessageCircle size={15} />
                    Book via WhatsApp
                  </a>

                  <p className="text-center text-[11px] text-text-muted">
                    Free consultation · No hidden charges
                  </p>
                </div>
              </motion.div>

              {/* Best season card */}
              <motion.div
                custom={3}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-text-primary">
                  <Calendar size={14} className="text-accent" />
                  Best Season to Visit
                </p>
                <div className="flex flex-wrap gap-2">
                  {destination.season.map((s) => (
                    <span
                      key={s}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${SEASON_COLORS[s]}`}
                    >
                      <span>{SEASON_ICONS[s]}</span>
                      <span className="capitalize">{s}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Related destinations ── */}
        {related.length > 0 && (
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 border-t border-border pt-12"
          >
            <div className="mb-2 flex items-center gap-2">
              <Compass size={16} className="text-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                Continue Exploring
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
              You Might Also Like
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Link
                    href={`/destinations/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-md"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold ${rel.tagColor}`}
                      >
                        {rel.tag}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-4">
                      <p className="font-heading text-base font-bold text-text-primary transition-colors group-hover:text-accent">
                        {rel.name}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-text-muted">
                        <MapPin size={11} />
                        {rel.country} &nbsp;·&nbsp; {rel.budget}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                        {rel.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}