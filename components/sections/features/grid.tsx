import { FEATURES } from "@/lib/constants/features"
import { FeatureCard } from "./card"

export function FeaturesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.href} {...feature} />
      ))}
    </div>
  );
}