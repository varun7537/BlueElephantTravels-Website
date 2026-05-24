"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import {
  Menu, X, Phone, Mail, Instagram, Facebook, Linkedin,
  Home, Users, Sparkles, MapPin, MessageCircle,
  Plane, Globe, Compass,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    desc: "Back to start",
    accent: "from-sky-400/20 to-blue-500/10",
    iconColor: "text-sky-300",
    glowColor: "rgba(56,189,248,0.35)",
    stampColor: "#0ea5e9",
    bgPattern: "waves",
  },
  {
    label: "About",
    href: "/about",
    icon: Users,
    desc: "Who we are",
    accent: "from-violet-400/20 to-purple-500/10",
    iconColor: "text-violet-300",
    glowColor: "rgba(167,139,250,0.35)",
    stampColor: "#8b5cf6",
    bgPattern: "dots",
  },
  {
    label: "Services",
    href: "/services",
    icon: Sparkles,
    desc: "What we offer",
    accent: "from-amber-400/20 to-orange-500/10",
    iconColor: "text-amber-300",
    glowColor: "rgba(251,191,36,0.35)",
    stampColor: "#f59e0b",
    bgPattern: "grid",
  },
  {
    label: "Destinations",
    href: "/destinations",
    icon: MapPin,
    desc: "Explore the world",
    accent: "from-emerald-400/20 to-teal-500/10",
    iconColor: "text-emerald-300",
    glowColor: "rgba(52,211,153,0.35)",
    stampColor: "#10b981",
    bgPattern: "map",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: MessageCircle,
    desc: "Let's talk",
    accent: "from-rose-400/20 to-pink-500/10",
    iconColor: "text-rose-300",
    glowColor: "rgba(251,113,133,0.35)",
    stampColor: "#f43f5e",
    bgPattern: "dots",
  },
];

function StampBorder({ color, visible }: { color: string; visible: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-xl"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        border: `1.5px dashed ${color}`,
        opacity: 0,
      }}
    />
  );
}

