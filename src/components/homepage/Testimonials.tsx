"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
type Review = {
  quote: string;
  author: string;
  location: string;
  trip: string;
  rating: number;
  photo: string;
  scene: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "Blue Elephant made our honeymoon in Kerala absolutely magical. The attention to detail and personal touch were unmatched — every moment felt curated just for us.",
    author: "Dexter Morgan",
    location: "United Kingdom",
    trip: "Kerala Backwaters · 10 nights",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    scene:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "From the wildlife safari in Ranthambore to the heritage stay in Jaipur, every leg felt thoughtfully designed. The guides were storytellers, not just informers.",
    author: "Priya Iyer",
    location: "Singapore",
    trip: "Rajasthan Heritage · 14 nights",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    scene:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "The Maldives villa, the private dinners, the quiet attention — it spoiled us for any other travel. Blue Elephant raised the bar and left it there.",
    author: "Marc & Lina Rousseau",
    location: "France",
    trip: "Maldives Private Island · 8 nights",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    scene:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "They listened, they adapted, and they delivered. Our family of seven across three age groups all came home raving — that's a small miracle in itself.",
    author: "Aman Sethi",
    location: "Toronto, Canada",
    trip: "Sri Lanka Family · 12 nights",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    scene:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
  },
];

/* ------------------------------------------------------------------ */
/*  Stars                                                               */
/* ------------------------------------------------------------------ */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Thumbnail                                                           */
/* ------------------------------------------------------------------ */
function Thumb({
  review,
  active,
  onClick,
  idx,
}: {
  review: Review;
  active: boolean;
  onClick: () => void;
  idx: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={`Review by ${review.author}`}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: active ? 1 : 0.5, x: 0 }}
      transition={{ delay: idx * 0.07, duration: 0.35 }}
      className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
      style={{
        width: active ? "72px" : "54px",
        height: active ? "96px" : "68px",
        outline: active ? "3px solid white" : "2px solid rgba(255,255,255,0.2)",
        outlineOffset: "2px",
      }}
    >
      <Image
        src={review.scene}
        alt={review.author}
        fill
        sizes="96px"
        className="object-cover"
      />
      {active && (
        <div className="absolute inset-0 bg-white/10" />
      )}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % REVIEWS.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [paused, next]);

  const review = REVIEWS[index];

  return (
    <section id="testimonials" className="section">
      <div className="container-x">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            Traveller Stories
          </span>
          <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            What our guests say
          </h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative isolate overflow-hidden rounded-3xl shadow-lift"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid lg:grid-cols-2">

            {/* ── LEFT: scene photo ─────────────────────────────── */}
            <div className="relative min-h-[300px] lg:min-h-[560px]">

              {/* Crossfade scene image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`scene-${index}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={review.scene}
                    alt={review.trip}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  {/* Gradient: dark at bottom for trip label, dark at right to blend into review panel */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Trip label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`trip-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="absolute bottom-5 left-5"
                >
                  <span className="inline-block rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    ✈️&nbsp;{review.trip}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Thumbnail strip — right edge of left panel */}
              <div className="absolute bottom-5 right-4 flex flex-col gap-2">
                {REVIEWS.map((r, i) => (
                  <Thumb
                    key={i}
                    idx={i}
                    review={r}
                    active={i === index}
                    onClick={() => { setIndex(i); setPaused(true); }}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: review panel ───────────────────────────── */}
            <div className="flex flex-col bg-secondary px-8 py-10 text-white sm:px-12 sm:py-14">

              {/* Quote icon */}
              <motion.div
                initial={{ opacity: 0, rotate: -10, scale: 0.6 }}
                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, type: "spring", stiffness: 200 }}
              >
                <Quote size={38} strokeWidth={1.5} className="text-accent opacity-75" />
              </motion.div>

              {/* Review quote */}
              <div className="my-8 flex-1">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={`quote-${index}`}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-base leading-[1.9] text-white/90 sm:text-lg"
                  >
                    &ldquo;{review.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author row */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${index}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38, delay: 0.12 }}
                  className="flex items-center gap-4 border-t border-white/10 pt-6"
                >
                  {/* Avatar */}
                  <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full ring-2 ring-white/25">
                    <Image
                      src={review.photo}
                      alt={review.author}
                      fill
                      sizes="52px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-heading text-sm font-bold leading-none text-white">
                      {review.author}
                    </p>
                    <p className="text-xs text-white/55">{review.location}</p>
                    <Stars count={review.rating} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bars + prev/next */}
              <div className="mt-8 space-y-4">

                {/* Animated progress bars */}
                <div className="flex gap-1.5">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setIndex(i); setPaused(true); }}
                      aria-label={`Go to review ${i + 1}`}
                      className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/20"
                    >
                      {i < index && (
                        <span className="absolute inset-0 rounded-full bg-accent/80" />
                      )}
                      {i === index && (
                        <motion.span
                          key={`bar-${index}`}
                          className="absolute inset-y-0 left-0 rounded-full bg-accent"
                          initial={{ width: "0%" }}
                          animate={{ width: paused ? "40%" : "100%" }}
                          transition={
                            paused
                              ? { duration: 0.3 }
                              : { duration: 6.5, ease: "linear" }
                          }
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Counter + arrow buttons */}
                <div className="flex items-center justify-between">
                  <span className="text-xs tabular-nums text-white/35">
                    {String(index + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => { prev(); setPaused(true); }}
                      aria-label="Previous review"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/65 transition hover:border-white/50 hover:text-white"
                    >
                      <ChevronLeft size={17} />
                    </motion.button>
                    <motion.button
                      onClick={() => { next(); setPaused(true); }}
                      aria-label="Next review"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      className="grid h-10 w-10 place-items-center rounded-full bg-accent/90 text-white transition hover:bg-accent"
                    >
                      <ChevronRight size={17} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}