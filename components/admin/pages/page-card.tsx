import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { InformationPage } from "@/lib/supabase/types"

interface PageCardProps {
  page: InformationPage
}

export function PageCard({ page }: PageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.title}</CardTitle>
        <p className="text-sm text-muted-foreground">/{page.slug}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Status: {page.status}</span>
          <span>•</span>
          <span>Last updated: {new Date(page.updated_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href={`/admin/pages/${page.id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}