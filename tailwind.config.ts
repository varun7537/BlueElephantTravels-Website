import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        surface: "var(--surface)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        border: "var(--border)",
        success: "var(--success)",
        danger: "var(--danger)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 82, 186, 0.18)",
        card: "0 6px 24px -8px rgba(11, 31, 58, 0.10)",
        lift: "0 24px 60px -20px rgba(15, 23, 42, 0.30)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 55%, var(--accent) 100%)",
        "gradient-deep":
          "linear-gradient(180deg, rgba(11,31,58,0.05) 0%, rgba(11,31,58,0) 100%)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "float-slow": "float-slow 7s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
