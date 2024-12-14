export interface NavLink {
  name: string
  href: string
  description?: string
}

export interface NavItem {
  name: string
  href?: string
  items?: NavLink[]
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Information",
    items: [
      {
        name: "Immigration",
        href: "/immigration",
        description: "Stay current on visa policies, compliance tips, and global migration trends.",
      },
      {
        name: "Tax & Finance",
        href: "/tax-finance",
        description: "Optimize your finances with step-by-step tax guides and smart savings strategies.",
      },
      {
        name: "Career Guidance",
        href: "/career",
        description: "Accelerate your professional growth with curated career resources.",
      },
    ],
  },
  { name: "Technology & AI", href: "/tech-ai" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
] as const;