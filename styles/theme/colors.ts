export const themeColors = {
  light: {
    background: "0 0% 100%",
    foreground: "224 71.4% 4.1%",
    primary: "262.1 83.3% 57.8%",
    secondary: "220 14.3% 95.9%",
    accent: "47 95% 53%",
    muted: "220 14.3% 95.9%",
    border: "220 13% 91%",
  },
  dark: {
    background: "224 71.4% 4.1%",
    foreground: "210 20% 98%",
    primary: "24 95% 53%",
    secondary: "2 85% 63%",
    accent: "47 95% 53%",
    muted: "215 27.9% 16.9%",
    border: "215 27.9% 16.9%",
  },
  categories: {
    immigration: "221 83% 53%",
    tax: "142 76% 36%",
    tech: "199 89% 48%",
    ai: "265 89% 78%",
    business: "24 95% 53%",
    career: "331 74% 70%",
    guide: "2 85% 63%",
    featured: "47 95% 53%",
    new: "172 66% 50%",
  },
} as const

export type ThemeColor = keyof typeof themeColors.light | keyof typeof themeColors.dark
export type CategoryColor = keyof typeof themeColors.categories