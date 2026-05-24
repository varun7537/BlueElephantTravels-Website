"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Loader2,
} from "lucide-react";
import { TRIP_TYPES } from "../../app/contact/data";
import type { FormState } from "../../app/contact/types";

/* ─────────────────────────────────────────────────────────────
   COLOUR PALETTE PER FIELD ZONE
   Each zone defines: tinted section bg, border accent colour,
   icon colour, label accent, and focus ring colour
───────────────────────────────────────────────────────────── */

const ZONE = {
  sky: {
    section:   "bg-sky-50/70 border border-sky-100",
    iconColor: "text-sky-500",
    labelActive: "text-sky-600",
    focusBorder: "focus:border-sky-400",
    focusRing:   "focus:ring-2 focus:ring-sky-200",
    hoverBorder: "hover:border-sky-300",
    activeBorder: "border-sky-400",
    badge: "bg-sky-100 text-sky-700",
    dot: "bg-sky-400",
  },
  violet: {
    section:   "bg-violet-50/70 border border-violet-100",
    iconColor: "text-violet-500",
    labelActive: "text-violet-600",
    focusBorder: "focus:border-violet-400",
    focusRing:   "focus:ring-2 focus:ring-violet-200",
    hoverBorder: "hover:border-violet-300",
    activeBorder: "border-violet-400",
    badge: "bg-violet-100 text-violet-700",
    dot: "bg-violet-400",
  },
  emerald: {
    section:   "bg-emerald-50/70 border border-emerald-100",
    iconColor: "text-emerald-500",
    labelActive: "text-emerald-600",
    focusBorder: "focus:border-emerald-400",
    focusRing:   "focus:ring-2 focus:ring-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    activeBorder: "border-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-400",
  },
  amber: {
    section:   "bg-amber-50/70 border border-amber-100",
    iconColor: "text-amber-500",
    labelActive: "text-amber-600",
    focusBorder: "focus:border-amber-400",
    focusRing:   "focus:ring-2 focus:ring-amber-200",
    hoverBorder: "hover:border-amber-300",
    activeBorder: "border-amber-400",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-400",
  },
} as const;

type Zone = keyof typeof ZONE;

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  tripType: "",
  destination: "",
  message: "",
};

type InputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ElementType;
  placeholder?: string;
  required?: boolean;
  zone: Zone;
};

/* ─────────────────────────────────────────────────────────────
   FLOATING INPUT
───────────────────────────────────────────────────────────── */

