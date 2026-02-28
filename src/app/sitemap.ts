import type { MetadataRoute } from "next";
import { TOTAL_SLUGS, slugBatch } from "@/lib/runbook-data";

const BASE_URL = "https://clawguru.org";
/** Max URLs per sitemap per Google spec */
const PER_SITEMAP = 50_000;

export function generateSitemaps() {
  const count = Math.ceil(TOTAL_SLUGS / PER_SITEMAP);
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const offset = id * PER_SITEMAP;
  const slugs = slugBatch(offset, PER_SITEMAP);
  return slugs.map((slug) => ({
    url: `${BASE_URL}/runbook/${slug}`,
    lastModified: new Date("2026-02-01"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
