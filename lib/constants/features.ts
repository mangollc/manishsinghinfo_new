import { BookOpen, BrainCircuit, Calculator, GraduationCap, Receipt, Plane } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  href: string
  category: FeatureCategory
}

export type FeatureCategory = 
  | "immigration"
  | "tax"
  | "tech"
  | "career"
  | "business"

export const FEATURES: Feature[] = [
  {
    icon: Plane,
    title: "Immigration Guidance",
    description: "Stay current on visa policies, compliance tips, and global migration trends.",
    href: "/immigration",
    category: "immigration"
  },
  {
    icon: Calculator,
    title: "Tax & Finance",
    description: "Optimize your finances with step-by-step tax guides and smart savings strategies.",
    href: "/tax-finance",
    category: "tax"
  },
  {
    icon: BrainCircuit,
    title: "Technology & AI",
    description: "Leverage cutting-edge technology and AI-driven solutions for your success.",
    href: "/tech-ai",
    category: "tech"
  },
  {
    icon: GraduationCap,
    title: "Career Development",
    description: "Accelerate your professional growth with curated career resources and guidance.",
    href: "/career",
    category: "career"
  },
  {
    icon: BookOpen,
    title: "Digital Products",
    description: "Access premium eCourses, templates, and tools designed for your success.",
    href: "/products",
    category: "business"
  },
  {
    icon: Receipt,
    title: "Small Business Accounting",
    description: "Streamline your business finances with expert accounting guidance and tools.",
    href: "/accounting",
    category: "business"
  },
] as const;