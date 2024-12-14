export const HERO_STATS = [
  {
    id: 1,
    value: "10K+",
    label: "Clients Served"
  },
  {
    id: 2,
    value: "95%",
    label: "Success Rate"
  },
  {
    id: 3,
    value: "24/7",
    label: "Support"
  }
] as const;

export const HERO_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
} as const;