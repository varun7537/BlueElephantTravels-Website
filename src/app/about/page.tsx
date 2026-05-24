"use client";

import {
  AboutHero,
  Divider,
  MeetFounder,
  WhyChooseUs,
  WhatWeOffer,
  OurValues,
  FAQ,
} from "../../components/aboutpage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function About() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

    <section id="about" className="section bg-background pt-24 sm:pt-30 lg:pt-32">
      <div className="container-x">

        {/* 1 — Hero / Mission */}
        <AboutHero />

        <Divider />

        {/* 2 — Meet the Founder */}
        <MeetFounder />

        <Divider />

        {/* 3 — Why Choose Us */}
        <WhyChooseUs />

        <Divider />

        {/* 4 — What We Offer */}
        <WhatWeOffer />

        <Divider />

        {/* 5 — Our Values */}
        <OurValues />

        <Divider />

        {/* 6 — FAQ */}
        <FAQ />

      </div>
    </section>

      <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
        <Chatbot />
      </div>
      <Footer />
    </>
  );
}