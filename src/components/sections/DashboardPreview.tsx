import Link from "next/link";
import { ArrowRight, LineChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total leads", value: "248", trend: "+18%" },
  { label: "New this week", value: "37", trend: "+12%" },
  { label: "Quoted", value: "94", trend: "+9%" },
  { label: "Won deals", value: "62", trend: "+22%" },
];

const sampleLeads = [
  { name: "Sarah K.", svc: "Salon booking", status: "new", color: "bg-indigo-500/15 text-indigo-300" },
  { name: "Mike R.", svc: "Roofing quote", status: "quoted", color: "bg-amber-500/15 text-amber-300" },
  { name: "Acme LLC", svc: "Office cleaning", status: "won", color: "bg-emerald-500/15 text-emerald-300" },
  { name: "Lena P.", svc: "Dental consult", status: "contacted", color: "bg-violet-500/15 text-violet-300" },
  { name: "BuildRight", svc: "Contracting bid", status: "new", color: "bg-indigo-500/15 text-indigo-300" },
];

export function DashboardPreview() {
  return (
    <section className="border-b border-border/60 bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Mini CRM
            </div>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              A dashboard your clients will actually use.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-300">
              Every quote request lands in a clean, lightweight lead
              dashboard. Owners can see new requests, move them through the
              pipeline, and track wins and losses without a heavy CRM.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-zinc-300">
              {[
                "Total / new / quoted / won / lost at a glance",
                "Recent leads table with statuses",
                "Searchable, sortable, mobile-friendly",
                "Demo-ready for client pitches",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <LineChart className="size-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200">
                <Link href="/dashboard">
                  Open the live demo dashboard
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent blur-2xl" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 ring-1 ring-white/5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users className="size-4" />
                  Lead overview
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  Live demo
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-zinc-400">
                      {s.label}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <div className="font-heading text-2xl font-semibold">
                        {s.value}
                      </div>
                      <div className="text-[10px] font-medium text-emerald-300">
                        {s.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-zinc-950/40">
                <div className="border-b border-white/10 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Recent leads
                </div>
                <ul className="divide-y divide-white/5">
                  {sampleLeads.map((l) => (
                    <li
                      key={l.name}
                      className="flex items-center justify-between px-4 py-3 text-sm"
                    >
                      <div>
                        <div className="font-medium">{l.name}</div>
                        <div className="text-xs text-zinc-400">{l.svc}</div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${l.color}`}>
                        {l.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
