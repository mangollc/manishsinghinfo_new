import * as React from "react"

export const stats = [
  {
    id: 1,
    value: "10K+",
    label: "Clients Served"
  },
  {
    id: 2,
    value: "95%",
    label: "Success Rate"
  },
  {
    id: 3,
    value: "24/7",
    label: "Support"
  }
]

export function HeroStats() {
  return (
    <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground">
      {stats.map((stat, index) => (
        <React.Fragment key={stat.id}>
          {index > 0 && <div className="h-12 w-px bg-border" />}
          <div className="text-center">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}