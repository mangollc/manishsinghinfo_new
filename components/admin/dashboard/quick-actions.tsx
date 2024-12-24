
"use client"

import Link from "next/link"
import { Plus, FileText, Package, Layout, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const actions = [
  {
    title: "New Blog Post",
    href: "/admin/blog/new",
    icon: FileText,
    description: "Create a new blog post",
  },
  {
    title: "New Product",
    href: "/admin/products/new",
    icon: Package,
    description: "Add a new product",
  },
  {
    title: "New Featured Card",
    href: "/admin/featured/new",
    icon: Layout,
    description: "Create a featured card",
  },
  {
    title: "New Page",
    href: "/admin/pages/new",
    icon: FileEdit,
    description: "Add a new page",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.href}
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                asChild
              >
                <Link href={action.href}>
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {action.description}
                  </span>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}