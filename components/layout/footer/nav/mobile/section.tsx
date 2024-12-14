"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FooterSection } from "@/lib/constants/footer"

interface MobileFooterSectionProps extends FooterSection {}

export function MobileFooterSection({ title, links }: MobileFooterSectionProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={title} className="border-b-0">
        <AccordionTrigger className="footer-nav-heading hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="footer-nav-list py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-nav-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}