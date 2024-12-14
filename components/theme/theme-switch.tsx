"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { SunIcon } from "./icons/sun-icon"
import { MoonIcon } from "./icons/moon-icon"
import { useMounted } from "./hooks/use-mounted"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return (
      <div className="flex h-9 items-center gap-2 opacity-0">
        <SunIcon />
        <Switch checked={false} />
        <MoonIcon />
      </div>
    )
  }

  return (
    <div className="flex h-9 items-center gap-2">
      <SunIcon className={theme === 'dark' ? 'opacity-50' : 'opacity-100'} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      />
      <MoonIcon className={theme === 'dark' ? 'opacity-100' : 'opacity-50'} />
    </div>
  )
}