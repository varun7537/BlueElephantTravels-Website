import type React from "react";

export type Tab = "International" | "Domestic" | "Events";

export type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  waLink: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
  accent: string;
};

export type Destination = {
  name: string;
  tagline: string;
  image: string;
  waLink: string;
  flag: string;
};

export type Step = {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  glow: string;
};

export type TrustPillar = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

export type TrustStat = {
  value: string;
  label: string;
  hasstar?: boolean;
};