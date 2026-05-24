import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blue Elephant — Where Journeys Meet Royal Hospitality",
  description:
    "Discover bespoke travel experiences with Blue Elephant. Custom itineraries, luxury stays, expert local guides, and wildlife safaris across the world.",
  keywords: [
    "luxury travel",
    "bespoke itineraries",
    "wildlife safaris",
    "honeymoon packages",
    "Blue Elephant",
  ],
  openGraph: {
    title: "Blue Elephant — Where Journeys Meet Royal Hospitality",
    description:
      "Discover comfort, elegance, and tradition — all in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}