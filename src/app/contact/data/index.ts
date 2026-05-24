import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import type { ContactChannel, OfficeLocation, FaqItem } from "../types";

// ── Contact Channels ──────────────────────────────────────────────────────────

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+91 98703 24003",
    subValue: "Fastest response · Usually replies in minutes",
    href: "https://wa.me/919870324003?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20trip%20with%20Blue%20Elephant.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badge: "Fastest",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98703 24003",
    subValue: "Mon – Sat · 9 AM – 7 PM IST",
    href: "tel:+919870324003",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@blueelephant.in",
    subValue: "We respond within 24 hours",
    href: "mailto:hello@blueelephant.in",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Mumbai, Maharashtra",
    subValue: "By appointment · Mon – Sat",
    href: "https://maps.google.com/?q=Mumbai+Maharashtra",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

// ── Social Links ──────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "hover:text-pink-500",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com",
    color: "hover:text-sky-500",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com",
    color: "hover:text-rose-500",
  },
];

// ── Office Locations ──────────────────────────────────────────────────────────

export const OFFICES: OfficeLocation[] = [
  {
    city: "Mumbai HQ",
    address: "Level 4, Infinity IT Park, Malad West, Mumbai – 400064",
    phone: "+91 98703 24003",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    mapQuery: "Infinity+IT+Park+Malad+West+Mumbai",
    isPrimary: true,
  },
  {
    city: "Delhi",
    address: "Unit 12B, Connaught Place, New Delhi – 110001",
    phone: "+91 11 4567 8901",
    hours: "Mon – Sat: 9:30 AM – 6:30 PM",
    mapQuery: "Connaught+Place+New+Delhi",
  },
];

// ── FAQ Items ─────────────────────────────────────────────────────────────────

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How quickly will I get a response?",
    answer:
      "WhatsApp queries are answered within minutes during business hours. Email inquiries receive a detailed reply within 24 hours. For urgent travel needs, calling us is always the fastest route.",
  },
  {
    question: "Can I plan a fully custom trip?",
    answer:
      "Absolutely — custom itineraries are our speciality. Just tell us your dream destination, dates, group size, and budget. We'll craft a bespoke trip from scratch, just for you.",
  },
  {
    question: "Do you handle group bookings?",
    answer:
      "Yes! We manage groups of all sizes — from family reunions to corporate off-sites of 200+ people. Group bookings come with dedicated relationship managers and exclusive pricing.",
  },
  {
    question: "Is there a fee for consultation?",
    answer:
      "Our initial consultation is completely free. We discuss your requirements, suggest options, and share a no-obligation itinerary. Fees apply only when you confirm and book.",
  },
];

// ── Trip Types (for the form select) ─────────────────────────────────────────

export const TRIP_TYPES = [
  "International",
  "Domestic",
  "Honeymoon",
  "Corporate MICE",
  "Destination Wedding",
  "Group / Family",
  "Other",
] as const;

// ── Working hours detail ──────────────────────────────────────────────────────

export const WORKING_HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "9:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Closed (WhatsApp only)" },
];