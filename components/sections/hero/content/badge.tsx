"use client"

import { motion } from "framer-motion"
import { HERO_ANIMATIONS } from "@/lib/constants/hero"

export function HeroBadge() {
  return (
    <motion.div 
      variants={HERO_ANIMATIONS.item} 
      className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5"
    >
      <span className="gradient-text text-sm font-medium">
        Trusted by thousands of professionals
      </span>
    </motion.div>
  );
}