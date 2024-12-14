import { FooterNavSection } from "../section"
import { FOOTER_SECTIONS } from "@/lib/constants/footer"

interface DesktopFooterNavProps {
  section: keyof typeof FOOTER_SECTIONS
}

export function DesktopFooterNav({ section }: DesktopFooterNavProps) {
  const sectionData = FOOTER_SECTIONS[section]
  return <FooterNavSection {...sectionData} />
}