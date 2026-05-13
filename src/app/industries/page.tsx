import type { Metadata } from "next";
import { Industries } from "@/components/sections/Industries";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "ServicePro Lead Engine adapts to any service industry — home services, health & wellness, beauty, food & events, professional services, and skilled trades.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="border-border/80 px-3 py-1">
              Industries we serve
            </Badge>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Built for service businesses, in every industry.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The platform ships with industry-tuned copy, structure, and
              examples — so you can launch a credible site for clinics,
              salons, contractors, consultants, and more without starting
              from scratch.
            </p>
          </div>
        </div>
      </section>

      <Industries
        heading="Pick your industry"
        subheading="Each card represents a real industry vertical the platform is positioned for. Copy, layouts, and lead fields adapt to fit."
        showViewAll={false}
      />

      <CTASection />
    </>
  );
}
