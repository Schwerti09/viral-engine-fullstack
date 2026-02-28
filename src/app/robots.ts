import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/api/", "/_next/"],
      },
    ],
    sitemap: [
      "https://clawguru.org/sitemap.xml",
      // Paginated sitemaps are auto-generated at /sitemap/0.xml, /sitemap/1.xml ...
      // Google discovers them via the sitemap index at /sitemap.xml
    ],
    host: "https://clawguru.org",
  };
}
