"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const SECONDARY = "#0b1f3a";
const ACCENT    = "#e07b00"; // darker orange

type Destination = {
  name: string;
  image: string;
  lat?: number;
  lng?: number;
  description?: string;
  tag?: string;
};

const ALL_DESTINATIONS: Destination[] = [
  {
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80",
    lat: 25.2048, lng: 55.2708, description: "City of Gold", tag: "LUXURY",
  },
  {
    name: "Kashmir",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    lat: 34.0837, lng: 74.7973, description: "Heaven on Earth", tag: "SCENIC",
  },
  {
    name: "Goa",
    image: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&w=1400&q=80",
    lat: 15.2993, lng: 74.124, description: "Pearl of the Orient", tag: "BEACH",
  },
  {
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80",
    lat: 3.2028, lng: 73.2207, description: "Island Paradise", tag: "ISLAND",
  },
  {
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80",
    lat: 26.9124, lng: 75.7873, description: "The Pink City", tag: "HERITAGE",
  },
  {
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80",
    lat: 10.8505, lng: 76.2711, description: "God's Own Country", tag: "NATURE",
  },
  {
    name: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
    lat: -8.3405, lng: 115.092, description: "Island of the Gods", tag: "CULTURE",
  },
  {
    name: "Santorini",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
    lat: 36.3932, lng: 25.4615, description: "Jewel of the Aegean", tag: "ROMANCE",
  },
  {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
    lat: 48.8566, lng: 2.3522, description: "City of Light", tag: "ICONIC",
  },
  {
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80",
    lat: 35.6762, lng: 139.6503, description: "Where Tradition Meets Future", tag: "URBAN",
  },
  {
    name: "New York",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1400&q=80",
    lat: 40.7128, lng: -74.006, description: "The City That Never Sleeps", tag: "METRO",
  },
  {
    name: "Sydney",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=80",
    lat: -33.8688, lng: 151.2093, description: "Harbour City", tag: "COASTAL",
  },
  {
    name: "Cape Town",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=80",
    lat: -33.9249, lng: 18.4241, description: "Mother City", tag: "ADVENTURE",
  },
  {
    name: "Machu Picchu",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1400&q=80",
    lat: -13.1631, lng: -72.545, description: "Lost City of the Incas", tag: "WONDER",
  },
];

