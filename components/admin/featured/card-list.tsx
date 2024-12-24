"use client"

import { useFeaturedCards } from "@/hooks/admin/use-featured-cards"
import { FeaturedCard } from "./card"
import { LoadingState } from "../shared/loading-state"
import { ErrorState } from "../shared/error-state"

export function FeaturedCardList() {
  const { cards, loading, error, reorderCard } = useFeaturedCards()

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <FeaturedCard 
          key={card.id} 
          card={card} 
          onReorder={reorderCard}
        />
      ))}
    </div>
  )
}