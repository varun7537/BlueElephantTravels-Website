"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import OfferingCard from "./Offeringcard";
import { OFFERINGS } from "../../app/about/data/Offerings.data";

export default function WhatWeOffer() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
        >
          <Compass size={11} className="text-accent" />
          What We Offer
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          Experiences for Every Traveller
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subtitle"
        >
          Whether you're exploring solo, with loved ones, or representing your company — we have a
          journey designed for you.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {OFFERINGS.map((offering) => (
          <OfferingCard key={offering.title} offering={offering} />
        ))}
      </motion.div>
    </div>
  );
}