// ─── Tooltip Card ─────────────────────────────────────────────────────────────
function TooltipCard({ point }: { point: Destination }) {
  return (
    <motion.div
      key={point.name}
      initial={{ opacity: 0, y: 8, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.94 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ width: 220, pointerEvents: "none" }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(11,31,58,0.16), 0 2px 8px rgba(11,31,58,0.08)",
          border: "1px solid rgba(11,31,58,0.08)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: 110 }}>
          <img
            src={point.image}
            alt={point.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(11,31,58,0.55) 0%, transparent 55%)",
            }}
          />
          {/* Tag badge — accent orange */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: ACCENT,
              borderRadius: 20,
              padding: "2px 9px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#ffffff",
              fontFamily: "Georgia, serif",
            }}
          >
            {point.tag}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "12px 14px 13px" }}>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 700,
              color: SECONDARY,
              fontFamily: "Georgia, serif",
              letterSpacing: "0.01em",
            }}
          >
            {point.name}
          </p>
          {/* Description — accent orange */}
          <p
            style={{
              margin: "3px 0 0",
              fontSize: 11,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {point.description}
          </p>

          {/* Divider + CTA */}
          <div
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid rgba(11,31,58,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* EXPLORE → accent orange */}
            <span
              style={{
                fontSize: 10,
                color: ACCENT,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              EXPLORE →
            </span>
            <div style={{ display: "flex", gap: 3 }}>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: i === 0 ? ACCENT : "rgba(11,31,58,0.12)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Globe ────────────────────────────────────────────────────────────────────
function WorldGlobe() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [globeSize, setGlobeSize] = useState({ width: 580, height: 520 });
  const [activePoint, setActivePoint] = useState<Destination | null>(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    (containerRef as any).current = node;

    const update = () => {
      const w = node.offsetWidth;
      const h = Math.max(320, Math.min(w * 0.9, 560));
      setGlobeSize({ width: w, height: h });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
  }, []);

  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) return;

    const renderer = globeRef.current.renderer();
    if (renderer) {
      renderer.setClearColor(0xffffff, 1);
      renderer.domElement.style.background = "#ffffff";
    }

    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;
    }

    setTimeout(() => {
      globeRef.current?.pointOfView({ lat: 18, lng: 80, altitude: 2.0 }, 1200);
    }, 100);
  }, []);

  const handleContainerMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosRef.current = { x, y };
      if (activePoint) setTooltip({ x, y });
    },
    [activePoint]
  );

  const handlePointHover = useCallback((point: any) => {
    setActivePoint(point as Destination | null);
    if (point) setTooltip({ ...mousePosRef.current });
  }, []);

  const tooltipX = Math.min(tooltip.x + 24, globeSize.width - 244);
  const tooltipY = Math.max(8, tooltip.y - 170);

  return (
    <div
      ref={measuredRef}
      onMouseMove={handleContainerMouseMove}
      style={{
        position: "relative",
        width: "100%",
        height: globeSize.height,
        background: "#ffffff",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 4px 40px rgba(11,31,58,0.07), 0 1px 6px rgba(11,31,58,0.04)",
        border: "1px solid rgba(11,31,58,0.07)",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(224,123,0,0.04) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <Globe
        ref={globeRef}
        width={globeSize.width}
        height={globeSize.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="rgba(11,31,58,0.22)"
        atmosphereAltitude={0.18}
        backgroundColor="#ffffff"
        pointsData={ALL_DESTINATIONS}
        pointLat="lat"
        pointLng="lng"
        pointLabel=""
        // markers: darker orange, active is brighter/larger
        pointColor={(p: any) =>
          activePoint?.name === p.name ? "#ff9a2e" : ACCENT
        }
        pointAltitude={(p: any) => (activePoint?.name === p.name ? 0.12 : 0.05)}
        pointRadius={(p: any) => (activePoint?.name === p.name ? 0.9 : 0.62)}
        pointResolution={16}
        onPointHover={handlePointHover}
        onGlobeReady={handleGlobeReady}
      />

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          left: tooltipX,
          top: tooltipY,
          zIndex: 30,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="wait">
          {activePoint && <TooltipCard key={activePoint.name} point={activePoint} />}
        </AnimatePresence>
      </div>

      {/* Bottom hint bar — accent orange dot */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(11,31,58,0.08)",
          borderRadius: 999,
          padding: "6px 14px",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: ACCENT,
            display: "inline-block",
            flexShrink: 0,
            boxShadow: `0 0 0 3px rgba(224,123,0,0.2)`,
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: SECONDARY,
            opacity: 0.45,
            fontFamily: "Georgia, serif",
          }}
        >
          HOVER MARKERS TO EXPLORE DESTINATIONS
        </span>
      </div>

      {/* Destination count badge */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 20,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          border: `1px solid rgba(224,123,0,0.2)`,
          borderRadius: 12,
          padding: "6px 12px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: ACCENT,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
          }}
        >
          {ALL_DESTINATIONS.length}
        </div>
        <div
          style={{
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: SECONDARY,
            opacity: 0.45,
            marginTop: 2,
          }}
        >
          DESTINATIONS
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Destinations() {
  return (
    <section
      id="destinations"
      style={{
        background: "#ffffff",
        paddingTop: 72,
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 8 }}>
          {/* Eyebrow — accent orange */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              margin: "0 0 10px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: ACCENT,
              textTransform: "uppercase",
            }}
          >
            ✦ Curated by our travel experts ✦
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              margin: 0,
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 800,
              fontFamily: "Georgia, serif",
              color: SECONDARY,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Start Your Travel
            <br />
            <span
              style={{
                color: SECONDARY,
                opacity: 0.45,
                fontStyle: "italic",
              }}
            >
              Planning Here
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              margin: "14px auto 0",
              maxWidth: 480,
              fontSize: 15,
              lineHeight: 1.65,
              color: SECONDARY,
              opacity: 0.38,
            }}
          >
            Spin the globe, hover the markers, and discover{" "}
            {ALL_DESTINATIONS.length} handpicked destinations waiting for you.
          </motion.p>
        </header>

        {/* Decorative divider — accent orange tint */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(224,123,0,0.35), transparent)",
            margin: "28px auto",
            maxWidth: 320,
            transformOrigin: "center",
          }}
        />

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          <WorldGlobe />
        </motion.div>
      </div>
    </section>
  );
}