import { Compass, Hammer, LineChart, Rocket } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Discover",
    description:
      "We map the business — services, customers, geography, and competitors — to design a site that ranks and converts.",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Frontend, quote form, and dashboard wired together with a modern Next.js + TypeScript + Tailwind stack.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Deploy to a fast global CDN, point the domain, and verify forms, tracking, and analytics end-to-end.",
  },
  {
    icon: LineChart,
    title: "Track",
    description:
      "Every quote request lands in the mini CRM. Owners review, follow up, and watch wins compound over time.",
  },
];

export function Process() {
  return (
    <section className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Process
          </div>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Discover. Build. Launch. Track.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A repeatable engagement that takes a service business from no
            online presence to a real lead generation pipeline.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="relative rounded-xl border border-border/60 bg-background p-6 ring-1 ring-foreground/5"
            >
              <div className="absolute right-5 top-5 font-heading text-3xl font-bold text-muted-foreground/20">
                0{idx + 1}
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
                <step.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
