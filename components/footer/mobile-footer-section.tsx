"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"



export function MobileFooterSection({ title, links }: MobileFooterSectionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title} className="border-b border-border/50">
        <AccordionTrigger className="text-sm font-medium hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3 py-2">
            {links.map((link) => (
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
  )
}