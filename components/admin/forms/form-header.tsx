
interface FormHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function FormHeader({ title, description, children }: FormHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-4">
          {children}
        </div>
      )}
    </div>
  )
}
