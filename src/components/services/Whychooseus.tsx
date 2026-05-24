"use client";

import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";
import { TRUST_PILLARS, TRUST_STATS } from "../../app/services/data";

export function WhyChooseUs() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-12 sm:py-16"
      style={{
        background:
          "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #fff7ed 70%, #fefce8 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexes-wcu"
              x="0"
              y="0"
              width="80"
              height="69"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="40,0 80,20 80,60 40,80 0,60 0,20"
                fill="none"
                stroke="#92400e"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexes-wcu)" />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-800 backdrop-blur-sm"
        >
          <Award size={11} className="text-amber-600" />
          Why Blue Elephant
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Travel with Confidence.{" "}
          <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            We&apos;ve Got You.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"
        >
          We&apos;re not just a travel agency — we&apos;re your personal journey architects,
          committed to making every trip seamless, memorable, and worth every rupee.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
        className="relative z-10 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {TRUST_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
                },
              }}
              className="group flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-lg"
            >
              <div
                className="inline-grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${pillar.color}18` }}
              >
                <Icon size={20} strokeWidth={2} style={{ color: pillar.color }} />
              </div>
              <h5 className="text-[0.95rem] font-bold text-slate-800">{pillar.title}</h5>
              <p className="text-xs leading-relaxed text-slate-500">{pillar.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mt-10 grid grid-cols-2 gap-4 border-t border-amber-200/80 pt-10 sm:grid-cols-4"
      >
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center gap-1.5">
              {stat.hasstar && (
                <Star size={14} className="fill-amber-400 text-amber-400" />
              )}
              <p className="text-2xl font-black text-slate-900 sm:text-3xl">
                {stat.value}
              </p>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}