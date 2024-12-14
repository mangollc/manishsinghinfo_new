import { BookOpen, BrainCircuit, Calculator, GraduationCap, Receipt, Plane } from "lucide-react"
import { Container } from "@/components/ui/container"
import { FeatureCard } from "@/components/cards/feature-card"

const features = [
  {
    icon: Plane,
    title: "Immigration Guidance",
    description: "Stay current on visa policies, compliance tips, and global migration trends.",
    href: "/immigration",
  },
  {
    icon: Calculator,
    title: "Tax & Finance",
    description: "Optimize your finances with step-by-step tax guides and smart savings strategies.",
    href: "/tax-finance",
  },
  {
    icon: BrainCircuit,
    title: "Technology & AI",
    description: "Leverage cutting-edge technology and AI-driven solutions for your success.",
    href: "/tech-ai",
  },
  {
    icon: GraduationCap,
    title: "Career Development",
    description: "Accelerate your professional growth with curated career resources and guidance.",
    href: "/career",
  },
  {
    icon: BookOpen,
    title: "Digital Products",
    description: "Access premium eCourses, templates, and tools designed for your success.",
    href: "/products",
  },
  {
    icon: Receipt,
    title: "Small Business Accounting",
    description: "Streamline your business finances with expert accounting guidance and tools.",
    href: "/accounting",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t bg-muted/40 py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Key Offerings</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive resources and expert guidance to help you navigate complex challenges and achieve your goals.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}