"use client"

import { motion } from "framer-motion"
import { HERO_ANIMATIONS } from "@/lib/constants/hero"
import { HeroBadge } from "./badge"
import { HeroHeading } from "./heading"
import { HeroDescription } from "./description"
import { HeroCTA } from "./cta"
import { HeroStats } from "./stats"

export function HeroContent() {
  return (
    <motion.div
      variants={HERO_ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto max-w-4xl text-center"
    >
      <HeroBadge />
      <HeroHeading />
      <HeroDescription />
      <HeroCTA />
      <HeroStats />
    </motion.div>
  );
}