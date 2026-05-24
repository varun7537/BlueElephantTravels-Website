"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Award } from "lucide-react";
import { SectionHeader } from "./index";
import { FAQ_ITEMS } from "../../app/contact/data";

function AccordionItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
        },
      }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open
          ? "border-white/25 bg-white/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-heading text-sm font-bold text-white sm:text-base">
            {question}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`mt-0.5 shrink-0 text-white/50 transition-transform duration-300 ${
            open ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-white/65">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-secondary px-6 py-14 sm:px-12 sm:py-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative z-10">
        <SectionHeader
          badge="FAQ"
          BadgeIcon={HelpCircle}
          title={
            <>
              Questions? <span className="text-accent">We've Got Answers.</span>
            </>
          }
          subtitle="Everything you need to know before reaching out — answered clearly and honestly."
          dark
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
          className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}