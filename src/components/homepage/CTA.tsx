"use client";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, MapPin, Compass, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ─── Parallax orb ──────────────────────────────────────────── */
function Orb({
  className,
  delay,
  size,
  color,
}: {
  className: string;
  delay: number;
  size: number;
  color: string;
}) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(60px)",
        animation: `float-slow ${7 + delay * 1.5}s ease-in-out ${delay * 0.3}s infinite`,
      }}
    />
  );
}

/* ─── Floating badge ────────────────────────────────────────── */
function FloatingBadge({
  icon: Icon,
  label,
  value,
  className,
  delay,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`absolute hidden sm:flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-white shadow-lg backdrop-blur-md ${className}`}
      style={{ animation: `float-slow 6s ease-in-out ${delay * 0.4}s infinite` }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
        <Icon size={15} className="text-white" />
      </span>
      <div className="leading-tight">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/60">
          {label}
        </p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}

/* ─── Animated star rating ──────────────────────────────────── */
function Stars() {
  return (
    <motion.div
      className="flex items-center gap-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.4, rotate: -20 },
            visible: { opacity: 1, scale: 1, rotate: 0 },
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 text-amber-300"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </motion.div>
  );
}

/* ─── Tilt card wrapper ─────────────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotY = useTransform(x, [-0.5, 0.5], ["-4deg", "4deg"]);
  const springRotX = useSpring(rotX, { stiffness: 120, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Counter animation ─────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Main CTA ──────────────────────────────────────────────── */
export default function CTA() {
  return (
    <>
      <section id="contact" className="relative py-24 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TiltCard>
            <div
              className="relative isolate overflow-hidden rounded-[2rem] shadow-2xl"
              style={{ perspective: "1200px" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=90&auto=format&fit=crop')",
                  backgroundSize: "cover",
                  backgroundPosition: "center 60%",
                }}
              />

              {/* Black overlay at 60% opacity */}
              <div className="absolute inset-0 z-[5] bg-black/60" />

              <div
                className="scan-line absolute inset-0 z-10"
                style={{ backgroundSize: "100% 4px" }}
              />

              <Orb
                className="left-[-5%] top-[-10%] z-20"
                delay={0}
                size={340}
                color="rgba(129,140,248,0.35)"
              />
              <Orb
                className="right-[-8%] top-[20%] z-20"
                delay={1.4}
                size={260}
                color="rgba(20,184,166,0.3)"
              />
              <Orb
                className="bottom-[-15%] left-[30%] z-20"
                delay={2.2}
                size={320}
                color="rgba(99,102,241,0.25)"
              />
              <Orb
                className="left-[60%] top-[-5%] z-20"
                delay={0.8}
                size={180}
                color="rgba(167,139,250,0.2)"
              />

              <FloatingBadge
                icon={MapPin}
                label="Destinations"
                value="190+ Countries"
                className="left-6 top-10 z-30"
                delay={0.6}
              />
              <FloatingBadge
                icon={Compass}
                label="Experiences"
                value="50k+ Trips"
                className="right-8 top-14 z-30"
                delay={0.9}
              />
              <FloatingBadge
                icon={Globe}
                label="Satisfaction"
                value="98% Happy"
                className="right-12 bottom-10 z-30"
                delay={1.2}
              />

              <div className="relative z-30 px-6 py-20 text-center sm:px-16 sm:py-24">
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 flex justify-center"
                >
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md"
                    style={{ animation: "breathe 3s ease-in-out infinite" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_2px_rgba(45,212,191,0.6)]" />
                    Ready When You Are
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="shimmer-text mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Let&apos;s plan a journey worth&nbsp;remembering.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
                >
                  Tell us where you want to go — we&apos;ll handle the rest.
                  From visa to villa, every detail is taken care of.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14"
                >
                  {[
                    { value: 190, suffix: "+", label: "Destinations" },
                    { value: 50, suffix: "k+", label: "Happy Travellers" },
                    { value: 12, suffix: "yr", label: "Of Excellence" },
                  ].map(({ value, suffix, label }) => (
                    <div key={label} className="text-center">
                      <p className="text-3xl font-bold text-white sm:text-4xl">
                        <Counter to={value} suffix={suffix} />
                      </p>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/50">
                        {label}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="mx-auto my-10 h-px max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="#hero"
                      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-indigo-900 shadow-[0_4px_24px_rgba(255,255,255,0.25)] transition-all duration-300 hover:shadow-[0_6px_32px_rgba(255,255,255,0.35)]"
                    >
                      <span className="absolute inset-0 -translate-x-full to-white transition-transform duration-500 group-hover:translate-x-0" />
                      <span className="relative">Get Started</span>
                      <ArrowRight
                        size={16}
                        className="relative transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="#features"
                      className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/15"
                    >
                      Explore Features
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="mt-8 flex flex-col items-center gap-2"
                >
                  <Stars />
                  <p className="text-xs text-white/40">
                    Rated 4.9 / 5 from over 12,000 travellers worldwide
                  </p>
                </motion.div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </TiltCard>
        </div>
      </section>
    </>
  );
}