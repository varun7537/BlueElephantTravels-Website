"use client";

import { motion } from "framer-motion";

export default function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="my-20 h-px bg-gradient-to-r from-transparent via-border to-transparent"
    />
  );
}