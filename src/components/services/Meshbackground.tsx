"use client";

export function MeshBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(251,191,36,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(99,102,241,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="topo"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <ellipse cx="60" cy="60" rx="55" ry="30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            <ellipse cx="60" cy="60" rx="42" ry="20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            <ellipse cx="60" cy="60" rx="28" ry="12" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            <ellipse cx="60" cy="60" rx="14" ry="6"  fill="none" stroke="#1e293b" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>

      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}