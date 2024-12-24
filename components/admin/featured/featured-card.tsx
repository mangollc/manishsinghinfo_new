import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { FeaturedCard as FeaturedCardType } from "@/lib/supabase/types"

interface FeaturedCardProps {
  card: FeaturedCardType
  onReorder: (id: string, newOrder: number) => void
}

export function FeaturedCard({ card, onReorder }: FeaturedCardProps) {
  return (
    <Card>
      <CardHeader>
        {card.image_url && (
          <div className="relative h-40 w-full mb-4">
            <Image
              src={card.image_url}
              alt={card.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <CardTitle>{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{card.description}</p>
        {card.cta_text && (
          <div className="mt-4">
            <span className="text-sm font-medium">CTA: {card.cta_text}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onReorder(card.id, (card.display_order || 0) - 1)}
          >
            ↑
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onReorder(card.id, (card.display_order || 0) + 1)}
          >
            ↓
          </Button>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/admin/featured/${card.id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}