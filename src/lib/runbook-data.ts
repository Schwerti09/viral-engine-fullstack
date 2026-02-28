/**
 * ClawGuru Institutional Ops – Runbook Data Definitions
 * 25 providers × 40 services × 60 issues × 6 years = 360,000 unique slugs
 */

export type Provider = {
  slug: string;
  name: string;
  type: "hyperscaler" | "cloud" | "cdn" | "paas" | "edge";
};

export type Service = {
  slug: string;
  name: string;
  category: "infra" | "container" | "cicd" | "network" | "storage" | "monitoring" | "security";
};

export type Issue = {
  slug: string;
  name: string;
  severity: "critical" | "high" | "medium";
  category: "hardening" | "auth" | "network" | "supply-chain" | "ops" | "compliance";
};

export const PROVIDERS: Provider[] = [
  { slug: "aws", name: "AWS", type: "hyperscaler" },
  { slug: "gcp", name: "Google Cloud", type: "hyperscaler" },
  { slug: "azure", name: "Azure", type: "hyperscaler" },
  { slug: "digitalocean", name: "DigitalOcean", type: "cloud" },
  { slug: "hetzner", name: "Hetzner", type: "cloud" },
  { slug: "contabo", name: "Contabo", type: "cloud" },
  { slug: "linode", name: "Linode / Akamai", type: "cloud" },
  { slug: "vultr", name: "Vultr", type: "cloud" },
  { slug: "oracle", name: "Oracle Cloud", type: "hyperscaler" },
  { slug: "scaleway", name: "Scaleway", type: "cloud" },
  { slug: "ibmcloud", name: "IBM Cloud", type: "hyperscaler" },
  { slug: "alibaba", name: "Alibaba Cloud", type: "hyperscaler" },
  { slug: "ovhcloud", name: "OVHcloud", type: "cloud" },
  { slug: "cloudflare", name: "Cloudflare", type: "cdn" },
  { slug: "fastly", name: "Fastly", type: "cdn" },
  { slug: "fly", name: "Fly.io", type: "paas" },
  { slug: "railway", name: "Railway", type: "paas" },
  { slug: "render", name: "Render", type: "paas" },
  { slug: "vercel", name: "Vercel", type: "paas" },
  { slug: "netlify", name: "Netlify", type: "paas" },
  { slug: "supabase", name: "Supabase", type: "paas" },
  { slug: "neon", name: "Neon", type: "paas" },
  { slug: "upstash", name: "Upstash", type: "edge" },
  { slug: "deno-deploy", name: "Deno Deploy", type: "edge" },
  { slug: "planetscale", name: "PlanetScale", type: "paas" },
];

export const SERVICES: Service[] = [
  { slug: "ssh", name: "SSH", category: "infra" },
  { slug: "docker", name: "Docker", category: "container" },
  { slug: "kubernetes", name: "Kubernetes", category: "container" },
  { slug: "nginx", name: "Nginx", category: "network" },
  { slug: "apache", name: "Apache HTTP", category: "network" },
  { slug: "terraform", name: "Terraform", category: "infra" },
  { slug: "vault", name: "HashiCorp Vault", category: "security" },
  { slug: "grafana", name: "Grafana", category: "monitoring" },
  { slug: "prometheus", name: "Prometheus", category: "monitoring" },
  { slug: "gitlab", name: "GitLab CI", category: "cicd" },
  { slug: "github-actions", name: "GitHub Actions", category: "cicd" },
  { slug: "cloudflare-waf", name: "Cloudflare WAF", category: "security" },
  { slug: "istio", name: "Istio Service Mesh", category: "network" },
  { slug: "envoy", name: "Envoy Proxy", category: "network" },
  { slug: "redis", name: "Redis", category: "storage" },
  { slug: "postgresql", name: "PostgreSQL", category: "storage" },
  { slug: "mongodb", name: "MongoDB", category: "storage" },
  { slug: "mysql", name: "MySQL", category: "storage" },
  { slug: "elasticsearch", name: "Elasticsearch", category: "storage" },
  { slug: "kafka", name: "Apache Kafka", category: "infra" },
  { slug: "rabbitmq", name: "RabbitMQ", category: "infra" },
  { slug: "argocd", name: "Argo CD", category: "cicd" },
  { slug: "flux", name: "Flux CD", category: "cicd" },
  { slug: "trivy", name: "Trivy", category: "security" },
  { slug: "falco", name: "Falco", category: "security" },
  { slug: "opa", name: "Open Policy Agent", category: "security" },
  { slug: "cosign", name: "Cosign / Sigstore", category: "security" },
  { slug: "syft", name: "Syft SBOM", category: "security" },
  { slug: "grype", name: "Grype", category: "security" },
  { slug: "cilium", name: "Cilium CNI", category: "network" },
  { slug: "calico", name: "Calico", category: "network" },
  { slug: "wireguard", name: "WireGuard", category: "network" },
  { slug: "tailscale", name: "Tailscale", category: "network" },
  { slug: "crowdsec", name: "CrowdSec", category: "security" },
  { slug: "wazuh", name: "Wazuh SIEM", category: "security" },
  { slug: "velero", name: "Velero", category: "infra" },
  { slug: "cert-manager", name: "cert-manager", category: "security" },
  { slug: "external-secrets", name: "External Secrets", category: "security" },
  { slug: "kyverno", name: "Kyverno", category: "security" },
  { slug: "snyk", name: "Snyk", category: "security" },
];

