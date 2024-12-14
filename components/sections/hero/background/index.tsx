import { HeroGrid } from "./grid"
import { HeroCircles } from "./circles"

export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      <HeroGrid />
      <HeroCircles />
    </>
  );
}