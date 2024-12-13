export const mainNavigation = [
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
] as const

export const footerNavigation = {
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  products: [
    { name: "Courses", href: "/products/courses" },
    { name: "Templates", href: "/products/templates" },
    { name: "Tools", href: "/products/tools" },
  ],
} as const