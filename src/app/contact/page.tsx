"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

import { Divider } from "@/components/contactus";
import { ContactChannels } from "@/components/contactus/ContactChannels";
import { ContactForm } from "@/components/contactus/ContactForm";
import { OfficeInfo } from "@/components/contactus/OfficeInfo";
import { FaqSection } from "@/components/contactus/FaqSection";
import { MapEmbed } from "@/components/contactus/MapEmbed";
import { QuickCTA } from "@/components/contactus/QuickCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Contact() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

    <section id="contact" className="section bg-background pt-28 sm:pt-32 lg:pt-36">
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary"
          >
            <MessageSquare size={11} className="text-accent" />
            Get in Touch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="section-title mt-4"
          >
            We'd Love to Hear From You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="section-subtitle"
          >
            Whether you're ready to book or just starting to dream —
            reach out any way you prefer.
          </motion.p>
        </header>

        <ContactChannels />

        <Divider />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <ContactForm />
          <OfficeInfo />
        </div>

        <Divider />

        <FaqSection />

        <Divider />

        <MapEmbed />

        <QuickCTA />
      </div>
    </section>

      <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
        <Chatbot />
      </div>
      <Footer />
    </>
  );
}