interface BlogMetaProps {
  author: string
  date: string
}

export function BlogMeta({ author, date }: BlogMetaProps) {
  return (
    <div className="flex items-center space-x-2">
      <span>{author}</span>
      <span>•</span>
      <span>{date}</span>
    </div>
  );
}