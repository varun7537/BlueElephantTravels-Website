"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import type { ContactChannel } from "../../app/contact/types";

export function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="my-20 h-px bg-gradient-to-r from-transparent via-border to-transparent"
    />
  );
}

type SectionHeaderProps = {
  badge: string;
  BadgeIcon: React.ElementType;
  title: React.ReactNode;
  subtitle: string;
  dark?: boolean;
};

export function SectionHeader({
  badge,
  BadgeIcon,
  title,
  subtitle,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
          dark
            ? "border-white/20 bg-white/10 text-white/70 backdrop-blur-sm"
            : "border-border bg-surface text-text-secondary"
        }`}
      >
        <BadgeIcon size={11} className="text-accent" />
        {badge}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className={`section-title mt-4 ${dark ? "!text-white" : ""}`}
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`section-subtitle ${dark ? "!text-white/65" : ""}`}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}


export function ChannelCard({ channel }: { channel: ContactChannel }) {
  const Icon = channel.icon;
  return (
    <motion.a
      href={channel.href}
      target={channel.href.startsWith("http") ? "_blank" : undefined}
      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
        },
      }}
      whileHover={{ y: -3 }}
      className="feature-card group relative flex flex-col"
    >
      {channel.badge && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
          <Sparkles size={9} />
          {channel.badge}
        </span>
      )}

      <div
        className={`mb-5 inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl ${channel.iconBg} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={channel.iconColor} size={22} strokeWidth={2} />
      </div>

      <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
        {channel.label}
      </p>
      <h5 className="mb-1.5 font-heading text-[1.05rem] font-bold text-text-primary">
        {channel.value}
      </h5>
      {channel.subValue && (
        <p className="flex-1 text-sm leading-relaxed text-text-secondary">
          {channel.subValue}
        </p>
      )}

      <div className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2.5">
        {channel.label === "WhatsApp"
          ? "Chat Now"
          : channel.label === "Call Us"
          ? "Call Now"
          : channel.label === "Email Us"
          ? "Send Email"
          : "Get Directions"}
        <ChevronRight
          size={15}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[var(--radius-lg)] bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
    </motion.a>
  );
}