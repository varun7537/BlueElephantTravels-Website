"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import type { Service } from "../../app/services/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
        },
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-white"
      style={{ "--card-accent": service.accent } as React.CSSProperties}
    >
      {/* Coloured top accent line — reveals on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: service.accent }}
      />

      {/* Per-card radial glow on hover */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 30% 0%, ${service.accent}12 0%, transparent 70%)`,
        }}
      />

      {service.badge && (
        <span
          className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ background: `${service.accent}18`, color: service.accent }}
        >
          <Sparkles size={9} />
          {service.badge}
        </span>
      )}

      <div
        className={`mb-5 inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl ${service.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
      >
        <Icon className={service.iconColor} size={22} strokeWidth={2} />
      </div>

      <h5 className="mb-2 text-[1.05rem] font-bold text-slate-800">
        {service.title}
      </h5>
      <p className="flex-1 text-sm leading-relaxed text-slate-500">
        {service.description}
      </p>

      <a
        href={service.waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2.5"
        style={{ color: service.accent }}
      >
        Learn More
        <ChevronRight
          size={15}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </a>
    </motion.div>
  );
}