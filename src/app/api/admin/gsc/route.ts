import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { getStoredSeoMetrics, syncSearchConsole } from "@/lib/gsc/client";
import { listLeads } from "@/lib/leads/service";
import { leadsByLandingPage } from "@/lib/analytics/overview";
import { buildOpportunityRows } from "@/lib/seo/opportunities";
import { localGetSettings } from "@/lib/store/local-db";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const metrics = await getStoredSeoMetrics();
  const leads = await listLeads();
  const settings = await localGetSettings();
  const byPage = leadsByLandingPage(leads);
  const opportunities = buildOpportunityRows(
    metrics.map((m) => ({
      query: m.query,
      page: m.page,
      clicks: m.clicks,
      impressions: m.impressions,
      ctr: m.ctr,
      position: m.position,
    })),
    byPage,
  );

  return NextResponse.json({
    metrics,
    opportunities,
    lastSync: settings.gscLastSync,
    property: settings.gscProperty || process.env.GSC_PROPERTY || "",
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const result = await syncSearchConsole({
    startDate: body.startDate,
    endDate: body.endDate,
  });
  return NextResponse.json(result);
}
