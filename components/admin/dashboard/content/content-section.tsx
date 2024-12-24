
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DraftsList } from "./drafts-list"
import { PublishedList } from "./published-list"
import { ContentStats } from "./content-stats"

export function ContentSection() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Content</CardTitle>
          <ContentStats />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="drafts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="drafts">
              Drafts
            </TabsTrigger>
            <TabsTrigger value="published">
              Published
            </TabsTrigger>
          </TabsList>
          <TabsContent value="drafts">
            <DraftsList />
          </TabsContent>
          <TabsContent value="published">
            <PublishedList />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
