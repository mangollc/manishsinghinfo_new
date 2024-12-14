"use client"

import { motion } from "framer-motion"
import { HERO_ANIMATIONS } from "@/lib/constants/hero"

export function HeroDescription() {
  return (
    <motion.p
      variants={HERO_ANIMATIONS.item}
      className="mb-8 text-lg text-muted-foreground sm:text-xl"
    >
      Expert guidance on immigration, tax optimization, technology adoption, and career development.
      Access trusted insights and digital products to accelerate your journey.
    </motion.p>
  );
}