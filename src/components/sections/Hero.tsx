import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.200/40),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.500/15),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Badge variant="outline" className="gap-1.5 border-border/80 px-3 py-1">
              <Sparkles className="size-3.5" />
              Lead generation platform for service businesses
            </Badge>

            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Turn website visitors into{" "}
              <span className="bg-gradient-to-br from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                paying customers
              </span>
              .
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              ServicePro Lead Engine is a full-stack lead generation website
              and mini CRM. Plug it into any service business — anywhere in the
              world — and start capturing quote requests on day one.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/quote">
                  Request a quote
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">
                  <PlayCircle />
                  See live demo
                </Link>
              </Button>
            </div>

            <ul className="mt-7 grid max-w-md grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "No setup fees",
                "Industry-ready templates",
                "Built-in mini CRM",
                "Deploy in days, not months",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent blur-2xl" />
            <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-1 shadow-2xl ring-1 ring-foreground/10">
              <div className="rounded-xl bg-zinc-950 p-5 text-zinc-100">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <LayoutDashboard className="size-4" />
                    Lead Dashboard · Live
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    +12 today
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: "Total", value: "248" },
                    { label: "New", value: "37" },
                    { label: "Won", value: "62" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400">
                        {stat.label}
                      </div>
                      <div className="mt-1 font-heading text-xl font-semibold">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  {[
                    { name: "Sarah K.", svc: "Salon booking", status: "new", color: "bg-indigo-500/20 text-indigo-200" },
                    { name: "Mike R.", svc: "Roofing quote", status: "quoted", color: "bg-amber-500/20 text-amber-200" },
                    { name: "Acme LLC", svc: "Cleaning contract", status: "won", color: "bg-emerald-500/20 text-emerald-200" },
                    { name: "Lena P.", svc: "Dental consult", status: "contacted", color: "bg-violet-500/20 text-violet-200" },
                  ].map((lead) => (
                    <div
                      key={lead.name}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs"
                    >
                      <div>
                        <div className="font-medium text-zinc-100">{lead.name}</div>
                        <div className="text-zinc-400">{lead.svc}</div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 font-medium ${lead.color}`}>
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
