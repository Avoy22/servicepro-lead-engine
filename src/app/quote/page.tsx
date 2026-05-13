import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a quote for ServicePro Lead Engine — a full-stack lead generation website and mini CRM for service businesses.",
};

export default function QuotePage() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24">
            <Badge variant="outline" className="border-border/80 px-3 py-1">
              Request a quote
            </Badge>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Tell us about your service business.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Share a few details and we&apos;ll come back with a tailored
              ServicePro Lead Engine plan — website, quote form, and mini CRM
              setup designed around your industry.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                "We respond within 1 business day",
                "Custom plan tailored to your industry",
                "No obligation, no pressure",
                "Live demo available on request",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-foreground/80"
                >
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
