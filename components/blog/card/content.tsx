import Link from "next/link"

interface BlogContentProps {
  title: string
  excerpt: string
}

export function BlogContent({ title, excerpt }: BlogContentProps) {
  return (
    <>
      <Link href="#" className="block group">
        <h3 className="text-lg font-semibold group-hover:text-primary">
          {title}
        </h3>
      </Link>
      <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
    </>
  );
}