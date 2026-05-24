"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { STEPS } from "../../app/services/data";

export function HowItWorks() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-14 sm:py-20"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots-hiw"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-hiw)" />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 backdrop-blur-sm"
          >
            <Sparkles size={11} className="text-indigo-400" />
            Simple Process
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base"
          >
            From dream to departure in four effortless steps — we do the heavy lifting so you
            can focus on the excitement.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
          }}
          className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
                  },
                }}
                className="group relative flex flex-col items-center text-center"
              >
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-[calc(50%+40px)] right-[calc(-50%+40px)] top-10 hidden border-t border-dashed border-white/15 lg:block"
                  />
                )}

                <div className="relative z-10 mb-6">
                  <div
                    className="absolute inset-0 -m-3 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,
                      filter: "blur(12px)",
                    }}
                  />

                  <div
                    className={`relative inline-grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${step.gradient} shadow-xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={30} className="text-white" strokeWidth={1.8} />
                  </div>

                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-800 ring-2 ring-white/20 shadow-lg">
                    {i + 1}
                  </span>
                </div>

                <h5 className="mb-2 text-base font-bold text-white">{step.title}</h5>
                <p className="text-sm leading-relaxed text-white/50">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20trip%20with%20Blue%20Elephant."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/20"
          >
            <MessageSquare size={16} className="text-indigo-600" />
            Start Planning on WhatsApp
            <ArrowUpRight
              size={14}
              className="opacity-50 transition-transform duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </div>
  );
}