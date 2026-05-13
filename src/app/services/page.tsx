import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Services & Features",
  description:
    "Every feature inside the ServicePro Lead Engine platform — conversion-focused website, quote request system, mini CRM, industry pages, SEO, and integrations.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="border-border/80 px-3 py-1">
              Platform features
            </Badge>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Every feature inside ServicePro Lead Engine.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A full-stack lead generation platform — a polished website, a
              structured quote form, and a lightweight CRM dashboard, all
              wired together for service businesses anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      <Services
        heading="All platform features"
        subheading="From the public website to the internal dashboard, here's everything that ships with ServicePro Lead Engine."
        showViewAll={false}
      />

      <CTASection />
    </>
  );
}
