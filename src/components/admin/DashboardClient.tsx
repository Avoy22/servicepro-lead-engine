"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Download,
  Inbox,
  KeyRound,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  leadPriorities,
  leadStatuses,
  type Lead,
  type LeadPriority,
  type LeadStatus,
} from "@/types";

const adminTokenStorageKey = "servicepro-admin-token";
const allFilterValue = "all";

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

const priorityLabels: Record<LeadPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
};

const statusBadge: Record<LeadStatus, string> = {
  new: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  contacted: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  quoted: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  won: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  lost: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};

const priorityBadge: Record<LeadPriority, string> = {
  low: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
  normal: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  high: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};

type LeadDraft = {
  status: LeadStatus;
  priority: LeadPriority;
  admin_notes: string;
  follow_up_date: string;
  estimated_value: string;
};

type LeadUpdatePayload = Partial<{
  status: LeadStatus;
  priority: LeadPriority;
  admin_notes: string | null;
  follow_up_date: string | null;
  estimated_value: number | null;
}>;

export function DashboardClient() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<LeadPriority | "all">(
    "all",
  );
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [draft, setDraft] = useState<LeadDraft | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedToken = window.sessionStorage.getItem(adminTokenStorageKey);

      if (!savedToken) {
        return;
      }

      setToken(savedToken);
      setTokenInput(savedToken);
      setLoading(true);
      setError(null);
      setSuccess(null);

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

  const counts = useMemo(() => countByStatus(leads), [leads]);
  const priorityCounts = useMemo(() => countByPriority(leads), [leads]);
  const totalEstimatedValue = useMemo(() => sumEstimatedValue(leads), [leads]);

  const filteredLeads = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        !query ||
        [
          lead.name,
          lead.email,
          lead.business_type,
          lead.needed_service,
          lead.message ?? "",
        ].some((value) => value.toLowerCase().includes(query));
      const matchesStatus =
        statusFilter === allFilterValue || lead.status === statusFilter;
      const matchesPriority =
        priorityFilter === allFilterValue || lead.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [leads, priorityFilter, searchTerm, statusFilter]);

  const filteredCounts = useMemo(
    () => countByStatus(filteredLeads),
    [filteredLeads],
  );
  const filteredPriorityCounts = useMemo(
    () => countByPriority(filteredLeads),
    [filteredLeads],
  );
  const filteredEstimatedValue = useMemo(
    () => sumEstimatedValue(filteredLeads),
    [filteredLeads],
  );

  const stats = [
    {
      label: "Total leads",
      value: leads.length.toString(),
      icon: Inbox,
      accent: "text-foreground",
      tint: "bg-foreground/5",
    },
    {
      label: "New",
      value: counts.new.toString(),
      icon: Activity,
      accent: "text-indigo-600 dark:text-indigo-300",
      tint: "bg-indigo-500/10",
    },
    {
      label: "Contacted",
      value: counts.contacted.toString(),
      icon: CheckCircle2,
      accent: "text-violet-600 dark:text-violet-300",
      tint: "bg-violet-500/10",
    },
    {
      label: "Quoted",
      value: counts.quoted.toString(),
      icon: CircleDollarSign,
      accent: "text-amber-600 dark:text-amber-300",
      tint: "bg-amber-500/10",
    },
    {
      label: "Won",
      value: counts.won.toString(),
      icon: CheckCircle2,
      accent: "text-emerald-600 dark:text-emerald-300",
      tint: "bg-emerald-500/10",
    },
    {
      label: "Lost",
      value: counts.lost.toString(),
      icon: XCircle,
      accent: "text-rose-600 dark:text-rose-300",
      tint: "bg-rose-500/10",
    },
    {
      label: "High priority",
      value: priorityCounts.high.toString(),
      icon: SlidersHorizontal,
      accent: "text-rose-600 dark:text-rose-300",
      tint: "bg-rose-500/10",
    },
    {
      label: "Pipeline value",
      value: formatCurrency(totalEstimatedValue),
      icon: CircleDollarSign,
      accent: "text-teal-600 dark:text-teal-300",
      tint: "bg-teal-500/10",
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
    setSuccess(null);

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

  async function updateLead(id: string, updates: LeadUpdatePayload) {
    const authToken = token.trim();

    if (!authToken) {
      setError("Enter the admin access token before updating leads.");
      return null;
    }

    setBusyAction(id);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": authToken,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      const data = (await response.json()) as { lead: Lead };
      setLeads((current) =>
        current.map((lead) => (lead.id === id ? data.lead : lead)),
      );
      setSelectedLead((current) =>
        current?.id === id ? data.lead : current,
      );
      setSuccess("Lead updated.");
      return data.lead;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update lead.",
      );
      return null;
    } finally {
      setBusyAction(null);
    }
  }

  async function saveSelectedLead() {
    if (!selectedLead || !draft) {
      return;
    }

    const updatedLead = await updateLead(selectedLead.id, {
      status: draft.status,
      priority: draft.priority,
      admin_notes: draft.admin_notes.trim() || null,
      follow_up_date: draft.follow_up_date || null,
      estimated_value:
        draft.estimated_value.trim() === ""
          ? null
          : Number(draft.estimated_value),
    });

    if (updatedLead) {
      setDraft(toDraft(updatedLead));
    }
  }

  async function addDemoLeads() {
    const authToken = token.trim();

    if (!authToken) {
      setError("Enter the admin access token before adding demo leads.");
      return;
    }

    setBusyAction("seed");
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/leads/seed", {
        method: "POST",
        headers: {
          "x-admin-token": authToken,
        },
      });

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      const data = (await response.json()) as { inserted: number };
      await loadLeads(authToken);
      setSuccess(
        data.inserted === 0
          ? "Demo leads already exist."
          : `Added ${data.inserted} demo leads.`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not add demo leads.",
      );
    } finally {
      setBusyAction(null);
    }
  }

  function openLead(lead: Lead) {
    setSelectedLead(lead);
    setDraft(toDraft(lead));
  }

  function clearFilters() {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
  }

  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <Badge variant="outline" className="border-border/80 px-3 py-1">
                Mini CRM - Version 3
              </Badge>
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Lead Dashboard
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Search, qualify, prioritize, and follow up with real quote
                requests from the ServicePro Lead Engine.
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
            <div className="flex flex-wrap items-end gap-2">
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
              {token ? (
                <Button
                  type="button"
                  variant="outline"
                  disabled={busyAction === "seed"}
                  onClick={() => void addDemoLeads()}
                >
                  {busyAction === "seed" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Plus />
                  )}
                  Add Demo Leads
                </Button>
              ) : null}
            </div>
          </form>

          {error ? (
            <div className="mb-6 rounded-lg border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
              {success}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5"
              >
                <div className="flex items-center justify-between gap-3">
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

          <div className="mt-6 rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5">
            <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto_auto]">
              <div className="grid gap-2">
                <Label htmlFor="lead-search" className="flex items-center gap-2">
                  <Search className="size-4" />
                  Search
                </Label>
                <Input
                  id="lead-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Name, email, business, service, message"
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) =>
                    setStatusFilter(value as LeadStatus | "all")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={allFilterValue}>All statuses</SelectItem>
                    {leadStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select
                  value={priorityFilter}
                  onValueChange={(value) =>
                    setPriorityFilter(value as LeadPriority | "all")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={allFilterValue}>
                      All priorities
                    </SelectItem>
                    {leadPriorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priorityLabels[priority]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  className="w-full"
                  disabled={filteredLeads.length === 0}
                  onClick={() => exportCsv(filteredLeads)}
                >
                  <Download />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-xl border border-border/70 bg-card ring-1 ring-foreground/5">
              <div className="flex flex-col gap-2 border-b border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-base font-semibold tracking-tight">
                    Recent leads
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Showing {filteredLeads.length} of {leads.length} loaded
                    leads.
                  </p>
                </div>
                <Badge variant="secondary">
                  {formatCurrency(filteredEstimatedValue)} filtered value
                </Badge>
              </div>
              <div className="px-2 py-1 sm:px-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Needed service</TableHead>
                      <TableHead>Budget range</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Estimated value</TableHead>
                      <TableHead>Follow-up date</TableHead>
                      <TableHead>Created date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={10} className="h-28 text-center">
                          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            Loading leads...
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : filteredLeads.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={10}
                          className="h-28 text-center text-sm text-muted-foreground"
                        >
                          {token
                            ? "No leads match the current filters."
                            : "Enter the admin token to load leads."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLeads.map((lead) => (
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
                          <TableCell className="max-w-56 text-muted-foreground">
                            <span className="block truncate">
                              {lead.needed_service}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {lead.budget_range}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${priorityBadge[lead.priority]}`}
                            >
                              {priorityLabels[lead.priority]}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${statusBadge[lead.status]}`}
                            >
                              {statusLabels[lead.status]}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatCurrency(lead.estimated_value)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(lead.follow_up_date)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatDate(lead.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => openLead(lead)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-4">
              <ChartCard
                title="Pipeline status distribution"
                subtitle="Filtered leads by lifecycle stage."
                items={leadStatuses.map((status) => ({
                  label: statusLabels[status],
                  value: filteredCounts[status],
                  className: statusBar(status),
                }))}
                total={filteredLeads.length}
              />
              <ChartCard
                title="Priority distribution"
                subtitle="Filtered leads by attention level."
                items={leadPriorities.map((priority) => ({
                  label: priorityLabels[priority],
                  value: filteredPriorityCounts[priority],
                  className: priorityBar(priority),
                }))}
                total={filteredLeads.length}
              />
              <div className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5">
                <h2 className="font-heading text-base font-semibold tracking-tight">
                  Estimated value summary
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Estimated value for the currently filtered pipeline.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <ValueSummary
                    label="Filtered value"
                    value={formatCurrency(filteredEstimatedValue)}
                  />
                  <ValueSummary
                    label="Average lead"
                    value={formatCurrency(
                      filteredLeads.length === 0
                        ? 0
                        : filteredEstimatedValue / filteredLeads.length,
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={Boolean(selectedLead)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedLead(null);
            setDraft(null);
          }
        }}
      >
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
          {selectedLead && draft ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedLead.name}</DialogTitle>
                <DialogDescription>
                  Review contact details and update CRM fields.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-2">
                <Detail label="Email" value={selectedLead.email} />
                <Detail label="Business type" value={selectedLead.business_type} />
                <Detail
                  label="Website URL"
                  value={selectedLead.website_url ?? "Not provided"}
                />
                <Detail
                  label="Needed service"
                  value={selectedLead.needed_service}
                />
                <Detail label="Budget range" value={selectedLead.budget_range} />
                <Detail label="Timeline" value={selectedLead.timeline} />
                <Detail
                  label="Source"
                  value={selectedLead.source ?? "Not provided"}
                />
                <Detail
                  label="Created"
                  value={formatDate(selectedLead.createdAt)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Message</Label>
                <div className="min-h-20 rounded-lg border border-border/70 bg-muted/30 p-3 text-sm text-muted-foreground">
                  {selectedLead.message ?? "No message provided."}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={draft.status}
                    onValueChange={(value) =>
                      setDraft((current) =>
                        current
                          ? { ...current, status: value as LeadStatus }
                          : current,
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
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
                </div>
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select
                    value={draft.priority}
                    onValueChange={(value) =>
                      setDraft((current) =>
                        current
                          ? { ...current, priority: value as LeadPriority }
                          : current,
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {leadPriorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priorityLabels[priority]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="follow-up-date">Follow-up date</Label>
                  <Input
                    id="follow-up-date"
                    type="date"
                    value={draft.follow_up_date}
                    onChange={(event) =>
                      setDraft((current) =>
                        current
                          ? { ...current, follow_up_date: event.target.value }
                          : current,
                      )
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="estimated-value">Estimated value</Label>
                  <Input
                    id="estimated-value"
                    type="number"
                    min="0"
                    step="100"
                    value={draft.estimated_value}
                    onChange={(event) =>
                      setDraft((current) =>
                        current
                          ? { ...current, estimated_value: event.target.value }
                          : current,
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="admin-notes">Admin notes</Label>
                <Textarea
                  id="admin-notes"
                  rows={5}
                  value={draft.admin_notes}
                  onChange={(event) =>
                    setDraft((current) =>
                      current
                        ? { ...current, admin_notes: event.target.value }
                        : current,
                    )
                  }
                  placeholder="Add qualification notes, follow-up details, or next steps."
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedLead(null);
                    setDraft(null);
                  }}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  disabled={busyAction === selectedLead.id}
                  onClick={() => void saveSelectedLead()}
                >
                  {busyAction === selectedLead.id ? (
                    <Loader2 className="animate-spin" />
                  ) : null}
                  Save updates
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ChartCard({
  title,
  subtitle,
  items,
  total,
}: {
  title: string;
  subtitle: string;
  items: Array<{ label: string; value: number; className: string }>;
  total: number;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5">
      <h2 className="font-heading text-base font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const pct = total === 0 ? 0 : Math.round((item.value / total) * 100);

          return (
            <li key={item.label}>
              <div className="flex items-center justify-between text-xs">
                <span>{item.label}</span>
                <span className="text-muted-foreground">
                  {item.value} - {pct}%
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${item.className}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ValueSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-heading text-lg font-semibold">{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 break-words text-sm">{value}</div>
    </div>
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

function toDraft(lead: Lead): LeadDraft {
  return {
    status: lead.status,
    priority: lead.priority,
    admin_notes: lead.admin_notes ?? "",
    follow_up_date: lead.follow_up_date ?? "",
    estimated_value:
      typeof lead.estimated_value === "number"
        ? String(lead.estimated_value)
        : "",
  };
}

function countByStatus(source: Lead[]) {
  return source.reduce<Record<LeadStatus, number>>(
    (acc, lead) => {
      acc[lead.status] += 1;
      return acc;
    },
    { new: 0, contacted: 0, quoted: 0, won: 0, lost: 0 },
  );
}

function countByPriority(source: Lead[]) {
  return source.reduce<Record<LeadPriority, number>>(
    (acc, lead) => {
      acc[lead.priority] += 1;
      return acc;
    },
    { low: 0, normal: 0, high: 0 },
  );
}

function sumEstimatedValue(source: Lead[]) {
  return source.reduce(
    (total, lead) => total + (lead.estimated_value ?? 0),
    0,
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(value: number | null) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
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

function priorityBar(priority: LeadPriority) {
  switch (priority) {
    case "low":
      return "bg-slate-500";
    case "normal":
      return "bg-sky-500";
    case "high":
      return "bg-rose-500";
  }
}

function exportCsv(leads: Lead[]) {
  const headers = [
    "Name",
    "Email",
    "Business Type",
    "Website URL",
    "Needed Service",
    "Budget Range",
    "Timeline",
    "Status",
    "Priority",
    "Estimated Value",
    "Follow Up Date",
    "Message",
    "Admin Notes",
    "Created At",
  ];
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.business_type,
    lead.website_url ?? "",
    lead.needed_service,
    lead.budget_range,
    lead.timeline,
    statusLabels[lead.status],
    priorityLabels[lead.priority],
    lead.estimated_value?.toString() ?? "",
    lead.follow_up_date ?? "",
    lead.message ?? "",
    lead.admin_notes ?? "",
    lead.createdAt,
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "servicepro-leads.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: string) {
  const escaped = value.replaceAll('"', '""');
  return `"${escaped}"`;
}