export const ISSUES: Issue[] = [
  { slug: "hardening", name: "Hardening", severity: "high", category: "hardening" },
  { slug: "session-revocation", name: "Session Revocation", severity: "critical", category: "auth" },
  { slug: "csp", name: "Content Security Policy", severity: "high", category: "hardening" },
  { slug: "hsts", name: "HSTS Enforcement", severity: "high", category: "network" },
  { slug: "auth-bypass", name: "Auth Bypass Prevention", severity: "critical", category: "auth" },
  { slug: "rate-limiting", name: "Rate Limiting", severity: "high", category: "network" },
  { slug: "waf-rules", name: "WAF Rules", severity: "high", category: "network" },
  { slug: "zero-trust", name: "Zero Trust Architecture", severity: "critical", category: "hardening" },
  { slug: "sbom", name: "SBOM Generation", severity: "medium", category: "supply-chain" },
  { slug: "sigstore", name: "Sigstore Signing", severity: "medium", category: "supply-chain" },
  { slug: "alerting", name: "Alerting & Escalation", severity: "high", category: "ops" },
  { slug: "slo", name: "SLO / Error Budget", severity: "medium", category: "ops" },
  { slug: "multi-region-ha", name: "Multi-Region HA", severity: "critical", category: "ops" },
  { slug: "secret-rotation", name: "Secret Rotation", severity: "critical", category: "auth" },
  { slug: "privilege-escalation", name: "Privilege Escalation", severity: "critical", category: "hardening" },
  { slug: "container-escape", name: "Container Escape", severity: "critical", category: "hardening" },
  { slug: "network-segmentation", name: "Network Segmentation", severity: "high", category: "network" },
  { slug: "tls-pinning", name: "TLS Pinning", severity: "high", category: "network" },
  { slug: "mtls", name: "mTLS Setup", severity: "high", category: "network" },
  { slug: "api-security", name: "API Security", severity: "critical", category: "hardening" },
  { slug: "supply-chain", name: "Supply Chain Security", severity: "critical", category: "supply-chain" },
  { slug: "image-signing", name: "Image Signing", severity: "high", category: "supply-chain" },
  { slug: "runtime-protection", name: "Runtime Protection", severity: "critical", category: "hardening" },
  { slug: "vulnerability-scanning", name: "Vulnerability Scanning", severity: "high", category: "supply-chain" },
  { slug: "patch-management", name: "Patch Management", severity: "high", category: "ops" },
  { slug: "compliance", name: "Compliance Automation", severity: "medium", category: "compliance" },
  { slug: "audit-logging", name: "Audit Logging", severity: "high", category: "compliance" },
  { slug: "encryption-at-rest", name: "Encryption at Rest", severity: "high", category: "hardening" },
  { slug: "encryption-in-transit", name: "Encryption in Transit", severity: "critical", category: "network" },
  { slug: "key-management", name: "Key Management (KMS)", severity: "critical", category: "auth" },
  { slug: "ddos-protection", name: "DDoS Protection", severity: "critical", category: "network" },
  { slug: "bot-mitigation", name: "Bot Mitigation", severity: "high", category: "network" },
  { slug: "oauth2-hardening", name: "OAuth2 Hardening", severity: "critical", category: "auth" },
  { slug: "saml-bypass", name: "SAML Bypass Prevention", severity: "critical", category: "auth" },
  { slug: "jwt-security", name: "JWT Security", severity: "high", category: "auth" },
  { slug: "cors-misconfiguration", name: "CORS Misconfiguration Fix", severity: "high", category: "hardening" },
  { slug: "sql-injection", name: "SQL Injection Prevention", severity: "critical", category: "hardening" },
  { slug: "xss-prevention", name: "XSS Prevention", severity: "high", category: "hardening" },
  { slug: "ssrf-protection", name: "SSRF Protection", severity: "critical", category: "hardening" },
  { slug: "idor-prevention", name: "IDOR Prevention", severity: "high", category: "hardening" },
  { slug: "path-traversal", name: "Path Traversal Fix", severity: "high", category: "hardening" },
  { slug: "deserialization", name: "Deserialization Safety", severity: "critical", category: "hardening" },
  { slug: "log4shell-remediation", name: "Log4Shell Remediation", severity: "critical", category: "ops" },
  { slug: "dependency-confusion", name: "Dependency Confusion", severity: "critical", category: "supply-chain" },
  { slug: "lateral-movement", name: "Lateral Movement Prevention", severity: "critical", category: "hardening" },
  { slug: "credential-stuffing", name: "Credential Stuffing Defense", severity: "high", category: "auth" },
  { slug: "brute-force-protection", name: "Brute Force Protection", severity: "high", category: "auth" },
  { slug: "ip-allowlisting", name: "IP Allowlisting", severity: "medium", category: "network" },
  { slug: "geo-blocking", name: "Geo-Blocking", severity: "medium", category: "network" },
  { slug: "vpn-hardening", name: "VPN Hardening", severity: "high", category: "network" },
  { slug: "firewall-rules", name: "Firewall Rules", severity: "high", category: "network" },
  { slug: "intrusion-detection", name: "Intrusion Detection", severity: "critical", category: "ops" },
  { slug: "incident-response", name: "Incident Response", severity: "critical", category: "ops" },
  { slug: "forensics", name: "Digital Forensics", severity: "high", category: "ops" },
  { slug: "threat-modeling", name: "Threat Modeling", severity: "high", category: "compliance" },
  { slug: "pentest-checklist", name: "Pentest Checklist", severity: "high", category: "compliance" },
  { slug: "red-team", name: "Red Team Ops", severity: "high", category: "compliance" },
  { slug: "blue-team", name: "Blue Team Playbook", severity: "high", category: "ops" },
  { slug: "devsecops", name: "DevSecOps Pipeline", severity: "high", category: "supply-chain" },
  { slug: "shift-left", name: "Shift-Left Security", severity: "medium", category: "supply-chain" },
  { slug: "least-privilege", name: "Least Privilege IAM", severity: "critical", category: "auth" },
];

