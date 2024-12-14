import { FOOTER_SECTIONS } from "@/lib/constants/footer"
import { FooterNavSection } from "./section"

export function DesktopFooterNav() {
  return (
    <div className="footer-nav-desktop">
      {Object.entries(FOOTER_SECTIONS).map(([key, section]) => (
        <FooterNavSection key={key} {...section} />
      ))}
    </div>
  );
}