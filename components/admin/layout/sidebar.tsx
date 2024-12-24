
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/theme"
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Layout, 
  FileEdit,
  Settings
} from "lucide-react"

const navItems = [
  { 
    href: "/admin", 
    label: "Dashboard",
    icon: LayoutDashboard 
  },
  { 
    href: "/admin/blog", 
    label: "Blog Posts",
    icon: FileText 
  },
  { 
    href: "/admin/products", 
    label: "Products",
    icon: Package 
  },
  { 
    href: "/admin/featured", 
    label: "Featured Cards",
    icon: Layout 
  },
  { 
    href: "/admin/pages", 
    label: "Pages",
    icon: FileEdit 
  },
  { 
    href: "/admin/settings", 
    label: "Settings",
    icon: Settings 
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r bg-muted/5">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                "hover:bg-accent/50 hover:text-accent-foreground",
                isActive && "bg-accent/50 text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
