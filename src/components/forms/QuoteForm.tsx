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
import { leadCreateSchema } from "@/lib/validations/leads";

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
  "$500 - $1,500",
  "$1,500 - $5,000",
  "$5,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP - within 2 weeks",
  "2 - 4 weeks",
  "1 - 2 months",
  "Flexible",
];

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      business_type: String(formData.get("business_type") ?? ""),
      website_url: String(formData.get("website_url") ?? ""),
      needed_service: String(formData.get("needed_service") ?? ""),
      budget_range: String(formData.get("budget_range") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      message: String(formData.get("message") ?? ""),
      source: "quote_form",
    };

    const parsed = leadCreateSchema.safeParse(payload);

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? "Please check the form and try again.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      form.reset();
      setFormKey((current) => current + 1);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your request.",
      );
    } finally {
      setLoading(false);
    }
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
          Thanks for reaching out. Your request has been saved and is ready in
          the lead dashboard.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setError(null);
            setSubmitted(false);
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      key={formKey}
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
          <Select name="business_type" required>
            <SelectTrigger
              id="business"
              className="h-9 w-full justify-between"
            >
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((businessType) => (
                <SelectItem key={businessType} value={businessType}>
                  {businessType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="website" label="Current website URL">
          <Input
            id="website"
            name="website_url"
            type="url"
            placeholder="https://yourbusiness.com"
          />
        </Field>

        <Field id="service" label="Needed service" required>
          <Select name="needed_service" required>
            <SelectTrigger id="service" className="h-9 w-full justify-between">
              <SelectValue placeholder="What do you need?" />
            </SelectTrigger>
            <SelectContent>
              {neededServices.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="budget" label="Budget range" required>
          <Select name="budget_range" required>
            <SelectTrigger id="budget" className="h-9 w-full justify-between">
              <SelectValue placeholder="Pick a range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget} value={budget}>
                  {budget}
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
              {timelines.map((timeline) => (
                <SelectItem key={timeline} value={timeline}>
                  {timeline}
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
        <div className="min-h-5 text-xs">
          {error ? (
            <p className="text-rose-600 dark:text-rose-400">{error}</p>
          ) : (
            <p className="text-muted-foreground">
              Your request will be stored securely in Supabase.
            </p>
          )}
        </div>
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

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}
