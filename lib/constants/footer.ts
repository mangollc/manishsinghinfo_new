export interface FooterLink {
  name: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export const FOOTER_SECTIONS = {
  resources: {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
  products: {
    title: "Products",
    links: [
      { name: "Courses", href: "/products/courses" },
      { name: "Templates", href: "/products/templates" },
      { name: "Tools", href: "/products/tools" },
    ],
  },
} as const;