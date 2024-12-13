import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-10 w-10 mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href} className="text-primary hover:underline">
          Learn more →
        </Link>
      </CardContent>
    </Card>
  )
}