"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type React from "react";

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowIcon?: React.ElementType;
  title: React.ReactNode;
  subtitle: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon: EyebrowIcon = Sparkles,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
      >
        <EyebrowIcon size={11} className="text-accent" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="section-title mt-4"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="section-subtitle"
      >
        {subtitle}
      </motion.p>
    </header>
  );
}