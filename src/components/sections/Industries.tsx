import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { industries } from "@/data/industries";
import { industryIconMap } from "@/lib/icons";

export function Industries({
  heading = "Built for service businesses in any industry",
  subheading = "From home services to professional consultancies, ServicePro adapts to the way each industry wins customers.",
  showViewAll = true,
  limit,
}: {
  heading?: string;
  subheading?: string;
  showViewAll?: boolean;
  limit?: number;
}) {
  const list = typeof limit === "number" ? industries.slice(0, limit) : industries;

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Industries
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
              <Link href="/industries">
                Explore industries
                <ArrowRight />
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((industry) => {
            const Icon = industryIconMap[industry.icon] ?? Building2;
            return (
              <Card key={industry.slug} className="h-full">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="mt-4 text-lg">{industry.name}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {industry.examples.map((ex) => (
                      <Badge key={ex} variant="secondary">
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
