export interface Product {
  title: string
  description: string
  price: string
  tags: string[]
  image: string
  category: ProductCategory
}

export type ProductCategory = 
  | "courses"
  | "templates"
  | "assets"
  | "tools"

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "courses",
  "templates",
  "assets",
  "tools"
];

export const PRODUCTS: Record<ProductCategory, Product[]> = {
  courses: [
    {
      title: "Immigration Mastery Course",
      description: "Comprehensive guide to immigration processes and procedures.",
      price: "$199",
      tags: ["Featured", "Immigration"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
      category: "courses"
    }
  ],
  templates: [
    {
      title: "Immigration Document Templates",
      description: "Professional templates for visa applications and documentation.",
      price: "$49",
      tags: ["Immigration", "Templates"],
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop",
      category: "templates"
    }
  ],
  assets: [
    {
      title: "Business Presentation Kit",
      description: "Professional presentation templates and graphics.",
      price: "$39",
      tags: ["Business", "Graphics"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop",
      category: "assets"
    }
  ],
  tools: [
    {
      title: "Tax Calculator Pro",
      description: "Advanced tax calculation and planning tool.",
      price: "$79",
      tags: ["Tax", "Tool"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
      category: "tools"
    }
  ]
};