export const YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

/** Parse a slug like "aws-ssh-hardening-2026" into its components */
export function parseSlug(slug: string): {
  provider: Provider;
  service: Service;
  issue: Issue;
  year: number;
} | null {
  for (const year of YEARS) {
    const suffix = `-${year}`;
    if (!slug.endsWith(suffix)) continue;
    const rest = slug.slice(0, -suffix.length); // "aws-ssh-hardening"

    for (const provider of PROVIDERS) {
      if (!rest.startsWith(provider.slug + "-")) continue;
      const afterProvider = rest.slice(provider.slug.length + 1); // "ssh-hardening"

      for (const service of SERVICES) {
        if (!afterProvider.startsWith(service.slug + "-")) continue;
        const issueSlug = afterProvider.slice(service.slug.length + 1); // "hardening"
        const issue = ISSUES.find((i) => i.slug === issueSlug);
        if (issue) return { provider, service, issue, year };
      }
    }
  }
  return null;
}

/** Total number of valid slugs */
export const TOTAL_SLUGS = PROVIDERS.length * SERVICES.length * ISSUES.length * YEARS.length;

/** Generate a batch of slugs by offset + limit (for sitemaps) */
export function slugBatch(offset: number, limit: number): string[] {
  const results: string[] = [];
  const P = PROVIDERS.length;
  const S = SERVICES.length;
  const I = ISSUES.length;
  const Y = YEARS.length;
  const total = P * S * I * Y;
  const end = Math.min(offset + limit, total);
  for (let idx = offset; idx < end; idx++) {
    const yi = idx % Y;
    const ii = Math.floor(idx / Y) % I;
    const si = Math.floor(idx / (Y * I)) % S;
    const pi = Math.floor(idx / (Y * I * S)) % P;
    results.push(
      `${PROVIDERS[pi].slug}-${SERVICES[si].slug}-${ISSUES[ii].slug}-${YEARS[yi]}`
    );
  }
  return results;
}
