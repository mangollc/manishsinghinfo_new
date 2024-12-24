
"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProductFeaturesProps {
  features: string[]
  onFeaturesChange: (features: string[]) => void
}

export function ProductFeatures({ features, onFeaturesChange }: ProductFeaturesProps) {
  const addFeature = () => {
    onFeaturesChange([...features, ""])
  }

  const removeFeature = (index: number) => {
    onFeaturesChange(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    onFeaturesChange(newFeatures)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Product Features</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFeature}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {features.map((feature, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={feature}
            onChange={(e) => updateFeature(index, e.target.value)}
            placeholder="Enter feature"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeFeature(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
```