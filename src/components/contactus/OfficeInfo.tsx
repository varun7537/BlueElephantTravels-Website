"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { OFFICES, WORKING_HOURS, SOCIAL_LINKS } from "../../app/contact/data";

export function OfficeInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-6"
    >
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-grid h-9 w-9 place-items-center rounded-lg bg-amber-50">
            <Clock size={17} className="text-amber-600" strokeWidth={2} />
          </div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-text-primary">
            Working Hours
          </h4>
        </div>

        <ul className="space-y-2.5">
          {WORKING_HOURS.map((row) => (
            <li
              key={row.day}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-text-secondary">{row.day}</span>
              <span
                className={`font-semibold ${
                  row.day === "Sunday" ? "text-rose-500" : "text-text-primary"
                }`}
              >
                {row.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {OFFICES.map((office) => (
        <div
          key={office.city}
          className={`rounded-2xl border p-6 ${
            office.isPrimary
              ? "border-secondary/20 bg-secondary text-white"
              : "border-border bg-surface"
          }`}
        >
          {office.isPrimary && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
              Headquarters
            </span>
          )}

          <div className="mb-3 flex items-center gap-2">
            <MapPin
              size={15}
              className={office.isPrimary ? "text-accent" : "text-text-muted"}
              strokeWidth={2}
            />
            <h5
              className={`font-heading text-sm font-bold ${
                office.isPrimary ? "text-white" : "text-text-primary"
              }`}
            >
              {office.city}
            </h5>
          </div>

          <p
            className={`text-sm leading-relaxed ${
              office.isPrimary ? "text-white/70" : "text-text-secondary"
            }`}
          >
            {office.address}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Phone
              size={13}
              className={office.isPrimary ? "text-accent" : "text-text-muted"}
            />
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className={`text-sm font-semibold transition-opacity hover:opacity-75 ${
                office.isPrimary ? "text-white" : "text-text-primary"
              }`}
            >
              {office.phone}
            </a>
          </div>

          <a
            href={`https://maps.google.com/?q=${office.mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-75 ${
              office.isPrimary ? "text-accent" : "text-accent"
            }`}
          >
            Open in Google Maps
            <ExternalLink size={11} />
          </a>
        </div>
      ))}

      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
          Follow Our Journeys
        </p>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`inline-grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-text-muted transition-all duration-200 hover:border-transparent hover:shadow-md ${s.color}`}
              >
                <Icon size={17} strokeWidth={1.8} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}