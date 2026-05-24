"use client";

import { MeshBackground } from "../../components/services/Meshbackground";
import { ServiceGrid } from "../../components/services/Servicegrid";
import { HowItWorks } from "../../components/services/Howitworks";
import { WhyChooseUs } from "../../components/services/Whychooseus";
import { PopularDestinations } from "../../components/services/Populardestinations";
import { BottomCTA } from "../../components/services/Bottomcta";
import { Divider } from "../../components/services/Divider";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Chatbot from "../../components/Chatbot";

export default function Services() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <section
        id="services"
        className="
          relative overflow-hidden bg-slate-50
          
          /* Mobile spacing */
          pt-28 pb-16 px-4
          
          /* Tablet spacing */
          sm:pt-32 sm:pb-20 sm:px-6
          
          /* Desktop spacing */
          lg:pt-36 lg:pb-24 lg:px-8
        "
      >
        <MeshBackground />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 sm:mb-16">
            <ServiceGrid />
          </div>

          <Divider />

          <div className="my-12 sm:my-16">
            <HowItWorks />
          </div>

          <Divider />

          <div className="my-12 sm:my-16">
            <WhyChooseUs />
          </div>

          <Divider />

          <div className="my-12 sm:my-16">
            <PopularDestinations />
          </div>

          <div className="mt-14 sm:mt-20">
            <BottomCTA />
          </div>
        </div>
      </section>

      <Chatbot />
      <Footer />
    </>
  );
}