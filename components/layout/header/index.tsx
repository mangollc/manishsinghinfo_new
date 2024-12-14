import { Navbar } from "./navbar"
import { Container } from "@/components/ui/container"

interface HeaderProps {
  satisfy: any // Next.js font object type
}

export function Header({ satisfy }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b nav-background">
      <Container>
        <Navbar satisfy={satisfy} />
      </Container>
    </header>
  )
}