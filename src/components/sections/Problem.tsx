import { AlertTriangle, MailX, MousePointer2Off, PhoneOff } from "lucide-react";

const problems = [
  {
    icon: MousePointer2Off,
    title: "No website, no leads",
    description:
      "Most service businesses still rely on word of mouth. Without a real online presence, customers searching today never find you.",
  },
  {
    icon: PhoneOff,
    title: "Outdated, slow websites",
    description:
      "Old template sites with broken forms and missing details push visitors straight back to Google — and to a competitor.",
  },
  {
    icon: MailX,
    title: "Leads lost in inboxes",
    description:
      "Emails, DMs, WhatsApp messages, and missed calls scattered across tools — there's no system to follow up or close.",
  },
  {
    icon: AlertTriangle,
    title: "No data, no growth",
    description:
      "Without tracking leads or conversions, owners can't tell what's working or where money is being left on the table.",
  },
];

export function Problem() {
  return (
    <section className="border-b border-border/60 bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            The problem
          </div>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Service businesses are losing leads every day.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-300">
            Plumbers, salons, clinics, contractors, consultants — most rely on
            weak or missing websites. The result: serious revenue walks away
            before a conversation even starts.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 ring-1 ring-white/5 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/15 text-rose-300">
                <p.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
