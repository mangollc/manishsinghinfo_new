import { FileText, Package, Layout, FileEdit } from "lucide-react"
import type { QuickAction } from "./types"

export const QUICK_ACTIONS: QuickAction[] = [
  {
    title: "New Blog Post",
    href: "/admin/blog/new",
    icon: FileText,
    description: "Create a new blog post"
  },
  {
    title: "New Product",
    href: "/admin/products/new",
    icon: Package,
    description: "Add a new product"
  },
  {
    title: "New Featured Card",
    href: "/admin/featured/new",
    icon: Layout,
    description: "Create a featured card"
  },
  {
    title: "New Page",
    href: "/admin/pages/new",
    icon: FileEdit,
    description: "Add a new page"
  }
]