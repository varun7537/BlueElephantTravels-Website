"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Search } from "lucide-react";
import { buildDestinationsSearchUrl } from "@/lib/destination-search";
import { LocationInput } from "@/components/search/LocationInput";

const STATS = [
  { value: "559+", label: "Guided Tours" },
  { value: "150+", label: "Destinations" },
  { value: "90.5%", label: "Satisfaction" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.8, 0.2, 1],
      delay: i * 0.08,
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-44 text-white"
    >
      <Image
        src="https://images.unsplash.com/photo-1526925528837-813a7961f5c7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />

      <div className="absolute inset-0 -z-20 bg-black/60" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/70 via-secondary/40 to-secondary/70" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />

      <div className="gradient-orb -left-32 top-1/4 h-72 w-72 bg-accent/40 animate-float-slow" />
      <div className="gradient-orb -right-24 bottom-1/3 h-80 w-80 bg-primary-light/40 animate-float-slow [animation-delay:-3s]" />

      <div className="container-x relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider text-white/90 backdrop-blur"
          >
            ✨ CURATED LUXURY TRAVEL
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-bold text-white"
          >
            Where Journeys Meet{" "}
            <span className="bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent">
              Royal Hospitality
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Discover comfort, elegance, and tradition — all in one place.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <SearchBar />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
              },
            },
          }}
          className="mx-auto mt-20 max-w-3xl border-t border-white/20 pt-8"
        >
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <div className="font-heading text-3xl font-bold text-white sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs uppercase tracking-wider text-white/70 sm:text-sm sm:normal-case sm:tracking-normal">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SearchBar() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (startDate && endDate && startDate > endDate) {
      setError("End date must be on or after the start date.");
      return;
    }

    router.push(
      buildDestinationsSearchUrl({
        from,
        to,
        start: startDate || undefined,
        end: endDate || undefined,
      })
    );
  };

  return (
    <div>
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-3xl flex-col gap-1 rounded-[32px] bg-white/95 p-1.5 shadow-lift backdrop-blur md:flex-row md:items-center md:rounded-full"
    >
      <LocationInput
        icon={<MapPin size={16} />}
        placeholder="Start Location"
        value={from}
        onChange={setFrom}
      />
      <Divider />
      <LocationInput
        icon={<MapPin size={16} />}
        placeholder="Destination"
        value={to}
        onChange={setTo}
      />
      <Divider />
      <LocationInput
        icon={<Calendar size={16} />}
        placeholder="Start Date"
        value={startDate}
        onChange={setStartDate}
        type="date"
      />
      <Divider />
      <LocationInput
        icon={<Calendar size={16} />}
        placeholder="End Date"
        value={endDate}
        onChange={setEndDate}
        type="date"
      />

      <button
        type="submit"
        className="ml-auto mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary md:mt-0"
      >
        <Search size={16} />
        Search
      </button>
    </form>

    {error && (
      <p className="mt-3 text-sm font-medium text-rose-200">{error}</p>
    )}
    </div>
  );
}

function Divider() {
  return (
    <span className="hidden h-6 w-px bg-slate-200 md:block" />
  );
}