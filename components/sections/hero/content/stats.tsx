"use client"

import { motion } from "framer-motion"
import { HERO_ANIMATIONS, HERO_STATS } from "@/lib/constants/hero"

export function HeroStats() {
  return (
    <motion.div 
      variants={HERO_ANIMATIONS.item}
      className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
    >
      {HERO_STATS.map((stat, index) => (
        <div key={stat.id} className="flex items-center">
          {index > 0 && <div className="mr-8 h-12 w-px bg-border" />}
          <div className="text-center">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}