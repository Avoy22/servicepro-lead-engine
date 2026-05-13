import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Inbox,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { leads } from "@/data/leads";
import type { LeadStatus } from "@/types";

export const metadata: Metadata = {
  title: "Lead Dashboard (Demo)",
  description:
    "A live demo of the ServicePro Lead Engine mini CRM dashboard — see how new, contacted, quoted, won, and lost leads are tracked.",
};

const statusBadge: Record<LeadStatus, string> = {
  new: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  contacted: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  quoted: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  won: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  lost: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};

export default function DashboardPage() {
  const total = leads.length;
  const counts = leads.reduce<Record<LeadStatus, number>>(
    (acc, l) => {
      acc[l.status] += 1;
      return acc;
    },
    { new: 0, contacted: 0, quoted: 0, won: 0, lost: 0 },
  );

  const stats = [
    { label: "Total leads", value: total, icon: Inbox, accent: "text-foreground", tint: "bg-foreground/5" },
    { label: "New", value: counts.new, icon: Activity, accent: "text-indigo-600 dark:text-indigo-300", tint: "bg-indigo-500/10" },
    { label: "Quoted", value: counts.quoted, icon: CircleDollarSign, accent: "text-amber-600 dark:text-amber-300", tint: "bg-amber-500/10" },
    { label: "Won", value: counts.won, icon: CheckCircle2, accent: "text-emerald-600 dark:text-emerald-300", tint: "bg-emerald-500/10" },
    { label: "Lost", value: counts.lost, icon: XCircle, accent: "text-rose-600 dark:text-rose-300", tint: "bg-rose-500/10" },
  ];

  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <Badge variant="outline" className="border-border/80 px-3 py-1">
                Mini CRM · Live demo
              </Badge>
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Lead Dashboard
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                A working demo of the ServicePro Lead Engine dashboard.
                Numbers and leads below are sample data — in production, this
                view is wired directly to your live quote form submissions.
              </p>
            </div>
            <Button asChild>
              <Link href="/quote">
                Submit a demo lead
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                  <div className={`flex size-8 items-center justify-center rounded-md ${s.tint} ${s.accent}`}>
                    <s.icon className="size-4" />
                  </div>
                </div>
                <div className="mt-3 font-heading text-3xl font-bold tracking-tight">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-border/70 bg-card ring-1 ring-foreground/5">
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                <div>
                  <h2 className="font-heading text-base font-semibold tracking-tight">
                    Recent leads
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    The latest 10 quote requests across all industries.
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="size-3" />
                  +12 this week
                </Badge>
              </div>
              <div className="px-2 py-1 sm:px-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {lead.business}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {lead.industry}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {lead.service}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {lead.budget}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusBadge[lead.status]}`}
                          >
                            {lead.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {lead.createdAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5">
                <h2 className="font-heading text-base font-semibold tracking-tight">
                  Pipeline status
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Distribution across the standard lead lifecycle.
                </p>
                <ul className="mt-4 space-y-3">
                  {(Object.keys(counts) as LeadStatus[]).map((key) => {
                    const pct = total === 0 ? 0 : Math.round((counts[key] / total) * 100);
                    return (
                      <li key={key}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="capitalize">{key}</span>
                          <span className="text-muted-foreground">
                            {counts[key]} · {pct}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${statusBar(key)}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5">
                <h2 className="font-heading text-base font-semibold tracking-tight">
                  Demo notes
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  This dashboard is a portfolio demo. Lead data is static.
                  In a live deployment, submissions from the quote form
                  appear here in real time, with status changes, notes, and
                  filtering.
                </p>
                <Button asChild size="lg" variant="outline" className="mt-4 w-full">
                  <Link href="/case-study">
                    Read the case study
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function statusBar(status: LeadStatus) {
  switch (status) {
    case "new":
      return "bg-indigo-500";
    case "contacted":
      return "bg-violet-500";
    case "quoted":
      return "bg-amber-500";
    case "won":
      return "bg-emerald-500";
    case "lost":
      return "bg-rose-500";
  }
}
