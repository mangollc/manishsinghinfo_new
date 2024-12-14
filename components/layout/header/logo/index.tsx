import Link from "next/link"
import { LogoSplash } from "./logo-splash"
import { LogoText } from "./logo-text"

interface LogoProps {
  satisfy: any // Next.js font object type
}

export function Logo({ satisfy }: LogoProps) {
  return (
    <Link href="/" className="relative flex items-center">
      <LogoSplash />
      <LogoText satisfy={satisfy} />
    </Link>
  )
}