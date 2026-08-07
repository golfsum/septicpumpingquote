import { subDays, isAfter, parseISO, format } from "date-fns";
import type { Lead } from "@/lib/types";

export function computeOverview(leads: Lead[], estimatedLeadValue: number) {
  const now = new Date();
  const d1 = subDays(now, 1);
  const d7 = subDays(now, 7);
  const d30 = subDays(now, 30);

  const inRange = (from: Date) =>
    leads.filter((l) => isAfter(parseISO(l.createdAt), from));

  const today = inRange(d1);
  const last7 = inRange(d7);
  const last30 = inRange(d30);
  const qualified = leads.filter((l) =>
    ["qualified", "contacted", "sent_to_provider", "accepted", "sold"].includes(
      l.status,
    ),
  );

  const organic = last30.filter((l) => l.trafficSource === "organic");
  const paid = last30.filter((l) => l.trafficSource === "paid");
  const direct = last30.filter((l) => l.trafficSource === "direct");

  const byService = countBy(last30, (l) => l.service);
  const byCity = countBy(last30, (l) => l.city);
  const byLanding = countBy(last30, (l) => l.attribution.landingPage || "/");
  const bySeo = countBy(
    last30,
    (l) => l.attribution.seoPageId || l.attribution.currentPage || "/",
  );

  const trendMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    trendMap.set(format(subDays(now, i), "yyyy-MM-dd"), 0);
  }
  for (const l of last30) {
    const key = format(parseISO(l.createdAt), "yyyy-MM-dd");
    if (trendMap.has(key)) trendMap.set(key, (trendMap.get(key) || 0) + 1);
  }

  return {
    leadsToday: today.length,
    leads7: last7.length,
    leads30: last30.length,
    qualified: qualified.length,
    conversionRate: last30.length ? qualified.length / last30.length : 0,
    organic: organic.length,
    paid: paid.length,
    direct: direct.length,
    estimatedValue: last30.length * estimatedLeadValue,
    topService: topKey(byService),
    topCity: topKey(byCity),
    topLanding: topKey(byLanding),
    topSeoPage: topKey(bySeo),
    trend: [...trendMap.entries()].map(([date, count]) => ({ date, count })),
  };
}

function countBy<T>(items: T[], fn: (item: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of items) {
    const key = fn(item) || "unknown";
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

function topKey(map: Record<string, number>): string {
  return (
    Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
  );
}

export function leadsByLandingPage(leads: Lead[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const l of leads) {
    const page = l.attribution.landingPage || l.attribution.currentPage || "/";
    const normalized = page.startsWith("/") ? page : `/${page}`;
    out[normalized] = (out[normalized] || 0) + 1;
    const bare = normalized.replace(/^\//, "");
    out[bare] = (out[bare] || 0) + 1;
  }
  return out;
}
