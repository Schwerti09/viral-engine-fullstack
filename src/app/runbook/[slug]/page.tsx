import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { parseSlug, PROVIDERS, SERVICES, ISSUES, YEARS, TOTAL_SLUGS } from "@/lib/runbook-data";
import { generateRunbookContent } from "@/lib/runbook-content";
import { Badge } from "@/components/ui/badge";

export const dynamicParams = true;

// Pre-render a representative sample; the rest are generated on-demand (ISR)
export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  // First 2 providers × first 3 services × first 3 issues × [2025, 2026]
  for (const provider of PROVIDERS.slice(0, 2)) {
    for (const service of SERVICES.slice(0, 3)) {
      for (const issue of ISSUES.slice(0, 3)) {
        for (const year of [2025, 2026]) {
          params.push({ slug: `${provider.slug}-${service.slug}-${issue.slug}-${year}` });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Not Found" };
  const { provider, service, issue, year } = parsed;
  const content = generateRunbookContent(provider, service, issue, year);
  return {
    title: `${content.title} | ClawGuru`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      url: `https://clawguru.org/runbook/${slug}`,
    },
    alternates: { canonical: `https://clawguru.org/runbook/${slug}` },
  };
}

const SEVERITY_COLOR: Record<string, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
};

const SCORE_COLOR = (score: number) => {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
};

export default async function RunbookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { provider, service, issue, year } = parsed;
  const content = generateRunbookContent(provider, service, issue, year);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content.jsonLd) }}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* ── Breadcrumb ── */}
        <nav className="border-b border-border/40 bg-background/80 backdrop-blur sticky top-0 z-20 text-xs">
          <div className="mx-auto max-w-4xl px-4 py-2 flex items-center gap-2 text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              ClawGuru
            </Link>
            <span>/</span>
            <Link href="/runbook" className="hover:text-foreground">
              Runbooks
            </Link>
            <span>/</span>
            <Link
              href={`/runbook?provider=${provider.slug}`}
              className="hover:text-foreground"
            >
              {provider.name}
            </Link>
            <span>/</span>
            <Link
              href={`/runbook?service=${service.slug}`}
              className="hover:text-foreground"
            >
              {service.name}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-xs">{issue.name}</span>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-4 py-10 space-y-12">
          {/* ── Hero ── */}
          <section>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                  SEVERITY_COLOR[content.severity]
                }`}
              >
                {content.severity.toUpperCase()}
              </span>
              <Badge>{provider.name}</Badge>
              <Badge>{service.name}</Badge>
              <Badge>{year}</Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Claw Security Score:{" "}
              <span className={`font-mono ${SCORE_COLOR(content.score)}`}>
                {content.score}/100
              </span>{" "}
              — {issue.name} on {provider.name}
            </h1>
            <p className="mt-3 text-muted-foreground text-lg leading-relaxed">
              {content.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>
                <strong>Service:</strong> {service.name}
              </span>
              <span>
                <strong>Author:</strong> {content.author}
              </span>
              <span>
                <strong>Last updated:</strong> {content.lastUpdated}
              </span>
              <span>
                <strong>Total runbooks:</strong>{" "}
                {TOTAL_SLUGS.toLocaleString()}
              </span>
            </div>
          </section>

          {/* ── Quick Triage (5 min) ── */}
          <section>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span className="inline-block w-6 h-6 rounded bg-primary/20 text-primary text-center text-xs leading-6 font-bold">
                ⚡
              </span>
              Schnell-Triage (5 Minuten)
            </h2>
            <p className="text-muted-foreground text-sm mb-4">{content.triageIntro}</p>
            <pre className="rounded-xl border border-border/60 bg-muted/50 p-4 text-sm overflow-x-auto leading-relaxed">
              <code>{content.triageCommands.join("\n")}</code>
            </pre>
          </section>

          {/* ── Problem Description ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Problem-Beschreibung</h2>
            {content.problemDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </section>

          {/* ── Fix Steps ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Fix-Schritte — {issue.name} auf {provider.name} / {service.name}
            </h2>
            <ol className="space-y-4">
              {content.fixSteps.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    {step.includes("`") ? (
                      <span className="text-sm leading-relaxed">
                        {step.split("`").map((part, i) =>
                          i % 2 === 1 ? (
                            <code
                              key={i}
                              className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
                            >
                              {part}
                            </code>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </span>
                    ) : (
                      <span className="text-sm leading-relaxed">{step}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Verification ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Verification / Re-Check</h2>
            <ul className="space-y-3">
              {content.verificationSteps.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Why This Matters 2026 ── */}
          <section className="rounded-2xl border border-border/60 bg-muted/30 p-6">
            <h2 className="text-xl font-semibold mb-3">
              Why This Matters {year} (E-E-A-T)
            </h2>
            <p className="text-muted-foreground leading-relaxed">{content.whyItMatters}</p>
            <div className="mt-4 pt-4 border-t border-border/40 text-xs text-muted-foreground space-y-1">
              <div>
                <strong>Standards covered:</strong> CIS Benchmarks, NIST SP 800-190, ISO
                27001:2022, SOC 2 CC6, EU NIS2 Art. 21, OWASP Top 10 {year}
              </div>
              <div>
                <strong>Author:</strong> {content.author} — Institutional Security Operations
              </div>
            </div>
          </section>

          {/* ── Related Runbooks ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Related Runbooks</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.relatedSlugs.map((relSlug) => (
                <Link
                  key={relSlug}
                  href={`/runbook/${relSlug}`}
                  className="rounded-xl border border-border/60 bg-background/60 p-4 text-sm hover:border-primary/50 hover:bg-muted/40 transition-colors"
                >
                  <span className="font-mono text-xs text-muted-foreground block mb-1 truncate">
                    {relSlug}
                  </span>
                  <span className="text-foreground font-medium text-xs">
                    {relSlug
                      .split("-")
                      .slice(1, -1)
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Footer CTA ── */}
          <section className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">
              ClawGuru Institutional Ops — {TOTAL_SLUGS.toLocaleString()} Runbooks
            </p>
            <p>
              Kein Gelaber. Nur Fixes.{" "}
              <Link href="/runbook" className="underline hover:text-foreground">
                Browse all runbooks →
              </Link>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
