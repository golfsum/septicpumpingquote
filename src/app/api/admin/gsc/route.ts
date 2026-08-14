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
    serviceAccount: process.env.GSC_CLIENT_EMAIL || null,
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const result = await syncSearchConsole({
      startDate: body.startDate,
      endDate: body.endDate,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("GSC sync failed", error);
    const message =
      error instanceof Error ? error.message : "Search Console sync failed";
    const permissionDenied =
      message.includes("sufficient permission") || message.includes("403");

    return NextResponse.json(
      {
        error: message,
        serviceAccount: process.env.GSC_CLIENT_EMAIL || null,
        property: process.env.GSC_PROPERTY || null,
        hint: permissionDenied
          ? `In Google Search Console → Settings → Users and permissions, add ${process.env.GSC_CLIENT_EMAIL || "your GSC_CLIENT_EMAIL"} as a user with Full permission on ${process.env.GSC_PROPERTY || "the property"}. Then retry sync.`
          : "Check GSC_CLIENT_EMAIL, GSC_PRIVATE_KEY / GSC_PRIVATE_KEY_BASE64, GSC_PROPERTY, and that Search Console API is enabled.",
      },
      { status: permissionDenied ? 403 : 500 },
    );
  }
}
