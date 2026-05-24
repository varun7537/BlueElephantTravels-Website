"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FAQAccordionItem from "./Faqaccordionitem";
import { FAQS } from "../../app/about/data/Faqs.data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

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
          <Sparkles size={11} className="text-accent" />
          Common Questions
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="section-title mt-4"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subtitle"
        >
          Can't find your answer here? Reach out on WhatsApp — we typically reply within a few
          minutes.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
        className="mx-auto mt-12 max-w-3xl space-y-3"
      >
        {FAQS.map((faq, i) => (
          <FAQAccordionItem
            key={faq.question}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </motion.div>

      {/* Still have questions CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto mt-10 max-w-3xl"
      >
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-8 py-5 sm:flex-row">
          <p className="text-sm text-text-secondary">
            Still have questions?{" "}
            <span className="font-semibold text-text-primary">We're here to help.</span>
          </p>
          <a
            href="https://wa.me/919870324003?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex shrink-0 items-center gap-2 text-sm"
          >
            <Sparkles size={13} />
            Ask on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}