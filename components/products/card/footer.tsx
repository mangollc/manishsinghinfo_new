import { Button } from "@/components/ui/button"

interface ProductFooterProps {
  price: string
}

export function ProductFooter({ price }: ProductFooterProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-lg font-bold">{price}</span>
      <Button>Learn More</Button>
    </div>
  );
}