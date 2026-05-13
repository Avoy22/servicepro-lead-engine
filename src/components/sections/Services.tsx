import Link from "next/link";
import { ArrowRight, CheckCircle2, Hammer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/data/services";
import { serviceIconMap } from "@/lib/icons";

export function Services({
  heading = "Everything you need to capture more leads",
  subheading = "A complete lead generation stack — website, quote form, and mini CRM — built for service businesses anywhere in the world.",
  showViewAll = true,
  limit,
}: {
  heading?: string;
  subheading?: string;
  showViewAll?: boolean;
  limit?: number;
}) {
  const list = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <section className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Platform features
            </div>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {subheading}
            </p>
          </div>
          {showViewAll ? (
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                View all features
                <ArrowRight />
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => {
            const Icon = serviceIconMap[service.icon] ?? Hammer;
            return (
              <Card
                key={service.slug}
                className="group/service-card relative transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-foreground text-background">
                      <Icon className="size-5" />
                    </div>
                    <Badge variant="outline">{service.tag}</Badge>
                  </div>
                  <CardTitle className="mt-4 text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="size-4 text-emerald-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
