"use client";

import { motion } from "framer-motion";
import { ChannelCard } from "./index";
import { CONTACT_CHANNELS } from "../../app/contact/data";

export function ContactChannels() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
      }}
      className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {CONTACT_CHANNELS.map((channel) => (
        <ChannelCard key={channel.label} channel={channel} />
      ))}
    </motion.div>
  );
}