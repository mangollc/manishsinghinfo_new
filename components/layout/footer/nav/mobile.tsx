"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FOOTER_SECTIONS } from "@/lib/constants/footer"

export function MobileFooterNav() {
  return (
    <div className="space-y-4 md:hidden">
      {Object.entries(FOOTER_SECTIONS).map(([key, section]) => (
        <Accordion key={key} type="single" collapsible>
          <AccordionItem value={section.title} className="border-b-0">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 py-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}