function PlaneTrail({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ height: "2px" }}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="flex items-center gap-0.5"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <span className="text-[10px] text-white/80">✈</span>
            <div
              className="h-px w-16 bg-gradient-to-r from-white/60 to-transparent"
              style={{ marginTop: "1px" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CompassPin({
  icon: Icon,
  hovered,
  isActive,
  glowColor,
  iconColor,
  isMobile,
}: {
  icon: React.ElementType;
  hovered: boolean;
  isActive: boolean;
  glowColor: string;
  iconColor: string;
  isMobile: boolean;
}) {
  return (
    <div className="relative flex-shrink-0">
      <AnimatePresence>
        {hovered && (
          <>
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl border border-white/30"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: i * 0.22, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: hovered ? 1.12 : 1,
          backgroundColor: hovered
            ? "rgba(255,255,255,0.18)"
            : isActive
            ? "rgba(255,255,255,0.16)"
            : "rgba(255,255,255,0.08)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="grid place-items-center rounded-xl border border-white/15 h-12 w-12"
      >
        <motion.span
          animate={
            hovered
              ? {
                  rotate: [0, -15, 15, -8, 8, 0],
                  transition: { duration: 0.6, ease: "easeInOut" },
                }
              : {
                  y: [0, -4, 0],
                  rotate: 0,
                  transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                }
          }
          style={{ display: "flex" }}
        >
          <Icon
            size={22}
            strokeWidth={1.6}
            className={`transition-colors duration-200 ${hovered ? "text-white" : iconColor}`}
          />
        </motion.span>
      </motion.div>
    </div>
  );
}

function NavCard({
  link,
  index,
  onClose,
  isMobile,
}: {
  link: (typeof NAV_LINKS)[number];
  index: number;
  onClose: () => void;
  isMobile: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === link.href || pathname.startsWith(link.href + "#");
  const [hovered, setHovered] = useState(false);
  const [planeActive, setPlaneActive] = useState(false);

  const cardRef = useRef<HTMLAnchorElement>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 5);
    rotateY.set(dx * 5);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const rotateXdeg = useTransform(rotateX, (v) => `${v}deg`);
  const rotateYdeg = useTransform(rotateY, (v) => `${v}deg`);

  const handleEnter = () => {
    setHovered(true);
    setPlaneActive(true);
    setTimeout(() => setPlaneActive(false), 600);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ delay: 0.06 + index * 0.065, type: "spring", stiffness: 320, damping: 26 }}
      style={{ perspective: 600 }}
    >
      <motion.a
        ref={cardRef}
        href={link.href}
        onClick={onClose}
        onMouseEnter={handleEnter}
        onMouseLeave={() => {
          setHovered(false);
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
        style={isMobile ? {} : { rotateX: rotateXdeg, rotateY: rotateYdeg }}
        className={`
          group relative flex overflow-hidden rounded-xl
          border border-white/10 cursor-pointer select-none
          transition-all duration-200 active:scale-[0.97]
          ${isActive ? "bg-white/15 border-white/25" : "bg-white/5"}
          ${hovered ? "border-white/20" : ""}
          ${isMobile
            ? "min-h-[80px] flex-row items-center gap-4 p-5"
            : "min-h-[118px] flex-col justify-between p-5"
          }
        `}
      >
        <PlaneTrail active={planeActive} />

        <StampBorder color={link.stampColor} visible={hovered} />

        <motion.span
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${link.accent} opacity-0`}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        {!isMobile && (
          <>
            <CompassPin
              icon={link.icon}
              hovered={hovered}
              isActive={isActive}
              glowColor={link.glowColor}
              iconColor={link.iconColor}
              isMobile={false}
            />

            <div className="relative z-10 flex items-end justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-[1.15rem] font-semibold leading-tight tracking-tight text-white">
                  {link.label}
                </span>
                <motion.span
                  className="text-[11px] text-white/45 leading-snug"
                  animate={{ opacity: hovered ? 0.75 : 0.45 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.desc}
                </motion.span>
              </div>

              <motion.span
                className="text-accent text-base leading-none pb-0.5 flex items-center gap-0.5"
                initial={{ x: -6, opacity: 0 }}
                animate={{
                  x: hovered ? 0 : -6,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <motion.span
                  animate={hovered ? { rotate: [-45, -45] } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </motion.span>
            </div>
          </>
        )}

        {isMobile && (
          <>
            <CompassPin
              icon={link.icon}
              hovered={hovered}
              isActive={isActive}
              glowColor={link.glowColor}
              iconColor={link.iconColor}
              isMobile
            />

            <div className="relative z-10 flex flex-col gap-0.5">
              <span className="font-heading text-2xl font-semibold tracking-tight text-white">
                {link.label}
              </span>
              <motion.span
                className="text-xs text-white/45"
                animate={{ opacity: hovered ? 0.75 : 0.45 }}
                transition={{ duration: 0.2 }}
              >
                {link.desc}
              </motion.span>
            </div>

            <motion.span
              className="ml-auto text-accent text-lg leading-none"
              initial={{ x: -4, opacity: 0 }}
              animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              →
            </motion.span>
          </>
        )}

        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          style={{ transformOrigin: "left center", width: "100%" }}
        />

        {isActive && (
          <motion.span
            className="absolute right-3 top-3 flex items-center gap-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </motion.span>
        )}
      </motion.a>
    </motion.li>
  );
}

function DrawerContent({ isMobile, onClose }: { isMobile: boolean; onClose: () => void }) {
  const topLinks = NAV_LINKS.slice(0, 3);
  const bottomLinks = NAV_LINKS.slice(3);

  if (isMobile) {
    return (
      <div className="flex h-full flex-col p-8 pt-20">
        <motion.div
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 0.15, rotate: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="absolute right-6 top-6 pointer-events-none"
        >
          <Globe size={64} className="text-white" strokeWidth={0.8} />
        </motion.div>

        <ul className="grid grid-cols-1 gap-3">
          {NAV_LINKS.map((link, i) => (
            <NavCard key={link.href} link={link} index={i} onClose={onClose} isMobile />
          ))}
        </ul>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, type: "spring", stiffness: 280, damping: 24 }}
          className="mt-auto pt-6"
        >
          <Link href="/contact" onClick={onClose} className="btn-primary w-full justify-center">
            Get In Touch
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-10 relative overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
        animate={{ opacity: 0.05, rotate: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute -right-10 -top-10"
      >
        <Globe size={200} className="text-white" strokeWidth={0.5} />
      </motion.div>

      <ul className="grid grid-cols-3 gap-3">
        {topLinks.map((link, i) => (
          <NavCard key={link.href} link={link} index={i} onClose={onClose} isMobile={false} />
        ))}
      </ul>
      <ul className="mx-auto mt-3 grid max-w-[calc(66.666%+0.5rem)] grid-cols-2 gap-3">
        {bottomLinks.map((link, i) => (
          <NavCard key={link.href} link={link} index={topLinks.length + i} onClose={onClose} isMobile={false} />
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, type: "spring", stiffness: 280, damping: 24 }}
        className="pt-6"
      >
        <Link href="/contact" onClick={onClose} className="btn-primary w-full justify-center">
          Get In Touch
        </Link>
      </motion.div>
    </div>
  );
}

function Drawer({ open, onClose, scrolled, isMobile }: {
  open: boolean; onClose: () => void; scrolled: boolean; isMobile: boolean;
}) {
  let panelClass = "";
  let initial: Record<string, number | string> = {};
  let animate: Record<string, number | string> = {};
  let exit: Record<string, number | string> = {};
  let style: React.CSSProperties = {};

  if (isMobile) {
    if (scrolled) {
      panelClass = "fixed inset-y-0 right-0 w-[min(86%,400px)] rounded-l-3xl";
      initial = { x: "100%" }; animate = { x: 0 }; exit = { x: "100%" };
    } else {
      panelClass = "fixed inset-y-0 left-0 w-[min(86%,400px)] rounded-r-3xl";
      initial = { x: "-100%" }; animate = { x: 0 }; exit = { x: "-100%" };
    }
  } else {
    if (scrolled) {
      panelClass = "fixed w-[min(92%,720px)] rounded-3xl";
      style = { left: "50%", bottom: "7rem", transformOrigin: "bottom center" };
      initial = { opacity: 0, x: "-50%", y: 24, scaleY: 0.85 };
      animate = { opacity: 1, x: "-50%", y: 0, scaleY: 1 };
      exit = { opacity: 0, x: "-50%", y: 24, scaleY: 0.85 };
    } else {
      panelClass = "fixed w-[min(92%,720px)] rounded-3xl";
      style = { left: "50%", top: "7rem", transformOrigin: "top center" };
      initial = { opacity: 0, x: "-50%", y: -24, scaleY: 0.85 };
      animate = { opacity: 1, x: "-50%", y: 0, scaleY: 1 };
      exit = { opacity: 0, x: "-50%", y: -24, scaleY: 0.85 };
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-black/45 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            initial={initial} animate={animate} exit={exit}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            style={style}
            className={`${panelClass} z-[60] overflow-hidden bg-secondary text-white shadow-lift`}
          >
            <DrawerContent isMobile={isMobile} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ContactBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 bg-secondary text-white"
    >
      <div className="container-x flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <a href="tel:+910000000000" className="flex items-center gap-1.5 opacity-90 transition hover:opacity-100">
            <Phone size={13} /> +91 00000 00000
          </a>
          <a href="mailto:hello@blueelephant.com" className="hidden items-center gap-1.5 opacity-90 transition hover:opacity-100 sm:flex">
            <Mail size={13} /> hello@blueelephant.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="opacity-90 transition hover:opacity-100"><Instagram size={14} /></a>
          <a href="#" aria-label="Facebook" className="opacity-90 transition hover:opacity-100"><Facebook size={14} /></a>
          <a href="#" aria-label="LinkedIn" className="opacity-90 transition hover:opacity-100"><Linkedin size={14} /></a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setShowContact(y > vh * 0.4);
      setScrolled(y > vh * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <AnimatePresence>{showContact && <ContactBar key="cb" />}</AnimatePresence>

      <motion.header
        initial={false}
        animate={{
          top: scrolled ? "auto" : showContact ? "3.25rem" : "1.5rem",
          bottom: scrolled ? "1.5rem" : "auto",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className="fixed left-1/2 z-50 w-[min(92%,720px)] -translate-x-1/2"
      >
        <div className={`flex items-center rounded-full bg-white/95 p-1.5 shadow-lift ring-1 ring-black/5 backdrop-blur-md transition-all duration-300 ${scrolled ? 'justify-start gap-2' : 'justify-between pl-3'}`}>
          <Link href="/" className={`flex items-center gap-2.5 ${scrolled ? 'order-2 pr-4' : 'order-1 pr-3'}`}>
            <div className="h-9 w-9 overflow-hidden rounded-lg">
              <img
                src="/images/Logo.png"
                alt="Blue Elephant logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-heading text-base font-bold tracking-tight text-text-primary">
              Blue Elephant
            </span>
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 place-items-center rounded-full bg-secondary text-white transition hover:bg-primary shrink-0 ${scrolled ? 'order-1' : 'order-2'}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <Drawer open={open} onClose={() => setOpen(false)} scrolled={scrolled} isMobile={isMobile} />
    </>
  );
}