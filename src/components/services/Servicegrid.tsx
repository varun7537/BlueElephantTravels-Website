"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SERVICES, TABS, TAB_ICONS } from "../../app/services/data";
import { ServiceCard } from "./Servicecard";
import type { Tab } from "../../app/services/types";

export function ServiceGrid() {
  const [activeTab, setActiveTab] = useState<Tab>("International");
  const services = SERVICES[activeTab];

  return (
    <>
      <header className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow-sm backdrop-blur-sm"
        >
          <Sparkles size={11} className="text-amber-500" />
          Our Services
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
        >
          Crafted for Every Kind of{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Journey
            </span>
            <span
              className="absolute -bottom-1 left-0 right-0 h-3 -rotate-1 rounded-sm opacity-20"
              style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
            />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-base leading-relaxed text-slate-500"
        >
          From luxury international vacations and cultural domestic tours to corporate events
          and weddings — we craft every experience with care, precision, and a personal touch.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {TABS.map((tab) => {
          const TabIcon = TAB_ICONS[tab];
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/25"
                  : "border border-slate-200 bg-white/80 text-slate-500 backdrop-blur-sm hover:border-slate-300 hover:text-slate-800 hover:shadow-sm"
              }`}
            >
              <TabIcon size={14} />
              {tab}
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-slate-900"
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          variants={{
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}