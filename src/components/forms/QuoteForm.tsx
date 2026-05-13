"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const businessTypes = [
  "Home Services",
  "Health & Wellness",
  "Beauty & Lifestyle",
  "Food & Events",
  "Professional Services",
  "Skilled Trades",
  "Other",
];

const neededServices = [
  "New conversion-focused website",
  "Quote request system",
  "Mini CRM / lead dashboard",
  "Industry landing pages",
  "SEO & trust sections",
  "Full lead engine (everything)",
];

const budgets = [
  "Under $500",
  "$500 — $1,500",
  "$1,500 — $5,000",
  "$5,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP — within 2 weeks",
  "2 — 4 weeks",
  "1 — 2 months",
  "Flexible",
];

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center ring-1 ring-emerald-500/10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight">
          Quote request received.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          This is a portfolio demo — no data is sent or stored. In a live
          deployment, this submission would land directly in the lead
          dashboard.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border/70 bg-card p-6 ring-1 ring-foreground/5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required>
          <Input id="name" name="name" placeholder="Jane Cooper" required />
        </Field>

        <Field id="email" label="Email" required>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@business.com"
            required
          />
        </Field>

        <Field id="business" label="Business type" required>
          <Select name="business" required>
            <SelectTrigger
              id="business"
              className="h-9 w-full justify-between"
            >
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="website" label="Current website URL">
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="https://yourbusiness.com"
          />
        </Field>

        <Field id="service" label="Needed service" required>
          <Select name="service" required>
            <SelectTrigger id="service" className="h-9 w-full justify-between">
              <SelectValue placeholder="What do you need?" />
            </SelectTrigger>
            <SelectContent>
              {neededServices.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="budget" label="Budget range" required>
          <Select name="budget" required>
            <SelectTrigger id="budget" className="h-9 w-full justify-between">
              <SelectValue placeholder="Pick a range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="timeline" label="Timeline" required>
          <Select name="timeline" required>
            <SelectTrigger
              id="timeline"
              className="h-9 w-full justify-between"
            >
              <SelectValue placeholder="When do you want to launch?" />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="sm:col-span-2">
          <Field id="message" label="Message">
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your business, your current pipeline, and what you're hoping to achieve."
            />
          </Field>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">
          Portfolio demo — no data is sent or stored.
        </p>
        <Button type="submit" size="lg" disabled={loading}>
          <Send />
          {loading ? "Sending..." : "Send quote request"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-rose-500">*</span> : null}
      </Label>
      {children}
    </div>
  );
}
