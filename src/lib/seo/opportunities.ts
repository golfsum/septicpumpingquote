import type { OpportunityCategory } from "@/lib/types";

export type OpportunityRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  landingPage: string;
  leads: number;
  pageConversionRate: number;
  category: OpportunityCategory;
  action: string;
};

export function categorizeOpportunity(input: {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  leads: number;
  pageConversionRate: number;
  intentHint?: string;
}): { category: OpportunityCategory; action: string } {
  const { clicks, impressions, ctr, position, leads, pageConversionRate } = input;
  const ctrPct = ctr <= 1 ? ctr * 100 : ctr;

  if (leads >= 3 && pageConversionRate >= 0.05) {
    return {
      category: "LEAD_WINNER",
      action: "Expand related cluster and strengthen internal links.",
    };
  }

  if (
    position >= 4 &&
    position <= 15 &&
    impressions >= 100 &&
    ctrPct < 5
  ) {
    return {
      category: "QUICK_WIN",
      action:
        "Improve title, intro, FAQ, internal links, schema, and content alignment.",
    };
  }

  if (impressions >= 500 && ctrPct < 2) {
    return {
      category: "HIGH_IMPRESSION_LOW_CTR",
      action: "Improve title/meta and better match search intent.",
    };
  }

  if (clicks >= 30 && leads === 0) {
    return {
      category: "RANKING_BUT_NO_LEADS",
      action: "Improve CTA/form positioning or page commercial intent.",
    };
  }

  if (
    impressions >= 200 &&
    position > 15 &&
    leads === 0
  ) {
    return {
      category: "CONTENT_OPPORTUNITY",
      action:
        "Consider a dedicated page only if you can write unique, useful content.",
    };
  }

  if (
    pageConversionRate > 0 &&
    pageConversionRate < 0.01 &&
    clicks >= 100
  ) {
    return {
      category: "INFORMATIONAL_LOW_VALUE",
      action: "Keep for awareness; soft CTA only where appropriate.",
    };
  }

  return {
    category: "MONITOR",
    action: "Watch Search Console trends before expanding.",
  };
}

export function buildOpportunityRows(
  metrics: {
    query: string;
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }[],
  leadsByPage: Record<string, number>,
): OpportunityRow[] {
  const byQuery = new Map<
    string,
    {
      query: string;
      clicks: number;
      impressions: number;
      ctrSum: number;
      posSum: number;
      count: number;
      landingPage: string;
    }
  >();

  for (const m of metrics) {
    const key = m.query.toLowerCase();
    const existing = byQuery.get(key);
    if (!existing) {
      byQuery.set(key, {
        query: m.query,
        clicks: m.clicks,
        impressions: m.impressions,
        ctrSum: m.ctr,
        posSum: m.position,
        count: 1,
        landingPage: m.page,
      });
    } else {
      existing.clicks += m.clicks;
      existing.impressions += m.impressions;
      existing.ctrSum += m.ctr;
      existing.posSum += m.position;
      existing.count += 1;
      if (m.clicks > 0) existing.landingPage = m.page;
    }
  }

  return [...byQuery.values()]
    .map((row) => {
      const ctr = row.count ? row.ctrSum / row.count : 0;
      const position = row.count ? row.posSum / row.count : 0;
      const path = row.landingPage.replace(/^https?:\/\/[^/]+/, "") || "/";
      const leads = leadsByPage[path] || leadsByPage[path.replace(/\/$/, "")] || 0;
      const pageConversionRate = row.clicks > 0 ? leads / row.clicks : 0;
      const { category, action } = categorizeOpportunity({
        query: row.query,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr,
        position,
        leads,
        pageConversionRate,
      });
      return {
        query: row.query,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr,
        position,
        landingPage: path,
        leads,
        pageConversionRate,
        category,
        action,
      };
    })
    .sort((a, b) => b.impressions - a.impressions);
}
