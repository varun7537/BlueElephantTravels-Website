"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "../../app/about/data/Faqs.data";

interface FAQAccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQAccordionItem({ faq, isOpen, onToggle }: FAQAccordionItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
      }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen ? "border-secondary/30 bg-surface shadow-md" : "border-border bg-surface"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading text-[0.95rem] font-semibold text-text-primary">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 transition-colors duration-300 ${
            isOpen ? "text-accent" : "text-text-muted"
          }`}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}