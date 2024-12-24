import { FeaturedCardList } from "@/components/admin/featured/card-list"
import { FeaturedHeader } from "@/components/admin/featured/header"

export default function FeaturedAdmin() {
  return (
    <div className="space-y-8">
      <FeaturedHeader />
      <FeaturedCardList />
    </div>
  )
}