function FloatingInput({
  id, label, type = "text", value, onChange,
  icon: Icon, placeholder = "", required, zone,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;
  const z = ZONE[zone];

  return (
    <div className="relative">
      {/* Icon */}
      <div className={`pointer-events-none absolute left-0 top-0 bottom-0 flex items-center justify-center w-11 rounded-l-xl transition-colors duration-200 ${focused ? z.iconColor : "text-text-muted"}`}>
        <Icon size={15} strokeWidth={2} />
      </div>

      {/* Vertical divider */}
      <div className="pointer-events-none absolute left-11 top-3 bottom-3 w-px bg-border" />

      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={raised ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white pl-14 pr-4 pb-2.5 pt-5 text-sm text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted/60 ${z.focusRing} ${
          focused ? `${z.activeBorder}` : `border-border ${z.hoverBorder}`
        }`}
      />

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-14 transition-all duration-200 font-medium ${
          raised
            ? `top-2.5 text-[10px] uppercase tracking-widest ${z.labelActive}`
            : "top-1/2 -translate-y-1/2 text-sm text-text-secondary"
        }`}
      >
        {label}
        {required && <span className="ml-0.5 text-rose-400">*</span>}
      </label>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOATING TEXTAREA
───────────────────────────────────────────────────────────── */

function FloatingTextarea({
  id, label, value, onChange, icon: Icon, required, zone,
}: Omit<InputProps, "type" | "placeholder">) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;
  const z = ZONE[zone];

  return (
    <div className="relative">
      <div className={`pointer-events-none absolute left-0 top-0 flex items-center justify-center w-11 h-14 rounded-tl-xl transition-colors duration-200 ${focused ? z.iconColor : "text-text-muted"}`}>
        <Icon size={15} strokeWidth={2} />
      </div>
      <div className="pointer-events-none absolute left-11 top-3 bottom-3 w-px bg-border" />

      <textarea
        id={id}
        rows={4}
        value={value}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full resize-none rounded-xl border bg-white pl-14 pr-4 pb-3 pt-7 text-sm text-text-primary outline-none transition-all duration-200 ${z.focusRing} ${
          focused ? `${z.activeBorder}` : `border-border ${z.hoverBorder}`
        }`}
      />

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-14 font-medium transition-all duration-200 ${
          raised
            ? `top-2.5 text-[10px] uppercase tracking-widest ${z.labelActive}`
            : "top-5 text-sm text-text-secondary"
        }`}
      >
        {label}
        {required && <span className="ml-0.5 text-rose-400">*</span>}
      </label>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRIP TYPE SELECT
───────────────────────────────────────────────────────────── */

function TripSelect({ value, onChange, zone }: { value: string; onChange: (v: string) => void; zone: Zone }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const z = ZONE[zone];

  return (
    <div className="relative">
      <div className={`pointer-events-none absolute left-0 top-0 bottom-0 flex items-center justify-center w-11 rounded-l-xl transition-colors duration-200 ${focused ? z.iconColor : "text-text-muted"}`}>
        <Globe size={15} strokeWidth={2} />
      </div>
      <div className="pointer-events-none absolute left-11 top-3 bottom-3 w-px bg-border" />

      <label className={`pointer-events-none absolute left-14 font-medium transition-all duration-200 z-10 ${
        value
          ? `top-2.5 text-[10px] uppercase tracking-widest ${z.labelActive}`
          : "top-1/2 -translate-y-1/2 text-sm text-text-secondary"
      }`}>
        Trip Type
      </label>

      <button
        type="button"
        onClick={() => { setOpen(!open); setFocused(!open); }}
        onBlur={() => { setTimeout(() => { setOpen(false); setFocused(false); }, 150); }}
        className={`flex w-full items-center rounded-xl border bg-white pl-14 pr-4 pb-2.5 pt-5 text-left text-sm outline-none transition-all duration-200 ${z.focusRing} ${
          focused ? `${z.activeBorder}` : `border-border ${z.hoverBorder}`
        }`}
      >
        <span className={value ? "text-text-primary" : "text-transparent"}>
          {value || "placeholder"}
        </span>
        <ChevronDown size={14} className={`ml-auto text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl border border-border bg-white shadow-lg"
          >
            {TRIP_TYPES.map((type) => (
              <li key={type}>
                <button
                  type="button"
                  onMouseDown={() => { onChange(type); setOpen(false); setFocused(false); }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 ${z.focusRing.replace("focus:", "")} hover:bg-violet-50/60 ${
                    value === type ? `font-semibold ${z.labelActive}` : "text-text-primary"
                  }`}
                >
                  {value === type && <Sparkles size={11} className={z.iconColor} />}
                  {type}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ZONE SECTION WRAPPER
   Groups related fields with a tinted background + label pill
───────────────────────────────────────────────────────────── */

function ZoneSection({
  label,
  zone,
  children,
}: {
  label: string;
  zone: Zone;
  children: React.ReactNode;
}) {
  const z = ZONE[zone];
  return (
    <div className={`rounded-2xl p-4 ${z.section}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${z.dot}`} />
        <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${z.labelActive}`}>
          {label}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MESH BACKGROUND BLOBS
───────────────────────────────────────────────────────────── */

function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.20) 0%, transparent 70%)" }} />
      <div className="absolute -right-10 top-8 h-48 w-48 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)" }} />
      <div className="absolute bottom-12 left-1/3 h-44 w-44 rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-10 right-8 h-52 w-52 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────────────────────── */

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (field: keyof FormState) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const lines = [
      `*New Enquiry — Blue Elephant Travels*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📱 *Phone:* ${form.phone}`,
      `✈️ *Trip Type:* ${form.tripType || "Not specified"}`,
      `📍 *Destination:* ${form.destination || "Not specified"}`,
      `💬 *Message:* ${form.message}`,
    ];

    const waText = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/919870324003?text=${waText}`;

    setTimeout(() => {
      setStatus("success");
      window.open(waUrl, "_blank");
    }, 900);
  }

  /* ── Success state ── */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden flex flex-col items-center justify-center gap-6 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-sky-50 p-12 text-center shadow-sm"
      >
        {/* Soft orb behind the tick */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,0.30) 0%, transparent 70%)" }} />
        </div>

        <div className="relative inline-grid h-20 w-20 place-items-center rounded-full bg-white ring-8 ring-emerald-100 shadow-lg">
          <CheckCircle2 size={36} className="text-emerald-500" strokeWidth={1.8} />
        </div>

        <div className="relative">
          <h4 className="font-heading text-xl font-bold text-emerald-900">
            Enquiry Sent Successfully!
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-emerald-800/70">
            Your message has been forwarded to WhatsApp. Our team will respond within minutes during business hours.
          </p>
        </div>

        <button
          onClick={() => { setForm(EMPTY); setStatus("idle"); }}
          className="relative inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:bg-emerald-50 hover:shadow-md"
        >
          <Send size={13} />
          Send Another Enquiry
        </button>
      </motion.div>
    );
  }

  /* ── Main form ── */
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-slate-50 via-sky-50/40 to-violet-50/30 p-6 shadow-lift sm:p-8"
    >
      {/* Mesh background blobs */}
      <MeshBackground />

      {/* ── Form header ── */}
      <div className="relative mb-7 flex items-start gap-4">
        <div className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-md">
          <Send size={18} className="text-white" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-text-primary">
            Send Us an Enquiry
          </h3>
          <p className="mt-0.5 text-sm text-text-secondary">
            Fill in your details and we'll reach out on WhatsApp instantly.
          </p>
        </div>
      </div>

      {/* ── ZONE 1: Personal Info (Sky Blue) ── */}
      <div className="relative space-y-4">
        <ZoneSection label="Personal Details" zone="sky">
          <FloatingInput
            id="name"
            label="Full Name"
            value={form.name}
            onChange={set("name")}
            icon={User}
            placeholder="Your name"
            required
            zone="sky"
          />
          <FloatingInput
            id="phone"
            label="Phone / WhatsApp"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            icon={Phone}
            placeholder="+91 XXXXX XXXXX"
            required
            zone="sky"
          />
        </ZoneSection>

        {/* ── ZONE 2: Contact & Trip Type (Violet) ── */}
        <ZoneSection label="Trip Preferences" zone="violet">
          <FloatingInput
            id="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={set("email")}
            icon={Mail}
            placeholder="you@example.com"
            zone="violet"
          />
          <TripSelect
            value={form.tripType}
            onChange={set("tripType")}
            zone="violet"
          />
        </ZoneSection>

        {/* ── ZONE 3: Destination (Emerald) ── */}
        <ZoneSection label="Destination" zone="emerald">
          <div className="sm:col-span-2">
            <FloatingInput
              id="destination"
              label="Destination / Dream Trip"
              value={form.destination}
              onChange={set("destination")}
              icon={MapPin}
              placeholder="e.g. Maldives, Europe, Rajasthan…"
              zone="emerald"
            />
          </div>
        </ZoneSection>

        {/* ── ZONE 4: Message (Amber) ── */}
        <ZoneSection label="Your Message" zone="amber">
          <div className="sm:col-span-2">
            <FloatingTextarea
              id="message"
              label="Message or Special Requests"
              value={form.message}
              onChange={set("message")}
              icon={MessageSquare}
              required
              zone="amber"
            />
          </div>
        </ZoneSection>
      </div>

      {/* ── Submit row ── */}
      <div className="relative mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <MessageSquare size={15} />
              Send
            </>
          )}
        </button>
        <p className="text-xs text-text-muted">
          Tapping send opens WhatsApp with your details pre-filled.
        </p>
      </div>
    </motion.form>
  );
}