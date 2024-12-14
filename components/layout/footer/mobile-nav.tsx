"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { footerNavigation } from "@/config/navigation"

export function MobileFooterNav() {
  return (
    <div className="space-y-4 md:hidden">
      <FooterAccordionSection title="Resources" items={footerNavigation.resources} />
      <FooterAccordionSection title="Company" items={footerNavigation.company} />
      <FooterAccordionSection title="Products" items={footerNavigation.products} />
    </div>
  )
}

interface FooterAccordionSectionProps {
  title: string
  items: Array<{ name: string; href: string }>
}

function FooterAccordionSection({ title, items }: FooterAccordionSectionProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={title} className="border-b-0">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3 py-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}