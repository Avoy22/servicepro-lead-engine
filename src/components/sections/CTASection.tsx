import Link from "next/link";
import { ArrowRight, MailOpen, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-14 text-white ring-1 ring-foreground/10 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/20 blur-3xl"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Ready to launch?
              </div>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                Ship a complete lead engine for your service business — fast.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                Plug ServicePro Lead Engine into your business, your client&apos;s
                business, or a fresh new venture. Capture leads, manage them,
                and start converting in days.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200">
                <Link href="/quote">
                  Request a quote
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-zinc-950 text-white hover:bg-zinc-800"
              >
                <Link href="/dashboard">
                  <PlayCircle />
                  See the live demo
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/contact">
                  <MailOpen />
                  Talk to me directly
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
