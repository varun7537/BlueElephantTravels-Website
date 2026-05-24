import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us",   href: "/about" },
      { label: "Services",  href: "/services" },
      { label: "Destinations", href: "/destinations" },
      { label: "Contact Us",  href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr,1fr,1.4fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg bg-white p-0.5">
                <img
                  src="/images/Logo.png"
                  alt="Blue Elephant logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-heading text-xl font-bold">Blue Elephant</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Where journeys meet royal hospitality. Bespoke travel experiences crafted with care,
              culture, and a sense of wonder.
            </p>
            <p className="mt-6 text-xs text-white/35 uppercase tracking-widest">
              Est. 2012 · Delhi, India
            </p>
          </div>

          {/* Company links */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h6 className="text-xs font-semibold uppercase tracking-widest text-white/50">
                {col.title}
              </h6>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Get in Touch
            </h6>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>Krishna Nagar, Delhi, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="flex-shrink-0 text-accent" />
                <a href="tel:+910000000000" className="transition hover:text-white">
                  +91 00000 00000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="flex-shrink-0 text-accent" />
                <a href="mailto:hello@blueelephant.com" className="transition hover:text-white">
                  hello@blueelephant.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Blue Elephant Travels. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/70" />
            <p>Crafted with care in Delhi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}