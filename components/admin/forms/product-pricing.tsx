
"use client"

import { FormRow } from "./form-row"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

interface ProductPricingProps {
  regularPrice: number
  discountedPrice: number | null
  onRegularPriceChange: (price: number) => void
  onDiscountedPriceChange: (price: number | null) => void
}

export function ProductPricing({
  regularPrice,
  discountedPrice,
  onRegularPriceChange,
  onDiscountedPriceChange
}: ProductPricingProps) {
  return (
    <div className="space-y-4">
      <FormRow label="Regular Price">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={regularPrice || ""}
          onChange={(e) => onRegularPriceChange(parseFloat(e.target.value))}
          placeholder="0.00"
        />
      </FormRow>

      <div className="flex items-center gap-2">
        <Switch
          checked={discountedPrice !== null}
          onCheckedChange={(checked) => {
            onDiscountedPriceChange(checked ? regularPrice : null)
          }}
        />
        <span className="text-sm">Enable discounted price</span>
      </div>

      {discountedPrice !== null && (
        <FormRow label="Discounted Price">
          <Input
            type="number"
            min="0"
            step="0.01"
            value={discountedPrice || ""}
            onChange={(e) => onDiscountedPriceChange(parseFloat(e.target.value))}
            placeholder="0.00"
          />
        </FormRow>
      )}
    </div>
  )
}
