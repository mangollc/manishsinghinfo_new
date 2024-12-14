"use client"

import { motion } from "framer-motion"
import { HeroStats } from "./stats"
import { HeroCtaButtons } from "./cta-buttons"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto max-w-4xl text-center"
    >
      <motion.div variants={itemVariants} className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5">
        <span className="gradient-text text-sm font-medium">
          Trusted by thousands of professionals
        </span>
      </motion.div>
      <motion.h1
        variants={itemVariants}
        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl hero-gradient bg-clip-text text-transparent"
      >
        Your Trusted Resource for Success & Expert Guidance
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="mb-8 text-lg text-muted-foreground sm:text-xl"
      >
        Expert guidance on immigration, tax optimization, technology adoption, and career development.
        Access trusted insights and digital products to accelerate your journey.
      </motion.p>
      <motion.div variants={itemVariants}>
        <HeroCtaButtons />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HeroStats />
      </motion.div>
    </motion.div>
  )
}