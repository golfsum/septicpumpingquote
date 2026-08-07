import { google } from "googleapis";
import { randomUUID } from "crypto";
import type { SeoMetricRow } from "@/lib/types";
import {
  localGetSeoMetrics,
  localSetSeoMetrics,
  localUpdateSettings,
} from "@/lib/store/local-db";

export function isGscConfigured(): boolean {
  return Boolean(
    process.env.GSC_CLIENT_EMAIL &&
      process.env.GSC_PRIVATE_KEY &&
      process.env.GSC_PROPERTY,
  );
}

export async function syncSearchConsole(opts?: {
  startDate?: string;
  endDate?: string;
}): Promise<{ rows: SeoMetricRow[]; syncedAt: string }> {
  const syncedAt = new Date().toISOString();

  if (!isGscConfigured()) {
    // Demo metrics so the SEO dashboard is usable before GSC credentials exist.
    const demo = buildDemoMetrics(syncedAt);
    await localSetSeoMetrics(demo);
    await localUpdateSettings({ gscLastSync: syncedAt });
    return { rows: demo, syncedAt };
  }

  const auth = new google.auth.JWT({
    email: process.env.GSC_CLIENT_EMAIL,
    key: process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  const searchconsole = google.searchconsole({ version: "v1", auth });
  const endDate =
    opts?.endDate || new Date().toISOString().slice(0, 10);
  const startDate =
    opts?.startDate ||
    new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const res = await searchconsole.searchanalytics.query({
    siteUrl: process.env.GSC_PROPERTY!,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["query", "page", "device", "country", "date"],
      rowLimit: 25000,
    },
  });

  const rows: SeoMetricRow[] = (res.data.rows || []).map((row) => {
    const [query, page, device, country, date] = row.keys || [];
    return {
      id: randomUUID(),
      date: date || "",
      query: query || "",
      page: page || "",
      country: country || "",
      device: device || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
      syncedAt,
    };
  });

  await localSetSeoMetrics(rows);
  await localUpdateSettings({ gscLastSync: syncedAt });
  return { rows, syncedAt };
}

export async function getStoredSeoMetrics(): Promise<SeoMetricRow[]> {
  return localGetSeoMetrics();
}

function buildDemoMetrics(syncedAt: string): SeoMetricRow[] {
  const samples = [
    {
      query: "septic pumping tucson",
      page: "/az/tucson/septic-pumping",
      clicks: 94,
      impressions: 1940,
      position: 8.2,
    },
    {
      query: "septic repair tucson",
      page: "/az/tucson/septic-repair",
      clicks: 23,
      impressions: 860,
      position: 13.4,
    },
    {
      query: "how often pump septic tank",
      page: "/signs-septic-tank-is-full",
      clicks: 610,
      impressions: 8420,
      position: 5.7,
    },
    {
      query: "septic tank pumping cost",
      page: "/septic-tank-pumping-cost",
      clicks: 120,
      impressions: 4100,
      position: 9.1,
    },
    {
      query: "emergency septic service tucson",
      page: "/az/tucson/emergency-septic-service",
      clicks: 18,
      impressions: 420,
      position: 11.5,
    },
  ];

  return samples.map((s) => ({
    id: randomUUID(),
    date: new Date().toISOString().slice(0, 10),
    query: s.query,
    page: `https://septicpumpingquote.com${s.page}`,
    country: "usa",
    device: "MOBILE",
    clicks: s.clicks,
    impressions: s.impressions,
    ctr: s.clicks / s.impressions,
    position: s.position,
    syncedAt,
  }));
}
