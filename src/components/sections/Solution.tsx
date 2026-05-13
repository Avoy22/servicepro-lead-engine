import { ClipboardList, Globe, LayoutDashboard, MoveRight } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "A conversion-first website",
    description:
      "A premium, mobile-first site engineered to turn search traffic into qualified quote requests — not just brochureware.",
    points: ["SEO-ready layout", "Built-in trust signals", "Sub-second loads"],
  },
  {
    icon: ClipboardList,
    title: "A structured quote form",
    description:
      "A friction-free form that captures everything you need to send pricing — without scaring leads off the page.",
    points: ["Budget & timeline fields", "Validated inputs", "Auto-routed leads"],
  },
  {
    icon: LayoutDashboard,
    title: "A built-in mini CRM",
    description:
      "A clean dashboard to manage every lead from new to won, with statuses, search, and a clear pipeline view.",
    points: ["Lead statuses", "Recent activity table", "Pipeline metrics"],
  },
];

export function Solution() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            The solution
          </div>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            One platform. Website, quote form, and mini CRM.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            ServicePro Lead Engine bundles a premium website, a polished quote
            request system, and a lightweight lead dashboard — so service
            owners can capture, track, and close more deals in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pillars.map((p, idx) => (
            <div
              key={p.title}
              className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-7 ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
            >
              <div
                aria-hidden
                className="absolute right-4 top-4 font-heading text-5xl font-bold text-muted-foreground/15"
              >
                0{idx + 1}
              </div>
              <div className="flex size-11 items-center justify-center rounded-lg bg-foreground text-background">
                <p.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <ul className="mt-5 space-y-1.5">
                {p.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <MoveRight className="size-4 text-indigo-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
