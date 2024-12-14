import { SocialIcons } from "./social/icons"

export function Copyright() {
  return (
    <div className="flex flex-col items-center gap-4">
      <SocialIcons />
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} ManishSingh.info. All rights reserved.
      </p>
    </div>
  )
}