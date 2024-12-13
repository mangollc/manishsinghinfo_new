"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

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
        <span className="text-sm font-medium text-primary">
          Trusted by thousands of professionals
        </span>
      </motion.div>
      <motion.h1
        variants={itemVariants}
        className="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl"
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
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button size="lg" className="group min-w-[200px]" asChild>
          <Link href="/products">
            Explore Products
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="min-w-[200px]" asChild>
          <Link href="/blog">Read Success Stories</Link>
        </Button>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">10K+</div>
          <div className="text-sm">Clients Served</div>
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="text-center">
          <div className="text-2xl font-bold">95%</div>
          <div className="text-sm">Success Rate</div>
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="text-center">
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm">Support</div>
        </div>
      </motion.div>
    </motion.div>
  )
}