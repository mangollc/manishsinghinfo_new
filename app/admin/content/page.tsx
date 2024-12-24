
"use client"

import { ContentOverview } from "@/components/admin/content/content-overview"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Overview</h1>
        <p className="text-muted-foreground">
          Manage all your content in one place
        </p>
      </div>
      <ContentOverview />
    </div>
  )
}
