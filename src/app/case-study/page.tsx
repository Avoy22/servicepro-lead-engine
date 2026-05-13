import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  LineChart,
  Rocket,
  Target,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Case Study",
  description:
    "How ServicePro Lead Engine was built — a full-stack lead generation platform for service businesses, designed as a portfolio demo for global clients.",
};

const techStack = [
  { name: "Next.js 16", note: "App Router, server components" },
  { name: "TypeScript", note: "End-to-end type safety" },
  { name: "Tailwind CSS v4", note: "Design system styling" },
  { name: "shadcn/ui", note: "Composable UI primitives" },
  { name: "lucide-react", note: "Icon library" },
  { name: "react-hook-form + zod", note: "Form validation (future)" },
];

const features = [
  "SaaS-style marketing site with dark/light sections",
  "Quote request system with budget & timeline fields",
  "Mini CRM dashboard with lead statuses and pipeline metrics",
  "Industry pages targeting six core verticals",
  "Reusable section components and design tokens",
  "Mobile-first responsive layout, optimized for SEO",
];

const futureWork = [
  "Supabase backend for real lead storage",
  "Authentication and per-tenant dashboards",
  "Email & WhatsApp notifications on new leads",
  "Admin panel for status updates and notes",
  "Per-industry preset themes and copy variants",
  "Analytics: conversion rate by industry and source",
];

export default function CaseStudyPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-zinc-950 text-zinc-100">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Badge variant="outline" className="border-white/20 bg-white/5 px-3 py-1 text-zinc-200">
            Portfolio case study
          </Badge>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            ServicePro Lead Engine — building a global lead generation platform for service businesses.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            A full-stack portfolio project demonstrating how a modern Next.js
            stack can ship a polished website, structured quote form, and
            mini CRM for any service business — built to attract Upwork,
            Fiverr, and LinkedIn clients.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200">
              <Link href="/dashboard">
                See the live demo
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-zinc-200 hover:bg-white/10 hover:text-white">
              <Link href="/quote">Request a quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Block icon={Target} title="The problem">
              <p>
                Most service businesses — plumbers, salons, clinics,
                contractors, consultants — rely on word of mouth. Their
                websites are either missing, outdated, or so slow that
                visitors bounce. Leads scatter across email, WhatsApp, and
                phone, with no system to follow up or measure conversions.
              </p>
            </Block>
            <Block icon={Rocket} title="The goal">
              <p>
                Design a reusable lead generation platform that any service
                business could deploy in days. It had to look premium,
                convert traffic into structured quote requests, and give the
                owner a lightweight CRM to manage everything in one place —
                without requiring engineering knowledge.
              </p>
            </Block>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
              <Code2 className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Tech stack
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A modern, production-grade stack chosen for performance,
            developer ergonomics, and global deployability.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="rounded-xl border border-border/70 bg-background p-5 ring-1 ring-foreground/5"
              >
                <div className="font-heading text-base font-semibold tracking-tight">
                  {tech.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {tech.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
                  <Layers className="size-5" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Features shipped
                </h2>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
                  <LineChart className="size-5" />
                </div>
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Business impact
                </h2>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                As a productized portfolio offering, ServicePro Lead Engine
                gives clients a credible, modern web presence in a fraction
                of the time of a custom build. The structured quote form
                replaces ad-hoc messaging, and the mini CRM turns scattered
                inquiries into a measurable pipeline — making it easier for
                owners to forecast revenue and prioritize follow-ups.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Higher quote completion rates vs. plain contact forms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Centralized lead pipeline replaces scattered DMs/emails
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Reusable foundation for new client engagements
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
              <Wrench className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Future improvements
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Frontend-first by design — the next phase wires up a real
            backend, multi-tenancy, and automation.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {futureWork.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-dashed border-border bg-background p-4 text-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/quote">
                Want this for your business?
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
          <Icon className="size-5" />
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </div>
  );
}
