"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function LogoSplash() {
  return (
    <motion.div
      className={cn(
        "absolute -inset-4 rounded-xl blur-lg",
        "bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30",
        "dark:from-primary/30 dark:via-secondary/30 dark:to-accent/30",
        "light:from-primary/80 light:via-accent/80 light:to-secondary/80"
      )}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [0.98, 1.02, 0.98],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}