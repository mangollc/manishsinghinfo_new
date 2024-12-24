"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDrafts } from "@/hooks/admin/use-drafts"

export function DraftItems() {
  const { drafts, loading } = useDrafts()

  if (loading) {
    return <div>Loading drafts...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Draft Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <Link
                  href={`/admin/${draft.type}/${draft.id}`}
                  className="font-medium hover:underline"
                >
                  {draft.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {draft.type}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                Last edited {new Date(draft.updatedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}