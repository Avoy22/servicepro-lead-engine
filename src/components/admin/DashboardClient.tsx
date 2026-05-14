"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Inbox,
  KeyRound,
  Loader2,
  RefreshCw,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { leadStatuses, type Lead, type LeadStatus } from "@/types";

const adminTokenStorageKey = "servicepro-admin-token";

const statusBadge: Record<LeadStatus, string> = {
  new: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  contacted: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  quoted: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  won: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  lost: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

export function DashboardClient() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedToken = window.sessionStorage.getItem(adminTokenStorageKey);

      if (!savedToken) {
        return;
      }

      setLoading(true);
      setError(null);
      setToken(savedToken);
      setTokenInput(savedToken);

      void fetchDashboardLeads(savedToken)
        .then(setLeads)
        .catch((err: unknown) => {
          setLeads([]);
          setError(
            err instanceof Error
              ? err.message
              : "Could not load dashboard leads.",
          );
        })
        .finally(() => setLoading(false));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const counts = useMemo(() => {
    return leads.reduce<Record<LeadStatus, number>>(
      (acc, lead) => {
        acc[lead.status] += 1;
        return acc;
      },
      { new: 0, contacted: 0, quoted: 0, won: 0, lost: 0 },
    );
  }, [leads]);

  const stats = [
    {
      label: "Total leads",
      value: leads.length,
      icon: Inbox,
      accent: "text-foreground",
      tint: "bg-foreground/5",
    },
    {
      label: "New",
      value: counts.new,
      icon: Activity,
      accent: "text-indigo-600 dark:text-indigo-300",
      tint: "bg-indigo-500/10",
    },
    {
      label: "Contacted",
      value: counts.contacted,
      icon: CheckCircle2,
      accent: "text-violet-600 dark:text-violet-300",
      tint: "bg-violet-500/10",
    },
    {
      label: "Quoted",
      value: counts.quoted,
      icon: CircleDollarSign,
      accent: "text-amber-600 dark:text-amber-300",
      tint: "bg-amber-500/10",
    },
    {
      label: "Won",
      value: counts.won,
      icon: CheckCircle2,
      accent: "text-emerald-600 dark:text-emerald-300",
      tint: "bg-emerald-500/10",
    },
    {
      label: "Lost",
      value: counts.lost,
      icon: XCircle,
      accent: "text-rose-600 dark:text-rose-300",
      tint: "bg-rose-500/10",
    },
  ];

  async function handleTokenSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextToken = tokenInput.trim();

    if (!nextToken) {
      setError("Enter the admin access token.");
      return;
    }

    window.sessionStorage.setItem(adminTokenStorageKey, nextToken);
    setToken(nextToken);
    await loadLeads(nextToken);
  }

  async function loadLeads(authToken = token) {
    const nextToken = authToken.trim();

    if (!nextToken) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setLeads(await fetchDashboardLeads(nextToken));
    } catch (err) {
      setLeads([]);
      setError(
        err instanceof Error ? err.message : "Could not load dashboard leads.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateLeadStatus(id: string, status: LeadStatus) {
    const authToken = token.trim();

    if (!authToken) {
      setError("Enter the admin access token before updating leads.");
      return;
    }

    const previousLeads = leads;
    setUpdatingLeadId(id);
    setError(null);
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": authToken,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      const data = (await response.json()) as { lead: Lead };
      setLeads((current) =>
        current.map((lead) => (lead.id === id ? data.lead : lead)),
      );
    } catch (err) {
      setLeads(previousLeads);
      setError(
        err instanceof Error ? err.message : "Could not update lead status.",
      );
    } finally {
      setUpdatingLeadId(null);
    }
  }

  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <Badge variant="outline" className="border-border/80 px-3 py-1">
                Mini CRM - Supabase
              </Badge>
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Lead Dashboard
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Review real quote requests, track pipeline totals, and update
                each lead&apos;s status from one focused admin view.
              </p>
            </div>
            <Button asChild>
              <Link href="/quote">
                Submit a lead
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <form
            onSubmit={handleTokenSubmit}
            className="mb-6 grid gap-3 rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5 md:grid-cols-[1fr_auto]"
          >
            <div className="grid gap-2">
              <Label htmlFor="admin-token" className="flex items-center gap-2">
                <KeyRound className="size-4" />
                Admin access token
              </Label>
              <Input
                id="admin-token"
                type="password"
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                placeholder="Enter ADMIN_ACCESS_TOKEN"
                autoComplete="off"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <KeyRound />}
                Connect
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={loading || !token}
                onClick={() => void loadLeads()}
              >
                <RefreshCw className={loading ? "animate-spin" : ""} />
                Refresh
              </Button>
            </div>
          </form>

          {error ? (
            <div className="mb-6 rounded-lg border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
              {error}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                  <div
                    className={`flex size-8 items-center justify-center rounded-md ${stat.tint} ${stat.accent}`}
                  >
                    <stat.icon className="size-4" />
                  </div>
                </div>
                <div className="mt-3 font-heading text-3xl font-bold tracking-tight">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-border/70 bg-card ring-1 ring-foreground/5">
              <div className="flex flex-col gap-2 border-b border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-base font-semibold tracking-tight">
                    Recent leads
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    The latest quote requests across all industries.
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="size-3" />
                  {leads.length} loaded
                </Badge>
              </div>
              <div className="px-2 py-1 sm:px-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-28 text-center">
                          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            Loading leads...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : leads.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="h-28 text-center text-sm text-muted-foreground"
                        >
                          {token
                            ? "No leads found yet."
                            : "Enter the admin token to load leads."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {lead.email}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {lead.business_type}
                          </TableCell>
                          <TableCell className="max-w-48 text-muted-foreground">
                            <span className="block truncate">
                              {lead.website_url ?? "Not provided"}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-56 text-muted-foreground">
                            <span className="block truncate">
                              {lead.needed_service}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {lead.budget_range}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {lead.timeline}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={lead.status}
                              disabled={updatingLeadId === lead.id}
                              onValueChange={(value) =>
                                void updateLeadStatus(
                                  lead.id,
                                  value as LeadStatus,
                                )
                              }
                            >
                              <SelectTrigger
                                aria-label={`Update status for ${lead.name}`}
                                className={`h-8 w-32 capitalize ${statusBadge[lead.status]}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {leadStatuses.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {statusLabels[status]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatDate(lead.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
                  {leadStatuses.map((status) => {
                    const pct =
                      leads.length === 0
                        ? 0
                        : Math.round((counts[status] / leads.length) * 100);

                    return (
                      <li key={status}>
                        <div className="flex items-center justify-between text-xs">
                          <span>{statusLabels[status]}</span>
                          <span className="text-muted-foreground">
                            {counts[status]} - {pct}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${statusBar(status)}`}
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
                  Admin access
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Supabase writes and reads run through protected server API
                  routes. The service role key stays on the server, and status
                  updates require the admin token.
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="mt-4 w-full"
                >
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

async function fetchDashboardLeads(authToken: string) {
  const token = authToken.trim();

  const response = await fetch("/api/leads", {
    headers: {
      "x-admin-token": token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  const data = (await response.json()) as { leads: Lead[] };
  return data.leads;
}

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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
