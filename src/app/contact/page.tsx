import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  GitBranch,
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch about the ${site.name} portfolio project — open to freelance, productized, and consulting engagements worldwide.`,
};

export default function ContactPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="outline" className="border-border/80 px-3 py-1">
            Contact
          </Badge>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s build a lead engine for your service business.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            This is a portfolio demo project, but the platform behind it is
            production-ready. Reach out for freelance, productized, or
            consulting engagements — anywhere in the world.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex size-11 items-center justify-center rounded-lg bg-foreground text-background">
                <Mail className="size-5" />
              </div>
              <CardTitle className="mt-3 text-lg">Email</CardTitle>
              <CardDescription>
                Best for project briefs, scoping calls, and partnership
                inquiries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full">
                <a href={`mailto:${site.email}`}>
                  {site.email}
                  <ArrowRight />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex size-11 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <MessageCircle className="size-5" />
              </div>
              <CardTitle className="mt-3 text-lg">Quote form</CardTitle>
              <CardDescription>
                Share project details, budget, and timeline — get a tailored
                response.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="/quote">
                  Open the quote form
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex size-11 items-center justify-center rounded-lg bg-foreground text-background">
                <Briefcase className="size-5" />
              </div>
              <CardTitle className="mt-3 text-lg">LinkedIn</CardTitle>
              <CardDescription>
                Connect for freelance work, productized services, and
                long-term consulting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" variant="outline" className="w-full">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  Visit profile
                  <ExternalLink />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex size-11 items-center justify-center rounded-lg bg-foreground text-background">
                <GitBranch className="size-5" />
              </div>
              <CardTitle className="mt-3 text-lg">GitHub</CardTitle>
              <CardDescription>
                Source for this case study and other portfolio projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" variant="outline" className="w-full">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View repos
                  <ExternalLink />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 rounded-2xl border border-border/70 bg-muted/30 p-6 ring-1 ring-foreground/5 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
              <Globe className="size-5" />
            </div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Available worldwide
            </h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Working with service businesses across regions and time zones.
            Async-friendly delivery, clear scoping docs, and live demos at
            every milestone.
          </p>
        </div>
      </div>
    </section>
  );
}
