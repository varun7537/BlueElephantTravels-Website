// page.tsx — REMOVE "use client"

import {
  DestinationsHero,
  Divider,
  FeaturedDestinations,
  ExploreDestinations,
  BestTimeToVisit,
  TravelVibes,
  DestinationsCTA,
} from "@/components/destinations";

import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

export default function Destinations() {
  return (
    <>
      <Navbar />

      <section
        id="destinations"
        className="section bg-background mt-6"
      >
        <div className="container-x">
          <DestinationsHero />
          <Divider />
          <FeaturedDestinations />
          <Divider />
          <ExploreDestinations />
          <Divider />
          <BestTimeToVisit />
          <Divider />
          <TravelVibes />
          <Divider />
          <DestinationsCTA />
        </div>
      </section>

      <Chatbot />
      <Footer />
    </>
  );
}