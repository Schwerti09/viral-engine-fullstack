import Link from "next/link";
import type { Metadata } from "next";
import { PROVIDERS, SERVICES, ISSUES, YEARS, TOTAL_SLUGS } from "@/lib/runbook-data";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Security Runbooks 2025–2030 | ClawGuru Institutional Ops",
  description: `${TOTAL_SLUGS.toLocaleString()}+ institutional-grade security runbooks covering AWS, GCP, Azure, Kubernetes, Docker, and more. Copy-paste ready, verified fixes for every cloud security issue.`,
};

export default function RunbookIndexPage() {
  const featuredSlugs = [
    "aws-kubernetes-zero-trust-2026",
    "cloudflare-nginx-waf-rules-2026",
    "gcp-docker-container-escape-2026",
    "azure-ssh-hardening-2026",
    "aws-github-actions-supply-chain-2026",
    "hetzner-postgresql-encryption-at-rest-2026",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-primary" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">ClawGuru</div>
              <div className="text-xs text-muted-foreground">Institutional Ops 2026</div>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/runbook" className="text-foreground font-medium">Runbooks</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 space-y-14">
        {/* Hero */}
        <section>
          <Badge className="mb-4">ClawGuru · Security Ops 2026</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {TOTAL_SLUGS.toLocaleString()}+ Security Runbooks
            <span className="block text-muted-foreground text-2xl md:text-3xl mt-2">
              Institutional-grade. Copy-paste ready. No bullshit.
            </span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Every combination of cloud provider, service, and security issue — documented with
            triage commands, verified fix steps, and structured JSON-LD for maximum topical authority.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">
              {PROVIDERS.length} Providers
            </span>
            <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">
              {SERVICES.length} Services
            </span>
            <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">
              {ISSUES.length} Issue Types
            </span>
            <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">
              {YEARS.length} Years (2025–2030)
            </span>
          </div>
        </section>

        {/* Featured Runbooks */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Runbooks</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/runbook/${slug}`}
                className="group rounded-2xl border border-border/60 bg-background/60 p-5 hover:border-primary/50 hover:bg-muted/40 transition-colors"
              >
                <span className="font-mono text-xs text-muted-foreground block mb-2 truncate">
                  {slug}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {slug
                    .split("-")
                    .slice(0, -1)
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Providers */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Browse by Provider</h2>
          <div className="flex flex-wrap gap-3">
            {PROVIDERS.map((p) => (
              <Link
                key={p.slug}
                href={`/runbook/${p.slug}-ssh-hardening-2026`}
                className="rounded-xl border border-border/60 px-4 py-2 text-sm hover:border-primary/50 hover:bg-muted/40 transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Issues */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Browse by Issue</h2>
          <div className="flex flex-wrap gap-3">
            {ISSUES.map((i) => (
              <Link
                key={i.slug}
                href={`/runbook/aws-kubernetes-${i.slug}-2026`}
                className={`rounded-xl border px-4 py-2 text-sm transition-colors hover:bg-muted/40 ${
                  i.severity === "critical"
                    ? "border-red-500/30 text-red-400 hover:border-red-500/50"
                    : i.severity === "high"
                    ? "border-orange-500/30 text-orange-400 hover:border-orange-500/50"
                    : "border-border/60 text-muted-foreground hover:border-border"
                }`}
              >
                {i.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Browse by Service</h2>
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/runbook/aws-${s.slug}-hardening-2026`}
                className="rounded-xl border border-border/60 px-4 py-2 text-sm hover:border-primary/50 hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">ClawGuru Institutional Ops</strong> · {TOTAL_SLUGS.toLocaleString()} Runbooks ·{" "}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error – typed-routes doesn't cover .xml paths */}
            <Link href="/sitemap.xml" className="underline hover:text-foreground">
              Sitemap
            </Link>
          </p>
          <p className="mt-1">Kein Gelaber. Nur Fixes. — Last updated Feb 2026</p>
        </footer>
      </main>
    </div>
  );
}
