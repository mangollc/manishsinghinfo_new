"use client"

import { QuickActionItem } from "./quick-action-item"
import { QUICK_ACTIONS } from "./data"

export function QuickActionGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {QUICK_ACTIONS.map((action) => (
        <QuickActionItem key={action.href} {...action} />
      ))}
    </div>
  )
}