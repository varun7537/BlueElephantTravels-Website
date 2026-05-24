"use client";

import {
  Hero,
  Destinations,
  Features,
  Testimonials,
  Instagram,
  CTA,
} from "@/components/homepage";

import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { NavbarMenuProvider, useNavbarMenu } from "./context/Navbarmenucontext";

function PageContent() {
  const { isMenuOpen } = useNavbarMenu();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main>
        <Hero />
        <Destinations />
        <Features />
        <Instagram />
        <Testimonials />
        <CTA />
      </main>

      <div
        className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6 transition-all duration-300"
        style={{
          opacity: isMenuOpen ? 0 : 1,
          pointerEvents: isMenuOpen ? "none" : "auto",
          transform: isMenuOpen ? "scale(0.85) translateY(8px)" : "scale(1) translateY(0)",
        }}
      >
        <Chatbot />
      </div>

      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <NavbarMenuProvider>
      <PageContent />
    </NavbarMenuProvider>
  );
}