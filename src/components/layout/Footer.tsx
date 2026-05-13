import Link from "next/link";
import { Globe, Mail, Zap } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-zinc-950 text-zinc-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-white text-zinc-950">
                <Zap className="size-5" />
              </span>
              <span className="font-heading text-lg font-semibold tracking-tight text-white">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              {site.description}
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Globe className="size-4" />
                <span>Built for service businesses worldwide</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
                >
                  <Mail className="size-4" />
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Contact form
                </Link>
              </li>
              <li>
                <Link
                  href="/case-study"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Read the case study
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {year} {site.name}. Portfolio demo by Avoy Chandra Das.</p>
          <p>Designed for Upwork, Fiverr & LinkedIn outreach.</p>
        </div>
      </div>
    </footer>
  );
}
