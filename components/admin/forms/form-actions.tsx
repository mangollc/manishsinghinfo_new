
import { Button } from "@/components/ui/button"

interface FormActionsProps {
  loading: boolean
  isDirty: boolean
  onCancel: () => void
  primaryAction?: string
  secondaryAction?: string
}

export function FormActions({
  loading,
  isDirty,
  onCancel,
  primaryAction = "Save",
  secondaryAction = "Cancel"
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        {secondaryAction}
      </Button>
      <Button type="submit" disabled={loading || !isDirty}>
        {loading ? "Saving..." : primaryAction}
      </Button>
    </div>
  )
}
