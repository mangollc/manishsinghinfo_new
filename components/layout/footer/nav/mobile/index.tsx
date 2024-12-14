import { FOOTER_SECTIONS } from "@/lib/constants/footer"
import { MobileFooterSection } from "./section"

export function MobileFooterNav() {
  return (
    <div className="footer-nav-mobile">
      {Object.entries(FOOTER_SECTIONS).map(([key, section]) => (
        <MobileFooterSection key={key} {...section} />
      ))}
    </div>
  );
}