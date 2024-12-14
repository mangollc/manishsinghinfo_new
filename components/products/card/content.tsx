interface ProductContentProps {
  title: string
  description: string
}

export function ProductContent({ title, description }: ProductContentProps) {
  return (
    <>
      <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </>
  );
}