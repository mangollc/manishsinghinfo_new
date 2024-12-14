export interface BlogPost {
  title: string
  excerpt: string
  author: string
  date: string
  category: BlogCategory
  tags: string[]
  image: string
}

export type BlogCategory = 
  | "Immigration"
  | "Tax & Finance"
  | "Technology"
  | "AI"
  | "Career"
  | "Success Stories"

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Immigration",
  "Tax & Finance",
  "Technology",
  "AI",
  "Career",
  "Success Stories"
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "2024 Immigration Policy Updates",
    excerpt: "Stay informed about the latest changes in immigration policies and procedures.",
    author: "Manish Singh",
    date: "Mar 15, 2024",
    category: "Immigration",
    tags: ["Immigration", "Guide"],
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop"
  },
  {
    title: "Tax Planning Strategies for Digital Nomads",
    excerpt: "Essential tax optimization tips for location-independent professionals.",
    author: "Manish Singh",
    date: "Mar 12, 2024",
    category: "Tax & Finance",
    tags: ["Tax", "Guide"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop"
  },
  {
    title: "AI Tools for Small Business Growth",
    excerpt: "Leverage AI to streamline operations and boost productivity.",
    author: "Manish Singh",
    date: "Mar 10, 2024",
    category: "AI",
    tags: ["AI", "Business"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
  }
];